<script lang="ts">
    import { currentUser } from '$lib/pocketbase';
    // import type { LayoutData } from './$types';
    // export let data: LayoutData;

    import '../app.css';
</script>


<!-- header -->
{#if $currentUser}
    <h1>{$currentUser.username}</h1>
{/if}

<slot/>