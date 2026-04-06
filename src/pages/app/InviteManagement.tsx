import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/features/DashboardLayout";
import { useDeleteInvite, useInvites } from "@/hooks/services/invite";
import InviteTable from "@/components/features/invites/InviteTable";
import AddInvite from "@/components/features/invites/AddInvite";
import { generateInvitationPdf } from "@/lib/generatePdf";
import Pagination from "@/components/ui/pagination";
import { useUsers } from "@/hooks/services/users";
import { Input } from "@/components/ui/input";
import type { Invitee } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InviteManagement() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<string>("all");
  const [localDeletingId, setLocalDeletingId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: invitees = [], isLoading, isError, error } = useInvites(search);
  const { data: admins = [] } = useUsers("");
  const { mutate: deleteInvite, isPending: isDeleting } = useDeleteInvite();

  // const { paginatedInvitees, totalPages } = useMemo(() => {
  //   const totalPages = Math.ceil(invitees.length / itemsPerPage) || 1;
  //   const start = (currentPage - 1) * itemsPerPage;

  //   return {
  //     paginatedInvitees: invitees.slice(start, start + itemsPerPage),
  //     totalPages,
  //   };
  // }, [invitees, currentPage]);

  const { paginatedInvitees, totalPages, filteredCount } = useMemo(() => {
    // 1. Filter by Admin Name
    const filtered = invitees.filter((invitee) => {
      if (selectedAdmin === "all") return true;
      return invitee.user.name === selectedAdmin;
    });

    // 2. Paginate the filtered results
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const start = (currentPage - 1) * itemsPerPage;

    return {
      paginatedInvitees: filtered.slice(start, start + itemsPerPage),
      totalPages,
      filteredCount: filtered.length,
    };
  }, [invitees, selectedAdmin, currentPage]);

  const handleDelete = (id: string) => {
    setLocalDeletingId(id);
    deleteInvite(id, {
      onSettled: () => setLocalDeletingId(null),
    });
  };

  const exportCsv = () => {
    const csv = [
      "Name,Code,Date",
      ...invitees.map((i) => `${i.name},${i.code},${i.created_at}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invitees.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported successfully");
  };

  const handleDownload = (invitee: Invitee) => {
    console.log("Downloading for", invitee.name);
    generateInvitationPdf(invitee);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold">Invitations</h1>
            <p className="text-muted-foreground mt-1">Manage wedding guests</p>
          </div>

          <AddInvite exportCsv={exportCsv} open={open} setOpen={setOpen} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 ">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, code, or date..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10"
            />
          </div>

          <Select
            value={selectedAdmin}
            onValueChange={(value) => {
              setSelectedAdmin(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-50 h-10 cursor-pointer">
              <SelectValue placeholder="Filter by Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Admins</SelectItem>
              {admins.map((admin) => (
                <SelectItem key={admin.id} value={admin.name}>
                  {admin.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <InviteTable
          invitees={paginatedInvitees}
          isLoading={isLoading}
          isError={isError}
          error={error}
          deletingId={isDeleting ? localDeletingId : null}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            // totalItems={invitees.length}
            totalItems={filteredCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
