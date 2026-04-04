import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useResetPassword } from "@/hooks/services/auth";
import {
  PasswordResetForm,
  type ResetPasswordValues,
} from "@/components/features/reset";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetEmail, resetOtp, resetUserId } = useAuthStore();
  const { mutate: reset, isPending } = useResetPassword();

  const handleReset = (values: ResetPasswordValues) => {
    if (!resetEmail || !resetOtp)
      return toast.error("Session expired. Please restart the process.");

    reset(
      { ...values, user_id: resetUserId },
      {
        onSuccess: () => navigate("/login"),
      },
    );
  };

  return (
    <div className="pt-10 sm:pt-0 sm:px-4 sm:pb-4 min-h-screen flex sm:items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in border-transparent sm:border-primary/20 ring-0 sm:ring-1 bg-transparent sm:bg-card">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">
            Reset Password
          </CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>

        <CardContent>
          <PasswordResetForm onSubmit={handleReset} isLoading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
