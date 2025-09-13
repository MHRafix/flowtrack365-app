import { Badge } from '@/components/ui/badge';
import { OrderStatus, PaymentStatus } from '@/gql/graphql';

const orderStatusVariantMap: Record<OrderStatus, string> = {
	[OrderStatus.Cancelled]: 'bg-red-500 text-white',
	[OrderStatus.Confirmed]: 'bg-blue-500 text-white',
	[OrderStatus.Delivered]: 'bg-green-500 text-white',
	[OrderStatus.Pending]: 'bg-yellow-500 text-black',
	[OrderStatus.Processing]: 'bg-teal-500 text-white',
	[OrderStatus.Refunded]: 'bg-orange-500 text-white',
	[OrderStatus.Shipped]: 'bg-purple-500 text-white',
};

const paymentStatusVariantMap: Record<PaymentStatus, string> = {
	[PaymentStatus.Due]: 'bg-red-500 text-white',
	[PaymentStatus.Paid]: 'bg-teal-500 text-black',
	[PaymentStatus.Refunded]: 'bg-pink-500 text-white',
	[PaymentStatus.Unpaid]: 'bg-orange-500 text-black',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
	return (
		<Badge
			className={`${orderStatusVariantMap[status]} px-3 py-1 rounded-full`}
		>
			{status}
		</Badge>
	);
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
	return (
		<Badge
			className={`${paymentStatusVariantMap[status]} px-3 py-1 rounded-full`}
		>
			{status}
		</Badge>
	);
}
