<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "../pocketbase";
    import CardPedidos from "./CardPedidosAdmin.svelte";

    export let cliente = "";

    let pedidos: {
        unidade: string;
        id: string;
        //@ts-ignore
        produto: any;
        //@ts-ignore
        cliente: any; status: any; created: string; local_consumo: string;
    }[]= [];

    async function getPedidos() {
        const date = new Date().toISOString().split("T")[0] + " 00:00:00";
        let response;
        if (cliente.length === 0) {
            // @ts-ignore
            response = await pb.collection("pedidos_pousada").getFullList(300, {
                // @ts-ignore
                filter: ` created >= "${date}"`,
                expand: "cliente, produto",
                sort: "-created",
            });
        } else {
            response = await pb.collection("pedidos_pousada").getFullList(300, {
                // @ts-ignore
                filter: `cliente = "${cliente}" && created >= "${date}"`,
                expand: "cliente, produto",
                sort: "-created",
            });
        }

        const results = response.map((pedido) => {


            return {
                id: pedido.id,
                //@ts-ignore
                produto: pedido.expand?.produto.nome,
                //@ts-ignore
                cliente: pedido.expand?.cliente.username,
                //@ts-ignore
                unidade: pedido.expand?.cliente.unidade,
                
                status: pedido.status,
                created: pedido.created,
                local_consumo: pedido.local_consumo,
            };
        });

        return results;
    }

    onMount(async () => {
        pb.collection("pedidos_pousada").subscribe("*", async (e) => {
            pedidos = await getPedidos();
        });
        pedidos = await getPedidos();
    });

    onDestroy(() => {
        pb.collection("pedidos_pousada").unsubscribe();
    });

    function confirmarPedido(id: string) {
        pb.collection("pedidos_pousada").update(id, {
            status: "Entregue",
        });
    }

    function emPreparoPedido(id: string) {
        pb.collection("pedidos_pousada").update(id, {
            status: "Preparando",
        });
    }

    function cancelarPedido(id: string) {
        pb.collection("pedidos_pousada").update(id, {
            status: "Cancelado",
        });
    }
    function deletarPedido(id: string) {
        pb.collection("pedidos_pousada").delete(id);
    }
</script>

<main>
    <div class="wrap-pedidos">
        {#each pedidos ?? [] as pedido}
            <div class="pedido">
                <CardPedidos
                    produto={pedido.produto}
                    cliente={pedido.cliente}
                    unidade={pedido.unidade}
                    status={pedido.status}
                    created={pedido.created}
                    local_consumo={pedido.local_consumo}
                />
                <button
                    class="confirmar"
                    on:click={() => confirmarPedido(pedido.id)}>✅</button
                >
                <button
                    class="em-preparo"
                    on:click={() => emPreparoPedido(pedido.id)}>🍲</button
                >
                <button
                    class="cancelar"
                    on:click={() => cancelarPedido(pedido.id)}>❌</button
                >
                <button
                    class="deletar"
                    on:click={() => deletarPedido(pedido.id)}>🗑️</button
                >
            </div>
        {/each}
    </div>
</main>

<style>
    .wrap-pedidos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
    }

    .pedido {
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #d4d4d4;
        transition: border-color 0.25s;
        padding: 0px 0px 20px 20px;
    }

    .pedido > button {
        font-size: 30px;
    }
</style>
