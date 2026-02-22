<script lang="ts">
	import styles from './Bevel.module.css';

	export let match: boolean = false;

	$: cssName = match ? styles.circle : styles.overflowcircle;
</script>

<div class={cssName}></div>
<div class={cssName}></div>
<div class={cssName}></div>
<div class={cssName}></div>
