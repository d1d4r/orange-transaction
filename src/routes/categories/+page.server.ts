const getPayments = async () => {
	return await new Promise((resolve) =>
		setTimeout(() => {
			return {
				id: '123xyz',
				category: 'pending',
				type: 'didar@gmail.com',
				amount: 100
			};
		}, 2000)
	);
};

export type Category = {
	id: string;
	amount: number;
	category: 'pending' | 'processing' | 'success' | 'failed';
	type: string;
};

export async function load() {
	// logic to fetch payments data here
	// const payments = await getPayments();
	// console.log('🚀 ~ load ~ payments:', payments);
	return {
		categories: [
			{ id: '123xyz', category: 'pending', type: 'didar@gmail.com', amount: 100 },
			{ id: '456xyz', category: 'processing', type: 'nawzad@gmail.com', amount: 300 },
			{ id: '789xyz', category: 'failed', type: 'nawzad@gmail.com', amount: 400 },
			{ id: '123abc', category: 'success', type: 'saeed@gmail.com', amount: 500 }
		] as Category[]
	};
}
