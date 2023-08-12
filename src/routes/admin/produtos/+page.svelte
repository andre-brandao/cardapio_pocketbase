<script lang="ts">
    import ProdutosAdmin from "$lib/admin/ProdutosAdmin.svelte";
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
        acao = "editar";
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

    let acao = "";

    async function editar_produto() {

        //update
        if (acao == "editar") {
            const id = produto.id;
    
            pb.collection("produtos_pousada").update(id, {
                subcategoria: input.subcategoria,
                categoria: input.categoria,
                nome: input.nome,
                descricao: input.descricao,
                preco: input.preco,
            });
            console.log("Produto editado com sucesso!");
            // alert("Produto editado com sucesso!");

        //create
        } else {
            const data = {
                subcategoria: input.subcategoria,
                categoria: input.categoria,
                nome: input.nome,
                descricao: input.descricao,
                preco: input.preco,
            };
            pb.collection("produtos_pousada").create(data);
            console.log("Produto criado com sucesso!");
        
        }

    }

    function cadastrar_produto() {
        acao = "cadastrar";
        input = {
            subcategoria: "",
            categoria: "",
            nome: "",
            descricao: "",
            preco: 0,
            imagem: "",
        };
        showModal = true;
    }
</script>

<Modal
    bind:showModal
    button_text="Salvar"
    on:confirm={() => {
        showModal = false;
        editar_produto();
    }}
>
    <h1 slot="header">Editar Produto</h1>
    <div class="inputs-produto">
        <input type="text" bind:value={input.nome} placeholder="Nome" />
        <textarea
            bind:value={input.descricao}
            placeholder="Descricao"
            cols="30"
            rows="5"
        />

        <!-- <input
                type="text"
                bind:value={input.descricao}
                placeholder="Descrição"
            /> -->
        <div class="flex">
            <label for="preco">Preco R$</label>
            <input id="preco" type="number" bind:value={input.preco} placeholder="Preço" />
        </div>

        <div class="flex">
            <label for="foto">Imagem  </label>
            <input id="foto" type="file" bind:value={input.imagem} placeholder="Imagem" />
        </div>
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
</Modal>

<ProdutosAdmin
    on:cadastrar_novo_produto={cadastrar_produto}
    on:produto_selecionado={selecionar_produto}
/>

<style>
    .inputs-produto {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    /**centered button*/
    input{
        font-size: 15px;
    }
</style>
