import axios from "axios";
import { useQuery } from "react-query";

export default function useCategories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });
  const allCategories = data?.data?.data;
  return {allCategories, isLoading};
}
