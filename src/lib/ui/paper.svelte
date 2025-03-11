<script lang="ts">
    import { twMerge } from "tailwind-merge";

    const {
        children,
        class: cls,
        href,
        ...props
    }: { children?: any; class?: string; href?: string } = $props();
</script>

{#if href}
    <a
        class={twMerge("border border-stone-500 bg-sand-50 rounded-lg", cls)}
        {href}
        {...props}
    >
        {@render children()}
    </a>
{:else}
    <div
        class={twMerge("border border-stone-500 bg-sand-50 rounded-lg", cls)}
        {...props}
    >
        {@render children()}
    </div>
{/if}
