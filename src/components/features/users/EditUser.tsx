import { Pen } from "lucide-react";
import { useState } from "react";

import UserForm, { type UserFormValues } from "./UserForm";
import { Button } from "@/components/ui/button";
import { useEditAdmin } from "@/hooks/services/users";
import type { User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditUserProps {
  user: User;
}

export default function EditUser({ user }: EditUserProps) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: editAdmin, isPending: isEditingAdmin } = useEditAdmin();

  const onEditSubmit = (values: UserFormValues) => {
    editAdmin(
      { id: user.id, data: values },
      {
        onSuccess: () => setEditOpen(false),
      },
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setEditOpen(true)}
        title="Edit Admin"
        className="cursor-pointer"
      >
        <Pen className="h-4 w-4" />
      </Button>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
          </DialogHeader>

          <DialogDescription className="sr-only" />

          <UserForm
            initialData={user}
            onSubmit={onEditSubmit}
            isLoading={isEditingAdmin}
            buttonText="Update Admin"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
