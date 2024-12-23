import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../baseURL";
export default function useGetCoupons() {
  return useQuery(
    "Coupons",
    async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/coupons");
        // console.log(res.data.coupons);
        return res.data.coupons;
      } catch (error) {
        console.log(error);
      }
    },

    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
}
