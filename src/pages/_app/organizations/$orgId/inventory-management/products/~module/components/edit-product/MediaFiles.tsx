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
import { Loader2, Plus, Trash } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schema = Yup.object().shape({
	thumbnail: Yup.string().required('Thumbnail is required'),
	carouselImages: Yup.array().of(
		Yup.string().required().label('Carousel Image')
	),
});

type FormValues = Yup.InferType<typeof schema>;

interface MediaFilesProps {
	product: Product;
	updateProduct: UseMutationResult<any, Error, any, unknown>; // <-- type fixed
}

const MediaFiles: FC<MediaFilesProps> = ({ product, updateProduct }) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		// @ts-ignore
		resolver: yupResolver(schema),
		defaultValues: { thumbnail: '', carouselImages: [''] },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		// @ts-ignore
		name: 'carouselImages',
	});

	useEffect(() => {
		if (product) {
			form.setValue('thumbnail', product?.thumbnail?.externalUrl ?? '');
			// If product has carouselImages, set them
			if (product?.carouselImages?.length) {
				form.setValue(
					'carouselImages',
					product.carouselImages.map((img) => img?.externalUrl ?? '')
				);
			}
		}
	}, [product, form]);

	const onSubmit = (values: FormValues) => {
		updateProduct.mutate({
			orgUid: session?.orgUID ?? '',
			payload: {
				thumbnail: { externalUrl: values.thumbnail },
				carouselImages: values.carouselImages?.map((image) => ({
					externalUrl: image,
				})), // adjust if backend needs objects
				_id: product?._id,
			},
		});
	};

	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			<Form {...form}>
				<form
					// @ts-ignore
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5'
				>
					{/* Thumbnail URL */}
					<FormField
						// @ts-ignore
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

					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-semibold'>Carousel Images</h2>
						<Button
							type='button'
							variant='outline'
							size='icon'
							onClick={() => append('')}
						>
							<Plus className='w-4 h-4' />
						</Button>
					</div>
					{/* Carousel Images */}
					{fields.map((_, idx) => (
						<FormField
							key={idx} // <-- fix key issue
							// @ts-ignore
							control={form.control}
							name={`carouselImages.${idx}`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Carousel URL - {idx + 1}</FormLabel>
									<FormControl>
										<div className='flex gap-2 items-center'>
											<Input placeholder='Carousel image url' {...field} />
											<Button
												type='button'
												variant='destructive'
												size='icon'
												onClick={() => remove(idx)}
											>
												<Trash className='w-4 h-4' />
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					{/* Submit Button */}
					<Button
						type='submit'
						className='w-full'
						disabled={updateProduct.isPending}
					>
						{updateProduct.isPending && <Loader2 className='animate-spin' />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default MediaFiles;
