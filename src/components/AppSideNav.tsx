import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import {
	BanknoteArrowDown,
	Blocks,
	ChartNetwork,
	ChevronDown,
	ChevronRight,
	Headphones,
	HomeIcon,
	SquareStack,
} from 'lucide-react';
import { useState } from 'react';

const items = [
	{
		title: 'Dashboard',
		url: '/',
		icon: HomeIcon,
	},
	{
		title: 'Task Management',
		url: '/task-management',
		icon: ChartNetwork,
	},
	{
		title: 'Expense Management',
		url: '/expense-management/expenses',
		icon: BanknoteArrowDown,
		items: [
			{
				title: 'All Expenses',
				url: '/expense-management/expenses',
				icon: Blocks,
			},
			{
				title: 'Expense Categories',
				url: '/expense-management/expense-categories',
				icon: SquareStack,
			},
		],
	},
	{
		title: 'CRM Management',
		url: '/crm-management',
		icon: Headphones,
	},
];

const AppSidenav = () => {
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

								return (
									<div key={item.title}>
										<SidebarMenuItem>
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
												{item?.items?.map((subItem) => (
													<SidebarMenuItem key={subItem.title}>
														<SidebarMenuButton asChild>
															<Link to={subItem.url}>
																<subItem.icon size={20} className='!mr-2' />
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
											</div>
										)}
									</div>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* <SidebarFooter>Footer content</SidebarFooter> */}
		</Sidebar>
	);
};

export default AppSidenav;
