import React from "react";
import { ChevronDown } from "lucide-react";
// 💡 Replace the div with your actual Collapsible components for animation!
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Components needed from your sidebar library
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import type { NavItem } from "./AppSidebar";
import { Link, useLocation } from "react-router";

// Assume NavItem type is imported

type SubmenuItemProps = {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
};

const SubmenuItem: React.FC<SubmenuItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarMenuItem key={item.title}>
      <div onClick={onToggle} className="cursor-pointer">
        <SidebarMenuButton className="justify-between w-full">
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </div>

          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </SidebarMenuButton>
      </div>

      {isOpen && (
        <SidebarMenuSub>
          {item.children?.map((subItem) => {
            const isActive = currentPath === subItem.url;
            return (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={isActive}>
                  <Link
                    to={subItem.url ?? ""}
                    className="flex items-center gap-2"
                  >
                    {subItem.icon && <subItem.icon className="h-4 w-4" />}
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
};

export default SubmenuItem;
