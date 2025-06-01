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
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const Route = createFileRoute('/organizations/create-organization')({
	component: RouteComponent,
});

function RouteComponent() {
	// Define your form.
	const form = useForm<OrganizationFormStateType>({
		resolver: yupResolver(Create_Organization_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: OrganizationFormStateType) {}

	return (
		<div className='flex h-screen items-center justify-center bg-white dark:bg-slate-900 my-5'>
			<div className='lg:w-6/12 '>
				<div className='w-full bg-neutral-100 dark:bg-slate-800 p-6 rounded-sm'>
					<h2 className='text-2xl font-semibold my-5'>Create Organization</h2>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter your name' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='tagline'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tagline</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter organization tagline'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='businessEmail'
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
								name='businessPhone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input placeholder='Enter your phone' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter organization address'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' variant={'default'}>
								{/* {loginMutation?.isPending && (
									<Loader2 className='animate-spin' />
								)} */}
								Create
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

const Create_Organization_Form_Schema = Yup.object({
	name: Yup.string().required().label('Name'),
	tagline: Yup.string().required().label('Tagline'),
	businessEmail: Yup.string().email().required().label('Email'),
	businessPhone: Yup.string().required().label('Phone'),
	address: Yup.string().required().label('Address'),
});

export type OrganizationFormStateType = Yup.InferType<
	typeof Create_Organization_Form_Schema
>;
