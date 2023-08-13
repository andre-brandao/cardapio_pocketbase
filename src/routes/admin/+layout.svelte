<script lang="ts">
</script>

<nav>
    <a href="/admin/pedidos"> Ultimos Pedidos</a>
    <a href="/admin/comandas">Comandas</a>
    <a href="/admin/produtos">Produtos</a>
</nav>

<slot />

<style>
    nav {
        display: flex;
        justify-content: space-around;
        padding: 5px;
        overflow-y: scroll;


    }

    nav > a {
        font-size: 20px;
        text-decoration: none;
        color: #000;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
