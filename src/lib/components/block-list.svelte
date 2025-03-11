<script lang="ts">
  import Paper from "$lib/ui/paper.svelte";
  import { wait } from "$lib/utils";
  import { Dialog, DropdownMenu } from "bits-ui";
  import { EllipsisVertical, Trash } from "lucide-svelte";

  const { sessions } = $props();
  const blocks = $derived(
    sessions.flatMap((s) => s.blocks.map((b) => ({ ...b, desc: s.desc }))),
  );
  let open = $state(false);
  let selectedBlockId: string | null = $state(null);
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-gray-900/80"
    />
    <Dialog.Content
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] p-5 outline-hidden sm:max-w-[490px] md:w-full"
    >
      <Paper class="px-8 py-4">
        <span> Are you sure you want to delete this block? </span>
        <form
          action="?/delete_block"
          method="post"
          class="mt-10 ml-auto block"
          onsubmit={() => {
            wait(100).then(() => (open = false));
          }}
        >
          <input type="hidden" name="id" value={selectedBlockId} />
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

<table class="w-full table-auto">
  <thead>
    <tr class="border-b border-stone-500 text-left">
      <th class="min-w-10"></th>
      <th class="px-4 pb-2">Date</th>
      <th class="px-4 pb-2">Duration (H)</th>
      <th class="px-4 pb-2">Desc</th>
      <th class="px-4 pb-2">Start</th>
      <th class="px-4 pb-2">End</th>
    </tr>
  </thead>
  <tbody>
    {#each blocks as block}
      <tr class="{block.status === 'active' ? 'bg-blue' : ''} group relative">
        <td>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <EllipsisVertical class="inline h-5 align-text-bottom" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Paper class="rounded p-2">
                <DropdownMenu.Item
                  onSelect={() => {
                    open = true;
                    selectedBlockId = block.id;
                  }}
                  class="hover:bg-pampas-200 rounded px-2 py-1"
                >
                  <Trash class="mr-1 inline h-5 align-text-bottom" />Delete
                </DropdownMenu.Item>
              </Paper>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </td>
        <td class="px-4 py-2"> {new Date(block.date).toLocaleDateString()}</td>
        <td class="px-4">{block.duration.toFixed(2)}</td>
        <td class="px-4">
          {block.desc}
        </td>
        <td class="px-4">
          {new Date(block.start).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
        <td class="px-4">
          {new Date(block.end).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
