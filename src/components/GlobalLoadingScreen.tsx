import { Loader2 } from 'lucide-react';

const GlobalLoadingScreen = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<Loader2 className='animate-spin text-teal-500' size={30} />
		</div>
	);
};

export default GlobalLoadingScreen;
