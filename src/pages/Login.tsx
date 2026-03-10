import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

import bgImage from "@/assets/wedding_table.jpg";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin@wedding.com / admin123");
    }
  };

  return (
    <div className="pt-10 sm:pt-0 sm:px-4 sm:pb-4 min-h-screen flex sm:items-center justify-center bg-background">
      <Card className="w-full p-8 md:p-12 max-w-md animate-fade-in border-transparent sm:border-primary/20 ring-0 sm:ring-1 bg-transparent sm:bg-card">
        <CardHeader className="text-center space-y-3 px-0">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to manage your wedding invitations
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <div className="mb-6 overflow-hidden rounded-lg border border-primary/10">
            <div
              className="w-full h-32 bg-center bg-no-repeat bg-cover bg-primary/5 flex items-center justify-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <>
              <Button
                type="submit"
                className="w-full h-12 cursor-pointer hover:opacity-70"
              >
                Sign In to Your Event
              </Button>
              <div className="text-center pt-3">
                <p className="text-sm">
                  Don't have an account yet? {""}
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </>
          </form>

          {/* <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Super Admin:</strong> admin@wedding.com / admin123
            </p>
            <p>
              <strong>Admin:</strong> user@wedding.com / user123
            </p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
