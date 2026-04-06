import type { InviteFormValues } from "@/components/features/invites/AddInvite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Invitee } from "@/types";
import { api } from "@/lib/api/axios";
import { toast } from "sonner";
import axios from "axios";

export const useInvites = (search?: string, userId?: string) => {
  return useQuery<Invitee[]>({
    queryKey: ["invites", search, userId],
    queryFn: async () => {
      const res = await api.get("/invite", {
        params: {
          search: search || undefined,
          user_id: userId,
        },
      });

      return res?.data?.data || [];
    },
    retry: 1,
  });
};

export const useAddLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: InviteFormValues) => {
      const res = await api.post("/invite", formData);
      return res.data?.data;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["invites"] });
      toast.success(response.message || "Invitee Created successfully");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Invitee Creation failed");
    },
  });
};

export const useDeleteInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await api.delete(`/invite/${userId}`);
      return res.data?.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invites"] });
      toast.success("Invite deleted successfully");
    },

    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to delete";
      toast.error(message);
    },
  });
};
