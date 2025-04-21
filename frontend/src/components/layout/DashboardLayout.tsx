import { ReactNode } from "react"
import { Navbar } from "../common/Navbar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../common/app-sidebar"

type Props = {
    children: ReactNode,
    activeMunu: string
}
const DashboardLayout = ({ children, activeMunu }: Props) => {
    return (
        <>
            <Navbar />
            <div className="relative">
                <SidebarProvider >
                    <AppSidebar />
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
