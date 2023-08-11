<script>
    export let produto = '';
    export let cliente = '';
    export let status = '';
    export let created = '';
    export let local_consumo = '';

    $: formatedDate = new Date(created).toLocaleString('pt-BR', { timeZone: 'UTC' }).split(' ')[1];
</script>




<main>

    <div class="flex">
        <h3>{cliente} {local_consumo}</h3>
        <h3>{formatedDate}</h3>

    </div>
    <h3>{produto}</h3>
    <h1 class={status}>{status}</h1>
</main>

<style>

    .flex{
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
    }



    .Pendente{
        color: red;
    }
    .Confirmado{
        color: green;
    }
    .Cancelado{
        color: gray;
    }
    .Preparando{
        color: orange;
    }
</style>