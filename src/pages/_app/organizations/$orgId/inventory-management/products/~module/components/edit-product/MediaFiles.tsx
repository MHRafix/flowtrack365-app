import { Product } from '@/gql/graphql';
import { UseMutationResult } from '@tanstack/react-query';
import { FC } from 'react';

interface MediaFilesProps {
	product: Product;
	updateProduct: UseMutationResult;
}

const MediaFiles: FC<MediaFilesProps> = ({ product, updateProduct }) => {
	return (
		<div className='bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
			MediaFiles
		</div>
	);
};

export default MediaFiles;
