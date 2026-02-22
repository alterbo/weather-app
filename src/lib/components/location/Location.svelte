<script lang="ts">
    import { locations } from './locations';
    import styles from './Location.module.css';
    import LocationImage from './LocationImage.svelte';
    import Bevel from '../layout/Bevel.svelte';
    import { navigateLink } from '../../store/router';

    const hrefFor = (locationUrl: string) => `/week/${locationUrl}`;
</script>

{#each locations as location (location.id)}
    <div class={styles.container}>
        <Bevel match={false} />
        <LocationImage name={location.url} />
        <a
            class={styles.link}
            href={hrefFor(location.url)}
            on:click={(e) => navigateLink(e, hrefFor(location.url))}
        >
            <span>{location.role}</span>
            <span>{location.label}</span>
        </a>
    </div>
{/each}