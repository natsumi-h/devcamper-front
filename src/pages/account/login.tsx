import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-sign-in-alt"></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      {...register("password")}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
                <p>
                  {" "}
                  Forgot Password?{" "}
                  <Link href="/account/reset-password">Reset Password</Link>
                </p>
                <p>{errors.email?.message}</p>
                <p>{errors.password?.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
