import { createProject } from '$lib/server/actions';
import type { Actions } from './$types';

export const actions: Actions = {
    create: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        await createProject(data)
    }
}