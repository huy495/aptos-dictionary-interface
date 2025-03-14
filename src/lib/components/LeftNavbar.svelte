<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract';
	import { wallet } from '$lib/stores/wallet';
	import { Errors } from '$lib/utils/errors';

	function addNewWordHandler() {
		let newWord = prompt('Word to add:');

		if (!newWord) return;
		if ($contract.definitions.has(newWord)) throw Errors.WordAlreadyExists;

		// replace spaces with hyphen
		newWord = newWord
			.toLowerCase()
			.split(' ')
			.map((s) => s.trim())
			.filter((s) => s)
			.join('-');

		// redirect user to the new word's page
		goto(`${base}/word/${newWord}`);
	}
</script>

<nav
	class="flex min-w-fit flex-col justify-between px-3 pt-1.5 pb-5 min-h-[calc(100vh-16rem)] bg-green-300/50 backdrop-blur-sm border border-green-400 rounded-xl">
	<div class="flex flex-col gap-1 items-start">
		<h2 class="text-xl font-bold select-none">Words In The Dictionary</h2>
		<div class="flex flex-col gap-0.5 underline font-semibold text-green-800">
			{#each $contract.definitions.keys() as word}
				<a href="{base}/word/{word}" class="hover:text-green-600"> {word} </a>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-1 font-bold items-center text-green-900">
		<button
			on:click={addNewWordHandler}
			disabled={!$wallet.isConnected}
			class="hover:text-green-700 hover:underline disabled:cursor-not-allowed">
			Add New Word</button>
		<a
			href={$wallet.address ? `${base}/author/${$wallet.address}` : null}
			class="hover:text-green-700 hover:underline {!$wallet.address && 'cursor-not-allowed'}">
			Your Profile</a>
	</div>
</nav>
