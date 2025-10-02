import { FC, PropsWithChildren } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';

interface DrawerWrapperPropsType extends PropsWithChildren {
	title: string;
	isOpen: boolean;
	onCloseDrawer: CallableFunction;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses: Record<
	NonNullable<DrawerWrapperPropsType['size']>,
	string
> = {
	sm: 'w-64', // ~256px
	md: 'w-96', // ~384px
	lg: 'w-[600px]', // custom size
	xl: 'w-[800px]', // bigger
	full: 'w-screen', // full width
};

const DrawerWrapper: FC<DrawerWrapperPropsType> = ({
	title,
	isOpen,
	children,
	onCloseDrawer,
	size = 'xl',
}) => {
	return (
		<Drawer open={isOpen} direction='right' onClose={() => onCloseDrawer()}>
			<DrawerContent
				className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-900 shadow-xl ${sizeClasses[size]}`}
			>
				<div className='flex flex-col h-full'>
					<DrawerHeader>
						<DrawerTitle className='font-bold text-xl'>{title}</DrawerTitle>
					</DrawerHeader>
					<div className='p-4 pb-0 flex-1 overflow-y-auto'>{children}</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerWrapper;
