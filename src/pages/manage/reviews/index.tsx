import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Link from "next/link";
import { useManageReviews } from "@/hooks/useManageReviews";

export type Props = {
  token: string;
};

const ManageReviews: NextPage<Props> = () => {
  const { thisUsersReviews, data, error, isLoading, onClickDeleteHandler } =
    useManageReviews();

  type Review = {
    _id: string;
    rating: number;
    bootcamp: {
      name: string;
    };
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Reviews</h1>
              {isLoading && <p>Loading...</p>}
              {error && <p>{error.message}</p>}
              {thisUsersReviews && thisUsersReviews.length === 0 && (
                <p>You have not yet added any reviews</p>
              )}
              {thisUsersReviews && thisUsersReviews.length > 0 && (
                <>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Bootcamp</th>
                        <th scope="col">Rating</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {thisUsersReviews &&
                        thisUsersReviews.map((review: Review) => (
                          <tr key={review._id}>
                            <td>{review.bootcamp.name}</td>
                            <td>{review.rating}</td>
                            <td>
                              <Link
                                href={`/manage/reviews/edit/${review._id}`}
                                className="btn btn-secondary"
                              >
                                <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => onClickDeleteHandler(review._id)}
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

export default ManageReviews;
