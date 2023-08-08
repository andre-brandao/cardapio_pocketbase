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
        <p class="descricao">{produto.descricao}</p>
        <p class="preco">{produto.preco.toFixed(2)}</p>
    </div>
</main>

<style>
    img {
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 10px;
    }

    .miniatura {
        text-align: left;
        padding-left: 15px;
    }

    .nome {
        font-size: 25px;
        font-weight: bold;
    }
    /**preco to the bottom right*/
    .preco {
        text-align: right;

        font-size: 20px;
    }
    .descricao {
        font-size: 18px;
    }
</style>
