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
import { userAtom } from '@/store/auth.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { bankAccountApi } from '../api/bankAccountApi';

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
			account,
			type: adjustmentType,
			orgUID: session?.orgUID!,
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Description' {...field} />
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
	amount: Yup.number().required().label('Amount'),
	description: Yup.string().required().label('Description'),
});

export type AdjustmentFormStateType = Yup.InferType<
	typeof Adjustment_Form_Schema
>;
