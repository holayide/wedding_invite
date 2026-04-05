import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import type { User } from "@/types";
import { toast } from "sonner";
import axios from "axios";
import type { UserFormValues } from "@/components/features/users/UserForm";

export const useUsers = (search?: string, userId?: string) => {
  return useQuery<User[]>({
    queryKey: ["users", search, userId],
    queryFn: async () => {
      const res = await api.get("/user", {
        params: {
          search: search || undefined,
        },
      });

      return res?.data?.data || [];
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: UserFormValues) => {
      const res = await api.post("/user/create/admin", formData);
      return res.data?.data;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(response.message || "Admin Created successfully");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Admin Creation failed");
    },
  });
};

export const useEditAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserFormValues }) => {
      const res = await api.put(`/user/update/admin/${id}`, data);
      return res.data?.data;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(response.message || "Admin Created successfully");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Admin Creation failed");
    },
  });
};

export const useBlockAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminId: string) => {
      const res = await api.patch(`/user/block-unblock/${adminId}`);
      return res.data?.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Status updated successfully");
    },

    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to delete Admin";
      toast.error(message);
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminId: string) => {
      const res = await api.delete(`/user/${adminId}`);
      return res.data?.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Admin removed successfully");
    },

    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to delete Admin";
      toast.error(message);
    },
  });
};
