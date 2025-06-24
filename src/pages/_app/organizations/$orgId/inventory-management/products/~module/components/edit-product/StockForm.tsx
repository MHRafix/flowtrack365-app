import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { StockType } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { productApi } from '../../api/productApi';

interface StockFormProps {
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
	productId: string;
	stockType: StockType;
}

const StockForm: FC<StockFormProps> = ({
	onRefetch,
	onCloseDrawer,
	productId,
	stockType,
}) => {
	const [session] = useAtom(userAtom);

	const { updateStock } = productApi(() => {
		onRefetch();
		onCloseDrawer();
	});

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (values: FormValues) => {
		updateStock.mutate({
			orgUid: session?.orgUID!,
			payload: {
				...values,
				updatedBy: session?.userEmployeeProfile?._id as string,
				stockType,
				date: new Date(),
			},
			id: productId,
		});
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
					{/* Quantity */}
					<FormField
						control={form.control}
						name='quantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantity</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Quantity of stock'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* stock price */}
					<FormField
						control={form.control}
						name='stockPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock Price</FormLabel>
								<FormControl>
									<Input type='number' placeholder='Stock price' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type='submit'
						className='w-full'
						disabled={updateStock.isPending}
					>
						{' '}
						{updateStock?.isPending && <Loader2 className='animate-spin' />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default StockForm;

const schema = Yup.object().shape({
	stockPrice: Yup.number().required('Stock price is required'),
	quantity: Yup.number().required('Quantity is required'),
});

type FormValues = Yup.InferType<typeof schema>;
