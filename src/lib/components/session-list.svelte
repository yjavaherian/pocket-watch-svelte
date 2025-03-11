<script lang="ts">
  import Paper from "$lib/ui/paper.svelte";
  import { Dialog, DropdownMenu } from "bits-ui";
  import {
    ChevronRight,
    EllipsisVertical,
    Pause,
    Play,
    Square,
    Trash,
  } from "lucide-svelte";
  const { sessions } = $props();
  let open = $state(false);
  let selectedSessionId: string | null = $state(null);
  function statusColor(status: string) {
    if (status == "stopped") return "bg-eunry-400 text-eunry-50";
    if (status == "active") return "bg-green-400 text-green-50";
    if (status == "paused") return "bg-yellow-400 text-yellow-50";
  }
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
        <span> Are you sure you want to delete this session? </span>
        <form
          action="?/delete_session"
          method="post"
          class="mt-10 ml-auto block"
        >
          <input type="hidden" name="id" value={selectedSessionId} />
          <Dialog.Close
            class="bg-sand-50 hover:bg-sand-200 w-18 rounded border border-stone-500 p-1"
          >
            Cancel
          </Dialog.Close>
          <button
            type="submit"
            class="bg-eunry-500 hover:bg-eunry-600 text-sand-50 w-18 rounded p-1"
            onclick={() => (open = false)}
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
      <th class="px-4 pb-2">Status</th>
      <th class="px-4 pb-2">Actions</th>
      <th class="px-4 pb-2">Desc</th>
      <th class="px-4 pb-2">Blocks</th>
    </tr>
  </thead>
  <tbody>
    {#each sessions as session}
      <tr class="{session.status === 'active' ? 'bg-blue' : ''} group relative">
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
                    selectedSessionId = session.id;
                  }}
                  class="hover:bg-pampas-200 rounded px-2 py-1"
                >
                  <Trash class="mr-1 inline h-5 align-text-bottom" />Delete
                </DropdownMenu.Item>
              </Paper>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </td>
        <td class="px-4 py-2"> {session.date.toLocaleDateString()}</td>
        <td class="px-4">{session.duration.toFixed(2)}</td>
        <td class="px-4">
          <span class="rounded-xl px-2 py-1 {statusColor(session.status)}">
            {session.status}
          </span>
        </td>
        <td class="px-4">
          {#if session.status === "active"}
            <form action="?/pause" method="post" class="inline">
              <input type="hidden" name="id" value={session.id} />
              <button class="bg-sand-50 rounded p-1 text-sm" type="submit">
                <Pause class="inline h-5" /></button
              >
            </form>
            <form action="?/stop" method="post" class="inline">
              <input type="hidden" name="id" value={session.id} />
              <button class="bg-sand-50 rounded p-1 text-sm" type="submit"
                ><Square class="inline h-5" /></button
              >
            </form>
          {:else if session.status === "paused"}
            <form action="?/resume" method="post" class="inline">
              <input type="hidden" name="id" value={session.id} />
              <button class="bg-blue rounded p-1 text-sm" type="submit"
                ><Play class="inline h-5" /></button
              >
            </form>
            <form action="?/stop" method="post" class="inline">
              <input type="hidden" name="id" value={session.id} />
              <button class="bg-blue rounded p-1 text-sm" type="submit"
                ><Square class="inline h-5" /></button
              >
            </form>
          {/if}
        </td>
        <td class="px-4">
          {session.desc}
        </td>
        <td class="px-4">
          <ul class="flex max-w-96 flex-row gap-4 overflow-x-auto">
            {#each session.blocks as block}
              <li
                class="flex flex-row select-none {session.status == 'active'
                  ? 'bg-sand-50'
                  : 'bg-blue'} rounded-lg px-1"
              >
                <p>
                  {new Date(block.start).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <ChevronRight class="inline" />
                <p>
                  {new Date(block.end).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </li>
            {/each}
          </ul>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
