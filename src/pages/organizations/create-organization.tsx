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
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { organizationApi } from './~module/api/organization.api';

export const Route = createFileRoute('/organizations/create-organization')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [session] = useAtom(userAtom);

	const { createOrganizationMutation } = organizationApi(() => {
		navigate({ to: '/organizations' });
	});

	// Define your form.
	const form = useForm<OrganizationFormStateType>({
		resolver: yupResolver(Create_Organization_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: OrganizationFormStateType) {
		createOrganizationMutation.mutate({
			...values,
			owner: session?.userEmployeeProfile?._id!,
			employees: [session?.userEmployeeProfile?._id!],
		});
	}

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
											<Input placeholder='Enter organization name' {...field} />
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
											<Input
												placeholder='Enter organization email'
												{...field}
											/>
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
											<Input
												placeholder='Enter organization phone'
												{...field}
											/>
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

							<Button
								disabled={createOrganizationMutation?.isPending}
								type='submit'
								variant={'default'}
							>
								{createOrganizationMutation?.isPending && (
									<Loader2 className='animate-spin' />
								)}
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
