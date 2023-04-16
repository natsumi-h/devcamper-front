import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { Bootcamp } from "../bootcamps/mainCol";
import { API_URL } from "@/config/config";

type Props = {
  bootcamp: {
    data: Bootcamp;
  };
};

const Sidebar: FC<Props> = ({ bootcamp }) => {
  const { data: session } = useSession();
  
  const {
    website,
    averageRating,
    id,
    jobAssistance,
    jobGuarantee,
    housing,
    acceptGi,
    photo,
  } = bootcamp.data;

  return (
    <div className="col-md-4">
      {/* <!-- Image --> */}
      <Image
        src={`${API_URL}/uploads/${photo}`}
        className="img-thumbnail"
        alt="..."
        width={100}
        height={100}
      />
      {/* <!-- Rating --> */}
      <h1 className="text-center my-4">
        <span className="badge badge-secondary badge-success rounded-circle p-3">
          {averageRating ? averageRating.toFixed(1) : "N/A"}
        </span>{" "}
        Rating
      </h1>
      {/* <!-- Buttons --> */}
      <Link
        href={`/bootcamps/${id}/reviews`}
        className="btn btn-dark btn-block my-3"
      >
        <i className="fas fa-comments"></i> Read Reviews
      </Link>
      {session?.user?.role === "user" && (
        <Link
          href={`${id}/add-review`}
          className="btn btn-light btn-block my-3"
        >
          <i className="fas fa-pencil-alt"></i> Write a Review
        </Link>
      )}

      <Link
        href={website}
        target="_blank"
        className="btn btn-secondary btn-block my-3"
      >
        <i className="fas fa-globe"></i> Visit Website
      </Link>
      {/* <!-- Map --> */}
      {/* <div id="map" style="width: 100%; height: 300px;"></div> */}
      {/* <!-- Perks --> */}
      <ul className="list-group list-group-flush mt-4">
        <li className="list-group-item">
          {housing ? (
            <FontAwesomeIcon icon={faCheck} size="lg" color="#28a745" />
          ) : (
            <FontAwesomeIcon icon={faTimes} size="lg" color="#dc3545" />
          )}{" "}
          Housing
          {/* <i className="fas fa-check text-success"></i>  */}
        </li>
        <li className="list-group-item">
          {jobAssistance ? (
            <FontAwesomeIcon icon={faCheck} size="lg" color="#28a745" />
          ) : (
            <FontAwesomeIcon icon={faTimes} size="lg" color="#dc3545" />
          )}{" "}
          Job Assistance
        </li>
        <li className="list-group-item">
          {jobGuarantee ? (
            <FontAwesomeIcon icon={faCheck} size="lg" color="#28a745" />
          ) : (
            <FontAwesomeIcon icon={faTimes} size="lg" color="#dc3545" />
          )}{" "}
          Job Guarantee
        </li>
        <li className="list-group-item">
          {acceptGi ? (
            <FontAwesomeIcon icon={faCheck} size="lg" color="#28a745" />
          ) : (
            <FontAwesomeIcon icon={faTimes} size="lg" color="#dc3545" />
          )}{" "}
          Accepts GI Bill
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
