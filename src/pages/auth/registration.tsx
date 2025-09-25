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
import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { authApi } from './~module/api/auth.api';

export const Route = createFileRoute('/auth/registration')({
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
	// handle redirect
	const navigate = useNavigate();
	const [passType, setPassType] = useState<'password' | 'text'>('password');

	const handleRedirect = () => {
		navigate({ to: '/auth/login' }); // Replace '/settings' with any route path
	};

	const { registrationMutation } = authApi(() => handleRedirect());

	// Define your form.
	const form = useForm<RegistrationFormStateType>({
		resolver: yupResolver(Registration_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: RegistrationFormStateType) {
		registrationMutation.mutate(values);
	}

	return (
		<div className='flex h-screen items-center justify-center bg-white dark:bg-slate-900'>
			<div className='lg:w-5/12 w-full bg-neutral-50 dark:bg-slate-800 px-5 py-6 rounded-sm'>
				<h2 className='text-2xl font-semibold my-5'>Get Started</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your username'
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
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											type='tel'
											placeholder='Enter your phone'
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
						<Button type='submit' variant={'default'}>
							{registrationMutation?.isPending && (
								<Loader2 className='animate-spin' />
							)}{' '}
							Get Started
						</Button>
					</form>
				</Form>

				<div className='text-red-300 mt-2'>
					Already have an account ?{' '}
					<Link
						to='/auth/login'
						className='underline font-medium text-teal-500'
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

const Registration_Form_Schema = Yup.object({
	name: Yup.string().required().label('Username'),
	email: Yup.string().email().required().label('Email'),
	phone: Yup.string().required().label('Phone'),
	password: Yup.string().min(8).required().label('Password'),
});

export type RegistrationFormStateType = Yup.InferType<
	typeof Registration_Form_Schema
>;
