import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { Bootcamp } from "@/components/bootcamps/mainCol";
import MainCol from "@/components/reviews/mainCol";
import Sidebar from "@/components/reviews/sidebar";
import { API_URL } from "@/config/config";

type Props = {
  reviews: {
    data: Reviews;
  };
  id: string;
};

export type Reviews = {
  title: string;
  text: string;
  rating: number;
  bootcamp: {
    id: string;
    name: string;
    averageRating: number;
  };
  user: {
    name: string;
  };
  createdAt: string;
  _id: string;
}[];

const Reviews: NextPage<Props> = ({ reviews, id }) => {
  return (
    <section className="bootcamp mt-5">
      <div className="container">
        <div className="row">
          <MainCol reviews={reviews} id={id}></MainCol>
          <Sidebar reviews={reviews} id={id}></Sidebar>
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const bootcampsRes = await fetch(`${API_URL}/api/v1/bootcamps/`);
  const bootcamps = await bootcampsRes.json();
  const paths = bootcamps.data.map((bootcamp: Bootcamp) => ({
    params: { id: bootcamp.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const { id } = ctx.params!;
  const reviewRes = await fetch(`${API_URL}/api/v1/bootcamps/${id}/reviews`);
  const reviews = await reviewRes.json();
  return {
    props: {
      reviews,
      id,
    },
    revalidate: 10,
  };
};

export default Reviews;
