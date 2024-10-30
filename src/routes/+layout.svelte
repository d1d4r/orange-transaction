<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import SidebarPage from '$lib/components/sidebar-page.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="app">
		<main>
			<SidebarPage>
				{@render children()}
			</SidebarPage>
		</main>
	</div>
</ParaglideJS>
