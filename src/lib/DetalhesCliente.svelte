<script lang="ts">
    import { pb } from "./pocketbase";
    import type { UsersResponse } from "./pocketbase-types";


    export let cliente: UsersResponse;


    async function getPedidosCliente(){
        const result  = pb.collection("pedidos_pousada").getFullList({
            filter: `cliente == ${cliente}`
        });
    }


</script>