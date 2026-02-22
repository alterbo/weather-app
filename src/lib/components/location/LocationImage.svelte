<script lang="ts">
	import styles from './Location.module.css';

	import Beach from './Beach.svelte';
	import Center from './Center.svelte';
	import Mountain from './Mountain.svelte';

	export let name: string;

	$: LocationComponent =
		name === 'beach' ? Beach : name === 'center' ? Center : name === 'mountain' ? Mountain : null;
</script>

<svg
	class={styles.image}
	preserveAspectRatio="xMinYMid slice"
	viewBox="0 0 844 390"
	xmlns="http://www.w3.org/2000/svg"
>
	{#if LocationComponent}
		<svelte:component this={LocationComponent} />
	{/if}
</svg>
