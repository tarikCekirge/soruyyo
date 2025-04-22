import { ReactNode } from "react"
import { Navbar } from "../common/Navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../common/app-sidebar"

type Props = {
    children: ReactNode,
    activeMenu: string
}
const DashboardLayout = ({ children, activeMenu }: Props) => {
    return (
        <>
            <Navbar />
            <div className="relative">
                <SidebarProvider >
                    <AppSidebar activeMenu={activeMenu} />
                    <main className="w-full flex-1">
                        <div className="container mx-auto ">
                            <SidebarTrigger />
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </div>
        </>
    )
}

export default DashboardLayout
