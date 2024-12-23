import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import { toast } from "react-toastify";

export default function useDeleteStore() {
  return useMutation(
    async (id) => {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${BASE_URL}/api/stores/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Store deleted successfully!");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to delete store."
        );
      },
    }
  );
}
