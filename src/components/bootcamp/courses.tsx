import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
// import { useCourses } from "@/hooks/useCourses";

type Props = {
  // id: string;
  courses: {
    data: {
      _id: string;
      title: string;
      weeks: string;
      minimumSkill: string;
      description: string;
      scholarshipAvailable: boolean;
    }[];
  };
};

const Courses: FC<Props> = ({ courses }) => {
  // const { data, error, isLoading } = useCourses(id);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error</div>;
  // }

  const data = courses.data;

  return (
    <>
      {data.map((course) => (
        <div className="card mb-3" key={course._id}>
          <h5 className="card-header bg-primary text-white">{course.title}</h5>
          <div className="card-body">
            <h5 className="card-title">Duration: {course.weeks} Weeks</h5>
            <p className="card-text">{course.description}</p>
            <ul className="list-group mb-3">
              <li className="list-group-item">Cost: $8,000 USD</li>
              <li className="list-group-item">
                Skill Required:{" "}
                {course.minimumSkill.charAt(0).toUpperCase() +
                  course.minimumSkill.slice(1)}
              </li>
              <li className="list-group-item">
                Scholarship Available:{" "}
                {course.scholarshipAvailable ? (
                  <FontAwesomeIcon icon={faCheck} size="lg" color="#28a745" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} size="lg" color="#dc3545" />
                )}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Courses;
