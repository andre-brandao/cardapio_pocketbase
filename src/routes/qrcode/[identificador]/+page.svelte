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
            status: "pendente",
        };
        pb.collection("pedidos_pousada").create(data);
        console.log("pedido criado");
    }
</script>

<Cardapio on:produto_selecionado={selecionar_produto} />

{#if produto}
    <!-- content here -->
    <Modal bind:showModal>
        <h2 slot="header">Produto</h2>
        <BigCardProduto {produto} />
        <button on:click={novo_pedido}> Confirmar Pedido </button>
    </Modal>

{/if}
