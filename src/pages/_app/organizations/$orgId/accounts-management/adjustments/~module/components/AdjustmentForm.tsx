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
import { BankAccountPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { bankAccountApi } from '../../../bank-accounts/~module/api/bankAccountApi';
import { Bank_Accounts_For_Dropdown_Query } from '../../../bank-accounts/~module/gql-query/query.gql';

interface BankAccountFormPropsType {
	onRefetch: CallableFunction;
	adjustmentType: 'Deposit' | 'Withdraw';
	onCloseDrawer: CallableFunction;
	account: string;
}
export const AdjustmentForm: FC<BankAccountFormPropsType> = ({
	onRefetch,
	onCloseDrawer,
	adjustmentType,
	account,
}) => {
	const [session] = useAtom(userAtom);

	const { data } = useQuery({
		queryKey: ['accounts-dropdown-list'],
		queryFn: () =>
			gqlRequest<{ bankAccounts: BankAccountPagination }>({
				query: Bank_Accounts_For_Dropdown_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
				},
			}),
	});

	useEffect(() => {
		form.setValue('account', account!);
	}, [account]);

	const { balanceAdjustment } = bankAccountApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	// Define your form.
	const form = useForm<AdjustmentFormStateType>({
		resolver: yupResolver(Adjustment_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: AdjustmentFormStateType) {
		balanceAdjustment.mutate({
			...values,
			type: adjustmentType,
			orgUID: session?.orgUID!,
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='account'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a account' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{data?.bankAccounts?.nodes?.map((accountData, idx) => (
												<SelectItem value={account!} key={idx}>
													<p className='font-medium'>{accountData?.bankName}</p>
													<p className='text-sm text-teal-400'>
														[{accountData?.reference}]
													</p>
												</SelectItem>
											))}
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
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input placeholder='Amount' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{balanceAdjustment?.isPending && <Loader2 className='animate-spin' />}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Adjustment_Form_Schema = Yup.object({
	account: Yup.string().required().label('Account'),
	amount: Yup.number().required().label('Amount'),
});

export type AdjustmentFormStateType = Yup.InferType<
	typeof Adjustment_Form_Schema
>;
