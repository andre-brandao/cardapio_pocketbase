<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let tabs = new Array();
    export let activeTab = "";
</script>

<div class="tabs">
    <ul>
        {#each tabs as tab}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
                class:active={tab === activeTab}
                on:click={() => dispatch("tabChange", tab)}
            >
                {tab}
            </li>
        {/each}
    </ul>
</div>

<style>
    

    /* .tabs{
        border: 1px solid #ccc;
        border-radius: 5px;
    } */

    ul {
          border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }

    li {
        margin: 0 10px;
        font-size: 18px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
    }
    .active {
        /* color: #6D99CD; */
        /* color: #ff0000; */
        background-color: #ccc;
    }
</style>
