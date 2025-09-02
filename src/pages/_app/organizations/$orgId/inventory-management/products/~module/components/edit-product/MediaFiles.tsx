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
import { Product } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface MediaFilesProps {
	product: Product;
	updateProduct: UseMutationResult;
}

const MediaFiles: FC<MediaFilesProps> = ({ product, updateProduct }) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		form.setValue('thumbnail', product?.thumbnail?.externalUrl!);
	}, [product]);

	const onSubmit = (values: FormValues) => {
		updateProduct.mutate({
			orgUid: session?.orgUID!,
			payload: {
				thumbnail: {
					externalUrl: values?.thumbnail,
				},
				_id: product?._id,
			} as any,
		});
	};

	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
					{/* External url */}
					<FormField
						control={form.control}
						name='thumbnail'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Thumbnail URL</FormLabel>
								<FormControl>
									<Input placeholder='Thumbnail url' {...field} />
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
						{updateProduct?.isPending && <Loader2 className='animate-spin' />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default MediaFiles;

const schema = Yup.object().shape({
	thumbnail: Yup.string().required('Thumbnail is required'),
});

type FormValues = Yup.InferType<typeof schema>;
