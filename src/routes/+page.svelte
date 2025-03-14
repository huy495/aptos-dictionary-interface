<script>
	import { base } from '$app/paths';
	import Main from '$lib/components/Main.svelte';
	import { contract } from '$lib/stores/contract';

	$: getRandomWordUrl = () => {
		const words = Array.from($contract.definitions.keys());
		if (words.length === 0) return `${base}/`;
		const randomIndex = Math.floor(Math.random() * words.length);
		const randomWord = words[randomIndex];
		return `${base}/word/${randomWord}`;
	};
</script>

<Main>
	<div class="h-full flex flex-col px-3 py-2 gap-6 justify-center">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold text-green-700 text-center">Welcome to Aptos Dictionary</h1>
			<p class="font-semibold text-center text-green-600">
				You are in the colloborative dictionary of Aptos. Anyone can be an author of this great
				dictionary.
			</p>
		</div>

		<div class="flex max-w-md self-center gap-8">
			<a
				href={getRandomWordUrl()}
				class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150">
				Visit a Random Page
			</a>

			<a
				href="https://github.com/BerzanXYZ/aptos-dictionary-interface"
				class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150"
				target="_blank">
				Visit the Repository
			</a>
		</div>
	</div>
</Main>
