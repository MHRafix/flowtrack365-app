import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Brand, Product, ProductCategory, Unit } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2, Plus, Trash } from 'lucide-react';
import { FC, useEffect } from 'react';

interface AssignmentProps {
	product: Product;
	productCategories: ProductCategory[];
	updateProduct: UseMutationResult;
	brands: Brand[];
	units: Unit[];
}
const Assignments: FC<AssignmentProps> = ({
	product,
	productCategories,
	updateProduct,
	brands,
	units,
}) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			category: product?.category?._id || '',
			brand: product.brand?._id || '',
			unit: product.unit?._id || '',
		},
	});

	const {
		fields: sizeFields,
		append: appendSize,
		remove: removeSize,
	} = useFieldArray({
		control: form.control,
		name: 'sizes',
	});

	const {
		fields: colorFields,
		append: appendColor,
		remove: removeColor,
	} = useFieldArray({
		control: form.control,
		name: 'colors',
	});

	useEffect(() => {
		if (product) {
			form.reset({
				category: product.category?._id || '',
				brand: product.brand?._id || '',
				unit: product.unit?._id || '',
				sizes: product.sizes || [],
				colors: product.colors || [],
			});
		}
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid md:grid-cols-3 gap-5'>
						{/* Category */}
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className='!w-full'>
												<SelectValue placeholder='Select category' />
											</SelectTrigger>
											<SelectContent>
												{productCategories?.map((category, idx) => (
													<SelectItem key={idx} value={category?._id!}>
														{category?.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='brand'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Brand</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className='!w-full'>
												<SelectValue placeholder='Select brand' />
											</SelectTrigger>
											<SelectContent>
												{brands?.map((brand, idx) => (
													<SelectItem key={idx} value={brand?._id!}>
														{brand?.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Unit */}
						<FormField
							control={form.control}
							name='unit'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Unit</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className='!w-full'>
												<SelectValue placeholder='Select unit' />
											</SelectTrigger>
											<SelectContent>
												{units?.map((unit, idx) => (
													<SelectItem key={idx} value={unit?._id!}>
														{unit?.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Sizes */}
					<div className='bg-neutral-100 border dark:bg-slate-900 p-3 rounded-md'>
						<div className='flex justify-between items-center'>
							{' '}
							<FormLabel className='text-xl font-semibold mb-2'>
								Sizes
							</FormLabel>{' '}
							<Button
								type='button'
								size={'sm'}
								onClick={() => appendSize({ size: '', description: '' })}
							>
								<Plus className='h-4 w-4 mr-2' /> Add Size
							</Button>
						</div>
						{sizeFields.map((item, index) => (
							<div key={item.id} className='my-3'>
								<div className='grid md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`sizes.${index}.size`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Size</FormLabel>
												<FormControl>
													<Input placeholder='e.g. M, L, XL' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`sizes.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Input placeholder='Size description' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='flex justify-end mt-2'>
									<Button
										type='button'
										size={'sm'}
										variant='destructive'
										onClick={() => removeSize(index)}
										// disabled={sizeFields?.length === 1}
									>
										<Trash className='h-4 w-4 mr-2' /> Remove Size
									</Button>
								</div>
							</div>
						))}
					</div>

					{/* Colors */}
					<div className='bg-neutral-100 border dark:bg-slate-900 p-3 rounded-md'>
						<div className='flex justify-between items-center'>
							<FormLabel className='text-xl font-semibold mb-2'>
								Colors
							</FormLabel>{' '}
							<Button
								type='button'
								size={'sm'}
								onClick={() => appendColor({ color: '', description: '' })}
							>
								<Plus className='h-4 w-4 mr-2' /> Add Color
							</Button>
						</div>
						{colorFields.map((item, index) => (
							<div key={item.id} className='my-3'>
								<div className='grid md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`colors.${index}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<FormControl>
													<Input
														placeholder='e.g. Red, Blue, Green'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`colors.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Input placeholder='Color description' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='flex justify-end mt-2'>
									<Button
										type='button'
										size={'sm'}
										variant='destructive'
										onClick={() => removeColor(index)}
									>
										<Trash className='h-4 w-4 mr-2' /> Remove Color
									</Button>
								</div>
							</div>
						))}
					</div>

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

export default Assignments;

const schema = yup.object().shape({
	category: yup.string().required('Category is required'),
	brand: yup.string().required('Brand is required'),
	unit: yup.string().required('Unit is required'),
	sizes: yup
		.array()
		.of(
			yup.object().shape({
				size: yup.string().required('Size is required'),
				description: yup.string().required('Description is required'),
			})
		)
		.required(),
	colors: yup
		.array()
		.of(
			yup.object().shape({
				color: yup.string().required('Color is required'),
				description: yup.string().required('Description is required'),
			})
		)
		.required(),
});

type FormValues = yup.InferType<typeof schema>;
