declare interface Window {
	aptos?: {
		connect: () => Promise<Account>;
		disconnect: () => Promise<void>;
		isConnected: () => Promise<boolean>;
		getNetwork: () => Promise<Network>;
		getAccount: () => Promise<Account>;
		onAccountChange: (callback: (a: Account) => void) => void;
		onDisconnect: (callback: () => void) => void;
		signAndSubmitTransaction: (tx: Transaction) => Promise<TransactionResponse>;
	};
}

interface Network {
	chainId: string;
}

interface Account {
	address: string;
	publicKey: string;
}

interface Transaction {
	arguments: Array<string>;
	function: string;
	type: string;
	type_arguments: string[];
}

interface TransactionResponse {
	hash: string;
}
