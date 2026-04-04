import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

import { useVerifyOtp } from "@/hooks/services/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be exactly 4 digits"),
});
type OtpValues = z.infer<typeof otpSchema>;

export default function OtpVerification() {
  const navigate = useNavigate();
  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { resetEmail, setResetOtp, setResetUserId } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    control,
    formState: { errors },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // const otpValue = watch("otp");
  const otpValue = useWatch({
    control,
    name: "otp",
  });

  if (!resetEmail) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onSubmit = (values: OtpValues) => {
    verifyOtp(values, {
      onSuccess: (res) => {
        setResetOtp?.(values.otp);
        setResetUserId(res.data.user_id);
        navigate("/reset-password");
      },
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("otp", value);
  };

  return (
    <div className="pt-10 sm:pt-0 sm:px-4 sm:pb-4 min-h-screen flex sm:items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in border-transparent sm:border-primary/20 ring-0 sm:ring-1 bg-transparent sm:bg-card">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="sr-only">
                Verification Code
              </Label>
              <Input
                {...register("otp")}
                id="otp"
                type="text"
                placeholder="0000"
                maxLength={4}
                value={otpValue}
                onChange={handleOtpChange}
                disabled={isPending}
                className={`text-center text-3xl tracking-[1em] pl-[1em] h-14 font-mono ${
                  errors.otp
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
              />
              {errors.otp && (
                <p className="text-xs text-center text-destructive">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending || otpValue.length !== 4}
              className="w-full h-12 cursor-pointer transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
            {/* <Button
              type="submit"
              className="w-full h-12 cursor-pointer hover:opacity-70"
            >
              Verify
            </Button> */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" /> Change email
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
