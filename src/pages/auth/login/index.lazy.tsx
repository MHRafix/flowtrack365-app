import { createLazyFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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
import { yupResolver } from '@hookform/resolvers/yup';

export const Route = createLazyFileRoute('/auth/login/')({
	component: RouteComponent,
});

function RouteComponent() {
	// 1. Define your form.
	const form = useForm<LoginFormStateType>({
		resolver: yupResolver(Login_Form_Schema),
	});

	// 2. Define a submit handler.
	function onSubmit(values: LoginFormStateType) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='lg:w-5/12 dark:bg-slate-800 px-5 py-6 rounded-sm'>
				<h2 className='text-2xl font-semibold my-5'>Login Now</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='Enter your username' {...field} />
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
										<Input placeholder='Enter your email' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' variant={'default'}>
							Login Now
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

const Login_Form_Schema = Yup.object({
	username: Yup.string().required().label('Username'),
	email: Yup.string().email().required().label('Email'),
});

type LoginFormStateType = Yup.InferType<typeof Login_Form_Schema>;
