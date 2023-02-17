<script>
    import Modal from './Modal.svelte';

    export let message;
</script>

<Modal title="An error occurred!" on:cancel>
    <p>{(message.length == 0) ? "We do not know any details, sorry" : message}</p>
</Modal>