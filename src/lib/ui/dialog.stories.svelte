<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Dialog from "./dialog.svelte";
  import { Trash } from "lucide-svelte";

  const { Story } = defineMeta({
    component: Dialog,
  });
</script>

{#snippet children()}
  <div class="bg-white p-4 rounded border border-stone w-fit">
    Are you sure you want to delete this project?
    <div class="flex flex-row gap-4 mt-4 justify-end">
      <button class="w-18 rounded p-1 border border-stone">Cancel</button>
      <button class="w-18 rounded p-1 bg-red text-darkred"> Delete </button>
    </div>
  </div>
{/snippet}
<Story name="open" args={{ isOpen: true, children }} />
