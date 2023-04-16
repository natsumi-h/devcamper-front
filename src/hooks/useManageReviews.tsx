import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";

export const useManageReviews = () => {
  const router = useRouter();
  const url = `${API_URL}/api/v1/reviews`;
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";
  const userId =
    (typeof window !== "undefined" && window.localStorage.getItem("userId")) ||
    "";

  const { data, error, isLoading } = useFetcher(url, token);

  // const id = "5d7a514b5d2c12c7449be044";
  const thisUsersReviews = data?.data.filter(
    (review: any) => review.user == userId
  );

  const onClickDeleteHandler = async (id: string) => {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      try {
        const res = await fetch(`${API_URL}/api/v1/reviews/${id}`, {
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
        toast("Review deleted", {
          type: "success",
        });
        router.push("/manage/reviews");
      } catch (error) {
        toast("Something wrong happened", {
          type: "error",
        });
      }
    }
  };

  return {
    thisUsersReviews,
    data,
    error,
    isLoading,
    onClickDeleteHandler,
  };
};
