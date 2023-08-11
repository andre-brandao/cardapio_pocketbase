<script lang="ts">
    import { currentUser } from "$lib/pocketbase";
    // import type { LayoutData } from './$types';
    // export let data: LayoutData;

    import "../app.css";
</script>

<main>
    <a href="/cardapio">
        <img src="/src/assets/logo.png" alt="" />
    </a>

    <!-- header -->
    {#if $currentUser}
        <h3>Hi, {$currentUser.username}</h3>
    {/if}
</main>

<slot />

<style>
    img {
        width: 250px;
    }

    /**style header with items in the corner*/
    main {
        display: flex;
        justify-content: space-between;
    }
</style>
