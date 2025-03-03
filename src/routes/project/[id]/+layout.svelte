<script>
    import { page } from "$app/state";
    import { FolderPlus, SquareCheckBig } from "lucide-svelte";
    let { children, data } = $props();
</script>

<div class="h-svh flex flex-col">
    <h1
        class="text-4xl flex flex-row items-end p-4 bg-amber-200 font-[Doto] font-black text-amber-950border-b"
    >
        <img src="/favicon.png" alt="logo" class="w-12 mr-2" />
        Pocket watch
    </h1>
    <main class="flex flex-row m-4 grow">
        <div class="flex flex-col w-60">
            {#each data.projects as project}
                <a
                    href="/project/{project.id}/"
                    class={[
                        "py-1 px-2 hover:bg-stone-50 active:bg-stone-100 rounded-md",
                        (page.params.id ?? null) == project.id.toString() &&
                            "bg-amber-100",
                    ]}
                >
                    {project.name}
                </a>
            {/each}
            <form
                action="?/create"
                method="post"
                class="flex flex-row items-center rounded-md bg-amber-100 py-1 px-2 fixed bottom-8"
            >
                <label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        class=""
                        placeholder="project name ..."
                        autocomplete="off"
                    />
                </label>
                <button type="submit" class="text-amber-400 h-8"
                    ><FolderPlus /></button
                >
            </form>
        </div>
        <div class="ml-4">
            {@render children()}
        </div>
    </main>
</div>
