<script lang="ts">
  import ProjectHeader from "$lib/components/project-header.svelte";
  import SessionList from "$lib/components/session-list.svelte";
  import Paper from "$lib/ui/paper.svelte";
  const { data } = $props();
  const project = $derived(data.project);
</script>

<ProjectHeader {project} class=" border-b border-stone-500 pb-4" />

<Paper class="mt-4 p-4">
  <SessionList sessions={project.sessions} />
</Paper>
