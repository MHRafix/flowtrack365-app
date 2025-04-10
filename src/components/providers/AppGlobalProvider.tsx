'use client';
import React, { PropsWithChildren, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppAlertProvider } from '../AppAlert';
import { AppConfirmProvider } from '../AppConfirm';

const AppGlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			{/* <TanstackProvider> */}
			<AppConfirmProvider>
				<AppAlertProvider>
					{children}
					<Toaster />
				</AppAlertProvider>
			</AppConfirmProvider>
			{/* </TanstackProvider> */}
		</Suspense>
	);
};

export default AppGlobalProvider;
