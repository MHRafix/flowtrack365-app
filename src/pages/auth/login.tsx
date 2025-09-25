import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { authApi } from './~module/api/auth.api';

export const Route = createFileRoute('/auth/login')({
	async beforeLoad(ctx) {
		if (ctx.context.auth.isFetched && ctx.context.auth.isAuthenticated) {
			throw redirect({
				to: '/organizations',
			});
		}
		return ctx;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [passType, setPassType] = useState<'password' | 'text'>('password');
	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate({ to: '/organizations' }); // Replace '/settings' with any route path
	};

	const { loginMutation } = authApi(handleRedirect);

	// Define your form.
	const form = useForm<LoginFormStateType>({
		resolver: yupResolver(Login_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: LoginFormStateType) {
		loginMutation.mutate(values);
	}
	return (
		<div className='flex h-screen items-center justify-center bg-white dark:bg-slate-900'>
			<div className='lg:w-5/12 w-full bg-neutral-50 dark:bg-slate-800 px-5 py-6 rounded-sm'>
				<h2 className='text-2xl font-semibold my-5'>Login Now</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your email'
											{...field}
											className='py-6'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='relative'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										{/* <div className='relative'> */}
										<Input
											type={passType}
											placeholder='Enter your password'
											{...field}
											className='py-6'
										/>
										{/* </div> */}
									</FormControl>
									<FormItem className='flex flex-row items-center gap-2'>
										<FormControl>
											<Checkbox
												checked={passType === 'text'}
												onCheckedChange={() =>
													setPassType((type) =>
														type === 'text' ? 'password' : 'text'
													)
												}
											/>
										</FormControl>
										<FormLabel className='text-sm font-normal'>
											Show Password
										</FormLabel>
									</FormItem>

									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={loginMutation?.isPending}
							type='submit'
							variant={'default'}
						>
							{loginMutation?.isPending && <Loader2 className='animate-spin' />}
							Login Now
						</Button>
					</form>
				</Form>

				<div className='text-red-300 mt-2'>
					Don't have an account ?{' '}
					<Link
						to='/auth/registration'
						className='underline font-medium text-teal-500'
					>
						Signup
					</Link>
				</div>
			</div>
		</div>
	);
}

const Login_Form_Schema = Yup.object({
	email: Yup.string().email().required().label('Email'),
	password: Yup.string().min(8).required().label('Password'),
});

export type LoginFormStateType = Yup.InferType<typeof Login_Form_Schema>;
