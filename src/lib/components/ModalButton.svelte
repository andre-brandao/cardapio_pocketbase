<script>
    import { createEventDispatcher } from "svelte";

    export let showModal = false; // boolean
    const dispatch = createEventDispatcher();

    /**
     * @type {HTMLDialogElement}
     */
    let dialog; // HTMLDialogElement
    export let button_text = ""; // string
    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="top-page">
            <slot name="header" />
            <button on:click={() => dialog.close()}>Fechar</button>
        </div>
        <hr />
        <slot />

        {#if button_text.length > 0}
            <button
                on:click={() => {
                    dispatch("confirm");
                    dialog.close();
                }}
            >
                {button_text}
            </button>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
    </div>
</dialog>

<style>
    /**make close button and the header side by side*/
    .top-page {
        display: flex;
        justify-content: space-between;
    }

    .top-page button {
        font-size: 1em;
        background-color: rgb(241, 86, 86);
    }

    dialog {
        max-width: 90%;
        border-radius: 0.5em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
