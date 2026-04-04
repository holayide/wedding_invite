import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, FileDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

import { useAddLogin } from "@/hooks/services/invite";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const inviteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});
export type InviteFormValues = z.infer<typeof inviteSchema>;

interface AddInviteProps {
  exportCsv: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddInvite({
  exportCsv,
  open,
  setOpen,
}: AddInviteProps) {
  const { mutate: addInvitee, isPending } = useAddLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: InviteFormValues) => {
    addInvitee(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={exportCsv}
        className="px-6 py-5 cursor-pointer"
      >
        <FileDown className="mr-2 h-4 w-4" />
        Export
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-6 py-5 cursor-pointer hover:opacity-70">
            <Plus className="mr-2 h-4 w-4" />
            Add Invitee
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display font-semibold">
              Add New Invitee
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="sr-only" />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4">
            <div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Guest Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Jane Doe"
                  {...register("name")}
                  disabled={isPending}
                  className="h-10"
                  autoComplete="off"
                />
              </div>
              {errors.name && (
                <p className="text-xs pt-1 text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-5 cursor-pointer hover:opacity-70"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Add Invitee"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
