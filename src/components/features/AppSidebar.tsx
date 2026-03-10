import { LayoutDashboard, Users, Mail, LogOut, Heart } from "lucide-react";
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
  //   const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <div className="flex flex-col bg-background sm:bg-transparent min-h-screen">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="font-display text-lg tracking-wide py-8 border-b border-primary/10">
              <div className="mr-2 size-10 rounded-full bg-primary flex items-center justify-center text-white">
                <Heart fill="white" className=" h-4 w-4 text-white" />
              </div>
              {!collapsed && "Wedding Admin"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu
                className={`flex flex-col gap-5 ${collapsed ? "pt-0" : "pt-5 "}`}
              >
                {navItems.map((item) => {
                  if (
                    item.url === "/users" &&
                    currentUser?.role !== "super_admin"
                  )
                    return null;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="hover:bg-accent/50"
                          activeClassName="bg-accent text-primary font-medium"
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
