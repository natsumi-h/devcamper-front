import { useBootcampsLocation } from "@/hooks/useBootcampsLocation";

const LocationForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useBootcampsLocation();
  return (
    <div className="card card-body mb-4">
      <h4 className="mb-3">By Location</h4>
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
        <p>{errors.milesFrom?.message}</p>
        <p>{errors.zipcode?.message}</p>
      </form>
    </div>
  );
};

export default LocationForm;
