import { Download } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateToDMY } from "@/lib/helper";
import Delete from "@/components/ui/delete";
import type { Invitee } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InviteTableProps {
  invitees: Invitee[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  deletingId: string | null;
  onDelete: (id: string) => void;
  onDownload?: (invitee: Invitee) => void;
}

export default function InviteTable({
  invitees,
  isLoading,
  isError,
  error,
  deletingId,
  onDelete,
  onDownload,
}: InviteTableProps) {
  return (
    <Card className="border-primary/10 p-0 select-none">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-3 font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Invited by</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="pr-3 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
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
            ) : invitees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No invitees found
                </TableCell>
              </TableRow>
            ) : (
              invitees.map((invitee) => {
                const isDeleting = deletingId === invitee.id;

                return (
                  <TableRow key={invitee.id}>
                    <TableCell className="p-3 font-medium">
                      {invitee.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {invitee.user.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {invitee.code}
                    </TableCell>
                    <TableCell>{formatDateToDMY(invitee.created_at)}</TableCell>
                    <TableCell className="pl-3 text-right">
                      <div className="flex justify-end gap-1">
                        {onDownload && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDownload(invitee)}
                            title="Download PDF"
                            className="cursor-pointer"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}

                        {/* DELETE */}
                        <Delete
                          user={invitee}
                          isDeleting={isDeleting}
                          onDelete={onDelete}
                        />
                      </div>
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
