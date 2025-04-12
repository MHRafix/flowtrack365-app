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
import { createLazyFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { authApi } from './~lib/api/auth.api';

export const Route = createLazyFileRoute('/auth/get-started/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { registrationMutation } = authApi();

	// Define your form.
	const form = useForm<RegistrationFormStateType>({
		resolver: yupResolver(Registration_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: RegistrationFormStateType) {
		registrationMutation.mutate(values);
	}

	return (
		<div className='flex h-screen items-center justify-center'>
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
										/>
									</FormControl>

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
			</div>
		</div>
	);
}

const Registration_Form_Schema = Yup.object({
	name: Yup.string().required().label('Username'),
	email: Yup.string().email().required().label('Email'),
	phone: Yup.string().required().label('Phone'),
});

export type RegistrationFormStateType = Yup.InferType<
	typeof Registration_Form_Schema
>;
