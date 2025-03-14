<script lang="ts">
	import { base } from '$app/paths';
	import { wallet } from '$lib/stores/wallet';
</script>

<header
	class="sticky top-0 z-30 flex justify-between items-center h-16 bg-green-300/50 border-b border-green-400 backdrop-blur-sm px-6 select-none">
	<a href="{base}/" class="text-2xl font-bold">Aptos Dictionary</a>
	<button
		class="font-bold bg-green-400 hover:bg-green-500 border border-green-600 px-5 h-10 text-lg rounded-full duration-150"
		on:click={$wallet.isConnected ? wallet.disconnect : wallet.connect}>
		{#if $wallet.isConnected}
			Disconnect
		{:else}
			Connect
		{/if}
	</button>
</header>
