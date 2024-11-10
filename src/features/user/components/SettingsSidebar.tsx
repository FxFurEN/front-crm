'use client'

import { Home, Inbox, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components/ui'
import { pageConfig } from '@/shared/config'

const items = [
	{
		title: 'Профиль',
		url: pageConfig.dashboard.settings.profile,
		icon: Home
	},
	{
		title: 'Приглашение',
		url: pageConfig.dashboard.settings.invitation,
		icon: Inbox
	},
	{
		title: 'Пользователи',
		url: pageConfig.dashboard.settings.users,
		icon: Users
	}
]

export function SettignsSidebar() {
	const pathname = usePathname()

	return (
		<Sidebar collapsible='none' className='hidden min-h-screen md:flex'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url}
									>
										<Link href={item.url}>
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
		</Sidebar>
	)
}
