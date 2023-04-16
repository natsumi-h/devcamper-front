import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPassword = () => {
  const { register, handleSubmit, onSubmit, errors } = useForgotPassword();

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link href="/account/login">Back to login</Link>
              <h1 className="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password using the registered email
                address.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Enter Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Reset Password"
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

export default ForgotPassword;
