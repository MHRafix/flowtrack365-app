import { Order } from '@/gql/graphql';
import { FC } from 'react';

const OrderDetails: FC<{ order: Order }> = ({ order }) => {
	return (
		<div className='space-y-2'>
			{order?.items?.map((item, idx) => (
				<div
					key={idx}
					className='flex items-center gap-4  border-b p-4 bg-white dark:bg-gray-900'
				>
					{/* Product Image */}
					<div className='w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden'>
						{item?.product?.thumbnail ? (
							<img
								src={item?.product?.thumbnail?.externalUrl!}
								alt={item?.product?.title}
								className='w-full h-full object-cover'
							/>
						) : (
							<span className='text-xs text-gray-400'>No Img</span>
						)}
					</div>

					{/* Product Info */}
					<div className='flex-1 space-y-1'>
						<h3 className='font-semibold text-gray-900 dark:text-white'>
							{item?.product?.title || 'N/A'}
						</h3>
						<div className='text-sm text-gray-500 dark:text-gray-400'>
							{item.color && <span>Color: {item?.color || 'N/A'} |</span>}
							{item.size && <span> Size: {item?.size || 'N/A'}|</span>}
							{item.code && <span> Code: {item?.code || 'N/A'}</span>}
						</div>
					</div>

					{/* Quantity & Price */}
					<div className='text-right space-y-1'>
						<p className='text-sm text-gray-500'>
							Qty: {item.quantity} Price: {item?.price}
						</p>
						<p className='font-extrabold text-gray-900 dark:text-white '>
							৳ {item.subtotal.toFixed(2)}
						</p>
					</div>
				</div>
			))}

			<div className='mt-6 border p-4 rounded-sm bg-gray-50 dark:bg-gray-800 space-y-2'>
				<h4 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					📌 Special Note
				</h4>
				<p className='text-base text-gray-700 dark:text-gray-200'>
					{order?.specialNote || 'N/A'}
				</p>
			</div>

			<div className='mt-6 border p-4 rounded-sm bg-gray-50 dark:bg-gray-800 space-y-3'>
				<div className='flex justify-between text-sm text-gray-600 dark:text-gray-300'>
					<span className='font-medium'>Total Order Amount</span>
					<span className='font-semibold text-gray-900 dark:text-white'>
						{order?.total - order?.deliveryFee || 0} TK
					</span>
				</div>
				<div className='flex justify-between text-sm text-gray-600 dark:text-gray-300'>
					<span className='font-medium'>Delivery Fee</span>
					<span className='font-semibold text-gray-900 dark:text-white'>
						{order?.deliveryFee || 0} TK
					</span>
				</div>

				<div className='flex justify-between text-base border-t pt-3 font-bold text-gray-900 dark:text-white'>
					<span>Total Payable Amount</span>
					<span className='text-emerald-600 dark:text-emerald-400'>
						{order?.total || 0} TK
					</span>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
