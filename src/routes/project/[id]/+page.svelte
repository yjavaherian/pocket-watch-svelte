<script lang="ts">
    const { data } = $props();
    const project = data.project;
</script>

<main>
    <header class="border-b">
        <p>name: {project.name}</p>
        <p>billing rate: {project.billingRate}</p>
        <p>start date {project.startDate.toLocaleDateString()}</p>
        <p>end date: {project.endDate.toLocaleDateString()}</p>
        <p>hours: {project.duration.toFixed(2)}</p>
        <p>invoice: {project.invoiceTotal.toFixed(2)}</p>
        <form action="?/new_session" method="post" class="border">
            <label>
                <input type="text" name="desc" id="desc" />
            </label>
            <button type="submit" class="px-2">+</button>
        </form>
    </header>
    <div>
        <h2>Sessions</h2>
        <ul>
            {#each project.sessions as session}
                <li class="flex flex-row gap-2">
                    <p>{session.date.toLocaleDateString()}</p>
                    <p>{session.duration.toFixed(2)}</p>
                    <p>{session.desc}</p>
                    <p>{session.status}</p>
                    <div>
                        <!-- stop pause resume -->
                        {#if session.status === "active"}
                            <form action="?/pause" method="post">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    >pause</button
                                >
                            </form>
                            <form action="?/stop" method="post">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    >stop</button
                                >
                            </form>
                        {:else if session.status === "paused"}
                            <form action="?/resume" method="post">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    >resume</button
                                >
                            </form>
                            <form action="?/stop" method="post">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={session.id}
                                />
                                <button class="underline" type="submit"
                                    >stop</button
                                >
                            </form>
                        {/if}
                    </div>
                    <p>blocks:</p>
                    <ul class="border">
                        {#each session.blocks as block}
                            <li class="flex flex-row gap-1">
                                <p>
                                    {new Date(block.start).toLocaleTimeString(
                                        "en-GB",
                                        {
                                            timeZone: "Asia/Tehran",
                                            hour12: false,
                                        },
                                    )}
                                </p>
                                <p>
                                    {new Date(block.end).toLocaleTimeString(
                                        "en-GB",
                                        {
                                            timeZone: "Asia/Tehran",
                                            hour12: false,
                                        },
                                    )}
                                </p>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/each}
        </ul>
    </div>
</main>
