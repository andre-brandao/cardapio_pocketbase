<script lang="ts">
    import SmallCardProduto from "./cards/SmallCardProduto.svelte";
    import Tabs from "./components/Tabs.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import type { ProdutosPousadaResponse } from "./pocketbase-types";

    const dispatch = createEventDispatcher();

    let produtos: ProdutosPousadaResponse[] = [];
    let categorias: string[] = [];

    $: produtosFiltrados = produtos.filter((produto) => {
        return produto.subcategoria === comida_bebida_activeTab;
    });

    $: {
        let set_categorias = new Set<string>();
        produtosFiltrados.forEach((produto) => {
            set_categorias.add(produto.categoria);
        });
        categorias = Array.from(set_categorias.values());
    }

    async function getProdutos() {
        const response = await pb
            .collection("produtos_pousada")
            .getFullList(300, {
                sort: "-em_estoque",
            });
        // @ts-ignore
        produtos = response;

        let set_categorias = new Set<string>();
        produtos.forEach((produto) => {
            set_categorias.add(produto.categoria);
        });
        categorias = Array.from(set_categorias.values());

        console.log(produtos);
        console.log(produtosFiltrados);
    }

    onMount(async () => {
        getProdutos();
    });

    function getArrayCategoria(categoria: string) {
        const array = produtosFiltrados.filter((produto) => {
            return produto.categoria === categoria;
        });
        return array;
    }

    let comida_bebida_tabs = ["Comida", "Bebida"];
    let comida_bebida_activeTab = "Comida";
</script>

<main>
    <div class="tabs">
        <Tabs
            activeTab={comida_bebida_activeTab}
            tabs={comida_bebida_tabs}
            on:tabChange={(e) => (comida_bebida_activeTab = e.detail)}
        />
    </div>

    <div class="cardapio">
        {#each categorias as categoria}
            <div class="wrap-categoria">
                <h2 class="nome-categoria">{categoria}</h2>
                <div class="wrap-produto">
                    {#each getArrayCategoria(categoria) as produto}
                        <button
                            class:fora_estoque={!produto.em_estoque}
                            on:click={() =>
                                dispatch("produto_selecionado", produto)}
                        >
                            <SmallCardProduto {produto} />
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    .nome-categoria {
        text-align: center;
        font-size: 30px;
    }
    .fora_estoque {
        opacity: 0.1;
        pointer-events: none;
    }

    .wrap-produto {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1em;
    }

    .cardapio {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }


</style>
