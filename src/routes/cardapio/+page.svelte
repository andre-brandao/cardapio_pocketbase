<script lang="ts">
    import Cardapio from "$lib/Cardapio.svelte";
    import BigCardProduto from "$lib/cards/BigCardProduto.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { currentUser, pb } from "$lib/pocketbase";
    import type { ProdutosPousadaResponse } from "$lib/pocketbase-types";

    let produto: ProdutosPousadaResponse;
    async function selecionar_produto(event: {
        detail: ProdutosPousadaResponse;
    }) {
        produto = event.detail;
        showModal = true;
    }
    let showModal = false;


</script>

<Cardapio on:produto_selecionado={selecionar_produto} />

{#if produto}
    <!-- content here -->
    <Modal bind:showModal>
        <h2 slot="header">Produto</h2>
        <BigCardProduto
            produto={produto}
        />
    </Modal>
    
{/if}
