import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useEditReviews } from "@/hooks/useEditReviews";

type Props = {
  reviewId: string;
};

const EditReviews: NextPage<Props> = ({ reviewId }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    watchRating,
    reviewsData,
    reviewsError,
    reviewsIsLoading,
  } = useEditReviews(reviewId);

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                href={`/bootcamps/${reviewsData?.data.bootcamp.id}`}
                className="btn btn-link text-secondary my-3"
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Bootcamp Info
              </Link>
              {reviewsIsLoading && <p>Loading...</p>}
              {reviewsError && <p>{reviewsError}</p>}
              {reviewsData && (
                <>
                  <h1 className="mb-2">{reviewsData?.data.bootcamp.name}</h1>
                  <h3 className="text-primary mb-4">Write a Review</h3>
                  <p>
                    You must have attended and graduated this bootcamp to review
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="rating">
                        Rating:{" "}
                        <span className="text-primary">{watchRating}</span>
                      </label>
                      <input
                        type="range"
                        className="custom-range"
                        min={1}
                        max={10}
                        step={1}
                        id="rating"
                        {...register("rating")}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Review title"
                        {...register("title")}
                      />
                      <p className="text-danger">{errors.title?.message}</p>
                    </div>
                    <div className="form-group">
                      <textarea
                        rows={10}
                        className="form-control"
                        placeholder="Your review"
                        {...register("review")}
                      ></textarea>
                      <p className="text-danger">{errors.review?.message}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Submit Review"
                        className="btn btn-dark btn-block"
                      />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditReviews;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.params!;

  return {
    props: {
      reviewId: id,
    },
  };
};
