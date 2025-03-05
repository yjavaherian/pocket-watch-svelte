<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Dropdown from "./dropdown.svelte";
  import { Menu } from "lucide-svelte";

  const { Story } = defineMeta({
    component: Dropdown,
  });
</script>

{#snippet btn()}
  <Menu
    class="border bg-white h-8 w-8 p-1 rounded border-stone hover:bg-darkwhite"
  />
{/snippet}

{#snippet children()}
  <ul
    class="bg-white rounded border border-stone w-32 p-2 flex flex-col divide-y divide-stone"
  >
    <li class="hover:bg-darkwhite pb-1 mb-2">option 1</li>
    <li class="hover:bg-darkwhite pb-1 mb-2">option 2</li>
    <li class="hover:bg-darkwhite pb-1 mb-2">option 3</li>
    <li class="hover:bg-darkwhite pb-1 mb-2">option 4</li>
    <li class="hover:bg-darkwhite">option 5</li>
  </ul>
{/snippet}

<Story name="Primary" args={{ btn, children }} />
