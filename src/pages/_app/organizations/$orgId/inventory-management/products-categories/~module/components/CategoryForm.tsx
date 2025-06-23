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
import { ProductCategory } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { productCategoryApi } from '../api/productCategoryApi';

interface CategoryFormFormPropsType {
	category?: ProductCategory;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const CategoryForm: FC<CategoryFormFormPropsType> = ({
	category,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

	const { createProductCategory, updateProductCategory } = productCategoryApi(
		() => {
			onCloseDrawer();
			onRefetch();
		}
	);

	// Define your form.
	const form = useForm<CategoryFormStateType>({
		resolver: yupResolver(Category_Form_Schema),
	});

	useEffect(() => {
		form.setValue('name', category?.name!);
		form.setValue('description', category?.description!);
	}, [category]);

	// Define a submit handler.
	function onSubmit(values: CategoryFormStateType) {
		actionType === 'ADD'
			? createProductCategory.mutate({
					...values,
					orgUID: session?.orgUID!,
				})
			: updateProductCategory.mutate({
					_id: category?._id!,
					...values,
					orgUID: session?.orgUID!,
				});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='Product name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Description'
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' variant={'default'} className='w-full'>
					{(createProductCategory?.isPending ||
						updateProductCategory?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Category_Form_Schema = Yup.object({
	name: Yup.string().required().label('Name'),
	description: Yup.string().required().label('Description'),
});

export type CategoryFormStateType = Yup.InferType<typeof Category_Form_Schema>;
