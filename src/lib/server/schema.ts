import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/relations";
import * as t from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";

const id_column = { id: t.integer().primaryKey({ autoIncrement: true }) };

export const project = table("project", {
  ...id_column,
  name: t.text().notNull(),
  billingRate: t.real().default(0),
});

export const session = table("session", {
  ...id_column,
  desc: t.text().notNull(),
  status: t.text().$type<"active" | "paused" | "stopped">().default("paused"),
  projectID: t
    .integer("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
});

export const block = table("block", {
  ...id_column,
  start: t.text().notNull(),
  end: t.text().notNull(),
  sessionID: t
    .integer("session_id")
    .notNull()
    .references(() => session.id, { onDelete: "cascade" }),
  date: t.text().generatedAlwaysAs((): SQL => sql`date(${block.start})`),
  duration: t
    .real()
    .generatedAlwaysAs(
      (): SQL =>
        sql`(julianday(${block.end}) - julianday(${block.start})) * 24`,
    ),
});

export const blockRelations = relations(block, ({ one }) => ({
  session: one(session, {
    fields: [block.sessionID],
    references: [session.id],
  }),
}));

export const sessionRelations = relations(session, ({ one, many }) => ({
  blocks: many(block),
  project: one(project, {
    fields: [session.projectID],
    references: [project.id],
  }),
}));

export const projectRelations = relations(project, ({ many }) => ({
  sessions: many(session),
}));
