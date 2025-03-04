<script lang="ts">
    import {
        Asterisk,
        ChevronRight,
        CircleCheckBig,
        DollarSign,
        Hourglass,
        MoveRight,
        Pause,
        Play,
        Plus,
        Slash,
        Square,
    } from "lucide-svelte";

    const { data } = $props();
    const project = $derived(data.project);
</script>

<header class="flex flex-col gap-2 border-b border-stone pb-4">
    <h1 class="text-3xl font-bold capitalize">{project.name}</h1>
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
