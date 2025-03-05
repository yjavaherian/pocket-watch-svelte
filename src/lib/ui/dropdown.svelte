<script lang="ts">
    import type { FocusEventHandler } from "svelte/elements";

    let { children, btn, class: cls, ...props } = $props();

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

<div onfocusout={focusOutHandler} class={[cls, "relative"]} {...props}>
    <button onclick={clickHandler}>
        {@render btn()}
    </button>
    <div
        class="absolute right-0 z-10 origin-top-right focus:outline-hidden {isOpen
            ? ''
            : 'hidden'}"
    >
        {@render children()}
    </div>
</div>
