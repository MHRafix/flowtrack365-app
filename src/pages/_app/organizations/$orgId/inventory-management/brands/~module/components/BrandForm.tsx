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
import { Brand } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { brandApi } from '../api/brandApi';

interface BrandFormPropsType {
	brand?: Brand;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const BrandForm: FC<BrandFormPropsType> = ({
	brand,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

	const { createBrand, updateBrand } = brandApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	// Define your form.
	const form = useForm<BrandFormStateType>({
		resolver: yupResolver(Brand_Form_Schema),
	});

	useEffect(() => {
		form.setValue('name', brand?.name!);
	}, [brand]);

	// Define a submit handler.
	function onSubmit(values: BrandFormStateType) {
		actionType === 'ADD'
			? createBrand.mutate({
					...values,
					orgUID: session?.orgUID!,
				})
			: updateBrand.mutate({
					_id: brand?._id!,
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
								<Input placeholder='Brand name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{(createBrand?.isPending || updateBrand?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Brand_Form_Schema = Yup.object({
	name: Yup.string().required().label('Name'),
});

export type BrandFormStateType = Yup.InferType<typeof Brand_Form_Schema>;
