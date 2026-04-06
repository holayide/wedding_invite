import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import Delete from "@/components/ui/delete";
import EditUser from "./EditUser";

interface UserTableProps {
  admins: User[];
  actionId: string | null;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isBlocking: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
  onToggleBlock: (id: string) => void;
}

export default function UserTable({
  admins,
  isLoading,
  isError,
  error,
  actionId,
  deletingId,
  isBlocking,
  onDelete,
  onToggleBlock,
}: UserTableProps) {
  return (
    <Card className="border-primary/10 p-0 select-none">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-3 font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Active</TableHead>
              <TableHead className="pr-3 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading invitees...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-red-500"
                >
                  {error instanceof Error
                    ? error.message
                    : "Failed to load users"}
                </TableCell>
              </TableRow>
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No admin found
                </TableCell>
              </TableRow>
            ) : (
              admins.map((user) => {
                const rowIsDeleting = deletingId === user.id;
                const rowIsBlocking = isBlocking && actionId === user.id;

                return (
                  <TableRow key={user.id}>
                    <TableCell className="p-3 font-medium">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "super_admin" ? "default" : "secondary"
                        }
                      >
                        {user.role === "super_admin" ? "Super Admin" : "Admin"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.is_blocked ? (
                        <span className="text-red-500">Suspended</span>
                      ) : (
                        <span className="text-green-500">Active</span>
                      )}
                    </TableCell>
                    <TableCell className="pl-3 flex justify-end items-center gap-4 text-right">
                      {/* SWITCH */}
                      {rowIsBlocking ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <Switch
                          checked={!user.is_blocked}
                          onCheckedChange={() => onToggleBlock(user.id)}
                          disabled={isBlocking}
                          className="cursor-pointer"
                        />
                      )}

                      {/* EDIT */}
                      <EditUser user={user} />

                      {/* DELETE */}
                      <Delete
                        user={user}
                        type="Admin"
                        isDeleting={rowIsDeleting}
                        actionId={actionId}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
