import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    navigate(isAuthenticated ? "/dashboard" : "/login", { replace: true });
  }, [isAuthenticated, navigate]);

  return null;
};

export default Index;
