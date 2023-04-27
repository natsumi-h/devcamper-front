
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/config/config";
import { useManageBootcamp } from "@/hooks/useManageBootcamp";

export type Props = {
  id: string;
  token: string;
};

const ManageBootcamp: NextPage<Props> = () => {
  const {
    data,
    usersBootcamp,
    onClickRemoveHandler,
    register,
    handleSubmit,
    onSubmit,
    watch,
    fetchError,
  } = useManageBootcamp();

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Bootcamp</h1>
              {!data && !fetchError && <p>Loading...</p>}
              {fetchError && <p>{fetchError}</p>}
              {data && !usersBootcamp && !fetchError && (
                <>
                  <p className="lead">You have not yet added a bootcamp</p>
                  <Link
                    href="/manage/bootcamp/add"
                    className="btn btn-primary btn-block"
                  >
                    Add Bootcamp
                  </Link>
                </>
              )}

              {usersBootcamp && (
                <>
                  <div className="card mb-3">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <Image
                          src={`${API_URL}/uploads/${usersBootcamp.photo}`}
                          // src="/images/clastr-cloud-gaming-aO1OBDrRQg8-unsplash.jpg"
                          className="card-img"
                          alt="alt"
                          fill
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link href={`/bootcamps/${usersBootcamp.id}`}>
                              {usersBootcamp.name}
                              <span className="float-right badge badge-success">
                                {usersBootcamp.averageRating?.toFixed(1)}
                              </span>
                            </Link>
                          </h5>
                          <span className="badge badge-dark mb-2">
                            {usersBootcamp.location.city},{" "}
                            {usersBootcamp.location.state}
                          </span>
                          <p className="card-text">
                            {usersBootcamp.careers.map(
                              (career: Array<string>, index: number) => {
                                if (
                                  index ===
                                  usersBootcamp.careers.length - 1
                                ) {
                                  return career;
                                } else {
                                  return `${career}, `;
                                }
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          // name="photo"
                          className="custom-file-input"
                          id="photo"
                          accept="image/*"
                          {...register("file")}
                        />
                        <label className="custom-file-label" htmlFor="photo">
                          {!watch("file") || watch("file").length === 0
                            ? "Add Bootcamp Image"
                            : watch("file")[0]?.name}
                        </label>
                        {/* <p className="text-danger">{errors.file?.message}</p> */}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-light btn-block"
                      value="Upload Image"
                    />
                  </form>
                  <Link
                    href={`/manage/bootcamp/edit/${usersBootcamp.id}`}
                    className="btn btn-primary btn-block"
                  >
                    Edit Bootcamp Details
                  </Link>
                  <Link
                    href="/manage/courses"
                    className="btn btn-secondary btn-block"
                  >
                    Manage Courses
                  </Link>
                  <button
                    className="btn btn-danger btn-block"
                    onClick={onClickRemoveHandler}
                  >
                    Remove Bootcamp
                  </button>
                </>
              )}

              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBootcamp;
