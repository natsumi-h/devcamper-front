import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL } from "@/config/config";
import { useEditCourses } from "@/hooks/useEditCourses";
import { useFetcher } from "@/hooks/useFetcher";

export type Props = {
  courseId: string;
};

const AddCourse: NextPage<Props> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    usersBootcamp,
    isLoading,
    error,
  } = useEditCourses(courseId);

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
              <h1 className="mb-2">{usersBootcamp?.name}</h1>
              <h3 className="text-primary mb-4">Edit Course</h3>
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
                    value="Edit Course"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const courseId = ctx.params?.id;

  return {
    props: {
      courseId,
    },
  };
};
