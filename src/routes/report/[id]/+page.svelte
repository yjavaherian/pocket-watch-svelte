<script lang="ts">
    const { data } = $props();
    const project = $derived(data.project);
    const blocks = $derived(
        project.sessions
            .map((s) => s.blocks.map((b) => ({ ...b, desc: s.desc })))
            .flat(),
    );
</script>

<main class="m-8">
    <header class="border-b border-stone flex flex-col pb-2">
        <h1 class="text-2xl font-bold">Time Log Report</h1>
        <h2 class="text-lg">Project: {project.name}</h2>
        <h2 class="text-lg">
            project ran from {project.startDate.toLocaleDateString()} to {project.endDate.toLocaleDateString()}.
        </h2>
        <h2 class="text-lg">
            total hours: {project.duration.toFixed(2)}
        </h2>
    </header>
    <table class="mt-8 border-y">
        <thead class="text-left bg-pampas">
            <tr>
                <th class="w-32 border-stone px-1 py-1 border">Date</th>
                <th class="w-32 border-stone px-1 py-1 border">Start Time</th>
                <th class="w-32 border-stone px-1 py-1 border">End Time</th>
                <th class="w-32 border-stone px-1 py-1 border"
                    >Duration (min)</th
                >
                <th class="w-96 border-stone px-1 py-1 border">Description</th>
            </tr>
        </thead>
        <tbody>
            {#each blocks as block}
                <tr>
                    <td class="border border-stone px-2 py-1"
                        >{block.date &&
                            new Date(block.date).toLocaleDateString()}</td
                    >
                    <td class="border border-stone px-2 py-1"
                        >{new Date(block.start).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</td
                    >
                    <td class="border border-stone px-2 py-1"
                        >{new Date(block.end).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</td
                    >
                    <td class="border border-stone px-2 py-1"
                        >{((block.duration ?? 0) * 60).toFixed(2)}</td
                    >
                    <td class="border border-stone px-2 py-1">{block.desc}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <!-- <h2 class="mt-4 text-2xl">Billing Info</h2>
    <section class="mt-2 flex flex-row gap-20 text-lg">
        <p>total hours: {project.duration.toFixed(2)}</p>
        <p>billing rate: {project.billingRate}</p>
        <p class="">
            total invoice: {project.invoiceTotal.toFixed(2)}
        </p>
    </section> -->
</main>
