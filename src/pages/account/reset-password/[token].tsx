import { GetServerSideProps, GetStaticPropsContext, NextPage } from "next";
import { useResetPassword } from "@/hooks/useResetPassword";

type Token = {
  token: string;
};

const ResetPassword: NextPage<Token> = ({ token }) => {
  const { register, handleSubmit, errors, onSubmit } = useResetPassword(token);

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Reset Password</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetStaticPropsContext
) => {
  const { token } = ctx.params!;
  return {
    props: {
      token,
    },
  };
};

export default ResetPassword;
