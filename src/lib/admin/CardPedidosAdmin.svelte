<script>
    export let produto = "";
    export let unidade = "";
    export let preco = 0;
    export let cliente = "";
    export let status = "";
    export let created = "";
    export let local_consumo = "";

    $: formatedDate = new Date(created)
        .toLocaleString("pt-BR", { timeZone: "UTC" })
        .split(" ")[1];
</script>

<main>
    <div class="flex">
        <h3>{cliente} {unidade}</h3>
        <h3>{formatedDate}</h3>
    </div>
    <div class="flex">
        <h3 class="produto">{produto}</h3>

        {#if preco != 0}
        <h3>R${preco.toFixed(2)}</h3>
        {/if}
        
    </div>
    <h3>Local Consumo: {local_consumo}</h3>
    <h1 class={status}>{status}</h1>
</main>

<style>

    h3{
        margin: 10px 0px;
    }
    .produto{
        font-size: 30px;
    }
    .flex {
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
    }

    .Pendente {
        color: gray;
    }
    .Entregue {
        color: green;
    }
    .Cancelado {
        color: red;
    }
    .Preparando {
        color: orange;
    }
</style>
