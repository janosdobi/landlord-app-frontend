<script>
	import { onMount, onDestroy } from 'svelte';
	import { each } from 'svelte/internal';
	import { aggregatedCostsStore } from './cost-store';
	export let user;
	export let roles;

	// Set the initial component state to the current store value
	let aggregatedCosts = [];

	// Subscribe to the store to get updates
	const unsubscribe = aggregatedCostsStore.subscribe((value) => {
		// Update the component state when the store changes
		aggregatedCosts = value;
	});

	const formatDate = (date) => 
		date
			.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
			.replace(/\//g, '-');
	

	// Unsubscribe from the store when the component is destroyed
	onDestroy(unsubscribe);

	function fetchCosts() {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};

		fetch(`${import.meta.env.VITE_BACKEND_URL}/1/cost?s=2022-11-01&e=2023-05-30`, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				const newAggregatedCosts1 = {
					costs: new Map([
						['electricity', 3500.0],
						['internet', 3500.0],
						['gas', 3500.0]
					]),
					startDate: new Date(2023, 0, 1),
					endDate: new Date(2023, 0, 31),
					invoiceFiles: new Set(['file1.pdf', 'file2.pdf'])
				};

				const newAggregatedCosts2 = {
					costs: new Map([
						['electricity', 3500.0],
						['internet', 3500.0],
						['gas', 3500.0]
					]),
					startDate: new Date(2023, 1, 1),
					endDate: new Date(2023, 1, 28),
					invoiceFiles: new Set(['file1.pdf', 'file2.pdf'])
				};

				// Update the store by replacing the first object in the array
				aggregatedCostsStore.update(items => {
					return [newAggregatedCosts1, newAggregatedCosts2, ...items];
				});
			})
			.catch((error) => console.log('error', error));
	}

	onMount(fetchCosts);
</script>

<article>
	<header>
		<h1>
			Hello {user}! Here are the costs occurred in the past couple of months:
		</h1>
	</header>
	<div class="content">
		<table>
			<thead>
				<tr>
					{#each aggregatedCosts as aggregatedCost}
						<th
							>{`${formatDate(aggregatedCost.startDate)} - ${formatDate(
								aggregatedCost.endDate
							)}`}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
					<tr>
						{#each aggregatedCosts as aggregatedCost}
						<td>
							{aggregatedCost.invoiceFiles}
						</td>
						{/each}
					</tr>

					<!-- <ul>
								{#each Array.from(aggregatedCost.costs) as [category, amount]}
									<li>{`${category}: ${amount.toFixed(2)}`}</li>
								{/each}
							</ul> -->
					<!-- <div>
								Invoice Files:
								<ul>
									{#each aggregatedCost.invoiceFiles as file}
										<li>
											<a href={file}>{file}</a>
										</li>
									{/each}
								</ul>
							</div> -->
			</tbody>
		</table>
	</div>
</article>

<style>
	article {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
		margin-top: 4rem;
		margin-bottom: 1rem;
		width: 100%;
		height: 100vh;
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

	table {
		border-collapse: collapse;
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #ddd;
	}
</style>
