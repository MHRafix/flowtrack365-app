import { Product } from '@/gql/graphql';
import { UseMutationResult } from '@tanstack/react-query';
import { FC } from 'react';

interface ManageStockProps {
	product: Product;
	updateProduct: UseMutationResult;
}

const ManageStock: FC<ManageStockProps> = ({ product, updateProduct }) => {
	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			ManageStock
		</div>
	);
};

export default ManageStock;
