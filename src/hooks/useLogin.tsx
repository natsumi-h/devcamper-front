import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { NEXT_URL } from "@/config/config";

export const useLogin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/bootcamps");
  }

  type Form = z.infer<typeof schema>;

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Form) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await res.json();

      if (res.ok) {
        window.localStorage.setItem("token", json.data.token);
        window.localStorage.setItem("userId", json.data.id);
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          // callbackUrl: "/bootcamps",
          redirect: false,
        });
        toast.success("Login successful");
        router.push("/bootcamps");
      }
      if (!res.ok) {
        toast.error(res.statusText);
      }
    } catch (error) {
      toast.error("Something wrong happened");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
