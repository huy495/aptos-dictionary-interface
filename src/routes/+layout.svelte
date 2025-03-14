<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import LeftNavbar from '$lib/components/LeftNavbar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { wallet } from '$lib/stores/wallet';
	import { errorHandler, unhandledRejectionHandler } from '$lib/utils/errors';
	import { contract } from '$lib/stores/contract';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	onMount(wallet.onMountCallback);
	onMount(contract.loadDataFromChain);
</script>

<Header />
<div class="flex max-w-6xl mx-auto p-4 gap-4">
	<LeftNavbar />
	{#if $contract.is_loading}
		<LoadingScreen />
	{:else}
		<slot />
	{/if}
</div>
<Footer />

<svelte:window on:error={errorHandler} on:unhandledrejection={unhandledRejectionHandler} />
