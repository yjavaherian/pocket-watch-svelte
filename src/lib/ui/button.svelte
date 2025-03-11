<script lang="ts">
    import { twMerge } from "tailwind-merge";
    const { children, class: cls, ...props } = $props();
</script>

<button
    type="submit"
    class={twMerge("p-1 border border-stone-500 rounded-lg", cls)}
    {...props}
>
    {@render children()}
</button>
