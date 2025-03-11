<script lang="ts">
  import ProjectHeader from "$lib/components/project-header.svelte";
  import SessionList from "$lib/components/session-list.svelte";
  import NewSession from "$lib/components/new-session.svelte";

  import { Tabs } from "bits-ui";
  import Paper from "$lib/ui/paper.svelte";
  import NewBlock from "$lib/components/new-block.svelte";
  import BlockList from "$lib/components/block-list.svelte";
  const { data } = $props();
  const project = $derived(data.project);
  let tab = $state("block");
</script>

<ProjectHeader {project} class=" border-b border-stone-500 pb-4" />

<Tabs.Root bind:value={tab}>
  <div class="flex items-center justify-center">
    <Tabs.List class=" mt-4 w-fit rounded-lg border border-stone-500 p-1">
      <Tabs.Trigger
        class="data-[state=active]:bg-pampas-200  w-32 rounded-lg px-2 py-1 "
        value="session">Sessions</Tabs.Trigger
      >
      <Tabs.Trigger
        class="data-[state=active]:bg-pampas-200  w-32 rounded-lg px-2 py-1 "
        value="block">Blocks</Tabs.Trigger
      >
    </Tabs.List>
  </div>
  <Tabs.Content value="session">
    <NewSession class="mt-8" />
    <Paper class="mt-4 p-4">
      <SessionList sessions={project.sessions} />
    </Paper>
  </Tabs.Content>
  <Tabs.Content value="block">
    <NewBlock class="mt-8" sessions={project.sessions} />
    <Paper class="mt-4 p-4">
      <BlockList sessions={project.sessions} />
    </Paper>
  </Tabs.Content>
</Tabs.Root>
