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
        z.string().max(0, { message: "Invalid Miles.It must be numbers" }),
        z
          .string()
          .regex(/^\d+$/) //  numbers
          .transform((value) => parseInt(value, 10)),
      ]),
      zipcode: z.union([
        z
          .string()
          .max(0, { message: "Invalid zipcode.It must be 5 digit numbers" }),
        z
          .string()
          .regex(/^0?\d{4}$/)
          .transform((value) => {
            // マッチした場合は、先頭に0を追加して5桁の数字に変換する
            return value.padStart(5, "0");
          }),
        z
          .string()
          .regex(/^\d{5}$/) // 5 digit numbers
          .transform((value) => parseInt(value, 10)),
      ]),
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
