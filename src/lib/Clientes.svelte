<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import type { UsersResponse } from "./pocketbase-types";

    let clientes: UsersResponse[] = [];

    async function getClientes(){
        const response = await pb.collection("users").getFullList<UsersResponse>(300, {
            // filter: `role = "cliente"`,
        });

        return response;
    }

    onMount(async () => {
        clientes = await getClientes();
    });

</script>

<main>

    {#each clientes as cliente}
        <div class="cliente">
            <h3>{cliente.username}</h3>
        </div>
    {/each}
</main>