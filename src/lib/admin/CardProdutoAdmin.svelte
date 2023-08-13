<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { ProdutosPousadaResponse } from "$lib/pocketbase-types";

    export let produto: ProdutosPousadaResponse;
</script>

<main>
    {#if produto.foto.length > 0}
        <img
            src={pb.files.getUrl(produto, produto.foto, {
                thumb: "250x250f",
            })}
            alt=""
        />
    {:else}
        <img src={"/src/assets/no_image.jpg"} alt="" />
    {/if}

    <!-- miniatura -->

    <div class="miniatura">
        <p class="nome">{produto.nome}</p>
        <!-- <p class="descricao">{detalhes}</p> -->
        <p>Em estoque: {produto.quantidade}</p>
    </div>
</main>

<style>
    img {
        width: 50%;
        aspect-ratio: 1/1;
        border-radius: 10px;
    }
    main {
        display: flex;
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
</style>
