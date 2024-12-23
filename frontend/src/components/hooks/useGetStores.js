import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../baseURL";
import { toast } from "react-toastify";
export default function useGetStores() {
  return useQuery("Stores", async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/stores");
      return res.data.stores;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  },{
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
