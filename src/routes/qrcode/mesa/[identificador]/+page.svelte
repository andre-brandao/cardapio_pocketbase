<script lang="ts">
    import type { PageData } from "./$types";
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";

    export let data: PageData;

    let comandas: any[] = [];

    async function getMesas() {
        const unidade = data.identificador;
        const results = pb.collection("users").getFullList(300,{
            filter: ` unidade = "${unidade}"`,
        });
        return results;
    }

    onMount(async () => {
        console.log(data.identificador);
        comandas = await getMesas();
        console.log(comandas);
    });
</script>


<main>

    <div class="wrap">
        <a class="cardapio" href="/cardapio">Cardapio</a>
        {#each comandas as comanda}
            <a href="/qrcode/comanda/{comanda.username}">{comanda.username}</a>
        {/each}
    </div>
</main>

<style>

    .cardapio{
        background-color: green;
    }

    .wrap {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));        
    }

    a {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-decoration: none;
        color: #000;
        text-align: center;
    }

    a:hover {
        background: #ccc;
    }
</style>
