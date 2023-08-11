<script lang="ts">
    import { currentUser } from '$lib/pocketbase';
    // import type { LayoutData } from './$types';
    // export let data: LayoutData;

    import '../app.css';
</script>
<main>

    <img src="/src/assets/logo.png" alt="">
    
    <!-- header -->
    {#if $currentUser}
        <h3>Hi, {$currentUser.username}</h3>
    {/if}
    
    
    
</main>

<slot/>

<style>
    img {
        width: 60%;
        border-radius: 10px;
    }


    /**style header with items in the corner*/
    main{
        display: flex;
        justify-content: space-between;
    }
</style>
