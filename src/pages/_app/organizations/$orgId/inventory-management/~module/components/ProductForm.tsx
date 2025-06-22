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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Product,
	ProductCategory,
	ProductCategoryPagination,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { productApi } from '../api/productApi';
import { All_Product_Categories_For_DropDown_List_Query } from '../gql-query/query.gql';

interface ProductFormPropsType {
	product?: Product;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const ProductForm: FC<ProductFormPropsType> = ({
	product,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

	const { data: productCategories } = useQuery({
		queryKey: ['all-product-category-for-dropdown-ghgh'],
		queryFn: async () =>
			await gqlRequest<{
				productCategories: ProductCategoryPagination;
			}>({
				query: All_Product_Categories_For_DropDown_List_Query,
				variables: {
					orgUid: session?.orgUID,
				},
			}),
	});

	const { createProduct, updateProduct } = productApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	// Define your form.
	const form = useForm<ProductFormStateType>({
		resolver: yupResolver(Product_Form_Schema),
	});

	useEffect(() => {
		form.setValue('title', product?.title!);
		form.setValue('category', product?.category?._id!);
		form.setValue('code', product?.code!);
		form.setValue('model', product?.model!);
		form.setValue('regularPrice', product?.regularPrice!);
		form.setValue('discountAmount', product?.discountAmount!);
	}, [product]);

	// Define a submit handler.
	function onSubmit(values: ProductFormStateType) {
		createProduct.mutate({
			...values,
			orgUID: session?.orgUID!,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={product?.category?._id!}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a category' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{productCategories?.productCategories?.nodes?.map(
												(productCategory: ProductCategory, idx: number) => (
													<SelectItem value={productCategory?._id!} key={idx}>
														{productCategory?.name}
													</SelectItem>
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

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
				<FormField
					control={form.control}
					name='regularPrice'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Regular Price</FormLabel>
							<FormControl>
								<Input type='number' placeholder='Regular price' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='discountAmount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Discount Amount</FormLabel>
							<FormControl>
								<Input type='number' placeholder='Discount amount' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='stock'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock Quantity</FormLabel>
							<FormControl>
								<Input type='number' placeholder='Stock quantity' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{(createProduct?.isPending || updateProduct?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Product_Form_Schema = Yup.object({
	title: Yup.string().required().label('Title'),
	code: Yup.string().required().label('Code'),
	model: Yup.string().required().label('Model'),
	category: Yup.string().required().label('Category'),
	regularPrice: Yup.number().required().label('Regular Price'),
	discountAmount: Yup.number().required().label('Discount Amount'),
	stock: Yup.number().required().label('Stock'),
});

export type ProductFormStateType = Yup.InferType<typeof Product_Form_Schema>;
