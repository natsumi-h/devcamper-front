import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL } from "@/config/config";

export const useForgotPassword = () => {
  const { data: session } = useSession();
  const router = useRouter();
  type Form = z.infer<typeof schema>;

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
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
    const { email } = data;
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast(`${json.error}`, {
          type: "error",
        });
      } else {
        toast("Email sent", {
          type: "success",
        });
      }
    } catch (error) {
      toast("Something went wrong", {
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
