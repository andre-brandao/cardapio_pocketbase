<script>
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import CardPedidos from "./cards/CardPedidos.svelte";

    export let cliente = "";

    const dispatch = createEventDispatcher();

    /**
     * @type {{ id: string; 
    //@ts-ignore
    produto: any; 
    //@ts-ignore
    cliente: any; status: any; created: string; }[]}
     */
    let pedidos = [];

    async function getPedidos() {
        const date = new Date().toISOString().split("T")[0] + " 00:00:00";

        if (cliente.length === 0) {
            // @ts-ignore
            cliente = $currentUser.id;
        }

        const response = await pb
            .collection("pedidos_pousada")
            .getFullList(300, {
                // @ts-ignore
                filter: `cliente = "${cliente}" && created >= "${date}"`,
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
</script>

<main>
    <div class="wrap-pedidos">
        {#each pedidos ?? [] as pedido}
            <button
                class="but-pedido"
                on:click={() => {
                    dispatch("pedido_selecionado", pedido);
                }}
            >
                <CardPedidos
                    produto={pedido.produto}
                    cliente={pedido.cliente}
                    status={pedido.status}
                    created={pedido.created}
                />
            </button>
        {/each}
    </div>
</main>

<style>
    .wrap-pedidos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
    }
</style>
