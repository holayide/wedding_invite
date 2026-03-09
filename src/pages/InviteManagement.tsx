import { Plus, Trash2, Download, Search, FileDown } from "lucide-react";
import { useState } from "react";

import { DashboardLayout } from "@/components/features/DashboardLayout";
import { generateInvitationPdf } from "@/lib/generatePdf";
import { Card, CardContent } from "@/components/ui/card";
import { useInviteStore } from "@/store/inviteStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function InviteManagement() {
  const { invitees, addInvitee, removeInvitee } = useInviteStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const filtered = invitees.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.code.toLowerCase().includes(search.toLowerCase()) ||
      i.createdAt.includes(search),
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    addInvitee(name.trim());
    setName("");
    setOpen(false);
    toast.success("Invitee added");
  };

  const exportCsv = () => {
    const csv = [
      "Name,Code,Date",
      ...invitees.map((i) => `${i.name},${i.code},${i.createdAt}`),
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

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold">Invitations</h1>
            <p className="text-muted-foreground mt-1">Manage wedding guests</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Invitee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">
                    Add New Invitee
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Guest Name</Label>
                    <Input
                      placeholder="e.g. John & Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Invitee
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, code, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="border-primary/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No invitees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((invitee) => (
                    <TableRow key={invitee.id}>
                      <TableCell className="font-medium">
                        {invitee.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {invitee.code}
                      </TableCell>
                      <TableCell>{invitee.createdAt}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => generateInvitationPdf(invitee)}
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeInvitee(invitee.id);
                            toast.success("Invitee removed");
                          }}
                          className="hover:text-destructive"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
