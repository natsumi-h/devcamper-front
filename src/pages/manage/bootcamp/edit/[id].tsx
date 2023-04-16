import { zodResolver } from "@hookform/resolvers/zod";

import { GetServerSideProps, NextPage } from "next";
import { useEditBootcamp } from "@/hooks/useEditBootcamp";

export type Props = {
  bootcampId: string;
};

const EditBootcamp: NextPage<Props> = ({ bootcampId }) => {
  const { register, handleSubmit, onSubmit, errors } =
    useEditBootcamp(bootcampId);

  return (
    <section className="container mt-5">
      <h1 className="mb-2">Edit Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Location & Contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bootcamp Name"
                    {...register("name")}
                  />
                  <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Address"
                    {...register("address")}
                  />
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                  <p className="text-danger">{errors.address?.message}</p>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                  <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Contact Email"
                    {...register("email")}
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Website URL"
                    {...register("website")}
                  />
                  <p className="text-danger">{errors.website?.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    // maxlength={500}
                    {...register("description")}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                  <p className="text-danger">{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Careers</label>
                  <select
                    className="custom-select"
                    multiple
                    {...register("careers")}
                  >
                    <option disabled>Select all that apply</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-danger">{errors.careers?.message}</p>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="housing"
                    {...register("housing")}
                  />
                  <label className="form-check-label" htmlFor="housing">
                    Housing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="jobAssistance"
                    {...register("jobAssistance")}
                  />
                  <label className="form-check-label" htmlFor="jobAssistance">
                    Job Assistance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="jobGuarantee"
                    {...register("jobGuarantee")}
                  />
                  <label className="form-check-label" htmlFor="jobGuarantee">
                    Job Guarantee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptGi"
                    {...register("acceptGi")}
                  />
                  <label className="form-check-label" htmlFor="acceptGi">
                    Accepts GI Bill
                  </label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Bootcamp"
            className="btn btn-success btn-block my-4"
          />
        </div>
      </form>
    </section>
  );
};

export default EditBootcamp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bootcampId = ctx.params?.id;

  return {
    props: {
      bootcampId,
    },
  };
};
