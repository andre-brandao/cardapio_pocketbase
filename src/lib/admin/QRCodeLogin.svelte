<script>
    // @ts-nocheck
    
    export let value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    
    import Modal from "$lib/components/Modal.svelte";

    let showModal = false;

    // export let identificador: string;


  import { onMount } from 'svelte';
  import { default as QrCode } from 'qrious';

  const QRcode = new QrCode();

  export let errorCorrection = "L";
  export let background = "#fff";
  export let color = "#000";
  export let size = "300";
  export let padding = 5;
  export let className = "qrcode";

  let image = '';

  function generateQrCode() {
    QRcode.set({
      background,
      foreground: color,
      level: errorCorrection,
      padding,
      size,
      value,
    });
    
    image = QRcode.toDataURL('image/jpeg');
  }
  
  export function getImage() {
      return image;
  }

  $: {
    if(value) {
      generateQrCode();
    }
  }

  onMount(() => {
    generateQrCode();
  });

</script>


<button on:click={() => (showModal = true)}> Mostrar QRCode</button>

<Modal bind:showModal>
    <h2 slot="header">QRCode</h2>
    <img src={image} alt={value} class={className}/>
</Modal>
