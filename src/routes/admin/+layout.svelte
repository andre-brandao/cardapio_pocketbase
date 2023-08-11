<script lang="ts">

</script>

<nav>
	<a href="/admin/pedidos"> Ultimos Pedidos</a>
	<a href="/admin/comandas">Comandas</a>
</nav>

<slot/>

<style>
    nav{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-bottom: 1rem;
    }

    nav > a {
        font-size: 30px;
    }
</style>