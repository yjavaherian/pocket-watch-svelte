<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import NewProject from "$lib/components/newproject.svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    let { data } = $props();
    const projects = data.projects;
    if (projects.length > 0 && browser) {
        goto(`/project/${projects[projects.length - 1].id}`);
    }
</script>

<Header />
<NewProject />
