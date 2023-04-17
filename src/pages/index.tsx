import Head from "next/head";
import { useTop } from "@/hooks/useTop";

const Home = () => {
  const { register, handleSubmit, errors, onSubmit } = useTop();

  return (
    <>
      <Head>
        <title>DevCamper | Find a coding bootcamp</title>
        <meta name="description" content="DevCamper | Find a coding bootcamp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <h1 className="display-4">Find a Code Bootcamp</h1>
            <p className="lead">
              Find, rate and read reviews on coding bootcamps
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Miles From"
                      {...register("milesFrom")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Enter Zipcode"
                      {...register("zipcode")}
                    />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                className="btn btn-primary btn-block"
              />
            </form>
            <p>{errors.milesFrom?.message}</p>
            <p>{errors.zipcode?.message}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
