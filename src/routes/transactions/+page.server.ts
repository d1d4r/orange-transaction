const getTransactions = async () => {
	return await new Promise((resolve) =>
		setTimeout(() => {
			return {
				id: '123xyz',
				status: 'pending',
				email: 'didar@gmail.com',
				amount: 100
			};
		}, 2000)
	);
};

export type Transaction = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};
export async function load() {
	// logic to fetch Transactions data here
	// const Transactions = await getTransactions();
	// console.log('🚀 ~ load ~ Transactions:', Transactions);
	return {
		transactions: [
			{ id: '123xyz', status: 'pending', email: 'didar@gmail.com', amount: 100 },
			{ id: '456xyz', status: 'processing', email: 'nawzad@gmail.com', amount: 300 },
			{ id: '789xyz', status: 'failed', email: 'nawzad@gmail.com', amount: 400 },
			{ id: '123abc', status: 'success', email: 'saeed@gmail.com', amount: 500 }
		] as Transaction[]
	};
}
