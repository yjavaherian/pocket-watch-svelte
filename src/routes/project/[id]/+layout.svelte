<script>
    import { page } from "$app/state";
    import { Folder, FolderOpen, FolderPlus, Trash } from "lucide-svelte";
    let { children, data } = $props();
</script>

<div class="h-svh flex flex-col">
    <h1
        class="text-4xl flex flex-row items-end p-4 border-b font-[Doto] font-black border-stone"
    >
        <img src="/favicon.png" alt="logo" class="w-12 mr-2" />
        Pocket watch
    </h1>

    <main class="flex flex-row grow">
        <div
            class="flex flex-col justify-between pr-4 m-4 border-r border-stone"
        >
            <section class="flex flex-col text-lg capitalize gap-2">
                {#each data.projects as project}
                    <a
                        href="/project/{project.id}/"
                        class="flex flex-row items-center gap-2 border border-stone rounded-lg py-1 px-2 {(page
                            .params.id ?? null) == project.id.toString()
                            ? 'bg-blue'
                            : 'bg-white'}"
                    >
                        {#if (page.params.id ?? null) == project.id.toString()}
                            <FolderOpen class="inline h-6 text-darkblue" />
                        {:else}
                            <Folder class="inline h-6 text-stone" />
                        {/if}

                        {project.name}
                    </a>
                {/each}
            </section>
            <section>
                <form
                    action="?/create"
                    method="post"
                    class=" flex flex-row items-center p-2 border border-stone rounded-lg bg-white"
                >
                    <label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            class="w-56"
                            placeholder="project name ..."
                            autocomplete="off"
                        />
                    </label>
                    <button type="submit" class=""><FolderPlus /></button>
                </form>
            </section>
        </div>
        <div class="p-4">
            {@render children()}
        </div>
    </main>
</div>
