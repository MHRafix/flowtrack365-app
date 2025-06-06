import { FC, PropsWithChildren } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';

interface DrawerWrapperPropsType extends PropsWithChildren {
	title: string;
	isOpen: boolean;
	onCloseDrawer: CallableFunction;
}

const DrawerWrapper: FC<DrawerWrapperPropsType> = ({
	title,
	isOpen,
	children,
	onCloseDrawer,
}) => {
	return (
		<Drawer open={isOpen} direction='right' onClose={() => onCloseDrawer()}>
			<DrawerContent>
				<div className='mx-auto w-full max-w-lg'>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
					</DrawerHeader>
					<div className='p-4 pb-0'>{children}</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerWrapper;
