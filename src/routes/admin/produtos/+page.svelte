<script lang="ts">
    import Cardapio from "$lib/Cardapio.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { pb, currentUser } from "$lib/pocketbase";
    import type { ProdutosPousadaResponse } from "$lib/pocketbase-types";

    let showModal = false;
    let produto: ProdutosPousadaResponse;

    let input = {
        subcategoria: "",
        categoria: "",
        nome: "",
        descricao: "",
        preco: 0,
        imagem: "",
    };

    async function selecionar_produto(event: {
        detail: ProdutosPousadaResponse;
    }) {
        produto = event.detail;
        input = {
            subcategoria: produto.subcategoria,
            categoria: produto.categoria,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            imagem: "",
        };
        showModal = true;
    }

    async function editar_produto() {
        const id = produto.id;

        pb.collection("produtos_pousada").update(id, {
            subcategoria: input.subcategoria,
            categoria: input.categoria,
            nome: input.nome,
            descricao: input.descricao,
            preco: input.preco,
        });
        console.log("Produto editado com sucesso!");
        alert("Produto editado com sucesso!");
    }
</script>

{#if produto}
    <!-- content here -->
    <Modal bind:showModal>
        <h1 slot="header">Editar Produto</h1>
        <div class="inputs-produto">
            <input type="text" bind:value={input.nome} placeholder="Nome" />
            <textarea bind:value={input.descricao} placeholder="Descricao" cols="30" rows="5"></textarea>
            
            <!-- <input
                type="text"
                bind:value={input.descricao}
                placeholder="Descrição"
            /> -->
            <div class="flex">
                <p>Preco:</p>
                <input
                    type="number"
                    bind:value={input.preco}
                    placeholder="Preço"
                />
            </div>
            <input type="text" bind:value={input.imagem} placeholder="Imagem" />
            <input
                type="text"
                bind:value={input.categoria}
                placeholder="Categoria"
            />
            <input
                type="text"
                bind:value={input.subcategoria}
                placeholder="Comida ou Bebida"
            />
        </div>

        <button
            class="confirmar"
            disabled={false}
            on:click={() => {
                showModal = false;
                editar_produto();
            }}
        >
            Salvar
        </button>
    </Modal>
{/if}

<Cardapio on:produto_selecionado={selecionar_produto} />

<style>
    .inputs-produto {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    /**centered button*/
    .confirmar{
        

        background-color: green;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        color: white;


    }

    .flex {
        display: flex;
    }
</style>
