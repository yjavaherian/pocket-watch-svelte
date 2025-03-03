import { getProject } from '$lib/server/actions.js';

export async function load({ params }) {
   return { project: await getProject(parseInt(params.id)) };
}