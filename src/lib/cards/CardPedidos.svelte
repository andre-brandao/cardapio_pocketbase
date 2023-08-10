<script>
    export let produto = '';
    export let cliente = '';
    export let status = '';
    export let created = '';
    export let local_consumo = '';

    $: formatedDate = new Date(created).toLocaleString('pt-BR', { timeZone: 'UTC' }).split(' ')[1];
</script>




<main>
    <h3>{formatedDate}</h3>
    <h1>{produto}</h1>
    <h1>{cliente}</h1>
    <h1 class={status}>{status}</h1>
</main>

<style>



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