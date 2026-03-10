import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast.success("OTP verified successfully");
      navigate("/reset-password");
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="text-center text-2xl tracking-[0.5em] h-10 font-mono"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 cursor-pointer hover:opacity-70"
            >
              Verify
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Demo: enter any 6 digits
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
