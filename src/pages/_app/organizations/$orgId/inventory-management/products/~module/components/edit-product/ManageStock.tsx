import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { Product, StockHistoryInput, StockType } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import StockForm from './StockForm';

interface ManageStockProps {
	product: Product;
	onRefetch: CallableFunction;
}

const ManageStock: FC<ManageStockProps> = ({ product, onRefetch }) => {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [stockType, setStockType] = useState<StockType>();

	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>Stock History</h2>
				<div className='flex items-center gap-3'>
					<Button
						variant={'outline'}
						onClick={() => {
							setOpenCreateDrawer(true);
							setStockType(StockType.StockIn);
						}}
					>
						<Plus /> Stock In
					</Button>
					<Button
						onClick={() => {
							setOpenCreateDrawer(true);
							setStockType(StockType.StockOut);
						}}
						variant='destructive'
					>
						<Minus /> Stock Out
					</Button>
				</div>
			</div>

			<div className='flex justify-end font-medium items-center'>
				<div className='bg-teal-500 px-3 py-2 text-white rounded-l-lg'>
					Total Stock
				</div>{' '}
				<div className='bg-red-100 px-3 py-2 font-bold text-teal-500  rounded-r-lg'>
					{product?.stock} - {product?.unit?.name}
				</div>
			</div>
			<br />
			<DataTable
				columns={stockTableColumns}
				// @ts-ignore
				data={
					product?.stockHistory?.map((stock) => ({
						...stock,
					})) || []
				}
			/>

			<DrawerWrapper
				title={'New Stock'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
				}}
			>
				<StockForm
					onRefetch={() => {
						onRefetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
					}}
					productId={product?._id!}
					stockType={stockType!}
				/>
			</DrawerWrapper>
		</div>
	);
};

export default ManageStock;

export const stockTableColumns: ColumnDef<StockHistoryInput>[] = [
	{
		accessorKey: 'date',
		header: 'Created At',
		cell: ({ row }) => {
			return (
				<span className='text-teal-500 p-2 rounded-md font-semibold'>
					{formatDate(row.getValue('date')) || 'N/A'}
				</span>
			);
		},
	},
	{
		accessorKey: 'stockType',
		header: 'Stock Type',
	},

	{
		accessorKey: 'quantity',
		header: 'Stock Quantity',
	},
	{
		accessorKey: 'stockPrice',
		header: 'Stock Price',
		cell: ({ row }) => {
			return <span>{row?.original?.stockPrice || 0.0} BDT</span>;
		},
	},
];
