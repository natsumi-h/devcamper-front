import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bootcampsAtom } from "@/state/bootcamps";

export const useBootcampsFilter = () => {
  type Form = z.infer<typeof schema>;
  const [_, setData] = useAtom(bootcampsAtom);
  const schema = z.object({
    rating: z.string(),
    budget: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: Form) => {
    setData({ ...data, zipcode: "", milesFrom: "" });
    reset();
  };
  return { register, handleSubmit, errors, onSubmit };
};
