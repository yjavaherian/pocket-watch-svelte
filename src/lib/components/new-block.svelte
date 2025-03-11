<script>
  import Paper from "$lib/ui/paper.svelte";
  import { twMerge } from "tailwind-merge";
  import { DateField } from "bits-ui";
  import { toCalendarDateTime } from "@internationalized/date";
  import { now } from "@internationalized/date";
  const { class: cls, sessions } = $props();

  let startValue = $state(toCalendarDateTime(now("Asia/Tehran")));
  let endValue = $state(toCalendarDateTime(now("Asia/Tehran")));
</script>

<form action="?/new_block" method="post">
  <Paper class={twMerge("flex w-fit flex-row items-center gap-4 p-2", cls)}>
    <select id="sessionID" name="sessionID">
      {#each sessions as session}
        <option value={session.id}>{session.desc}</option>
      {/each}
    </select>
    <DateField.Root placeholder={startValue} bind:value={startValue}>
      <div
        class="bg-pampas-200 flex flex-row items-center gap-2 rounded-lg px-2 py-1"
      >
        <DateField.Label>from</DateField.Label>
        <DateField.Input name="start">
          {#snippet children({ segments })}
            {#each segments as { part, value }}
              <div class="inline">
                {#if part === "literal"}
                  <DateField.Segment {part} class="outline-stone-500">
                    {value}
                  </DateField.Segment>
                {:else}
                  <DateField.Segment {part} class="outline-stone-500">
                    {value}
                  </DateField.Segment>
                {/if}
              </div>
            {/each}
          {/snippet}
        </DateField.Input>
      </div>
    </DateField.Root>
    <DateField.Root placeholder={endValue} bind:value={endValue}>
      <div
        class="bg-pampas-200 flex flex-row items-center gap-2 rounded-lg px-2 py-1"
      >
        <DateField.Label>to</DateField.Label>
        <DateField.Input name="end">
          {#snippet children({ segments })}
            {#each segments as { part, value }}
              <div class="inline">
                {#if part === "literal"}
                  <DateField.Segment {part} class="outline-stone-500">
                    {value}
                  </DateField.Segment>
                {:else}
                  <DateField.Segment {part} class="outline-stone-500">
                    {value}
                  </DateField.Segment>
                {/if}
              </div>
            {/each}
          {/snippet}
        </DateField.Input>
      </div>
    </DateField.Root>

    <button
      type="submit"
      class=" rounded-lg bg-gray-300 px-2 py-1 hover:bg-gray-400"
    >
      Add Block
    </button>
  </Paper>
</form>
