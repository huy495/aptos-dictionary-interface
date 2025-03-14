<script lang="ts">
	import { base } from '$app/paths';
	import CardDefinition from '$lib/components/CardDefinition.svelte';
	import Main from '$lib/components/Main.svelte';
	import { contract, type AuthorProfile, type Definition } from '$lib/stores/contract.js';
	import { wallet } from '$lib/stores/wallet';
	import { Errors } from '$lib/utils/errors';
	import { getDefinitionsOfAuthor } from '$lib/utils/getDefinitionsOfAuthor.js';
	import { disableNewlineAndUnfocusHandler, disableNewlineHandler } from '$lib/utils/textarea.js';

	export let data;

	$: authorInfo =
		$contract?.authorProfiles.get(data.addr) ??
		({
			biography: 'The author has no biography.',
			picture: `${base}/default_profile_picture.png`
		} satisfies AuthorProfile);

	$: definitionsOfAuthor = getDefinitionsOfAuthor(data.addr, $contract.definitions);

	$: isCurrentUser = data.addr === $wallet.address;

	let textareaForBiography: HTMLTextAreaElement;

	async function updateBiographyHandler() {
		const value = textareaForBiography.value.trim();
		if (value === authorInfo.biography) return;

		await contract.updateProfile(
			authorInfo.biography,
			authorInfo.picture,
			value,
			authorInfo.picture,
			data.addr
		);
	}

	async function updatePictureHandler() {
		const promptValue = prompt('Paste URL of a picture:');
		if (!promptValue) return;

		let pictureUrl: URL;

		try {
			pictureUrl = new URL(promptValue);
		} catch {
			throw Errors.InvalidURL;
		}

		const isImage = /\.(jpg|jpeg|png|webp)$/i.test(pictureUrl.toString());
		if (!isImage) throw Errors.URLIsNotAnImage;

		await contract.updateProfile(
			authorInfo.biography,
			authorInfo.picture,
			authorInfo.biography,
			pictureUrl.toString(),
			data.addr
		);
	}
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->

<Main>
	<div class="flex flex-col px-4 py-4 gap-4">
		<div class="flex items-center gap-4">
			<div class="min-w-fit static group">
				<img
					src={authorInfo.picture}
					alt="author profile photo"
					class="h-20 w-20 rounded-full border border-green-600 object-cover" />
				{#if isCurrentUser}
					<button
						type="button"
						on:click={updatePictureHandler}
						class="hidden absolute group-hover:flex items-center justify-center top-4 min-w-[5rem] min-h-[5rem] rounded-full text-green-50 bg-green-950/80 cursor-pointer">
						change
					</button>
				{/if}
			</div>

			<h1 class="text-2xl font-bold text-green-700 w-full">
				{data.addr.slice(0, 6)}...{data.addr.slice(-6)}
			</h1>
		</div>
		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-1">
				<h2 class="font-bold text-2xl">Address:</h2>
				<p
					class="font-medium text-green-900 outline-none border border-green-300 bg-green-100 px-2 py-1 rounded-lg cursor-not-allowed">
					{data.addr}
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<h2 class="font-bold text-2xl">Biography:</h2>
				<textarea
					class="font-medium text-green-900 outline-none border border-green-300 bg-green-100 px-2 py-1 rounded-lg resize-none disabled:cursor-not-allowed"
					rows="2"
					disabled={!isCurrentUser}
					value={authorInfo.biography}
					on:keydown={disableNewlineAndUnfocusHandler}
					bind:this={textareaForBiography}
					on:focusout={updateBiographyHandler} />
			</div>
			<div class="flex flex-col gap-2.5">
				<h2 class="font-bold text-2xl">Latest Definitons:</h2>
				<div class="flex flex-col gap-5">
					{#each definitionsOfAuthor as definition}
						<div class="flex flex-col gap-1.5">
							<a href="{base}/word/{definition.word}" class="self-s">
								<h3 class="font-semibold text-xl text-green-600 underline">
									{definition.word}
								</h3>
							</a>
							<CardDefinition {definition} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Main>
