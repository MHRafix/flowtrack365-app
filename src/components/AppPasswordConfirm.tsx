import { useForm } from 'react-hook-form';
import { useAppConfirm } from './AppConfirm';
import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from './ui/form';
import { Input } from './ui/input';

export interface AppPasswordConfirmOptions {
	title?: string;
	onVerifiedPassword?: () => void;
}

export const useAppPasswordConfirm = () => {
	const appConfirmHandler = useAppConfirm();
	const show = (options: AppPasswordConfirmOptions) => {
		appConfirmHandler.show({
			title: options?.title ?? 'Put your password to confirm',
			children: (
				<PasswordConfirmForm
					onDone={() => {
						appConfirmHandler.closeModal();
						options.onVerifiedPassword?.();
					}}
				/>
			),
			isShowCancel: false,
			isShowConfirm: false,
		});
	};

	return {
		show,
	};
};

const PasswordConfirmForm = ({ onDone }: { onDone?: () => void }) => {
	// const passwordVerifyMutation = useMutation({
	// 	mutationFn: (password: string) => {
	// 		return identityApi.post('/auth/verify-my-password', { password });
	// 	},
	// });

	const passwordVerifyMutation = () => {};

	const form = useForm({
		defaultValues: {
			password: '',
		},
	});

	const handleSubmit = (data: any) => {
		// passwordVerifyMutation.mutate(data.password);
		// toast.promise(passwordVerifyMutation.mutateAsync(data.password), {
		// 	loading: 'Verifying password...',
		// 	error: 'Invalid password',
		// 	success: () => {
		// 		onDone?.();
		// 		return 'Password verified';
		// 	},
		// });
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Form {...form}>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									required
									placeholder='Type password to confirm'
									{...field}
								/>
							</FormControl>
							<FormDescription className='flex items-center gap-2'>
								<span className='text-red-500 text-3xl -mb-[12px]'>*</span>
								<span>
									This is an cruisial action, please type your password to
									confirm
								</span>
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormItem className='flex justify-end'>
					<Button
						type='submit'
						className='bg-brand'
						// disabled={passwordVerifyMutation.isPending}
					>
						{/* {passwordVerifyMutation.isPending
							? 'Verifying...'
							: 'Verify Password'} */}
						P
					</Button>
				</FormItem>
			</Form>
		</form>
	);
};
