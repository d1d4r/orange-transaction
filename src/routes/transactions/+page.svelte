<script lang="ts">
	import { columns } from '$lib/components/transactions/columns.js';
	import DataTable from '$lib/components/ui/data-table.svelte';

	let { data } = $props();
	console.log('🚀 ~ data:', data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<DataTable data={data.transactions} {columns} />
