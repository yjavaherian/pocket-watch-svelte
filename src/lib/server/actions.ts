import assert from "assert"
import { db } from "./init"
import { block, project, session } from "./schema"
import { eq } from "drizzle-orm"
import { createInsertSchema } from 'drizzle-zod';

export async function getProject(projectID: number) {
    let _project = await db.query.project.findFirst({
        where: eq(project.id, projectID),
        with: {
            sessions: {
                with: {
                    blocks: true
                }
            }
        }
    })
    assert(_project)
    const computedProject = {
        ..._project,
        sessions: _project.sessions.map((s) => ({
            ...s,
            date: new Date(Math.min(...s.blocks.map(b => new Date(b.start).getTime()))),
            duration: s.blocks.reduce((acc, b) => acc + (b.duration ?? 0), 0)
        }))
    }
    return {
        ...computedProject,
        duration: computedProject.sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0),
        invoiceTotal: computedProject.sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0) * (computedProject.billingRate ?? 0),
        startDate: new Date(Math.min(...computedProject.sessions.map(s => s.date.getTime()))),
        endDate: new Date(Math.max(...computedProject.sessions.map(s => s.date.getTime())))


    }
}

export async function getProjects() {
    return await db.query.project.findMany();

}


export async function createProject(data: any) {
    const z = createInsertSchema(project)
    await db.insert(project).values(z.parse(data));
}
export async function deleteProject(projectID: number) {
    await db.delete(project).where(eq(project.id, projectID));
}

export async function startNewSession(projectID: number, desc: string) {
    const new_seesion = (await db.insert(session).values({ projectID, desc }).returning())[0];
    // await db.insert(block).values({ sessionID: new_seesion.id, start: new Date().toISOString(), end: new Date().toISOString() })
    return await db.query.session.findFirst({ where: eq(session.id, new_seesion.id), with: { blocks: true } })
}

export async function deleteSession(sessionID: number) {
    await db.delete(session).where(eq(session.id, sessionID));
}

export async function stopSession(sessionID: number) {
    const _session = await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
    assert(_session)
    assert(_session.status !== "stopped")
    if (_session.status == "active") {
        const last_block = _session.blocks[_session.blocks.length - 1]
        await db.update(block).set({ end: new Date().toISOString() }).where(eq(block.id, last_block.id))
    }
    await db.update(session).set({ status: "stopped" }).where(eq(session.id, sessionID))
    return await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
}

export async function pauseSession(sessionID: number) {
    const _session = await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
    assert(_session)
    assert(_session.status === "active")
    const last_block = _session.blocks[_session.blocks.length - 1]
    await db.update(block).set({ end: new Date().toISOString() }).where(eq(block.id, last_block.id))
    await db.update(session).set({ status: "paused" }).where(eq(session.id, sessionID))
    return await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
}


export async function resumeSession(sessionID: number) {
    const _session = await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
    assert(_session)
    assert(_session.status === "paused")
    await db.update(session).set({ status: "active" }).where(eq(session.id, sessionID))
    await db.insert(block).values({ sessionID: _session.id, start: new Date().toISOString(), end: new Date().toISOString() })
    return await db.query.session.findFirst({ where: eq(session.id, sessionID), with: { blocks: true } })
}