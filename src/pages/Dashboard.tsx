import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/features/DashboardLayout";
import { Users, Mail, Crown, Heart } from "lucide-react";
import { useInviteStore } from "@/store/inviteStore";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

export default function Dashboard() {
  const { users } = useUserStore();
  const { invitees } = useInviteStore();
  const { currentUser } = useAuthStore();

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      description: "Admin accounts",
    },
    {
      title: "Total Invites",
      value: invitees.length,
      icon: Mail,
      description: "Wedding guests",
    },
    {
      title: "Super Admins",
      value: users.filter((u) => u.role === "super_admin").length,
      icon: Crown,
      description: "Full access",
    },
    {
      title: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      icon: Heart,
      description: "Limited access",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {currentUser?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-primary/10 hover:border-primary/30 transition-colors"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-body font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Recent Invitees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invitees.slice(0, 5).map((invitee) => (
                <div
                  key={invitee.id}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <div>
                    <p className="font-medium">{invitee.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Code: {invitee.code}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {invitee.createdAt}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
