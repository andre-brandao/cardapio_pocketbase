<script lang="ts">
    import { currentUser } from "$lib/pocketbase";
    import type { LayoutData } from "../$types";
    export let data: LayoutData;
</script>

<slot />

<nav>
    <a href="/qrcode/autenticado/pedidos">Pedidos</a>
    {#if $currentUser != null}
        <!-- content here -->
        <a href="/qrcode/autenticado/comanda/{$currentUser.username}">Cardapio</a>
        <a href="/qrcode/mesa/{$currentUser.unidade}">Mesa</a>
    {/if}
    <!-- svelte-ignore a11y-missing-content -->
</nav>


<style>

    /**make nav fixed on the bottom*/
    nav{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }
</style>