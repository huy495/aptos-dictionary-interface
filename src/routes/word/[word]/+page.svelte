<script lang="ts">
	import { base } from '$app/paths';
	import AddDefinition from '$lib/components/CardAddDefinition.svelte';
	import Definition from '$lib/components/CardDefinition.svelte';
	import Main from '$lib/components/Main.svelte';
	import { contract } from '$lib/stores/contract.js';

	export let data;

	/** Definitions for the word of the current page.*/
	$: definitions = $contract?.definitions.get(data.word);
</script>

<Main>
	<div class="flex flex-col px-4 pt-2 pb-16 gap-6">
		<a href="{base}/word/{data.word}" class="self-start">
			<h1 class="text-4xl font-bold underline hover:text-green-800">
				{data.word}
			</h1>
		</a>
		<div class="flex flex-col gap-5">
			{#each definitions ?? [] as definition (`${definition.content} ${definition.datetime}`)}
				<Definition {definition} />
			{/each}
			<AddDefinition word={data.word} />
		</div>
	</div>
</Main>
