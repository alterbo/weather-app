<script lang="ts">
	import { route, navigateLink } from '../store/router';

	$: locationId = $route.locationId;
	$: locationPath = `/${locationId}`;
	$: weekPath = `/week/${locationId}`;
	$: todayPath = `/today/${locationId}`;

	$: locationActive = $route.view === 'location';
	$: weekActive = $route.view === 'week';
	$: todayActive = $route.view === 'today';
</script>

<nav>
  <a
    href={locationPath}
    on:click={(e) => navigateLink(e, locationPath)}
    class={locationActive ? 'navlink active' : 'navlink'}
    aria-current={locationActive ? 'page' : undefined}
  >Location</a>
  <a
    href={weekPath}
    on:click={(e) => navigateLink(e, weekPath)}
    class={weekActive ? 'navlink active' : 'navlink'}
    aria-current={weekActive ? 'page' : undefined}
  >Week</a>
  <a
    href={todayPath}
    on:click={(e) => navigateLink(e, todayPath)}
    class={todayActive ? 'navlink active' : 'navlink'}
    aria-current={todayActive ? 'page' : undefined}
  >Today</a>
</nav>

<style>
.navlink {
    border: 1px solid var(--c-fg-strong);
    color: inherit;
    font-size: 0.9rem;
    padding: 1.25rem;
    text-decoration: none;
}

.active {
  background-color: var(--c-surface-contrast);
  color: var(--c-bg);
}
</style>