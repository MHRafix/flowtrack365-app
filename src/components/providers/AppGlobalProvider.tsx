import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppAlertProvider } from '../AppAlert';
import { AppConfirmProvider } from '../AppConfirm';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			staleTime: 1000 * 60 * 60, // 1 hour
			gcTime: 1000 * 60 * 60 * 6, // 6 hours
		},
	},
});
const AppGlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<QueryClientProvider client={queryClient}>
				<AppConfirmProvider>
					<AppAlertProvider>
						{children}
						<Toaster />
					</AppAlertProvider>
				</AppConfirmProvider>
			</QueryClientProvider>
		</Suspense>
	);
};

export default AppGlobalProvider;
