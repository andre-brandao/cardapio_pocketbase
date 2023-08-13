<script lang="ts">
    import CardPedidos from "$lib/admin/CardPedidosAdmin.svelte";
    import { pb } from "$lib/pocketbase";
    import type {
        UsersResponse,
        PedidosPousadaResponse,
    } from "$lib/pocketbase-types";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import QrCodeLogin from "$lib/admin/QRCodeLogin.svelte";

    export let data: PageData;

    let cliente: UsersResponse;
    let pedidos: any[] = [];

    $: total = pedidos.reduce((acc, pedido) => {
        return acc + pedido.preco;
    }, 0);

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
                preco: pedido.expand?.produto.preco,
                //@ts-ignore
                cliente: pedido.expand?.cliente.username,
                status: pedido.status,
                created: pedido.created,
                local_consumo: pedido.local_consumo,
            };
        });
        console.log(results);
        return results;
    }

    onMount(async () => {
        // cliente = await getCliente();
        pedidos = await getPedidosCliente();
    });

    function deletarPedido(id: string) {
        pb.collection("pedidos_pousada").delete(id);
        pedidos = pedidos.filter((pedido) => pedido.id !== id);
        console.log("pedido cancelado");
    }
</script>

{#if cliente && pedidos.length > 0}
    <main>
        <div class="info-cliente">
            <h1>Cliente: {cliente.username}</h1>
            <QrCodeLogin
                value={"http://localhost:5173/qrcode/" + cliente.username}
            />
            <div class="flex">
                <h2>Pedidos</h2>
                <h2>Total: R${total.toFixed(2)}</h2>
            </div>
        </div>
        <div class="wrap-pedidos">
            {#each pedidos ?? [] as pedido (pedido.id)}
                <div class="pedido">
                    <!-- <p>Produto: {pedido.produto}</p> -->
                    <CardPedidos
                        created={pedido.created}
                        produto={pedido.produto}
                        preco={pedido.preco}
                        local_consumo={pedido.local_consumo}
                    />
                    <button
                        class="cancelar-pedido"
                        on:click={() => deletarPedido(pedido.id)}
                        >🗑️</button
                    >
                </div>
            {/each}
        </div>
    </main>
{/if}

<style>
    .cancelar-pedido {
        background-color: rgb(245, 80, 80);
        margin: 10px;
        padding: 10px;
    }

    .wrap-pedidos {
        display: grid;
        gap: 1em;
    }

    .pedido {
        background-color: rgb(143, 143, 143);
    }

    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>
