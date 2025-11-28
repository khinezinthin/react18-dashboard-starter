import { Calendar, Home, Inbox, LogOut, type LucideIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SubmenuItem from "./SubmenuItem";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface NavItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  isActive?: boolean;
  children?: NavItem[];
}

const items: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home },

  // sub menu
  {
    title: "User",
    icon: Inbox,
    children: [
      { title: "User Create", url: "/user", icon: Inbox },

      { title: "dashboard", url: "/", icon: Calendar },
    ],
  },

  {
    title: "app",
    icon: Inbox,
    children: [
      { title: "User Create", url: "/user", icon: Inbox },

      { title: "dashboard", url: "/", icon: Calendar },
    ],
  },
];

const handleLogout = () => {
  alert("Logout functionality triggered.");
};

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const parentWithActiveChild = items.find((item) =>
      item.children?.some((child) => child.url === currentPath)
    );
    if (parentWithActiveChild) {
      setOpenSubmenu(parentWithActiveChild.title);
    }
  }, [currentPath]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application Logo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isChildrenActive = currentPath === item.url;
                if (item.children) {
                  const isOpen = openSubmenu === item.title;
                  return (
                    <SubmenuItem
                      key={item.title}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() =>
                        setOpenSubmenu((prev) =>
                          prev === item.title ? null : item.title
                        )
                      }
                    />
                  );
                }

                // single item
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(isChildrenActive ? "bg-secondary" : "")}
                    >
                      <Link to={item.url ?? ""}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-2 w-full">
          <Button
            onClick={handleLogout}
            variant="ghost" // Use a subtle variant
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
