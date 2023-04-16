import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAddCourses } from "@/hooks/useAddCourses";

const AddCourse = () => {
  const { register, handleSubmit, onSubmit, errors } = useAddCourses();

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                href="/manage/courses"
                className="btn btn-link text-secondary my-3"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="sm" /> Manage
                Courses
              </Link>
              <h1 className="mb-2">DevWorks Bootcamp</h1>
              <h3 className="text-primary mb-4">Add Course</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    {...register("title")}
                  />
                  <p className="text-danger">
                    {errors.title && errors.title.message}
                  </p>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="number"
                    placeholder="Duration"
                    className="form-control"
                    {...register("weeks")}
                  />
                  <small className="form-text text-muted">
                    Enter number of weeks course lasts
                  </small>
                  <p className="text-danger">
                    {errors.weeks && errors.weeks.message}
                  </p>
                </div>
                <div className="form-group">
                  <label>Course Tuition</label>
                  <input
                    type="number"
                    placeholder="Tuition"
                    className="form-control"
                    {...register("tuition")}
                  />
                  <small className="form-text text-muted">USD Currency</small>
                  <p className="text-danger">
                    {errors.tuition && errors.tuition.message}
                  </p>
                </div>
                <div className="form-group">
                  <label>Minimum Skill Required</label>
                  <select
                    className="form-control"
                    {...register("minimumSkill")}
                  >
                    <option value="beginner">Beginner (Any)</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <p className="text-danger">
                    {errors.minimumSkill && errors.minimumSkill.message}
                  </p>
                </div>
                <div className="form-group">
                  <textarea
                    rows={5}
                    className="form-control"
                    placeholder="Course description summary"
                    {...register("description")}
                    // maxlength="500"
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                  <p className="text-danger">
                    {errors.description && errors.description.message}
                  </p>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="scholarshipAvailable"
                    {...register("scholarshipAvailable")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="scholarshipAvailable"
                  >
                    Scholarship Available
                  </label>
                  <p className="text-danger">
                    {errors.scholarshipAvailable &&
                      errors.scholarshipAvailable.message}
                  </p>
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Add Course"
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

export default AddCourse;
