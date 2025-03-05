<script>
    const { isOpen, children } = $props();
</script>

<div
    class="fixed top-0 left-0 w-screen h-screen bg-white/30 backdrop-blur-sm z-10 flex justify-center items-center {!isOpen
        ? 'hidden'
        : ''}"
>
    {@render children()}
</div>
