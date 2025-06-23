import { Product } from '@/gql/graphql';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';

interface PriceAssignmentProps {
	product: Product;
	updateProduct: UseMutationResult;
}

const PriceAssignment: FC<PriceAssignmentProps> = ({
	product,
	updateProduct,
}) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		form.setValue('regularPrice', product?.regularPrice);
		form.setValue('discountAmount', product?.discountAmount!);
	}, [product]);

	const onSubmit = (values: FormValues) => {
		updateProduct.mutate({
			orgUid: session?.orgUID!,
			payload: { ...values, _id: product?._id } as any,
		});
	};
	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
					{/* Regular Price */}
					<FormField
						control={form.control}
						name='regularPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Regular Price</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Enter regular price'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormItem>
						<FormLabel>Sale Price</FormLabel>
						<FormControl>
							<Input type='number' value={product?.salePrice!} disabled />
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* Discount Amount */}
					<FormField
						control={form.control}
						name='discountAmount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Amount</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Enter discount amount'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit */}
					<Button
						type='submit'
						className='w-full'
						disabled={updateProduct.isPending}
					>
						{updateProduct?.isPending && <Loader2 className='animate-spin' />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PriceAssignment;
const schema = Yup.object().shape({
	regularPrice: Yup.number()
		.typeError('Regular price must be a number')
		.required('Regular price is required')
		.positive('Must be greater than 0'),
	discountAmount: Yup.number()
		.typeError('Discount amount must be a number')
		.required('Discount amount is required')
		.min(0, 'Discount cannot be negative')
		.test(
			'is-less-than-regular',
			'Discount must be less than regular price',
			function (value) {
				const { regularPrice } = this.parent;
				return value < regularPrice;
			}
		),
});
type FormValues = Yup.InferType<typeof schema>;
