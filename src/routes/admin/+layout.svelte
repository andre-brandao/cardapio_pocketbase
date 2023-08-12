<script lang="ts">

</script>

<nav>
	<a href="/admin/pedidos"> Ultimos Pedidos</a>
	<a href="/admin/comandas">Comandas</a>
    <a href="/admin/produtos">Produtos</a>
</nav>

<slot/>

<style>
    nav{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    nav > a {
        font-size: 30px;
        text-decoration: none;
        color: #000;
        border: 1px solid #ccc;
        /* border-radius: 5px; */

}
</style>