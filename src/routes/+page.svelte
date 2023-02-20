<script>
	import { onMount, beforeUpdate } from 'svelte';
	import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';
	import Login from '../components/Login.svelte';
	import Header from '../components/UI/Header.svelte';
    import Error from '../components/UI/Error.svelte';
    import ApartmentDetails from '../components/ApartmentDetails.svelte';

	let userLoggedIn = false;
    let userName = "Anonymous";
    let userRoles = [];
	let isLoading = true;
    let isError = false;
    let errorMessage = "";

    function validateLocalToken() {
        let token = localStorage.getItem('jwt');
		if (token != null) {
			fetch('http://localhost:8091/api/auth/valid', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				}
			})
				.then((res) => {
					if (res.status == 204) {
                        isLoading = false;
						userLoggedIn = true;
                        userName = localStorage.getItem("userName")
                        userRoles = localStorage.getItem("userRoles")
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
    }

    function handleLoginStarted() {
        isLoading = true;
    }

	onMount(validateLocalToken);
    beforeUpdate(() => {console.log("Before update")});
</script>

<main>
	<Header />

	{#if isLoading && !isError}
		<LoadingSpinner />
	{:else if userLoggedIn && !isError}
		<ApartmentDetails user={userName} roles={userRoles}/>
	{:else if !userLoggedIn && !isError}
		<Login on:loginFinished = {validateLocalToken} on:loginStarted = {handleLoginStarted}/>
    {:else if isError}
        <Error message={errorMessage} />
	{/if}
</main>
