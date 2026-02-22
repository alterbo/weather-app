<script lang="ts">
	import styles from '../week/Week.module.css';

	import Atmosphere from '../weather-conditions/Atmosphere.svelte';
	import Clear from '../weather-conditions/Clear.svelte';
	import Clouds from '../weather-conditions/Clouds.svelte';
	import Drizzle from '../weather-conditions/Drizzle.svelte';
	import Rain from '../weather-conditions/Rain.svelte';
	import Snow from '../weather-conditions/Snow.svelte';
	import Thunderstorm from '../weather-conditions/Thunderstorm.svelte';

	export let name: string;

	$: id = Number(name);
	$: Condition =
		id >= 200 && id < 300
			? Thunderstorm
			: id >= 300 && id < 400
				? Drizzle
				: id >= 500 && id < 600
					? Rain
					: id >= 600 && id < 700
						? Snow
						: id >= 700 && id < 800
							? Atmosphere
							: id === 800
								? Clear
								: id >= 801 && id <= 804
									? Clouds
									: null;
</script>

<svg class={styles.image} viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
	{#if Condition}
		<svelte:component this={Condition} />
	{/if}
</svg>
