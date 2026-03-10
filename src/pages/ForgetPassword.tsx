import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setResetEmail } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetEmail(email);
    toast.success("OTP sent to your email");
    navigate("/otp-verification");
  };

  return (
    <div className="pt-10 sm:pt-0 sm:px-4 sm:pb-4 min-h-screen flex sm:items-center justify-center bg-background">
      <Card className="w-full max-w-md animate-fade-in border-transparent sm:border-primary/20 ring-0 sm:ring-1 bg-transparent sm:bg-card">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email to receive a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                className="h-10"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 cursor-pointer hover:opacity-70"
            >
              Send OTP
            </Button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
