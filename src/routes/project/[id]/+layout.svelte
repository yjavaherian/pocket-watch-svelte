<script>
    import { page } from "$app/state";
    import Header from "$lib/components/header.svelte";
    import Sidebar from "$lib/components/sidebar.svelte";
    let { children, data } = $props();
    const projects = $derived(data.projects);
    const activeProjectId = $derived(parseInt(page.params.id));
</script>

<div class="h-svh flex flex-col">
    <Header />
    <main class="flex flex-row grow">
        <Sidebar
            {activeProjectId}
            {projects}
            class="pr-4 m-4 border-r border-stone-500"
        />
        <div class="p-4">
            {@render children()}
        </div>
    </main>
</div>
