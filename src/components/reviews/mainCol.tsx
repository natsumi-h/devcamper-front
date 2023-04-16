import Link from "next/link";
import { FC } from "react";
import { Reviews } from "@/pages/bootcamps/[id]/reviews";

type Props = {
  reviews: {
    data: Reviews;
  };
  id: string;
};

const MainCol: FC<Props> = ({ reviews, id }) => {
  // if (!reviews.data[0]) return null;
  const data = reviews.data;
  return (
    <div className="col-md-8">
      <Link href={`/bootcamps/${id}`} className="btn btn-secondary my-3">
        <i className="fas fa-chevron-left"></i> Bootcamp Info
      </Link>
      <h1 className="mb-4">{data[0]?.bootcamp.name} Reviews</h1>
      {/* <!-- Reviews --> */}
      {data.length === 0 && <>No Reviews</>}
      {data.map((review) => (
        <div className="card mb-3" key={review._id}>
          <h5 className="card-header bg-dark text-white">{review.title}</h5>
          <div className="card-body">
            <h5 className="card-title">
              Rating: <span className="text-success">{review.rating}</span>
            </h5>
            <p className="card-text">{review.text}</p>
            <p className="text-muted">Writtern By {review.user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainCol;
