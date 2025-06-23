import { Product } from '@/gql/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { Textarea } from '@/components/ui/textarea';
import { userAtom } from '@/store/auth.atom';
import { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';

interface BasicInformationProps {
	product: Product;
	updateProduct: UseMutationResult;
}

const BasicInformation: FC<BasicInformationProps> = ({
	product,
	updateProduct,
}) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		form.setValue('title', product?.title);
		form.setValue('code', product?.code);
		form.setValue('model', product?.model!);
		form.setValue('shortDescription', product?.shortDescription!);
		form.setValue('description', product?.description!);
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
					{/* Title */}
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Product title' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Code */}
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Code</FormLabel>
								<FormControl>
									<Input placeholder='Product code' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Model */}
					<FormField
						control={form.control}
						name='model'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Model</FormLabel>
								<FormControl>
									<Input placeholder='Product model' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Short Description */}
					<FormField
						control={form.control}
						name='shortDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Short Description</FormLabel>
								<FormControl>
									<Textarea placeholder='Short description' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder='Detailed description' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type='submit'
						className='w-full'
						disabled={updateProduct.isPending}
					>
						{' '}
						{updateProduct?.isPending && <Loader2 className='animate-spin' />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default BasicInformation;

const schema = Yup.object().shape({
	title: Yup.string().required('Title is required'),
	code: Yup.string().required('Code is required'),
	model: Yup.string().required('Model is required'),
	shortDescription: Yup.string().required('Short description is required'),
	description: Yup.string().required('Description is required'),
});

type FormValues = Yup.InferType<typeof schema>;
