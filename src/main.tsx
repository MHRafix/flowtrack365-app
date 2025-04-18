import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalLoadingScreen from './components/GlobalLoadingScreen';
import AppGlobalProvider from './components/providers/AppGlobalProvider';
import { ThemeProvider } from './components/providers/ThemeProvider';
import './index.css';
import { routeTree } from './pagesTree.gen';
import { jotaiStore } from './store';
import { useAuth } from './store/auth.atom';

// Create a new router instance
const router = createRouter({
	defaultPendingComponent: GlobalLoadingScreen,
	routeTree,
	context: { auth: undefined! },
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const InnerApp = () => {
	const [auth] = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<JotaiProvider store={jotaiStore}>
				<AppGlobalProvider>
					<InnerApp />
				</AppGlobalProvider>
			</JotaiProvider>
		</ThemeProvider>
	</StrictMode>
);
