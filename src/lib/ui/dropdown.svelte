<script lang="ts">
    import type { FocusEventHandler } from "svelte/elements";

    const { children, btn } = $props(); // 👈 fetch snippets here

    let isOpen = $state(false);

    const clickHandler = () => {
        isOpen = !isOpen;
    };

    const focusOutHandler: FocusEventHandler<HTMLDivElement> = ({
        relatedTarget,
        currentTarget,
    }) => {
        if (
            relatedTarget instanceof HTMLElement &&
            currentTarget.contains(relatedTarget)
        )
            return;
        isOpen = false;
    };
</script>

<div onfocusout={focusOutHandler}>
    <button onclick={clickHandler}>
        {@render btn()}
        <!-- 👈 use snippets like this -->
    </button>
    <div class={isOpen ? "" : "hidden"}>
        {@render children()}
    </div>
</div>
