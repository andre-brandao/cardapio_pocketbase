<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { ProdutosPousadaResponse } from "$lib/pocketbase-types";

    export let produto: ProdutosPousadaResponse;
</script>

<main>
    {#if produto.foto.length > 0}
        <img class="foto-produto"
            src={pb.files.getUrl(produto, produto.foto, {
                thumb: "250x250f",
            })}
            alt=""
        />
    {:else}
        <img class="foto-produto" src={"/src/assets/no_image.jpg"} alt="" />
    {/if}

    <!-- miniatura -->

    <div class="miniatura">
        <p class="nome">{produto.nome}</p>
        <!-- <p class="descricao">{detalhes}</p> -->
        {#if produto.vegano}
             <img class="badge" src="/src/assets/vegan2.png" alt="">
        {/if}
        <p class="preco">{produto.preco.toFixed(2)}</p>
    </div>
</main>

<style>
    /**crop the image to a square that fits perfectly on the left*/
    .foto-produto {

        width: 50%;
        aspect-ratio: 1/1;
        border-radius: 10px;

        margin: -5px;
        /* border: 5px solid gray; */
    }
    main {
        display: flex;
    }

    .badge {
        width: 40px;
        height: 40px;
        margin-left: 10px;
    }

    .miniatura {
        width: 40%;
        text-align: left;
        padding-left: 15px;
    }

    .nome {
        font-size: 20px;
        font-weight: bold;
    }
    /**preco to the bottom right*/
    .preco {
        text-align: right;

        font-size: 20px;
    }
</style>
