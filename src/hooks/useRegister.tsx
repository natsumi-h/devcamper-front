import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { NEXT_URL } from "@/config/config";

export const useRegister = () => {
  const { data: session } = useSession();
  const router = useRouter();
  type Form = z.infer<typeof schema>;

  const schema = z
    .object({
      name: z.string().min(1, { message: "Name must be required" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(6, { message: "Password must be 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be 6 characters" }),
      role: z.union([z.literal("user"), z.literal("publisher")]),
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
    try {
      const apiRes = await fetch(`${NEXT_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });
      const json = await apiRes.json();
      console.log(json);

      if (!apiRes.ok) {
        toast.error(json.message);
        return;
      } else {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          // callbackUrl: "/bootcamps",
          redirect: false,
        });
        window.localStorage.setItem("token", json.data.token);
        window.localStorage.setItem("userId", json.data.id);
        toast.success("Account created successfully");
        router.push("/bootcamps");
      }
    } catch (error) {
      console.log(error);
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
