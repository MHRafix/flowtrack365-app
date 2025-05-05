import { Button } from '@/components/ui/button';
import {
	createLazyFileRoute,
	useNavigate,
	useSearch,
} from '@tanstack/react-router';
import { ArrowLeft, BadgeCheckIcon, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { authApi } from './~module/api/auth.api';

export const Route = createLazyFileRoute('/auth/verify-login')({
	component: RouteComponent,
});

function RouteComponent() {
	// handle redirect
	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate({ to: '/home' }); // Replace '/settings' with any route path
	};

	const { verifyMagicLoginMutation } = authApi(handleRedirect);

	const { token }: { token: string } = useSearch({
		from: '/auth/verify-login',
	});

	useEffect(() => {
		verifyMagicLoginMutation.mutate({ token });
	}, [token]);

	return (
		<div className='w-full h-screen flex justify-center items-center bg-white dark:bg-slate-900'>
			{verifyMagicLoginMutation?.isError ? (
				<div className='flex gap-3 flex-col justify-center items-center'>
					<BadgeCheckIcon className='text-red-500' size={30} />
					<p className='text-red-500 text-sm'>Verification failed</p>
					<Button
						variant={'outline'}
						onClick={() => navigate({ to: '/auth/login' })}
					>
						<ArrowLeft />
						Go Back To Login
					</Button>
				</div>
			) : (
				<div className='flex gap-3 flex-col justify-center items-center'>
					<Loader2 className='animate-spin text-teal-500' size={30} />
					<p className='text-teal-500 text-sm'>Verifying your request...</p>
				</div>
			)}
		</div>
	);
}

export interface VerifyMagicLoginFormStateType {
	token: string;
}
