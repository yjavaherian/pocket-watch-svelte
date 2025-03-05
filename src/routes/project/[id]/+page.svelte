<script lang="ts">
    import {
        Asterisk,
        ChevronRight,
        CircleCheckBig,
        DollarSign,
        Hourglass,
        Menu,
        MoveRight,
        Pause,
        Play,
        Plus,
        Slash,
        Square,
        Trash,
    } from "lucide-svelte";
    import Dropdown from "$lib/ui/dropdown.svelte";
    import Dialog from "$lib/ui/dialog.svelte";

    const { data } = $props();
    const project = $derived(data.project);
    let dialogOpen = $state(false);
</script>

<header class="flex flex-col gap-2 border-b border-stone pb-4">
    <div class="flex flex-row">
        <h1 class="text-3xl font-bold capitalize">{project.name}</h1>
        <Dropdown class="ml-auto">
            {#snippet btn()}
                <Menu
                    class="border bg-white h-8 w-8 p-1 rounded border-stone hover:bg-darkwhite"
                />
            {/snippet}
            <ul
                class="bg-white rounded border border-stone w-32 p-2 flex flex-col divide-y divide-stone"
            >
                <button
                    class="hover:bg-darkwhite pb-1 mb-2 flex flex-row items-center"
                    onclick={() => (dialogOpen = true)}
                >
                    <Trash class="inline mr-1 h-5" />Delete
                </button>
            </ul>
        </Dropdown>
        <Dialog isOpen={dialogOpen}>
            <div class="bg-white p-8 rounded border border-stone w-fit">
                Are you sure you want to delete project "{project.name}"?
                <div class="flex flex-row gap-4 mt-8 justify-end">
                    <button
                        onclick={() => (dialogOpen = false)}
                        class="w-18 rounded p-1 border border-stone"
                        >Cancel</button
                    >
                    <form action="?/delete" method="post" class="inline">
                        <input type="hidden" name="id" value={project.id} />
                        <button
                            class="w-18 rounded p-1 bg-red text-darkred"
                            type="submit">Delete</button
                        >
                    </form>
                </div>
            </div>
        </Dialog>
    </div>
    <h2 class="py-1 border border-stone bg-white rounded-lg w-fit px-4">
        {project.startDate.toLocaleDateString()}
        <MoveRight class="w-6 inline " />
        {project.endDate.toLocaleDateString()}
    </h2>
    <h2 class="py-1 border border-stone bg-white rounded-lg w-fit px-4">
        {project.duration.toFixed(2)} Hours
        <!-- <Hourglass class="inline h-4" /> -->
        <!-- <Asterisk class="inline w-4" />
            {project.billingRate}
            <Hourglass class="inline w-4" />
            <Slash class="inline w-4" />
            <DollarSign class="inline w-4" /> =
            {project.invoiceTotal.toFixed(2)}
            <DollarSign class="inline w-4" /> -->
    </h2>

    <a
        href="/report/{project.id}"
        class="py-1 bg-blue hover:bg-darkblue rounded-lg w-fit px-4 hover:underline decoration-wavy"
        >export to HTML</a
    >
    <form
        action="?/new_session"
        method="post"
        class="flex flex-row items-center border border-stone bg-white rounded-lg py-1 px-4 w-fit"
    >
        <label>
            start a new task:
            <input
                type="text"
                name="desc"
                id="desc"
                class="ml-2"
                placeholder="session description..."
                autocomplete="off"
            />
        </label>
        <button type="submit">
            <Plus />
        </button>
    </form>
</header>
<main class="mt-4 border border-stone bg-white rounded-lg p-4">
    <table class="table-auto">
        <thead>
            <tr class="text-left border-b border-stone">
                <th class="pb-2 px-4 min-w-28">Date</th>
                <th class="pb-2 px-4 min-w-28">Duration (H)</th>
                <th class="pb-2 px-4 min-w-28">Status</th>
                <th class="pb-2 px-4 min-w-28">Actions</th>
                <th class="pb-2 px-4 min-w-28">Desc</th>
                <th class="pb-2 px-4 min-w-28">Blocks</th>
            </tr>
        </thead>
        <tbody class="">
            {#each project.sessions as session}
                <tr class={session.status === "active" ? "bg-blue" : ""}>
                    <td class="py-2 px-4"
                        >{session.date.toLocaleDateString()}</td
                    >
                    <td class="px-4">{session.duration.toFixed(2)}</td>
                    <td class="px-4">{session.status}</td>
                    <td class="px-4">
                        {#if session.status === "active"}
                            <form action="?/pause" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button
                                    class="bg-white rounded p-1 text-sm"
                                    type="submit"
                                >
                                    <Pause class="inline h-5" /></button
                                >
                            </form>
                            <form action="?/stop" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button
                                    class="bg-white rounded p-1 text-sm"
                                    type="submit"
                                    ><Square class="inline h-5" /></button
                                >
                            </form>
                        {:else if session.status === "paused"}
                            <form
                                action="?/resume"
                                method="post"
                                class="inline"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button
                                    class="bg-blue rounded p-1 text-sm"
                                    type="submit"
                                    ><Play class="inline h-5" /></button
                                >
                            </form>
                            <form action="?/stop" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button
                                    class="bg-blue rounded p-1 text-sm"
                                    type="submit"
                                    ><Square class="inline h-5" /></button
                                >
                            </form>
                        {/if}
                    </td>
                    <td class="px-4">
                        <!-- <span class="overflow-ellipsis"> -->
                        {session.desc}
                        <!-- </span> -->
                    </td>
                    <td class="px-4">
                        <ul
                            class="flex flex-row gap-4 overflow-x-auto max-w-96"
                        >
                            {#each session.blocks as block}
                                <li
                                    class="select-none flex flex-row {session.status ==
                                    'active'
                                        ? 'bg-white'
                                        : 'bg-blue'} px-1 rounded-lg"
                                >
                                    <p>
                                        {new Date(
                                            block.start,
                                        ).toLocaleTimeString("en-GB", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <ChevronRight class="inline" />
                                    <p>
                                        {new Date(block.end).toLocaleTimeString(
                                            "en-GB",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            },
                                        )}
                                    </p>
                                </li>
                            {/each}
                        </ul>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
