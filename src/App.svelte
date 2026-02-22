<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './lib/components/Navbar.svelte';
	import Location from './lib/components/location/Location.svelte';
	import Today from './lib/components/today/Today.svelte';
	import Week from './lib/components/week/Week.svelte';
	import { route, startRouter } from './lib/store/router';

	onMount(() => startRouter());
</script>

<div class="main-container">
	<header class="header">
		<nav class="nav">
			<Navbar />
		</nav>
	</header>

	<main class="content">
		{#if $route.view === 'today'}
			<Today />
		{:else if $route.view === 'week'}
			<Week />
		{:else}
			<Location />
		{/if}
	</main>

	<footer class="footer">
		<p>Weather app de alberto ferrero. 2024</p>
	</footer>
</div>

<style>
	.content {
		display: grid;
		gap: 3rem;
		width: 100%;
	}

	.content,
	.footer,
	.header,
	.nav {
		margin-inline: auto;
		max-width: 1280px;
	}

	.header {
		margin-block: 1rem;
	}

	.content,
	.footer,
	.header {
		padding: 1.25rem;
	}

	.footer,
	.header,
	.nav {
		display: flex;
		width: 100%;
	}

	.nav {
		gap: 1.5rem;
	}
</style>
