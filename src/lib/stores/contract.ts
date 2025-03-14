import { Network, Provider } from 'aptos';
import { readable, writable } from 'svelte/store';
import { wallet } from './wallet';

interface ContractStore {
	is_loading: boolean;
	definitions: Map<string, Array<Definition>>;
	authorProfiles: Map<string, AuthorProfile>;
}

export interface Definition {
	author_addr: string;
	content: string;
	datetime: string;
}

export interface AuthorProfile {
	biography: string;
	picture: string;
}

const createContractStore = () => {
	const { set, update, subscribe } = writable<ContractStore>({
		is_loading: true,
		authorProfiles: new Map(),
		definitions: new Map()
	});

	const MODULE_ADDR = '0x924a57c844cee4f0733134ecaf57bd82145df9a472f46940c558100a036e1908';
	const provider = new Provider(Network.DEVNET);

	async function loadDataFromChain() {
		const resource = await provider.getAccountResource(
			MODULE_ADDR,
			`${MODULE_ADDR}::dictionary::Dictionary`
		);

		const dataFromChain = resource.data as Resource;

		const authorProfiles: Map<string, AuthorProfile> = new Map();
		dataFromChain.author_profiles.forEach(({ addr, biography, picture }) =>
			authorProfiles.set(addr, { biography, picture })
		);

		const definitions: Map<string, Array<Definition>> = new Map();
		dataFromChain.definitions.forEach(({ word, author_addr, content, time }) => {
			const datetime = new Intl.DateTimeFormat('en-UK', {
				dateStyle: 'medium',
				timeStyle: 'short'
			}).format(time * 1000); // convert seconds to milliseconds

			const definition: Definition = { author_addr, content, datetime };

			const definitionsOfWord = definitions.get(word);

			definitionsOfWord ? definitionsOfWord.push(definition) : definitions.set(word, [definition]);
		});

		set({
			is_loading: false,
			authorProfiles,
			definitions
		});
	}

	async function addDefinition(word: string, content: string, author_addr: string) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${MODULE_ADDR}::dictionary::add_definition`,
			arguments: [word, content],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			if (!oldState.definitions.has(word)) oldState.definitions.set(word, []);

			const datetime = new Intl.DateTimeFormat('en-UK', {
				dateStyle: 'medium',
				timeStyle: 'short'
			}).format(Date.now());

			const definitionsOfWord = oldState.definitions.get(word);

			definitionsOfWord?.push({
				author_addr,
				content: content,
				datetime
			});

			return {
				...oldState
			};
		});
	}

	async function updateProfile(
		current_biography: string,
		current_picture: string,
		new_biography: string,
		new_picture: string,
		author_addr: string
	) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${MODULE_ADDR}::dictionary::update_profile`,
			arguments: [current_biography, current_picture, new_biography, new_picture],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			oldState.authorProfiles.set(author_addr, {
				biography: new_biography,
				picture: new_picture
			});

			return oldState;
		});
	}

	return {
		subscribe,
		loadDataFromChain,
		addDefinition,
		updateProfile
	};
};

export const contract = createContractStore();

interface Resource {
	definitions: Array<{
		word: string;
		content: string;
		author_addr: string;
		time: number;
	}>;
	author_profiles: Array<{
		addr: string;
		biography: string;
		picture: string;
	}>;
}
