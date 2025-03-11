<script lang="ts">
    const { data } = $props();
    const project = data.project;
    const blocks = $derived(
        project.sessions
            .map((s) => s.blocks.map((b) => ({ ...b, desc: s.desc })))
            .flat(),
    );
    const border = "border border-stone-500";
</script>

<main class="w-fit m-8 font-[Helvetica]">
    <header class={border}>
        <h1 class="text-center bg-pampas-200 p-2 font-semibold">
            Project Info
        </h1>
        <section class="p-2">
            <h2><span class="font-semibold">Project:</span> {project.name}</h2>
            <h2>
                <span class="font-semibold">time line: </span>
                {project.startDate.toLocaleDateString()} to {project.endDate.toLocaleDateString()}.
            </h2>
            <h2>
                <span class="font-semibold"> total hours:</span>
                {project.duration.toFixed(2)}
            </h2>
        </section>
    </header>
    <table class="mt-8">
        <thead class="bg-pampas-200">
            <tr>
                <th class="p-2 {border}">Date</th>
                <th class="p-2 {border}">Start Time</th>
                <th class="p-2 {border}">End Time</th>
                <th class="p-2 {border}">Duration (min)</th>
                <th class="p-2 {border}">Description</th>
            </tr>
        </thead>
        <tbody>
            {#each blocks as block}
                <tr>
                    <td class="{border} px-2 py-1"
                        >{block.date &&
                            new Date(block.date).toLocaleDateString()}</td
                    >
                    <td class="{border} px-2 py-1"
                        >{new Date(block.start).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</td
                    >
                    <td class="{border} px-2 py-1"
                        >{new Date(block.end).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</td
                    >
                    <td class="{border} px-2 py-1"
                        >{((block.duration ?? 0) * 60).toFixed(2)}</td
                    >
                    <td class="{border} px-2 py-1">{block.desc}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
