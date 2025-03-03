<script lang="ts">
    const { data } = $props();
    const project = $derived(data.project);
    const blocks = $derived(
        project.sessions
            .map((s) => s.blocks.map((b) => ({ ...b, desc: s.desc })))
            .flat(),
    );
</script>

<main>
    <header class="border-b">
        <h1>project {project.name} time log</h1>
        <h2>Info</h2>
        <section class="flex flex-col gap-2">
            <p>start date {project.startDate.toLocaleDateString()}</p>
            <p>end date: {project.endDate.toLocaleDateString()}</p>
        </section>
    </header>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Desc</th>
            </tr>
        </thead>
        <tbody>
            {#each blocks as block}
                <tr>
                    <td
                        >{block.date &&
                            new Date(block.date).toLocaleDateString()}</td
                    >
                    <td
                        >{new Date(block.start).toLocaleTimeString("en-GB", {
                            timeZone: "Asia/Tehran",
                            hour12: false,
                        })}</td
                    >
                    <td
                        >{new Date(block.end).toLocaleTimeString("en-GB", {
                            timeZone: "Asia/Tehran",
                            hour12: false,
                        })}</td
                    >
                    <td>{(block.duration ?? 0).toFixed(2)}</td>
                    <td>{block.desc}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <h2>Billing Info</h2>
    <section class="flex flex-col gap-2">
        <p>total hours: {project.duration.toFixed(2)}</p>
        <p>billing rate: {project.billingRate}</p>
        <p>total invoice: {project.invoiceTotal.toFixed(2)}</p>
    </section>
</main>
