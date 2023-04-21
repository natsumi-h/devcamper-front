/* eslint-disable @next/next/no-img-element */
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";

import Courses from "@/components/bootcamp/courses";
import MainCol from "@/components/bootcamp/mainCol";
import Sidebar from "@/components/bootcamp/sidebar";
import { Bootcamp } from "@/components/bootcamps/mainCol";
import { API_URL } from "@/config/config";

type Props = {
  bootcamp: {
    data: Bootcamp;
  };
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

const DetailPage: NextPage<Props> = ({ bootcamp, courses }) => {
  return (
    <section className="bootcamp mt-5">
      <div className="container">
        <div className="row">
          <MainCol bootcamp={bootcamp}>
            <Courses courses={courses} />
          </MainCol>
          <Sidebar bootcamp={bootcamp}></Sidebar>
        </div>
      </div>
    </section>
  );
};

// ビルド時に生成する動的ルーティングのためのパスを指定する
// getServersidePropsを使用する場合は、getStaticPathsは使用できない
export const getStaticPaths: GetStaticPaths = async () => {
  const bootcampsRes = await fetch(`${API_URL}/api/v1/bootcamps/`);
  const bootcamps = await bootcampsRes.json();
  const paths = bootcamps.data.map((bootcamp: Bootcamp) => ({
    params: { id: bootcamp.id.toString() },
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
  const bootcampRes = await fetch(`${API_URL}/api/v1/bootcamps/${id}`);
  const bootcamp = await bootcampRes.json();

  const coursesRes = await fetch(`${API_URL}/api/v1/bootcamps/${id}/courses`);
  const courses = await coursesRes.json();

  return {
    props: {
      bootcamp,
      courses,
    },
    revalidate: 10,
  };
};

export default DetailPage;
