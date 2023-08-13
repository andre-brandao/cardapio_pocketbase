<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { currentUser, pb } from "$lib/pocketbase";
    import Cardapio from "$lib/Cardapio.svelte";
    import type { ProdutosPousadaResponse } from "$lib/pocketbase-types";
    import Modal from "$lib/components/Modal.svelte";
    import BigCardProduto from "$lib/cards/BigCardProduto.svelte";

    export let data: PageData;

    async function login_by_identificador() {
        try {
            const user = await pb
                .collection("users")
                .authWithPassword(
                    data.identificador,
                    data.identificador + data.identificador
                );
        } catch (error) {
            alert("Usuário não encontrado");
        }
    }

    onMount(async () => {
        login_by_identificador();
    });

    // for modal
    let produto: ProdutosPousadaResponse;
    async function selecionar_produto(event: {
        detail: ProdutosPousadaResponse;
    }) {
        produto = event.detail;
        showModal = true;
    }
    let showModal = false;

    function novo_pedido() {
        const data = {
            // @ts-ignore
            cliente: $currentUser.id,
            produto: produto.id,
            status: "Pendente",
            local_consumo: localConsumo,
        };
        localConsumo = "";
        pb.collection("pedidos_pousada").create(data);
        console.log("pedido criado");
        alert("Pedido criado com sucesso");
    }

    let localConsumo = "";
</script>

<Cardapio on:produto_selecionado={selecionar_produto} />

{#if produto}
    <!-- content here -->
    <Modal bind:showModal>
        <h2 slot="header">Produto</h2>
        <BigCardProduto {produto} />
        <div class="local-consumo">
            <h3>Onde vai ser consumido o Pedido</h3>
            <label>
                <input
                    class="radio"
                    type="radio"
                    bind:group={localConsumo}
                    value="Restaurante"
                />
                Restaurante
            </label>
            <label>
                <input
                    class="radio"
                    type="radio"
                    bind:group={localConsumo}
                    value="Quarto"
                />
                Quarto
            </label>
            <label>
                <input
                    class="radio"
                    type="radio"
                    bind:group={localConsumo}
                    value="Frigobar"
                />
                Frigobar
            </label>
        </div>
        <button
            class="confirmar"
            disabled={localConsumo.length === 0}
            on:click={novo_pedido}
        >
            Confirmar Pedido
        </button>
    </Modal>
{/if}

<style>
    /** confirmar is centered*/
    .confirmar {
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        font-size: 1.2rem;
        margin-top: 10px;

        display: block;
        margin: 0 auto;
    }

    .local-consumo {
        padding-bottom: 15px;
    }
    
    /**make the radio bigger*/
    .radio {

        transform: scale(1.5);
        margin-right: 10px;
    }


</style>
