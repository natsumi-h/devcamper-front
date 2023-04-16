import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL, NEXT_URL } from "@/config/config";

export const useManageAccount = () => {
  const router = useRouter();
  type Form = z.infer<typeof schema>;
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";
  console.log(token);

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    name: z.string().min(6, { message: "Name must be 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      const URL = `${API_URL}/api/v1/auth/me`;
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return {
        email: data?.data.email,
        name: data?.data.name,
      };
    },
  });

  const onSubmit = async (data: Form) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
        }),
      });
      console.log(res);
      toast("User detail updated", {
        type: "success",
      });
      router.push("/bootcamps");
      if (!res.ok) {
        toast(res.statusText, {
          type: "error",
        });
      }
    } catch (error) {
      toast("Something wrong happened", {
        type: "error",
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
