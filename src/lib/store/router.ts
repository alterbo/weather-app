import { writable } from 'svelte/store';
import { locations } from '../components/location/locations';

export const DEFAULT_LOCATION = 'center' as const;

export type RouteView = 'today' | 'week' | 'location';
export type Route = { view: RouteView; locationId: string };

const isKnownLocation = (locationId: string) =>
	locations.some((l) => l.url === locationId);

const normalizePathname = (pathname: string) => {
	if (!pathname) return '/';
	return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

const parseRoute = (pathname: string): Route => {
	const parts = normalizePathname(pathname).split('/').filter(Boolean);
	const first = parts[0] ?? '';

	if (first === 'today' || first === 'week') {
		const locationId = parts[1] ?? DEFAULT_LOCATION;
		return { view: first, locationId: locationId || DEFAULT_LOCATION };
	}

	const locationId = first || DEFAULT_LOCATION;
	return { view: 'location', locationId };
};

const coerceRoute = (candidate: Route): Route => {
	const locationId = isKnownLocation(candidate.locationId)
		? candidate.locationId
		: DEFAULT_LOCATION;
	return { ...candidate, locationId };
};

const buildPathname = (r: Route) => {
	if (r.view === 'today' || r.view === 'week') return `/${r.view}/${r.locationId}`;
	return `/${r.locationId}`;
};

const coercePathname = (rawPathname: string) => {
	const parsed = parseRoute(rawPathname);
	const route = coerceRoute(parsed);
	const pathname = buildPathname(route);
	return { pathname, route };
};

export const route = writable<Route>({ view: 'location', locationId: DEFAULT_LOCATION });
export const pathname = writable<string>(`/${DEFAULT_LOCATION}`);

const isBrowser = () => typeof window !== 'undefined';

let started = false;
let stopListening: (() => void) | undefined;

const applyUrl = (url: URL, mode: 'push' | 'replace') => {
	const { pathname: nextPathname, route: nextRoute } = coercePathname(url.pathname);
	const nextHref = `${nextPathname}${url.search}${url.hash}`;
	const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

	if (nextHref !== currentHref) {
		if (mode === 'replace') window.history.replaceState(null, '', nextHref);
		else window.history.pushState(null, '', nextHref);
	}

	pathname.set(nextPathname);
	route.set(nextRoute);
};

const syncFromLocation = () => {
	const url = new URL(window.location.href);
	applyUrl(url, 'replace');
};

export const startRouter = () => {
	if (!isBrowser()) return () => {};
	if (started) return stopListening ?? (() => {});

	started = true;
	syncFromLocation();

	const onPopState = () => syncFromLocation();
	window.addEventListener('popstate', onPopState);

	stopListening = () => {
		window.removeEventListener('popstate', onPopState);
		started = false;
		stopListening = undefined;
	};

	return stopListening;
};

export const navigate = (href: string, options?: { replace?: boolean }) => {
	if (!isBrowser()) return;

	const replace = options?.replace ?? false;
	const url = new URL(href, window.location.origin);
	if (url.origin !== window.location.origin) {
		window.location.assign(url.href);
		return;
	}

	applyUrl(url, replace ? 'replace' : 'push');
};

const isPlainLeftClick = (event: MouseEvent) =>
	event.button === 0 &&
	!event.metaKey &&
	!event.ctrlKey &&
	!event.shiftKey &&
	!event.altKey;

export const navigateLink = (event: MouseEvent, href: string) => {
	if (event.defaultPrevented) return;
	if (!isPlainLeftClick(event)) return;

	event.preventDefault();
	navigate(href);
};
