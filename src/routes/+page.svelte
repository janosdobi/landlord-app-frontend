<script>
	import { onMount } from 'svelte';
	import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';
	import Login from '../components/Login.svelte';
	import Header from '../components/UI/Header.svelte';
    import Error from '../components/UI/Error.svelte';

	let userLoggedIn = false;
	let isLoading = true;
    let isError = false;
    let errorMessage = "";

	onMount(() => {
		let token = localStorage.getItem('jwt');
		if (token != null) {
			console.log(token);

			fetch('http://localhost:8091/api/auth/valid', {
				headers: {
					'Content-Type': 'application/json',
					'API-KEY': '^i52p3QVxRXFngQf7sW39qC3gp$!SVseXFGj',
					Authorization: 'Bearer ' + token
				}
			})
				.then((res) => {
					if (res.status == 204) {
                        isLoading = false;
						userLoggedIn = true;
					}
				})
				.catch((err) => {
					console.log(err);
                    isError = true;
                    isLoading = false;
				});
		} else {
            isLoading = false;
        }
	});
</script>

<style>
    p {
        padding-top: 3rem;
    }
</style>

<main>
	<Header />

	{#if isLoading && !isError}
		<LoadingSpinner />
	{:else if userLoggedIn && !isError}
		<p>User logged in!</p>
	{:else if !userLoggedIn && !isError}
		<Login />
    {:else if isError}
        <Error message={errorMessage} />
	{/if}
</main>
