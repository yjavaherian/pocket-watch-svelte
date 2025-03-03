<script>
    let { children, data } = $props();
    import "../app.css";
</script>

<main class="flex flex-row">
    <div class="flex flex-col">
        {#each data.projects as project}
            <a href="/project/{project.id}">
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
