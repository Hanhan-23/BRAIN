import { AppSidebar } from "@/componentsmasyarakat/sidebar/app-sidebar"
import { SiteHeader } from "@/componentsmasyarakat/sidebar/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/componentsmasyarakat/ui/sidebar"

export default function Page({
    children,
}: 
    Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider
        style={
            {   
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
        >
        <AppSidebar variant="inset" />
        <SidebarInset>
            <SiteHeader />
            {children}
        </SidebarInset>
        </SidebarProvider>
    )
}
