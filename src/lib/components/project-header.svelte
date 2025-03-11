<script lang="ts">
  import { Dialog, DropdownMenu } from "bits-ui";
  import { Menu, MoveRight, Plus, Trash } from "lucide-svelte";
  import Paper from "$lib/ui/paper.svelte";
  import type { getProjectReturnType } from "$lib/server/actions";
  import { twMerge } from "tailwind-merge";
  const {
    project,
    class: cls,
  }: { project: getProjectReturnType; class?: string } = $props();
  let open = $state(false);
  $inspect(open);
</script>

<header class={twMerge("flex flex-col gap-2", cls)}>
  <Dialog.Root bind:open>
    <Dialog.Portal>
      <Dialog.Overlay
        class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-gray-900/80"
      />
      <Dialog.Content
        class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] p-5 sm:max-w-[490px] md:w-full"
      >
        <Paper class="px-8 py-4">
          <span>
            Are you sure you want to delete project "{project.name}"?
          </span>
          <form action="?/delete" method="post" class="block ml-auto mt-10">
            <input type="hidden" name="id" value={project.id} />
            <Dialog.Close
              class="w-18 rounded p-1 border bg-sand-50 hover:bg-sand-200 border-stone-500"
            >
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              class="w-18 rounded p-1 bg-eunry-500 hover:bg-eunry-600 text-sand-50"
              onclick={() => (open = false)}
            >
              Delete
            </button>
          </form>
        </Paper>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

  <div class="flex flex-row">
    <h1 class="text-3xl font-bold capitalize">{project.name}</h1>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="ml-auto">
        <Paper class="rounded p-1 hover:bg-sand-200">
          <Menu />
        </Paper>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Paper class="p-2 rounded">
          <DropdownMenu.Item
            onSelect={() => (open = true)}
            class="hover:bg-pampas-200 px-2 py-1 rounded"
          >
            <Trash class="inline mr-1 h-5 align-text-bottom" />Delete
          </DropdownMenu.Item>
        </Paper>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <Paper class="w-fit py-1 px-4">
    {project.startDate.toLocaleDateString()}
    <MoveRight class="w-6 inline " />
    {project.endDate.toLocaleDateString()}
  </Paper>
  <Paper class="w-fit py-1 px-4">
    {project.duration.toFixed(2)} Hours
  </Paper>

  <a
    href="/report/{project.id}"
    class="py-1 bg-gray-300 hover:bg-gray-400 rounded-lg w-fit px-4 hover:underline decoration-wavy"
    >export to HTML</a
  >
  <Paper class="py-1 px-4 w-fit">
    <form action="?/new_session" method="post">
      start a new task:
      <input
        type="text"
        name="desc"
        id="desc"
        class="outline-none"
        placeholder="session description..."
        autocomplete="off"
      />

      <button type="submit" class="align-bottom">
        <Plus />
      </button>
    </form>
  </Paper>
</header>
