import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";

export const useEditCourses = (courseId: string) => {
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";
  const router = useRouter();

  // Bootcampの情報を取得する
  const url = `${API_URL}/api/v1/bootcamps`;
  const userId =
    (typeof window !== "undefined" && window.localStorage.getItem("userId")) ||
    "";
  const { data, error, isLoading } = useFetcher(url, token);

  const usersBootcamp = data?.data.filter(
    (bootcamp: any) => bootcamp.user === userId
  )[0];

  const schema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    // weeks: z
    //   .string()
    //   .refine((val) => {
    //     const num = parseInt(val);
    //     return num >= 1 && num <= 50;
    //   })
    //   .transform((val) => parseInt(val)),
    weeks: z.string().min(1),
    // tuition: z
    //   .string()
    //   .refine((val) => {
    //     const num = parseInt(val);
    //     return num >= 1 && num <= 100000;
    //   })
    //   .transform((val) => parseInt(val)),

    tuition: z.union([z.string(), z.number().min(1).max(100000)]),

    minimumSkill: z.enum(["beginner", "intermediate", "advanced"]),
    scholarshipAvailable: z.boolean(),
  });

  type Form = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      const courseRes = await fetch(`${API_URL}/api/v1/courses/${courseId}`);
      const courseJson = await courseRes.json();
      return courseJson.data;
    },
  });

  const onSubmit = async (data: Form) => {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      try {
        const res = await fetch(`${API_URL}/api/v1/courses/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
          toast.error(json.error);
        } else {
          toast.success("Course created");
          router.push("/manage/courses");
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
    usersBootcamp,
    isLoading,
    error,
  };
};
