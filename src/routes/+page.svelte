<script>
    import Login from "../components/Login.svelte";
import Header from "../components/UI/Header.svelte";

    let userLoggedIn = false;
</script>

<main>
    <Header/>

    {#if userLoggedIn}
        <p>User logged in!</p>
    {:else}
        <Login/>
    {/if}

</main>