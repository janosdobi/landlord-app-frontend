<script>
	import { createEventDispatcher } from 'svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';
	import Modal from './UI/Modal.svelte';

	let name = '';
	let password = '';
	let unauthorized = false;

	const dispatch = createEventDispatcher();

	//TODO validation
	$: nameValid = true;
	$: pwdValid = true;
	$: formIsValid = nameValid && pwdValid;

	function submitForm() {
		const loginRequestBody = {
			username: name,
			password: password
		};

		fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(loginRequestBody),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => {
				if (res.status == 403 || res.status == 401) {
					unauthorized = true;
				} else if (res.status >= 500) {
					dispatch('loginFail');
				} else if (res.ok) {
					return res.text()
				}
			})
			.then((responseBody) => {
				const responseJSON = JSON.parse(responseBody);
				localStorage.setItem('jwt', responseJSON.access_token);
				localStorage.setItem('userName', responseJSON.username);
				localStorage.setItem('userRoles', responseJSON.roles);
				dispatch('loginSuccess');
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<Modal title="Please log in!">
	<form on:submit|preventDefault={submitForm}>
		<TextInput
			id="username"
			label="Username"
			valid={nameValid}
			validityMessage="Please enter a valid username."
			value={name}
			on:input={(event) => (name = event.target.value)}
		/>
		<TextInput
			id="password"
			label="Password"
			type="password"
			valid={pwdValid}
			validityMessage="Please enter a valid password."
			value={password}
			on:input={(event) => (password = event.target.value)}
		/>
	</form>
	<div slot="footer">
		<Button type="button" on:click={submitForm} disabled={!formIsValid}>Log in</Button>
	</div>
	{#if unauthorized}
		<div><p>Incorrect login details!</p></div>
	{/if}
</Modal>

<style>
	form {
		width: 100%;
	}
	p {
		color: red;
	}
</style>
