import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";

export const useCourses = (id: string) => {

  const url = `${API_URL}/api/v1/bootcamps/${id}/courses`;
  const token = "";
  const { data, error, isLoading } = useFetcher(url, token);

  return { data, error, isLoading };
};
