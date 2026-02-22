<script lang="ts">
	import styles from './Today.module.css';

	import DayImage from '../layout/DayImage.svelte';
	import Bevel from '../layout/Bevel.svelte';

	import { locations } from '../location/locations';
	import { apiKey, baseURL } from '../../../lib/api/api';
	import type { Today as TodayModel, TodayApiResponse } from '../../types/today';
	import { route } from '../../store/router';

	let today: TodayModel | undefined;
	let loading = false;
	let error: string | undefined;

	$: locationId = $route.locationId;
	$: location = locations.find((l) => l.url === locationId);
	$: lat = location?.lat;
	$: lon = location?.lon;

	const fetchToday = async (latitude: number, longitude: number) => {
		if (!apiKey) {
			error = 'Missing VITE_OPENWEATHER_API_KEY';
			return;
		}

		loading = true;
		error = undefined;
		try {
			const response = await fetch(
				`${baseURL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
			);
			const data: TodayApiResponse = await response.json();
			today = data;
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	};

	let lastFetchKey = '';
	$: {
		const key = lat != null && lon != null ? `${lat},${lon}` : '';
		if (key && key !== lastFetchKey) {
			lastFetchKey = key;
			fetchToday(lat!, lon!);
		}
	}
</script>

{#if location}
	<div class={styles.today}>
		<h1 class={styles.title}>Now in {location.label ?? ''}</h1>
		<div class={styles.container}>
			<div class={styles.bg}>
				<DayImage name={today?.weather?.[0]?.id?.toString() ?? ''} />
			</div>
			<div class={styles.frame}>
				<Bevel match={true} />
				<div class={styles.secondary}>
					<span>{today?.main.temp_min}º</span>
				</div>
				<div class={styles.main}>
					<span>{today?.main.temp}º</span>
				</div>
				<div class={styles.tertiary}>
					<span>{today?.main.temp_max}º</span>
				</div>
			</div>
		</div>
	</div>
{/if}
