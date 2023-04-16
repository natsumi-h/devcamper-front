import {
  faChevronLeft,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useManageCourses } from "@/hooks/useManageCourses";

const ManageCourses = () => {
  const {
    data,
    usersBootcamp,
    onClickRemoveHandler,
    courses,
    error,
    isLoading,
  } = useManageCourses();

  type Career = Array<string>;
  type Course = {
    _id: string;
    title: string;
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                href="/manage/bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="sm" /> Manage
                Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              {usersBootcamp && courses?.length === 0 && (
                <>
                  <p className="lead">You have not yet added any courses</p>
                  <Link
                    href="/manage/courses/add"
                    className="btn btn-primary btn-block"
                  >
                    Add Your first course
                  </Link>
                </>
              )}
              {usersBootcamp && courses?.length > 0 && (
                <>
                  <div className="card mb-3">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        {/* <img
                          src="img/image_1.jpg"
                          className="card-img"
                          alt="..."
                        /> */}
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link href={`/bootcamps/${usersBootcamp?.id}`}>
                              {usersBootcamp?.name}
                              <span className="float-right badge badge-success">
                                {usersBootcamp?.averageRating?.toFixed(1)}
                              </span>
                            </Link>
                          </h5>
                          <span className="badge badge-dark mb-2">
                            {usersBootcamp?.location.city},{" "}
                            {usersBootcamp?.location.state}
                          </span>
                          <p className="card-text">
                            {usersBootcamp?.careers.map(
                              (career: Career, index: number) => {
                                if (
                                  index ===
                                  usersBootcamp?.careers.length - 1
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

                  <Link
                    href="/manage/courses/add"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Add Bootcamp Course
                  </Link>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course: Course) => (
                        <tr key={course._id}>
                          <td>{course.title}</td>
                          <td>
                            <Link
                              href={`/manage/courses/edit/${course._id}`}
                              className="btn btn-secondary"
                            >
                              <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => onClickRemoveHandler(course._id)}
                            >
                              <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCourses;
