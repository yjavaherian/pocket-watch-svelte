import { createProject, getProjects } from '$lib/server/actions';
import type { Actions } from './$types';

export async function load() {
    const projects = await getProjects()
    return { projects }
}

export const actions: Actions = {
    create: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        await createProject(data)
    }
}