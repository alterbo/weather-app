import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
	try {
		const { lat, lon, units = 'metric' } = event.queryStringParameters ?? {};

		if (!lat || !lon) {
			return {
				statusCode: 400,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ error: 'lat and lon query parameters are required' }),
			};
		}

		const latNum = parseFloat(lat);
		const lonNum = parseFloat(lon);

		if (isNaN(latNum) || isNaN(lonNum)) {
			return {
				statusCode: 400,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ error: 'lat and lon must be valid numbers' }),
			};
		}

		const apiKey = process.env.OPENWEATHER_API_KEY;
		if (!apiKey) {
			return {
				statusCode: 500,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ error: 'API key not configured' }),
			};
		}

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latNum}&lon=${lonNum}&appid=${apiKey}&units=${encodeURIComponent(units)}`
		);
		const data = await response.json();

		return {
			statusCode: response.status,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: message }),
		};
	}
};
