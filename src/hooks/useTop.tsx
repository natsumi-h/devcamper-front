import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bootcampsAtom } from "@/state/bootcamps";

export const useTop = () => {
  const router = useRouter();
  const [_, setData] = useAtom(bootcampsAtom);
  type Form = z.infer<typeof schema>;

  const schema = z
    .object({
      milesFrom: z.union([
        z.string().regex(/^\d+$/, { message: "Invalid Miles Fron" }), //  numbers
        z.string().max(0),
      ]),

      zipcode: z.union([
        z.string().regex(/^0?\d{5}$/, { message: "Invalid Zipcode" }),
        z.string().max(0),
      ]), // 5 digit numbers
    })
    .refine(
      (data) =>
        (!data.zipcode && !data.milesFrom) || (data.zipcode && data.milesFrom),
      {
        message: "Either Zipcode or Miles must be defined",
        path: ["milesFrom"],
      }
    );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Form) => {
    setData({ ...data, rating: "", budget: "" });
    router.push("/bootcamps");
    reset();
  };

  return { register, handleSubmit, errors, onSubmit };
};
