import { Brand } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { getFileUrl } from '@/lib/getFileUrl';
import { ServerFileReference } from '@/types/commonModelTypes';
import { ColumnDef } from '@tanstack/react-table';

export const brandTableColumns: ColumnDef<Brand>[] = [
	{
		accessorKey: 'title',
		header: 'Brand Title',
		cell: ({ row }) => {
			return (
				<div className='flex gap-3 items-center'>
					<div>
						<img
							src={
								getFileUrl(row?.original?.logo as ServerFileReference) ||
								'https://www.upoharbd.com/images/uploads/Ramadan/attar_c.jpg'
							}
							alt='brand_image'
							width={80}
							height={80}
							className='object-cover rounded-md'
						/>
					</div>
					<div>
						<p className='text-xl font-semibold'>{row?.original?.name}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},

	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return (
				<span className='bg-teal-500 p-2 rounded-md font-semibold'>
					{formatDate(row.getValue('createdAt')) || 'N/A'}
				</span>
			);
		},
	},
];
