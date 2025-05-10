import { FC, JSX, PropsWithChildren } from 'react';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer';

interface DrawerWrapperPropsType extends PropsWithChildren {
	title: string;
	triggerButton: JSX.Element;
}

const DrawerWrapper: FC<DrawerWrapperPropsType> = ({
	title,
	triggerButton,
	children,
}) => {
	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
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
