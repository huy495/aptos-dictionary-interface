import { Errors } from '$lib/utils/errors';
import { writable } from 'svelte/store';

interface WalletStore {
	isConnected: boolean;
	address?: string;
}

const createWalletStore = () => {
	const { subscribe, set, update } = writable<WalletStore>({
		isConnected: false,
		address: undefined
	});

	return {
		subscribe,
		connect: async () => {
			if (!window.aptos) throw Errors.WalletNotFound;

			try {
				const { address } = await window.aptos.connect();

				set({
					isConnected: true,
					address
				});
			} catch {}
		},
		disconnect: async () => {
			if (!window.aptos) return;

			await window.aptos.disconnect();

			set({
				isConnected: false,
				address: undefined
			});
		},
		signAndSubmitTransaction: async (tx: Transaction) => {
			if (!window.aptos) throw Errors.WalletNotFound;

			const { chainId } = await window.aptos.getNetwork();

			if (chainId !== '81') throw Errors.CurrentNetworkIsNotDevnet;

			const { hash } = await window.aptos.signAndSubmitTransaction(tx);

			return hash;
		},
		onMountCallback: () => {
			if (!window.aptos) return;

			window.aptos.onDisconnect(() => {
				set({
					isConnected: false,
					address: undefined
				});
			});

			window.aptos.onAccountChange(({ address }) => {
				update((v) => ({
					...v,
					address
				}));
			});
		}
	};
};

export const wallet = createWalletStore();
