import { Users, Mail, Heart, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/features/DashboardLayout";
import { useAnalytics } from "@/hooks/services/analytics";
import { useInvites } from "@/hooks/services/invite";
import { useUsers } from "@/hooks/services/users";
import { useAuthStore } from "@/store/authStore";
import { formatDateToDMY } from "@/lib/helper";

export default function Dashboard() {
  const { user } = useAuthStore();

  const { data: analytics, isLoading: isAnalysing } = useAnalytics();
  const { data: invitees = [], isLoading: isInviting } = useInvites();
  const { data: admins = [], isLoading } = useUsers();

  const stats = [
    {
      title: "Total Users",
      value: analytics?.users ?? 0,
      icon: Users,
      description: "Admin accounts",
      loading: isAnalysing,
    },
    {
      title: "Total Invites",
      value: analytics?.invites ?? 0,
      icon: Mail,
      description: "Wedding guests",
      loading: isAnalysing,
    },
    {
      title: "Admins",
      value: admins.length ?? 0,
      icon: Heart,
      description: "Limited access",
      loading: isLoading,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <div className="text-3xl font-display font-bold">
                    {stat.loading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      stat.value
                    )}
                  </div>
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
            <CardTitle className="font-display text-xl font-medium">
              Recent Invitees
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isInviting ? (
              <div className="text-base text-center py-8">
                Loading invitees...
              </div>
            ) : invitees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No invitees found
              </div>
            ) : (
              <div className="space-y-3">
                {invitees.slice(0, 5).map((invitee) => (
                  <div
                    key={invitee.id}
                    className="py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="max-w-175 flex items-center justify-between">
                      <div>
                        <p className="text-base font-medium">{invitee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Code: {invitee.code}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDateToDMY(invitee.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
