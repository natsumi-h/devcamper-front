import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL } from "@/config/config";

export const useAddBootcamp = () => {
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";
  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1).max(50),
    address: z.string().min(1).max(100),
    phone: z.string().min(1).max(20),
    email: z.string().email(),
    website: z.string().url(),
    description: z.string().min(1).max(500),
    careers: z.array(z.string()),
    housing: z.boolean(),
    jobAssistance: z.boolean(),
    jobGuarantee: z.boolean(),
    acceptGi: z.boolean(),
  });

  type Form = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Form) => {
    const {
      name,
      address,
      phone,
      email,
      website,
      description,
      careers,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi,
    } = data;
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      try {
        const res = await fetch(`${API_URL}/api/v1/bootcamps/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            address,
            phone,
            email,
            website,
            description,
            careers,
            housing,
            jobAssistance,
            jobGuarantee,
            acceptGi,
          }),
        });
        const json = await res.json();

        if (!res.ok) {
          toast.error(json.error);
        } else {
          toast.success("Bootcamp created");
          // router.push(`/bootcamps/${json.data.id}`);
          router.push("/manage/bootcamp");
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
  };
};
