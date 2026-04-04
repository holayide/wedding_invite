import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface PasswordResetFormProps {
  onSubmit: (values: ResetPasswordValues) => void;
  isLoading: boolean;
  loadingText?: string;
  buttonText?: string;
}

export function PasswordResetForm({
  onSubmit,
  isLoading,
  buttonText = "Reset Password",
  loadingText = "Reseting...",
}: PasswordResetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          disabled={isLoading}
          placeholder="••••••••"
          className="h-10"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm New Password</Label>
        <Input
          id="password_confirmation"
          type="password"
          {...register("password_confirmation")}
          disabled={isLoading}
          placeholder="••••••••"
          className="h-10"
        />
        {errors.password_confirmation && (
          <p className="text-xs text-destructive">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {loadingText}{" "}
          </>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
}
