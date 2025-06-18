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
import { BankAccount } from '@/gql/graphql';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { bankAccountApi } from '../api/bankAccountApi';

interface BankAccountFormPropsType {
	account?: BankAccount;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const BankAccountForm: FC<BankAccountFormPropsType> = ({
	account,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

	const { createBankAccount, updateBankAccount } = bankAccountApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	// Define your form.
	const form = useForm<BankAccountFormStateType>({
		resolver: yupResolver(Bank_Account_Form_Schema),
	});

	useEffect(() => {
		form.setValue('bankName', account?.bankName!);
		form.setValue('branch', account?.branch!);
		form.setValue('balance', account?.balance!);
	}, [account]);

	// Define a submit handler.
	function onSubmit(values: BankAccountFormStateType) {
		actionType === 'ADD'
			? createBankAccount.mutate({
					...values,
					orgUID: session?.orgUID!,
				})
			: updateBankAccount.mutate({
					_id: account?._id!,
					...values,
					orgUID: session?.orgUID!,
				});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='bankName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank Name</FormLabel>
							<FormControl>
								<Input placeholder='Bank name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='branch'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Branch</FormLabel>
							<FormControl>
								<Input placeholder='Branch name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='balance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Balance</FormLabel>
							<FormControl>
								<Input placeholder='Balance amount' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{(createBankAccount?.isPending || updateBankAccount?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Bank_Account_Form_Schema = Yup.object({
	bankName: Yup.string().required().label('Bank name'),
	branch: Yup.string().required().label('Branch'),
	balance: Yup.number().required().label('Balance'),
});

export type BankAccountFormStateType = Yup.InferType<
	typeof Bank_Account_Form_Schema
>;
