<script lang="ts">
	import { contract } from '$lib/stores/contract';
	import { wallet } from '$lib/stores/wallet';
	import { Errors } from '$lib/utils/errors';
	import { autoRowsHandler, disableNewlineHandler } from '$lib/utils/textarea';

	export let word: string;

	/** Binded value for definiton written in textarea. */
	let definition: string = '';

	/** Requests user to make a transaction to add a new definition for the word of the current page. */
	async function addDefinition() {
		if (definition === '' || !$wallet.address) throw Errors.WordDefinitionIsEmpty;

		await contract.addDefinition(word, definition, $wallet.address);

		definition = '';
	}
</script>

<div
	class="flex bg-green-100 border border-green-400 px-3 pt-1.5 pb-3 gap-3 rounded-lg items-end {!$wallet.isConnected &&
		'cursor-not-allowed'}">
	<textarea
		disabled={!$wallet.isConnected}
		rows="4"
		maxlength="1024"
		placeholder={$wallet.isConnected
			? `Write your own definition for ${word}...`
			: `You must connect your wallet before adding your own definition for ${word}...`}
		bind:value={definition}
		on:keydown={disableNewlineHandler}
		on:input={autoRowsHandler}
		class="w-full bg-transparent font-medium text-green-700 outline-none resize-none placeholder:text-green-700/60 disabled:cursor-not-allowed" />
	<button
		disabled={!$wallet.isConnected}
		on:click={addDefinition}
		class="font-bold bg-green-300 px-3 border text-green-700 border-green-500 py-1 rounded-full hover:bg-green-400/80 disabled:hover:bg-green-300 duration-15 disabled:cursor-not-allowed">
		Add
	</button>
</div>
