import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import DataTableActions from '../transactions/data-table-actions.svelte';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
	id: string;
	amount: number;
	category: 'pending' | 'processing' | 'success' | 'failed';
	type: string;
};

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'id',
		header: '#'
	},
	{
		accessorKey: 'category',
		header: 'Category'
	},
	{
		accessorKey: 'type',
		header: 'Type'
	},
	{
		accessorKey: 'amount',
		header: () => {
			const amountHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-right">Amount</div>`
			}));
			return renderSnippet(amountHeaderSnippet, '');
		},
		cell: ({ row }) => {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			});

			const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
				const amount = getAmount();
				return {
					render: () => `<div class="text-right font-medium">${amount}</div>`
				};
			});

			return renderSnippet(amountCellSnippet, formatter.format(parseFloat(row.getValue('amount'))));
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row.original.id });
		}
	}
];