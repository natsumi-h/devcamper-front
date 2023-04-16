import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL } from "@/config/config";

export const useResetPassword = (token: string) => {
  const { data: session } = useSession();
  const router = useRouter();
  type Form = z.infer<typeof schema>;

  const schema = z
    .object({
      password: z.string().min(6, { message: "Password must be 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  if (session) {
    router.push("/bootcamps");
  }

  const onSubmit = async (data: Form) => {
    const { password } = data;
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/resetpassword/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast(`${json.error}`, {
          type: "error",
        });
      } else {
        toast("Password updated successfully", {
          type: "success",
        });
        router.push("/account/login");
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
