import { Product } from '@/gql/graphql';
import { FC } from 'react';

interface MediaFilesProps {
	product: Product;
}

const MediaFiles: FC<MediaFilesProps> = ({ product }) => {
	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			MediaFiles
		</div>
	);
};

export default MediaFiles;
