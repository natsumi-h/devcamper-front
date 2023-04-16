import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useFetcher } from "./useFetcher";
import { API_URL, NEXT_URL } from "@/config/config";

export const useAddReview = (bootcampId: string) => {
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";

  const router = useRouter();

  const url = `${API_URL}/api/v1/bootcamps/${bootcampId}`;
  const { data, error, isLoading } = useFetcher(url, token);

  type Form = z.infer<typeof schema>;

  const ratingSchema = z.union([
    z.string().transform((val) => parseInt(val)),
    z.number(),
  ]);

  const schema = z.object({
    rating: ratingSchema,
    title: z.string().min(10).max(100),
    review: z.string().min(50).max(500),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const watchRating = watch("rating");

  const onSubmit = async (data: Form) => {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/bootcamps/${bootcampId}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              rating: data.rating,
              title: data.title,
              text: data.review,
            }),
          }
        );
        const json = await res.json();
        if (!res.ok) {
          toast.error(json.error);
        } else {
          toast.success("Review updated");
          router.push(`/bootcamps/${bootcampId}`);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    data,
    error,
    isLoading,
    watchRating,
  };
};
