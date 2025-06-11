import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { StorageUtil } from '@/lib/storage.util';
import { fetchME } from '@/store/auth.atom';
import { Link, useRouter } from '@tanstack/react-router';
import {
	BanknoteArrowDown,
	Blocks,
	ChartNetwork,
	ChevronDown,
	ChevronRight,
	HandCoins,
	Headphones,
	HomeIcon,
	LayoutGrid,
	LayoutList,
	ListTodo,
	LogOutIcon,
	ShoppingCart,
	SquareStack,
} from 'lucide-react';
import { useState } from 'react';
import { useAppConfirm } from './AppConfirm';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
const organizationUID = localStorage.getItem('orgUID');
const items = [
	{
		title: 'Dashboard',
		url: `/organizations/${organizationUID}`,
		icon: HomeIcon,
	},
	{
		title: 'Task Management',
		url: `/organizations/${organizationUID}/task-management`,
		icon: ChartNetwork,
	},
	{
		title: 'Inventory Management',
		url: `/organizations/${organizationUID}/inventory-management/products`,
		icon: ListTodo,
		items: [
			{
				title: 'All Products',
				url: `/organizations/${organizationUID}/inventory-management/products`,
				icon: LayoutList,
			},
			{
				title: 'Product Categories',
				url: `/organizations/${organizationUID}/inventory-management/products-categories`,
				icon: LayoutGrid,
			},
		],
	},
	{
		title: 'All Orders',
		url: `/organizations/${organizationUID}/orders-management/all-orders`,
		icon: ShoppingCart,
	},
	{
		title: 'Account Management',
		url: `/organizations/${organizationUID}/accounts-management/all-expenses`,
		icon: BanknoteArrowDown,
		items: [
			{
				title: 'Account Savings',
				url: `/organizations/${organizationUID}/accounts-management/account-savings`,
				icon: HandCoins,
			},
			{
				title: 'All Expenses',
				url: `/organizations/${organizationUID}/accounts-management/all-expenses`,
				icon: Blocks,
			},
			{
				title: 'Expense Categories',
				url: `/organizations/${organizationUID}/accounts-management/expense-categories`,
				icon: SquareStack,
			},
		],
	},
	{
		title: 'CRM Management',
		url: `/organizations/${organizationUID}/crm-management`,
		icon: Headphones,
	},
];

const AppSidenav = () => {
	const appConfirmHandle = useAppConfirm();
	const router = useRouter();
	const { state } = useSidebar();
	const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
		{}
	);

	const toggleItem = (title: string) => {
		setExpandedItems((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	// Add inside AppSidenav before return
	const pathname = router.state.location.pathname;

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<div className='flex items-center gap-2'>
					{state === 'expanded' && (
						<h2 className='font-semibold text-3xl'>Flow Track 365</h2>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const hasChildren = !!item.items?.length;
								const isExpanded = expandedItems[item.title];
								const hasActiveChild =
									item.items && item.items.some((sub) => pathname === sub.url);
								const shouldExpand = isExpanded || hasActiveChild;

								// Check if current item or any subitem is active
								const isActive =
									pathname === item.url ||
									(item.items &&
										item.items.some((sub) => pathname === sub.url));

								return (
									<div key={item.title}>
										<SidebarMenuItem
											className={isActive ? '!bg-primary !rounded-md' : ''}
										>
											<SidebarMenuButton
												asChild={!hasChildren}
												onClick={() => hasChildren && toggleItem(item.title)}
											>
												{hasChildren ? (
													<button className='flex items-center w-full'>
														<item.icon size={20} className='!mr-2' />
														<span className='flex-1 text-left'>
															{item.title}
														</span>
														{shouldExpand ? (
															<ChevronDown size={16} />
														) : (
															<ChevronRight size={16} />
														)}
													</button>
												) : (
													<Link to={item.url}>
														<item.icon size={20} className='!mr-2' />
														<span>{item.title}</span>
													</Link>
												)}
											</SidebarMenuButton>
										</SidebarMenuItem>

										{hasChildren && shouldExpand && (
											<div className='pl-6'>
												{item?.items?.map((subItem) => {
													const isSubActive = pathname === subItem.url;
													return (
														<SidebarMenuItem
															key={subItem.title}
															className={
																isSubActive
																	? '!bg-primary !rounded-md my-1'
																	: ''
															}
														>
															<SidebarMenuButton asChild>
																<Link to={subItem.url}>
																	<subItem.icon size={20} className='!mr-2' />
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													);
												})}
											</div>
										)}
									</div>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<Button
					variant={'ghost'}
					onClick={() => {
						appConfirmHandle.show({
							title: 'Logout',
							onConfirm: async () => {
								StorageUtil.removeItem('token');
								StorageUtil.removeItem('orgUID');
								await fetchME();
								router.invalidate();
							},
						});
					}}
				>
					<LogOutIcon />
					Logout
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>MH</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidenav;
{
	/* <SidebarMenu>
	{items.map((item) => {
		const hasChildren = !!item.items?.length;
		const isExpanded = expandedItems[item.title];

		// Check if current item or any subitem is active
		const isActive =
			pathname === item.url ||
			(item.items && item.items.some((sub) => pathname === sub.url));

		return (
			<div key={item.title}>
				<SidebarMenuItem className={isActive ? 'bg-muted text-primary' : ''}>
					<SidebarMenuButton
						asChild={!hasChildren}
						onClick={() => hasChildren && toggleItem(item.title)}
					>
						{hasChildren ? (
							<button className='flex items-center w-full'>
								<item.icon size={20} className='!mr-2' />
								<span className='flex-1 text-left'>{item.title}</span>
								{isExpanded ? (
									<ChevronDown size={16} />
								) : (
									<ChevronRight size={16} />
								)}
							</button>
						) : (
							<Link to={item.url}>
								<item.icon size={20} className='!mr-2' />
								<span>{item.title}</span>
							</Link>
						)}
					</SidebarMenuButton>
				</SidebarMenuItem>

				{hasChildren && isExpanded && (
					<div className='pl-6'>
						{item?.items?.map((subItem) => {
							const isSubActive = pathname === subItem.url;
							return (
								<SidebarMenuItem
									key={subItem.title}
									className={isSubActive ? 'bg-muted text-primary' : ''}
								>
									<SidebarMenuButton asChild>
										<Link to={subItem.url}>
											<subItem.icon size={20} className='!mr-2' />
											<span>{subItem.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</div>
				)}
			</div>
		);
	})}
</SidebarMenu>; */
}
