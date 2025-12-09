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
			socialLinks: { ...values },
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
						render={() => (
							<FormItem>
								<FormLabel>Facebook</FormLabel>
								<FormControl>
									<Input
										placeholder='www.facebook.com/page_username'
										onChange={(e) =>
											form.setValue('facebook', e?.target?.value!)
										}
										defaultValue={organization?.socialLinks?.facebook!}
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
								onChange={(e) => form.setValue('x', e?.target?.value!)}
								defaultValue={organization?.socialLinks?.x!}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* tagline */}
					<FormField
						control={form.control}
						name='instagram'
						render={() => (
							<FormItem>
								<FormLabel>Instagram</FormLabel>
								<FormControl>
									<Input
										placeholder='www.instagram.com/page_username'
										onChange={(e) =>
											form.setValue('instagram', e?.target?.value!)
										}
										defaultValue={organization?.socialLinks?.instagram!}
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
						render={() => (
							<FormItem>
								<FormLabel>Youtube</FormLabel>
								<FormControl>
									<Input
										placeholder='www.youtube.com/chanel_name'
										onChange={(e) =>
											form.setValue('youtube', e?.target?.value!)
										}
										defaultValue={organization?.socialLinks?.youtube!}
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
						render={() => (
							<FormItem>
								<FormLabel>Daraz</FormLabel>
								<FormControl>
									<Input
										placeholder='www.daraz.com.bd/username'
										onChange={(e) => form.setValue('daraz', e?.target?.value!)}
										defaultValue={organization?.socialLinks?.daraz!}
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
	facebook: Yup.string()
		.nullable()
		.notRequired()
		.test(
			'facebook-url',
			'Facebook URL must start with "https://facebook.com" or "https://www.facebook.com"',
			(value) => !value || /^https?:\/\/(www\.)?facebook\.com\/.+$/i.test(value)
		)
		.label('Facebook'),

	x: Yup.string()
		.nullable()
		.notRequired()
		.test(
			'x-url',
			'X URL must start with "https://x.com" or "https://www.x.com"',
			(value) => !value || /^https?:\/\/(www\.)?x\.com\/.+$/i.test(value)
		)
		.label('X'),

	instagram: Yup.string()
		.nullable()
		.notRequired()
		.test(
			'instagram-url',
			'Instagram URL must start with "https://instagram.com"',
			(value) =>
				!value || /^https?:\/\/(www\.)?instagram\.com\/.+$/i.test(value)
		)
		.label('Instagram'),

	youtube: Yup.string()
		.nullable()
		.notRequired()
		.test(
			'youtube-url',
			'YouTube URL must start with "https://youtube.com" or "https://youtu.be"',
			(value) =>
				!value ||
				/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(value)
		)
		.label('YouTube'),

	daraz: Yup.string()
		.nullable()
		.notRequired()
		.test(
			'daraz-url',
			'Daraz URL must start with "https://daraz.com" or its regional variant (e.g., daraz.pk)',
			(value) =>
				!value || /^https?:\/\/(www\.)?daraz\.[a-z.]+\/.+$/i.test(value)
		)
		.label('Daraz'),
});

type FormValues = Yup.InferType<typeof schema>;
