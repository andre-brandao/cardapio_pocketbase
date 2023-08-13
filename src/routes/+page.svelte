<script>
    import Pedidos from "$lib/Pedidos.svelte";
    import { pb } from "$lib/pocketbase";

    let cliente = '';
    /**
     * @param {{ detail: any; }} event
     */
    async function selecionar_pedido(event) {
        let pedido = await pb.collection("pedidos_pousada").getOne(event.detail.id,{
            expand: "cliente",
        });

        // cliente = pedido.expand?.cliente.id;
        console.log(pedido);
        if(pedido.status === "pendente") {
            pb.collection("pedidos_pousada").update(pedido.id, {
                status: "confirmado",
            });
        } else if(pedido.status === "confirmado") {
            pb.collection("pedidos_pousada").update(pedido.id, {
                status: "entregue",
            });
        }else{
            pb.collection("pedidos_pousada").update(pedido.id, {
                status: "pendente",
            });
        }

    }
</script>


<Pedidos on:pedido_selecionado={selecionar_pedido}/>
