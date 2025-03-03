import { getProjects } from "$lib/server/actions";

export async function load() {
    return { projects: await getProjects() }

}