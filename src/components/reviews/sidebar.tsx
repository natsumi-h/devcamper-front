import Link from "next/link";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { Reviews } from "@/pages/bootcamps/[id]/reviews";

type Props = {
  reviews: {
    data: Reviews;
  };
  id: string;
};

const Sidebar: FC<Props> = ({ reviews, id }) => {
  const { data: session } = useSession();

  // console.log(session?.user?.role);
  // console.log(reviews?.data[0]?.bootcamp.id);

  // if (!reviews.data[0]) return <>No reviews</>;
  // const { averageRating } = reviews.data[0]?.bootcamp;
  console.log(reviews);

  return (
    <div className="col-md-4">
      {/* <!-- Rating --> */}

      <h1 className="text-center my-4">
        <span className="badge badge-secondary badge-success rounded-circle p-3">
          {reviews.data[0]
            ? reviews.data[0].bootcamp.averageRating
              ? reviews.data[0].bootcamp.averageRating.toFixed(1)
              : "N/A"
            : "N/A"}
        </span>{" "}
        Rating
      </h1>

      {/* <!-- Buttons --> */}
      {session?.user?.role === "user" && (
        <Link
          href={`/bootcamps/${id}/add-review`}
          className="btn btn-primary btn-block my-3"
        >
          <i className="fas fa-pencil-alt"></i> Review This Bootcamp
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
