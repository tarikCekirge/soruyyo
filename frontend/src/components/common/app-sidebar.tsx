
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
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useUser } from "@/context/UserContext";




export function AppSidebar({ activeMenu }: { activeMenu: string }) {
    const { clearUser } = useUser();
    const navigate = useNavigate()

    const handleClick = (route: string) => {
        if (route === "/cikis") {
            handleLogout()
        }
        navigate(route)

    }
    const handleLogout = () => {
        localStorage.clear();
        clearUser()
        navigate("/giris")
    }
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
                                        <Button variant={activeMenu === item.label ? "outline" : "ghost"} onClick={() => handleClick(item.path)} className="flex items-center justify-start w-full">
                                            <item.icon size={24} className="min-w-6 ml-1" />
                                            <span>{item.label}</span>
                                        </Button>
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
