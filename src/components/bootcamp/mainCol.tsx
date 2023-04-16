/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Bootcamp } from "../bootcamps/mainCol";
import Courses from "./courses";

type Props = {
  bootcamp: {
    data: Bootcamp;
  };
};

const MainCol: FC<Props> = ({ bootcamp }) => {
  const { name, description, averageCost, id } = bootcamp.data;
  return (
    <div className="col-md-8">
      <h1>{name}</h1>
      <p>{description}</p>
      <p className="lead mb-4">
        Average Course Cost:{" "}
        <span className="text-primary">${averageCost?.toLocaleString()}</span>
      </p>
      <Courses id={id} />
    </div>
  );
};

export default MainCol;
