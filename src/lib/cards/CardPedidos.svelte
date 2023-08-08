<script>
    export let produto = '';
    export let cliente = '';
    export let status = '';
    export let created = '';

    $: formatedDate = new Date(created).toLocaleString('pt-BR', { timeZone: 'UTC' }).split(' ')[1];
</script>




<main>
    <h3>{formatedDate}</h3>
    <h1>{produto}</h1>
    <h1>{cliente}</h1>
    <h1 class={status}>{status}</h1>
</main>

<style>

    .pendente{
        color: red;
    }
    .confirmado{
        color: green;
    }
    .cancelado{
        color: gray;
    }
</style>