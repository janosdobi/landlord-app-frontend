<script>
	import { createEventDispatcher } from 'svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';
	import Modal from './UI/Modal.svelte';

	let name = '';
	let password = '';

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

		// if (id) {
		//   fetch(`https://svelte-course.firebaseio.com/meetups/${id}.json`, {
		//     method: "PATCH",
		//     body: JSON.stringify(meetupData),
		//     headers: { "Content-Type": "application/json" }
		//   })
		//     .then(res => {
		//       if (!res.ok) {
		//         throw new Error("An error occurred, please try again!");
		//       }
		//       meetups.updateMeetup(id, meetupData);
		//     })
		//     .catch(err => {
		//       console.log(err);
		//     });
		// } else {
		//   fetch("https://svelte-course.firebaseio.com/meetups.json", {
		//     method: "POST",
		//     body: JSON.stringify({ ...meetupData, isFavorite: false }),
		//     headers: { "Content-Type": "application/json" }
		//   })
		//     .then(res => {
		//       if (!res.ok) {
		//         throw new Error("An error occurred, please try again!");
		//       }
		//       return res.json();
		//     })
		//     .then(data => {
		//       meetups.addMeetup({
		//         ...meetupData,
		//         isFavorite: false,
		//         id: data.name
		//       });
		//     })
		//     .catch(err => {
		//       console.log(err);
		//     });
		// }
		dispatch('login');
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
</Modal>

<style>
	form {
		width: 100%;
	}
</style>
