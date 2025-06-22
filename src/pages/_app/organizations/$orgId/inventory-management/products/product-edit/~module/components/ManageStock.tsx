import { Product } from '@/gql/graphql';
import { FC } from 'react';

interface ManageStockProps {
	product: Product;
}

const ManageStock: FC<ManageStockProps> = ({ product }) => {
	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			ManageStock
		</div>
	);
};

export default ManageStock;
