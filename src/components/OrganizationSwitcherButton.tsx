import * as React from 'react';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { StorageUtil } from '@/lib/storage.util';
import { userAtom } from '@/store/auth.atom';
import { IOrganization } from '@/types/organizationType';
import { Separator } from '@radix-ui/react-separator';
import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { ChevronRight, ChevronsDown, CircleCheckBig } from 'lucide-react';

export const OrganizationSwitcherDropdownBtn: React.FC<{
	organizations: IOrganization[];
}> = ({ organizations }) => {
	const [session] = useAtom(userAtom);
	const [open, setOpen] = React.useState(false);

	return (
		<div className='flex items-center'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div
						// variant='outline'
						className='flex gap-5 items-center border-1 py-2 mx-1 rounded-md px-5 text-teal-500 hover:text-teal-500 cursor-pointer justify-start hover:dark:bg-slate-800 hover:bg-slate-200  hover:duration-300'
					>
						<CircleCheckBig />
						<div>
							<p className='text-sm font-medium'>
								{
									organizations?.find((org) => org?.orgUID === session?.orgUID)
										?.name
								}
							</p>

							<p className='text-xs text-slate-400'>
								{
									organizations?.find((org) => org?.orgUID === session?.orgUID)
										?.orgUID
								}
							</p>
						</div>
						<ChevronsDown className='text-teal-500' />
					</div>
				</PopoverTrigger>
				<PopoverContent className='p-0' side='right' align='start'>
					<p className='mx-3 mt-2'>Your organizations</p>
					<Separator />
					<Command>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{organizations?.map((org) => (
									<CommandItem
										key={org?.name}
										value={org?._id}
										onSelect={(value) => {
											StorageUtil.setItem(
												'orgUID',
												organizations?.find(
													(priority) => priority._id === value
												)?.orgUID!
											);
											window.location.reload();

											setOpen(false);
										}}
										disabled={session?.orgUID === org?.orgUID}
										className={
											session?.orgUID === org?.orgUID ? 'text-teal-500' : ''
										}
									>
										{session?.orgUID === org?.orgUID && (
											<CircleCheckBig
												className={
													session?.orgUID === org?.orgUID ? 'text-teal-500' : ''
												}
											/>
										)}{' '}
										{org?.name}
									</CommandItem>
								))}

								<Link to='/organizations'>
									<CommandItem>
										<p className='w-full flex font-medium text-teal-500 justify-between items-center cursor-pointer'>
											Organization List{' '}
											<ChevronRight className='text-teal-500' />
										</p>
									</CommandItem>
								</Link>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
