<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/Main.svelte';
</script>

<Main>
	<div class="flex flex-col px-3 py-1">
		<h1>{$page.error?.message}</h1>
	</div>
</Main>
