import { Plus } from "lucide-react";

import { useCreateAdmin } from "@/hooks/services/users";
import type { UserFormValues } from "./UserForm";
import { Button } from "@/components/ui/button";
import UserForm from "./UserForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateUser({ open, setOpen }: CreateUserProps) {
  const { mutate: createAdmin, isPending } = useCreateAdmin();

  const onSubmit = (values: UserFormValues) => {
    createAdmin(values, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-5 cursor-pointer hover:opacity-70">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Add New User</DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only" />

        <UserForm
          onSubmit={onSubmit}
          isLoading={isPending}
          buttonText="Create Admin"
        />
      </DialogContent>
    </Dialog>
  );
}
