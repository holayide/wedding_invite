import { LayoutDashboard, Users, Mail, LogOut, Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { NavLink } from "./NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Invitations", url: "/invites", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const { setOpenMobile, setOpen, isMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <div className="flex flex-col bg-background md:bg-transparent min-h-screen">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="py-8 border-b border-primary/10">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 font-display text-lg tracking-wide">
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <Heart fill="white" className="h-4 w-4 text-white" />
                  </div>

                  {!collapsed && <span>Wedding Admin</span>}
                </div>

                <button
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    } else {
                      setOpen(false);
                    }
                  }}
                  className="block md:hidden p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu
                className={`flex flex-col gap-5 ${collapsed ? "pt-0" : "pt-5 "}`}
              >
                {navItems.map((item) => {
                  if (item.url === "/users" && user?.role !== "super_admin")
                    return null;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="hover:bg-accent/50"
                          activeClassName="bg-accent text-primary font-medium hover:bg-accent hover:text-primary"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
