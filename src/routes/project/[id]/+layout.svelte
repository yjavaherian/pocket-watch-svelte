<script>
    import { page } from "$app/state";
    let { children, data } = $props();
</script>

<main class="flex flex-row">
    <div class="flex flex-col">
        {#each data.projects as project}
            <a
                href="/project/{project.id}/"
                class={[
                    (page.params.id ?? null) == project.id.toString() &&
                        "bg-stone-200",
                ]}
            >
                {project.name}
            </a>
        {/each}
        <form action="?/create" method="post" class="border">
            <label>
                <input type="text" name="name" id="name" />
            </label>
            <button type="submit" class="px-2">+</button>
        </form>
    </div>
    <div>
        {@render children()}
    </div>
</main>
