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
    class="text-4xl flex flex-row items-end p-4 bg-amber-200 font-[Doto] font-black text-amber-950border-b"
>
    <img src="/favicon.png" alt="logo" class="w-12 mr-2" />
    Pocket watch
</h1>
<main class="m-4">
    <h2 class="text-xl font-bold">
        Pocket watch is a time tracking app that helps you keep track of your
        time and bill your clients.
    </h2>
    <p class="mt-4">
        you have not created any project yet, fill the form below to add a new
        project 👇:
    </p>
    <form action="?/create" method="post" class="">
        <label>
            Project Name:
            <input
                type="text"
                name="name"
                id="name"
                class="bg-amber-100 rounded px-2 py-1"
            />
        </label>
        <button
            type="submit"
            class="bg-amber-200 rounded px-2 py-1 hover:bg-amber-300"
            >New Project <FolderPlus class="ml-1 inline" />
        </button>
    </form>
</main>
