import { useMutation } from "react-query";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function useAddStore() {
 const navigate = useNavigate();
  return useMutation(
    
    async (formData) => {
      console.log('Form Data being submitted:', formData);
      try {
        const res = await axios.post(`${BASE_URL}/api/create-store`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Store added successfully");
      navigate(`/store/${res.data.store._id}`);
        console.log(res);
        console.log(res.data);
        return res.data; // Returning the response data on success
      } catch (error) {
        console.error("Error Uploading Store:", error.response?.data?.message || error.message); // Improved error logging
        toast.warning(error.response?.data?.message || error.message); // Improved error logging  
        throw new Error(error.response?.data?.message || "Error uploading store"); // Throw the error to handle it in React Query
      }
    }
  );
}
