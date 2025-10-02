import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Navbar from "@/components/Layouts/Navbar";
import AppSidebar from "@/components/Layouts/Sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Navbar />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
