import Navbar from '@/components/Layouts/Navbar'
import AppSidebar from '@/components/Layouts/Sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Navbar />
        <div className='p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
