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
import { Unit } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { unitApi } from '../api/unitApi';

interface UnitFormPropsType {
	unit?: Unit;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const UnitForm: FC<UnitFormPropsType> = ({
	unit: unit,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

	const { createUnit, updateUnit } = unitApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	useEffect(() => {
		form.setValue('name', unit?.name!);
		form.setValue('unitCode', unit?.unitCode!);
	}, [unit]);

	// Define your form.
	const form = useForm<UnitFormStateType>({
		resolver: yupResolver(Unit_Form_Schema),
	});

	useEffect(() => {
		form.setValue('name', unit?.name!);
		form.setValue('unitCode', unit?.unitCode!);
	}, [unit]);

	// Define a submit handler.
	function onSubmit(values: UnitFormStateType) {
		actionType === 'ADD'
			? createUnit.mutate({
					...values,
					orgUID: session?.orgUID!,
				})
			: updateUnit.mutate({
					_id: unit?._id!,
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
								<Input placeholder='Unit name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='unitCode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input placeholder='Unit code' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{(createUnit?.isPending || updateUnit?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Unit_Form_Schema = Yup.object({
	name: Yup.string().required().label('Name'),
	unitCode: Yup.string().required().label('Code'),
});

export type UnitFormStateType = Yup.InferType<typeof Unit_Form_Schema>;
