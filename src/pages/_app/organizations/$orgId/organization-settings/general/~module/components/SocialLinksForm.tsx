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

interface SocialLinksFormProps {
	organization: Organization;
	updateOrganization: UseMutationResult;
}

const SocialLinksForm: FC<SocialLinksFormProps> = ({
	organization,
	updateOrganization,
}) => {
	const [session] = useAtom(userAtom);

	const form = useForm<FormValues>({
		defaultValues: {
			facebook: '',
			x: '',
			instagram: '',
			youtube: '',
			daraz: '',
		},
		// @ts-ignore
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		form.setValue('facebook', organization?.socialLinks?.facebook);
		form.setValue('x', organization?.socialLinks?.x!);
		form.setValue('instagram', organization?.socialLinks?.instagram);
		form.setValue('youtube', organization?.socialLinks?.youtube!);
		form.setValue('daraz', organization?.socialLinks?.daraz!);
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
						name='facebook'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Facebook</FormLabel>
								<FormControl>
									<Input
										placeholder='www.facebook.com/page_username'
										{...field}
										value={organization?.socialLinks?.facebook!}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* orgUID */}
					<FormItem>
						<FormLabel>X</FormLabel>
						<FormControl>
							<Input
								placeholder='www.x.com/page_username'
								value={organization?.socialLinks?.x!}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* tagline */}
					<FormField
						control={form.control}
						name='instagram'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Instagram</FormLabel>
								<FormControl>
									<Input
										placeholder='www.instagram.com/page_username'
										{...field}
										value={organization?.socialLinks?.instagram!}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* email */}
					<FormField
						control={form.control}
						name='youtube'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Youtube</FormLabel>
								<FormControl>
									<Input
										placeholder='www.youtube.com/chanel_name'
										{...field}
										value={organization?.socialLinks?.youtube!}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* phone */}
					<FormField
						control={form.control}
						name='daraz'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Daraz</FormLabel>
								<FormControl>
									<Input
										placeholder='www.daraz.com.bd/username'
										{...field}
										value={organization?.socialLinks?.daraz!}
									/>
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

export default SocialLinksForm;

const schema = Yup.object().shape({
	facebook: Yup.string().optional().nullable().label('Facebook'),
	x: Yup.string().optional().nullable().label('X'),
	instagram: Yup.string().optional().nullable().label('Instagram'),
	youtube: Yup.string().optional().nullable().label('Youtube'),
	daraz: Yup.string().optional().nullable().label('Daraz'),
});

type FormValues = Yup.InferType<typeof schema>;
