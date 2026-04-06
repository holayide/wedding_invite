import { Navigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { DashboardLayout } from "@/components/features/DashboardLayout";
import CreateUser from "@/components/features/users/CreateUser";
import UserTable from "@/components/features/users/UserTable";
import {
  useBlockAdmin,
  useDeleteAdmin,
  useUsers,
} from "@/hooks/services/users";
import { useAuthStore } from "@/store/authStore";
import Pagination from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, isAuthenticated } = useAuthStore();

  // Data & Mutations
  const { data: admins = [], isLoading, isError, error } = useUsers(search);
  const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin();
  const { mutate: blockAdmin, isPending: isBlocking } = useBlockAdmin();

  // Pagination Logic
  const { paginatedAdmins, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(admins.length / itemsPerPage) || 1;
    const start = (currentPage - 1) * itemsPerPage;
    return {
      paginatedAdmins: admins.slice(start, start + itemsPerPage),
      totalPages,
    };
  }, [admins, currentPage]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "super_admin") return <Navigate to="/dashboard" replace />;

  const handleDelete = (id: string) => {
    setActionId(id);
    deleteAdmin(id, { onSettled: () => setActionId(null) });
  };

  const handleToggleBlock = (id: string) => {
    setActionId(id);
    blockAdmin(id, { onSettled: () => setActionId(null) });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-3xl font-display font-semibold">
              User Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage admin accounts
            </p>
          </div>

          <CreateUser open={open} setOpen={setOpen} />
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-10"
          />
        </div>

        <UserTable
          admins={paginatedAdmins}
          isLoading={isLoading}
          isError={isError}
          error={error}
          actionId={actionId}
          isBlocking={isBlocking}
          onDelete={handleDelete}
          onToggleBlock={handleToggleBlock}
          deletingId={isDeleting ? actionId : null}
        />

        {!isLoading && admins.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={admins.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
