import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { NEXT_URL } from "@/config/config";

const UpdatePassword = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  type Form = z.infer<typeof schema>;

  const schema = z
    .object({
      currentPassword: z
        .string()
        .min(6, { message: "Password must be 6 characters" }),
      newPassword: z
        .string()
        .min(6, { message: "Password must be 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be 6 characters" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
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

  const onSubmit = async (data: Form) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message);
        toast(json.message, {
          type: "error",
        });
        return;
      }
      toast("Password updated", {
        type: "success",
      });
      router.push("/bootcamps");
    } catch (error) {
      toast("Something wrong happened", {
        type: "error",
      });
      setError("Something wrong happened");
    }
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Update Password</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    {...register("currentPassword")}
                  />
                  <p className="text-danger">
                    {errors.currentPassword?.message}
                  </p>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    {...register("newPassword")}
                  />
                  <p className="text-danger">{errors.newPassword?.message}</p>
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmPassword")}
                  />
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update Password"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
