<script>
  import { page } from "$app/state";
  import Header from "$lib/components/header.svelte";
  import Sidebar from "$lib/components/sidebar.svelte";
  let { children, data } = $props();
  const projects = $derived(data.projects);
  const activeProjectId = $derived(parseInt(page.params.id));
</script>

<div class="flex h-svh flex-col">
  <Header />
  <main class="flex grow flex-row">
    <Sidebar
      {activeProjectId}
      {projects}
      class="m-4 border-r border-stone-500 pr-4"
    />
    <div class="grow p-4">
      {@render children()}
    </div>
  </main>
</div>
