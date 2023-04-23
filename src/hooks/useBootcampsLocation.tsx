import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bootcampsAtom } from "@/state/bootcamps";

export const useBootcampsLocation = () => {
  type Form = z.infer<typeof schema>;
  const [_, setData] = useAtom(bootcampsAtom);

  const schema = z.object({
    milesFrom: z
      .string()
      .min(1, { message: "Miles From is required" })
      .regex(/^\d+$/, { message: "Invalid Miles From" }), //  numbers

    zipcode: z
      .string()
      .min(1, { message: "Zipcode is required" })
      .regex(/^\d{5}$/, { message: "Invalid Zipcode" }), // 5 digit numbers
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Form) => {
    setData({
      milesFrom: data.milesFrom,
      zipcode: data.zipcode,
      rating: "",
      budget: "",
    });
    reset();
  };

  return { register, handleSubmit, errors, onSubmit };
};
