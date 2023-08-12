<script lang="ts">
    import SmallCardProduto from "../cards/SmallCardProduto.svelte";
    import Tabs from "../components/Tabs.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "../pocketbase";
    import type { ProdutosPousadaResponse } from "../pocketbase-types";
    import CardProdutoAdmin from "./CardProdutoAdmin.svelte";

    const dispatch = createEventDispatcher();

    let produtos: ProdutosPousadaResponse[] = [];

    async function getProdutos() {
        const response = await pb
            .collection("produtos_pousada")
            .getFullList(300, {
                sort: "nome",
            });

        let set_categorias = new Set<string>();
        response.forEach((produto) => {
            set_categorias.add(produto.categoria);
        });

        console.log(produtos);

        return response;
    }

    onMount(async () => {
        pb.collection("produtos_pousada").subscribe("*", (response) => {
            //@ts-ignore
            produtos = response;
        });

        //@ts-ignore
        produtos = await getProdutos();
    });

    onDestroy(() => {
        pb.collection("produtos_pousada").unsubscribe();
    });

    function getArrayCategoria(categoria: string) {
        const array = produtos.filter((produto) => {
            return produto.categoria === categoria;
        });
        return array;
    }
</script>

<main>
    <div class="wrap-produto">
        <button
            class="novo-produto"
            on:click={() => dispatch("cadastrar_novo_produto")}
        >
            Cadastrar Novo Produto
        </button>
        {#each produtos as produto}
            <button
                class:fora_estoque={!produto.em_estoque}
                on:click={() => dispatch("produto_selecionado", produto)}
            >
                <CardProdutoAdmin {produto} />
            </button>
        {/each}
        <!-- {#each categorias as categoria}
            <div class="wrap-categoria">
                <h2 class="nome-categoria">{categoria}</h2>
                <div class="wrap-produto">
                </div>
            </div>
        {/each} -->
    </div>
</main>

<style>
    .fora_estoque {
        /* opacity: 0.1; */
        background-color: rgb(236, 121, 121);
    }

    .wrap-produto {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1em;
    }

    .novo-produto {
        background-color: rgb(160, 244, 255);
        color: black;
        padding: 1em;
        border-radius: 0.5em;
        border: none;
        font-size: 1.2em;
        font-weight: bold;
        cursor: pointer;
    }
</style>
