<script>
    import "../app.css";
    const { children } = $props();
</script>

{@render children()}

<style>
    :global(body) {
        background-color: #eeeae6;
    }
    :global(button) {
        cursor: pointer;
    }

    :global(ul)::-webkit-scrollbar {
        height: 0.4rem;
    }

    :global(ul)::-webkit-scrollbar-track {
        background-color: #f5f2f0;
    }

    :global(ul)::-webkit-scrollbar-thumb {
        background-color: #96c7fa;
        border-radius: 0.5rem;
    }
</style>
