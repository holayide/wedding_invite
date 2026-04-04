import { api } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await api.get("/analytics");
      return res?.data?.data;
    },
    refetchInterval: 1000 * 60 * 5,
  });
};
