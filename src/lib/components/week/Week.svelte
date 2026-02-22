<script lang="ts">
	import styles from './Week.module.css';
	import { locations } from '../location/locations';
	import { apiKey, baseURL } from '../../../lib/api/api';
	import type { DailyForecast, Forecast, ForecastApiResponse } from '../../../lib/types/forecast';
	import Bevel from '../layout/Bevel.svelte';
	import DayImage from '../layout/DayImage.svelte';
	import { route } from '../../store/router';

	let week: Forecast[] = [];

	$: locationId = $route.locationId;
	$: location = locations.find((l) => l.url === locationId);
	$: lat = location?.lat;
	$: lon = location?.lon;

	const fetchWeek = async (latitude: number, longitude: number) => {
		if (!apiKey) return;
		const response = await fetch(
			`${baseURL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
		);
		const data: ForecastApiResponse = await response.json();
		week = data.list;
	};

	type GroupedDay = { label: string; sortKey: number; forecasts: Forecast[] };

	const groupForecastsByDay = (forecasts: Forecast[]): GroupedDay[] => {
		const grouped = new Map<string, GroupedDay>();

		forecasts?.forEach((forecast) => {
			const date = new Date(forecast.dt * 1000);
			const label = date.toLocaleDateString('es', { weekday: 'long' });
			const existing = grouped.get(label);
			if (existing) {
				existing.forecasts = [...existing.forecasts, forecast];
				return;
			}
			grouped.set(label, { label, sortKey: forecast.dt, forecasts: [forecast] });
		});

		return Array.from(grouped.values()).sort((a, b) => a.sortKey - b.sortKey);
	};

	const getMaxMinTemperature = (forecasts: Forecast[]): [number, number] => {
		let maxTemp = -Infinity;
		let minTemp = Infinity;
		forecasts.forEach((forecast) => {
			const temp = forecast.main.temp;
			if (temp > maxTemp) maxTemp = temp;
			if (temp < minTemp) minTemp = temp;
		});
		return [maxTemp, minTemp];
	};

	const getDominantWeatherConditions = (forecasts: Forecast[]): string[] => {
		const weatherCount = new Map<number, number>();
		forecasts.forEach((forecast) => {
			forecast.weather.forEach((condition) => {
				const count = weatherCount.get(condition.id) || 0;
				weatherCount.set(condition.id, count + 1);
			});
		});
		const sortedWeather = Array.from(weatherCount.entries()).sort((a, b) => b[1] - a[1]);
		return sortedWeather.slice(0, 3).map(([weatherId]) => weatherId.toString());
	};

	$: groupedDays = groupForecastsByDay(week);
	$: dailyForecasts = groupedDays.map((day): DailyForecast => {
		const [maxTemp, minTemp] = getMaxMinTemperature(day.forecasts);
		const dominantWeather = getDominantWeatherConditions(day.forecasts);
		return { date: day.label, maxTemp, minTemp, dominantWeather };
	});

	let lastFetchKey = '';
	$: {
		const key = lat != null && lon != null ? `${lat},${lon}` : '';
		if (key && key !== lastFetchKey) {
			lastFetchKey = key;
			fetchWeek(lat!, lon!);
		}
	}
</script>

{#if location}
	<div class={styles.week}>
		<h1 class={styles.title}>Week in {location.label ?? ''}</h1>
		<ul class={styles.list}>
			{#each dailyForecasts as day (day.date)}
				<li class={styles.item}>
					<div class={styles.frame}>
						<Bevel match={true} />
						<div class={styles.weather}>
							{#each day.dominantWeather as weather, index (index)}
								<DayImage name={weather} />
							{/each}
						</div>
					</div>
					<div class={styles.content}>
						<h2 class={styles.date}>{day.date}</h2>
						<div class={styles.info}>
							<p class={styles.values}>
								<span>{day.minTemp}&#176;</span>
								<span>{day.maxTemp}&#176;</span>
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/if}
