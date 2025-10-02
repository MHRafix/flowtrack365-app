import { Button } from '@/components/ui/button';
import { Order, OrderStatus, UpdateOrderInput } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { OrderStatusBadge } from '@/lib/StatusBadge';
import { userAtom } from '@/store/auth.atom';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { Update_Order_Mutation } from '../query/query.gql';

const OrderDetails: FC<{ order: Order; onRefetch: CallableFunction }> = ({
	order,
	onRefetch,
}) => {
	const [session] = useAtom(userAtom);

	const updateOrder = useMutation({
		mutationFn: (payload: UpdateOrderPayloadType) =>
			gqlRequest({
				query: Update_Order_Mutation,
				variables: payload,
			}),

		onSuccess: () => {
			onRefetch();
		},
	});

	const handleUpdateOrder = (status: OrderStatus) => {
		updateOrder.mutate({
			payload: { _id: order?._id!, status },
			orgUid: session?.orgUID!,
		});
	};
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
			<div className='mt-6 border p-4 rounded-sm bg-gray-50 dark:bg-gray-800 space-y-2'>
				<h4 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					Customer Name:
				</h4>
				<p className='text-base text-gray-900 dark:text-gray-200'>
					{order?.billing?.name || 'N/A'}
				</p>{' '}
				<h4 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					Customer Phone:
				</h4>
				<p className='text-base text-gray-900 dark:text-gray-200'>
					{order?.billing?.phone || 'N/A'}
				</p>{' '}
				<h4 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					Customer Email:
				</h4>
				<p className='text-base text-gray-900 dark:text-gray-200'>
					{order?.billing?.email || 'N/A'}
				</p>{' '}
				<h4 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
					Order Status
				</h4>
				<OrderStatusBadge status={order?.status as OrderStatus} />
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

			<div className='mt-6 grid grid-cols-3 items-center gap-3'>
				{order?.status === OrderStatus.Pending && (
					<Button
						onClick={() => handleUpdateOrder(OrderStatus.Confirmed)}
						disabled={updateOrder?.isPending}
						className='px-3 py-2 rounded-md cursor-pointer bg-indigo-500 hover:bg-indigo-700 hover:duration-300 text-white font-medium'
					>
						{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
						Confirmed
					</Button>
				)}
				{order?.status === OrderStatus.Confirmed && (
					<Button
						onClick={() => handleUpdateOrder(OrderStatus.Processing)}
						disabled={updateOrder?.isPending}
						className='px-3 py-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-700 hover:duration-300 text-white font-medium'
					>
						{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
						Processing
					</Button>
				)}
				{order?.status === OrderStatus.Processing && (
					<Button
						onClick={() => handleUpdateOrder(OrderStatus.Shipped)}
						disabled={updateOrder?.isPending}
						className='px-3 py-2 rounded-md cursor-pointer bg-orange-500 hover:bg-orange-600 hover:duration-300 text-white font-medium'
					>
						{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
						Shipped
					</Button>
				)}
				<Button
					onClick={() => handleUpdateOrder(OrderStatus.Cancelled)}
					disabled={updateOrder?.isPending}
					className='px-3 py-2 rounded-md cursor-pointer bg-red-500 hover:bg-red-700 hover:duration-300 text-white font-medium'
				>
					{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
					Cancelled
				</Button>
				{order?.status === OrderStatus.Delivered && (
					<Button
						onClick={() => handleUpdateOrder(OrderStatus.Refunded)}
						disabled={updateOrder?.isPending}
						className='px-3 py-2 rounded-md cursor-pointer bg-violet-500 hover:bg-violet-700 hover:duration-300 text-white font-medium'
					>
						{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
						Refunded
					</Button>
				)}{' '}
				{order?.status === OrderStatus.Shipped && (
					<Button
						onClick={() => handleUpdateOrder(OrderStatus.Delivered)}
						disabled={updateOrder?.isPending}
						className=' px-3 py-2 rounded-md cursor-pointer bg-green-500 hover:bg-green-700 hover:duration-300 text-white font-medium'
					>
						{updateOrder?.isPending && <Loader2 className='animate-spin' />}{' '}
						Delivered
					</Button>
				)}
			</div>
		</div>
	);
};

export default OrderDetails;

export interface UpdateOrderPayloadType {
	payload: UpdateOrderInput;
	orgUid: string;
}
