import { Organization } from '@/gql/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
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
import { userAtom } from '@/store/auth.atom';
import { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';

interface OrganizationBasicInformationProps {
	organization: Organization;
	updateOrganization: UseMutationResult;
}

const OrganizationBasicInformation: FC<OrganizationBasicInformationProps> = ({
	organization,
	updateOrganization,
}) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		form.setValue('name', organization?.name);
		form.setValue('tagline', organization?.tagline!);
		form.setValue('businessEmail', organization?.businessEmail);
		form.setValue('businessPhone', organization?.businessPhone!);
		form.setValue('address', organization?.address!);
	}, [organization]);

	const onSubmit = (values: FormValues) => {
		updateOrganization.mutate({
			...values,
			_id: organization?._id,
			orgUID: session?.orgUID,
		});
	};

	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
					{/* name */}
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Organization name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* orgUID */}
					<FormItem>
						<FormLabel>Organization UID</FormLabel>
						<FormControl>
							<Input
								placeholder='Organization UID'
								value={organization?.orgUID!}
								disabled
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* tagline */}
					<FormField
						control={form.control}
						name='tagline'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tagline</FormLabel>
								<FormControl>
									<Input placeholder='Organization tagline' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* email */}
					<FormField
						control={form.control}
						name='businessEmail'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Business Email</FormLabel>
								<FormControl>
									<Input placeholder='Organization business email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* phone */}
					<FormField
						control={form.control}
						name='businessPhone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Business Phone</FormLabel>
								<FormControl>
									<Input placeholder='Organization business phone' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* address */}
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder='Organization address' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type='submit'
						className='w-full'
						disabled={updateOrganization.isPending}
					>
						{updateOrganization?.isPending && (
							<Loader2 className='animate-spin' />
						)}
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default OrganizationBasicInformation;

const schema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	tagline: Yup.string().required('Tagline is required'),
	businessEmail: Yup.string().required('Email is required'),
	businessPhone: Yup.string().required('Phone  is required'),
	address: Yup.string().required('Address is required'),
});

type FormValues = Yup.InferType<typeof schema>;
