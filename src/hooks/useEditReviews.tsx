import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useFetcher } from "./useFetcher";
import { useGetValueFromLocalStorage } from "./useGetTokenFromLocalStorage";
import { API_URL } from "@/config/config";

export const useEditReviews = (reviewId: string) => {
  const { value: token } = useGetValueFromLocalStorage("token");
  const router = useRouter();
  const url = `${API_URL}/api/v1/reviews/${reviewId}`;
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useFetcher(url, token);
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
    defaultValues: async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      return {
        rating: json.data.rating,
        title: json.data.title,
        review: json.data.text,
      };
    },
  });

  const watchRating = watch("rating");

  const onSubmit = async (data: Form) => {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      try {
        const res = await fetch(`${API_URL}/api/v1/reviews/${reviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: data.rating,
            title: data.title,
            review: data.review,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          toast.error(json.error);
        } else {
          toast.success("Review updated");
          router.push(`/bootcamps/${reviewsData?.data.bootcamp.id}`);
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
    watchRating,
    reviewsData,
    reviewsError,
    reviewsIsLoading,
  };
};
