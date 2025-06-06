import { Product } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';

export const productsTableColumns: ColumnDef<Product>[] = [
	{
		accessorKey: 'title',
		header: 'Product Title',
		cell: ({ row }) => {
			return (
				<div className='flex gap-3 items-center'>
					<div>
						<img
							src={
								'https://www.upoharbd.com/images/uploads/Ramadan/attar_c.jpg'
							}
							alt='product_image'
							width={80}
							height={80}
							className='object-cover rounded-md'
						/>
					</div>
					<div>
						<p className='text-xl font-semibold'>{row?.original?.title}</p>
						<p className='text-md dark:text-gray-400 text-gray-600'>
							Code: {row?.original?.code}{' '}
						</p>
						<p className='text-md dark:text-gray-400 text-gray-600'>
							Model: {row?.original?.model || 'N/A'}
						</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'regularPrice',
		header: 'Regular Price',
		cell: ({ row }) => {
			return (
				<span
					className={
						row?.original?.discountAmount
							? 'line-through decoration-red-500 decoration-2 text-red-500'
							: 'text-md font-medium'
					}
				>
					{row.original?.regularPrice || 0.0} BDT
				</span>
			);
		},
	},
	{
		accessorKey: 'salePrice',
		header: 'Sale Price',
		cell: ({ row }) => {
			return (
				<span
					className={
						!row?.original?.discountAmount
							? 'line-through decoration-red-500 decoration-2 text-red-500'
							: 'text-md font-medium'
					}
				>
					{row.original?.salePrice || 0.0} BDT
				</span>
			);
		},
	},
	{
		accessorKey: 'discountAmount',
		header: 'Discount Amount',
		cell: ({ row }) => {
			return (
				<span className={'text-md font-medium'}>
					{row.original?.discountAmount || 0.0} BDT
				</span>
			);
		},
	},
	{
		accessorKey: 'stock',
		header: 'Stock Quantity',
		cell: ({ row }) => {
			return <span>{row.original?.stock || 0} - KG</span>;
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => {
			return <span>{row.original?.category?.name || 'N/A'}</span>;
		},
	},
	{
		accessorKey: 'brand',
		header: 'Brand',
		cell: ({ row }) => {
			return <span>{row.original?.brand?.exampleField || 'N/A'}</span>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return (
				<span className='bg-teal-500 p-2 rounded-md font-semibold'>
					{formatDate(row.getValue('createdAt')) || 'N/A'}
				</span>
			);
		},
	},
];
