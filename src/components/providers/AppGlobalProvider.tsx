'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppAlertProvider } from '../AppAlert';
import { AppConfirmProvider } from '../AppConfirm';

export const queryClient = new QueryClient();

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
