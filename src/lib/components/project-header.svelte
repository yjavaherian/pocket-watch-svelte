<script lang="ts">
  import { Dialog, DropdownMenu } from "bits-ui";
  import { Menu, MoveRight, Plus, Trash } from "lucide-svelte";
  import Paper from "$lib/ui/paper.svelte";
  import type { getProjectReturnType } from "$lib/server/actions";
  import { twMerge } from "tailwind-merge";
  import { wait } from "$lib/utils";
  const {
    project,
    class: cls,
  }: { project: getProjectReturnType; class?: string } = $props();
  let open = $state(false);
</script>

<header class={twMerge("flex flex-col gap-2", cls)}>
  <Dialog.Root bind:open>
    <Dialog.Portal>
      <Dialog.Overlay
        class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-gray-900/80"
      />
      <Dialog.Content
        class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] p-5 outline-hidden sm:max-w-[490px] md:w-full"
      >
        <Paper class="px-8 py-4">
          <span>
            Are you sure you want to delete project "{project.name}"?
          </span>
          <form
            action="?/delete"
            method="post"
            class="mt-10 ml-auto block"
            onsubmit={() => {
              wait(100).then(() => (open = false));
            }}
          >
            <input type="hidden" name="id" value={project.id} />
            <Dialog.Close
              class="bg-sand-50 hover:bg-sand-200 w-18 rounded border border-stone-500 p-1"
            >
              Cancel
            </Dialog.Close>
            <button
              type="submit"
              class="bg-eunry-500 hover:bg-eunry-600 text-sand-50 w-18 rounded p-1"
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
        <Paper class="hover:bg-sand-200 rounded p-1">
          <Menu />
        </Paper>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Paper class="rounded p-2">
          <DropdownMenu.Item
            onSelect={() => (open = true)}
            class="hover:bg-pampas-200 rounded px-2 py-1"
          >
            <Trash class="mr-1 inline h-5 align-text-bottom" />Delete
          </DropdownMenu.Item>
        </Paper>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <Paper class="w-fit px-4 py-1">
    {project.startDate.toLocaleDateString()}
    <MoveRight class="inline w-6 " />
    {project.endDate.toLocaleDateString()}
  </Paper>
  <Paper class="w-fit px-4 py-1">
    {project.duration.toFixed(2)} Hours
  </Paper>

  <a
    href="/report/{project.id}"
    class="w-fit rounded-lg border border-stone-500 bg-gray-300 px-4 py-1 decoration-wavy hover:bg-gray-400 hover:underline"
    >export to HTML</a
  >
</header>
