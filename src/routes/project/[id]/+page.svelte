<script lang="ts">
    import {
        Asterisk,
        ChevronRight,
        CircleCheckBig,
        DollarSign,
        Hourglass,
        Pause,
        Play,
        Slash,
        Square,
    } from "lucide-svelte";

    const { data } = $props();
    const project = $derived(data.project);
</script>

<main>
    <header class="flex flex-col gap-2">
        <h1 class="text-4xl font-bold">{project.name}</h1>
        <h2 class="text-lg">
            from {project.startDate.toLocaleDateString()} to {project.endDate.toLocaleDateString()}
        </h2>
        <h2 class="text-lg">
            {project.duration.toFixed(2)}
            <Hourglass class="inline w-4" />
            <Asterisk class="inline w-4" />
            {project.billingRate}
            <Hourglass class="inline w-4" />
            <Slash class="inline w-4" />
            <DollarSign class="inline w-4" /> =
            {project.invoiceTotal.toFixed(2)}
            <DollarSign class="inline w-4" />
        </h2>

        <a
            href="/report/{project.id}"
            class="px-2 py-1 bg-blue-100 hover:underline rounded-lg text-lg w-fit"
            >export to HTML</a
        >
        <form
            action="?/new_session"
            method="post"
            class="flex flex-row items-center rounded-lg bg-amber-100 py-1 px-2"
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
            <button
                type="submit"
                class="text-amber-500 h-8 hover:text-amber-600"
                >Add Task <CircleCheckBig class="ml-1 inline" />
            </button>
        </form>
    </header>
    <table class="mt-4">
        <thead>
            <tr class="text-left bg-amber-50">
                <th class="w-28">Date</th>
                <th class="w-40">Duration (Hour)</th>

                <th class="w-32">Status</th>
                <th class="w-24">Actions</th>
                <th class="w-32">Desc</th>
                <th class="w-32">Blocks</th>
            </tr>
        </thead>
        <tbody class="[&>*:nth-child(odd)]:bg-stone-100">
            {#each project.sessions as session}
                <tr class={[session.status === "active" && "bg-stone-200"]}>
                    <td class="w-28">{session.date.toLocaleDateString()}</td>
                    <td class="w-40">{session.duration.toFixed(2)}</td>
                    <td class="w-32">{session.status}</td>
                    <td class="w-24">
                        {#if session.status === "active"}
                            <form action="?/pause" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    ><Pause class="inline h-6" /></button
                                >
                            </form>
                            <form action="?/stop" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    ><Square class="inline h-6" /></button
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
                                <button class="underline" type="submit"
                                    ><Play class="inline h-6" /></button
                                >
                            </form>
                            <form action="?/stop" method="post" class="inline">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    ><Square class="inline h-6" /></button
                                >
                            </form>
                        {/if}
                    </td>
                    <td class="w-96 pr-2 py-1">
                        <!-- <span class="overflow-ellipsis"> -->
                        {session.desc}
                        <!-- </span> -->
                    </td>
                    <td class="">
                        <ul class="flex flex-row gap-4 w-96 overflow-x-auto">
                            {#each session.blocks as block}
                                <li
                                    class="flex flex-row bg-blue-100 px-1 rounded-lg"
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
