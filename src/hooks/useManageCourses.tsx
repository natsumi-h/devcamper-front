import { toast } from "react-toastify";
import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";

export const useManageCourses = () => {
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";
  const userId =
    (typeof window !== "undefined" && window.localStorage.getItem("userId")) ||
    "";
  const url = `${API_URL}/api/v1/bootcamps`;
  const { data, error, isLoading } = useFetcher(url, token);
  const usersBootcamp = data?.data.filter(
    (bootcamp: any) => bootcamp.user === userId
  )[0];
  const courses = usersBootcamp && usersBootcamp.courses;

  const onClickRemoveHandler = async (courseId: string) => {
    const result = window.confirm(
      "Are you sure you want to remove this Bootcamp?"
    );
    if (result) {
      try {
        const url = `${API_URL}/api/v1/courses/${courseId}`;
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (!res.ok) {
          toast(json.error, {
            type: "error",
          });
          return;
        }
        toast("Course removed", {
          type: "success",
        });
      } catch (error) {
        toast("Something went wrong", {
          type: "error",
        });
      }
    }
  };

  return {
    data,
    usersBootcamp,
    onClickRemoveHandler,
    courses,
    error,
    isLoading,
  };
};
