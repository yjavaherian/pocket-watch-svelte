<script lang="ts">
    import { FolderPlus } from "lucide-svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    let { data } = $props();
    const projects = data.projects;
    if (projects.length > 0 && browser) {
        goto(`/project/${projects[projects.length - 1].id}`);
    }
</script>

<h1
    class="text-4xl flex flex-row items-end p-4 border-b font-[Doto] font-black border-stone"
>
    <img src="/favicon.png" alt="logo" class="w-12 mr-2" />
    Pocket watch
</h1>
<main
    class="m-4 flex flex-col border border-stone bg-white rounded-lg p-10 w-fit place-self-center"
>
    <!-- <h2 class="text-xl font-bold">
        Pocket watch is a time tracking app that helps you keep track of your
        time and bill your clients.
    </h2> -->
    <p class="text-lg mb-6">Create your first project</p>
    <form action="?/create" method="post" class="flex flex-col">
        <label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="my awesome project 🤩 ..."
                class="mb-6 p-1 w-64 border border-stone rounded-lg"
            />
        </label>
        <button type="submit" class="bg-blue p-1 rounded-lg hover:bg-darkblue"
            >New Project <FolderPlus class="ml-1 inline" />
        </button>
    </form>
</main>
