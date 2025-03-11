<script>
    import Button from "$lib/ui/button.svelte";
    import Paper from "$lib/ui/paper.svelte";
    import { FolderPlus } from "lucide-svelte";
</script>

<Paper class="m-4 flex flex-col p-10 w-fit place-self-center">
    <p class="text-lg mb-6">Create your first project</p>
    <form action="?/create" method="post" class="flex flex-col">
        <label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="my awesome project 🤩 ..."
                class="mb-6 p-1 w-64 border border-stone-500 rounded-lg"
            />
        </label>
        <Button class="bg-gray-300  hover:bg-gray-400 text-gray-900">
            New Project <FolderPlus class="ml-1 inline" />
        </Button>
    </form>
</Paper>
