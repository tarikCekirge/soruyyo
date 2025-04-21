import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SIDE_MENU_DATA } from "@/utils/data"
import { Link } from "react-router-dom"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]


export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="icon" className="pt-14" >
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel asChild >
                        <div className="pt-8 pb-6 transition-all ">
                            <h2 className="text-2xl">Soruyyo App</h2>
                        </div>
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SIDE_MENU_DATA.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton asChild size={"lg"}>
                                        <div>
                                            <Link to={item.path} className="flex items-center pl-1">
                                                <item.icon size={24} className="min-w-6 mr-2" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </div>
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
