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
import { Link } from '@tanstack/react-router';
import { ChartNetwork, Headphones, HomeIcon, Layers2 } from 'lucide-react';

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
		url: '/expense-management',
		icon: Layers2,
	},
	{
		title: 'CRM Management',
		url: '/crm-management',
		icon: Headphones,
	},
];

const AppSidenav = () => {
	const { state } = useSidebar();
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<div className='flex items-center gap-2'>
					{/* <img
            src="/dinebd-business-logo.png"
            className={clsx("w-auto", {
              "h-10": state === "expanded",
              "h-[30px]": state === "collapsed",
            })}
          /> */}
					{state === 'expanded' && (
						<h2 className='font-semibold text-3xl'>Flow Track 365</h2>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={`${item.url}`}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter>
				{/* <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.emailAddresses[0].emailAddress}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu> */}
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidenav;
