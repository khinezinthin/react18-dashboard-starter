import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import Header from "./Header";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="  w-full">
        <header className=" flex items-center justify-between h-16 bg-[#fafafa] sticky top-0  z-50 p-3">
          <SidebarTrigger />
          <Header />
        </header>

        <div className=" p-5">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
