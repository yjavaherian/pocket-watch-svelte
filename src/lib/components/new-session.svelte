<script>
  import Paper from "$lib/ui/paper.svelte";
  import { Plus } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  const { class: cls } = $props();
</script>

<Paper class={twMerge("w-fit px-4 py-1", cls)}>
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
