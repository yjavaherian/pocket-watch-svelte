<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    let { data } = $props();
    const projects = data.projects;
    if (projects.length > 0 && browser) {
        goto(`/project/${projects[projects.length - 1].id}`);
    }
</script>

<h1 class="text-4xl">Pocket watch</h1>
<main>
    <p>
        Pocket watch is a time tracking app that helps you keep track of your
        time and bill your clients.
    </p>
    <p>
        you have not created any project yet, fill the form below to add a new
        project:
    </p>
    <form action="?/create" method="post" class="">
        <label>
            <input type="text" name="name" id="name" />
        </label>
        <button type="submit" class="px-2">+</button>
    </form>
</main>
