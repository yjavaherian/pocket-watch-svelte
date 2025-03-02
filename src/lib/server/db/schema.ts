import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from "drizzle-orm/sqlite-core";
import { SQL, sql } from 'drizzle-orm';

const id_column = { id: t.integer().primaryKey({ autoIncrement: true }) }

export const project = table('project', {
	...id_column,
	name: t.text().notNull(),
	billingRate: t.real().default(0),
});

export const session = table('session', {
	...id_column,
	desc: t.text().notNull(),
	projectID: t.integer('project_id').notNull().references(() => project.id),

})

export const block = table('block', {
	...id_column,
	start: t.text().notNull(),
	end: t.text().notNull(),
	sessionID: t.integer('session_id').notNull().references(() => session.id),
	date: t.text().generatedAlwaysAs((): SQL => sql`date(${block.start})`),
	duration: t.real().generatedAlwaysAs((): SQL => sql`(julianday(${block.end}) - julianday(${block.start})) * 24`),
})
