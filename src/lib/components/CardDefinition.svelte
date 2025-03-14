<script lang="ts">
	import { base } from '$app/paths';
	import { contract, type Definition } from '$lib/stores/contract';

	export let definition: Definition;
	const { author_addr, content, datetime } = definition;
	$: picture =
		$contract?.authorProfiles.get(author_addr)?.picture || `${base}/default_profile_picture.png`;
</script>

<div class="flex flex-col bg-green-300 border border-green-500 px-3 pt-1 pb-2 gap-4 rounded-lg">
	<p class="font-semibold text-green-950">{content}</p>
	<div class="flex justify-end gap-3">
		<div
			class="flex flex-col items-end text-green-800 font-['Inconsolata',mono-space] text-sm font-medium">
			<a href="{base}/author/{author_addr}" class="underline hover:text-green-600">{author_addr}</a>
			<p>{datetime}</p>
		</div>
		<a href="{base}/author/{author_addr}" class="rounded-full">
			<img
				src={picture}
				alt="profile picture of author {author_addr}"
				class="h-11 w-11 rounded-full border border-green-600 object-cover" />
		</a>
	</div>
</div>
