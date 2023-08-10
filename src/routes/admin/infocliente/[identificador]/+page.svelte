<script lang="ts">
    import CardPedidos from "$lib/cards/CardPedidos.svelte";
    import { pb } from "$lib/pocketbase";
    import type {
        UsersResponse,
        PedidosPousadaResponse,
    } from "$lib/pocketbase-types";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    let cliente: UsersResponse;
    let pedidos: string | any[] = [];

    async function getCliente() {
        const cliente_id = data.identificador;
    }

    async function getPedidosCliente() {
        const cliente_id = data.identificador;
        const response_cliente = await pb
            .collection("users")
            .getOne<UsersResponse>(cliente_id);

        cliente = response_cliente;
        const response = await pb
            .collection("pedidos_pousada")
            .getFullList(300, {
                // @ts-ignore
                filter: `cliente = "${cliente.id}"`,
                expand: "cliente, produto",
                sort: "-created",
            });

        const results = response.map((pedido) => {
            return {
                id: pedido.id,
                //@ts-ignore
                produto: pedido.expand?.produto.nome,
                //@ts-ignore
                cliente: pedido.expand?.cliente.username,
                status: pedido.status,
                created: pedido.created,
                local_consumo:pedido.local_consumo,
            };
        });

        return results;
    }

    onMount(async () => {
        // cliente = await getCliente();
        pedidos = await getPedidosCliente();
    });
</script>

{#if cliente && pedidos.length > 0}
    <main>
        <div class="info-cliente">
            <h1>Cliente: {cliente.username}</h1>
            <h2>Pedidos</h2>
        </div>
        <div class="wrap-pedidos">
            {#each pedidos ?? [] as pedido}
                <div class="pedido">
                    <!-- <p>Produto: {pedido.produto}</p> -->
                    <CardPedidos
                    created={pedido.created}
                    produto={pedido.produto}
                    local_consumo={pedido.local_consumo}
                    />
                </div>
            {/each}
        </div>
    </main>
{/if}


<style>

    .wrap-pedidos{
        display: grid;
        gap: 1em;
    }

    .pedido{
        background-color: blue;
    }
</style>
