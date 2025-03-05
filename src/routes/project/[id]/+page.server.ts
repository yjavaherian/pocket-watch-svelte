import { createProject, deleteProject, getProject, pauseSession, resumeSession, startNewSession, stopSession } from '$lib/server/actions.js';
import { session } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';

export async function load({ params }) {
   return { project: await getProject(parseInt(params.id)) };
}

export const actions = {
   new_session: async ({ params, request }) => {
      const z = createInsertSchema(session)
      const data = z.parse({ ...Object.fromEntries(await request.formData()), projectID: parseInt(params.id) });
      await startNewSession(data.projectID, data.desc);
   },
   stop: async ({ request }) => {
      const data = await request.formData();
      const sessionId = data.get('id');
      if (typeof sessionId !== 'string') {
         throw new Error("Session ID is missing or invalid.");
      }
      await stopSession(parseInt(sessionId));
   },
   pause: async ({ request }) => {
      const data = await request.formData();
      const sessionId = data.get('id');
      if (typeof sessionId !== 'string') {
         throw new Error("Session ID is missing or invalid.");
      }
      await pauseSession(parseInt(sessionId));
   },
   resume: async ({ request }) => {
      const data = await request.formData();
      const sessionId = data.get('id');
      if (typeof sessionId !== 'string') {
         throw new Error("Session ID is missing or invalid.");
      }
      await resumeSession(parseInt(sessionId));
   },
   create: async ({ request }) => {
      const data = Object.fromEntries(await request.formData());
      await createProject(data)
   },
   delete: async ({ request }) => {
      const data = await request.formData();
      const projectId = data.get('id');
      if (typeof projectId !== 'string') {
         throw new Error("Session ID is missing or invalid.");
      }
      await deleteProject(parseInt(projectId))
      redirect(303, '/')
   }
}