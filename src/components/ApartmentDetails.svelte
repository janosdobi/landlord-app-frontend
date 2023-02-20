<script>
    export let user;
    export let roles;
</script>

<article>
	<header>
		<h1>
			Hello {user}! you have the following roles: {roles}
		</h1>
		<h2>subtttitle</h2>
		<p>adddress</p>
	</header>
	<div class="content">
		<p>"testing..."</p>
	</div>
</article>

<style>
	article {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
        margin-top: 5rem;
		margin-bottom: 1rem;
	}

	header,
	.content {
		padding: 1rem;
	}

	h1 {
		font-size: 1.25rem;
		margin: 0.5rem 0;
		font-family: 'Roboto Slab', sans-serif;
	}

	h2 {
		font-size: 1rem;
		color: #808080;
		margin: 0.5rem 0;
	}

	p {
		font-size: 1.25rem;
		margin: 0;
	}

	div {
		text-align: right;
	}

	.content {
		height: 4rem;
	}
</style>
