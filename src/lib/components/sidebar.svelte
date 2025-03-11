<script lang="ts">
  import Paper from "$lib/ui/paper.svelte";
  import { Folder, FolderOpen, FolderPlus } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  type Project = {
    id: number;
    name: string;
    billingRate: number | null;
  };
  const {
    projects,
    activeProjectId,
    class: cls,
  }: {
    projects: Project[];
    activeProjectId?: Number;
    class?: string;
  } = $props();
</script>

<div class={twMerge("flex flex-col gap-2", cls)}>
  {#each projects as project}
    <Paper
      href="/project/{project.id}/"
      class="py-1 px-2 text-lg capitalize {activeProjectId == project.id
        ? 'bg-gray-300'
        : 'bg-sand-50'}"
    >
      {#if activeProjectId == project.id}
        <FolderOpen class="h-6 text-gray-900 align-text-bottom inline" />
      {:else}
        <Folder class="h-6 text-stone-500 align-text-bottom inline " />
      {/if}

      {project.name}
    </Paper>
  {/each}
  <Paper class="p-2 mt-auto mb-4">
    <form action="?/create" method="post">
      <input
        type="text"
        name="name"
        id="name"
        class="outline-none w-44"
        placeholder="project name ..."
        autocomplete="off"
      />
      <button type="submit" class="align-bottom"><FolderPlus /></button>
    </form>
  </Paper>
</div>
