<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import type { UsersResponse } from "./pocketbase-types";
    import Modal from "./components/Modal.svelte";

    let clientes: UsersResponse[] = [];

    async function getClientes() {
        const response = await pb
            .collection("users")
            .getFullList<UsersResponse>(300, {
                // filter: `role = "cliente"`,
            });

        return response;
    }

    onMount(async () => {
        clientes = await getClientes();
    });

    let showModalCriarCliente = false;
    let nomeCliente = "";
    let unidadeCliente = "";
    let observacaoCliente = "";
    async function novo_cliente() {
        try {
            const data = {
                username: nomeCliente,
                password: nomeCliente + nomeCliente,
                passwordConfirm: nomeCliente + nomeCliente,
                name: nomeCliente,

                unidade: unidadeCliente,
                observacao: observacaoCliente,
            };
            const createdUser = await pb.collection("users").create(data);
        } catch (error) {}

        clientes = await getClientes();
    }
</script>

<main>
    <div class="wrap-clientes">
        <button
            on:click={() => (showModalCriarCliente = true)}
            class="criar-cliente">Cadastrar Cliente</button
        >
        {#each clientes as cliente}
            <a href="/admin/infocliente/{cliente.id}">
                <h3>{cliente.username}  {cliente.unidade}</h3>
                <p>OBS: {cliente.observacao}</p>
            </a>
        {/each}
    </div>
</main>

<Modal bind:showModal={showModalCriarCliente}>
    <h1 slot="header">Cadastrar Cliente</h1>
    <div class="flex">
        <input type="text" placeholder="username" bind:value={nomeCliente} />
        <input type="text" placeholder="unidade" bind:value={unidadeCliente} />
        <input
            type="text"
            placeholder="observacao (opcional)"
            bind:value={observacaoCliente}
        />
        <button on:click={novo_cliente}>Cadastrar</button>
    </div>
</Modal>

<style>
    .criar-cliente {
        background-color: rgb(107, 107, 107);
        min-height: 55px;
    }
    .wrap-clientes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }
    .flex{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    a {
        color: white;
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #131313;
        cursor: pointer;
        transition: border-color 0.25s;
        padding-left: 15px;
    }
</style>
