/* eslint-disable @next/next/no-img-element */
import React, { Children, FC, ReactChildren, ReactNode } from "react";
import { Bootcamp } from "../bootcamps/mainCol";

type Props = {
  bootcamp: {
    data: Bootcamp;
  };
  children: ReactNode;
};

const MainCol: FC<Props> = ({ bootcamp, children }) => {
  const { name, description, averageCost, id } = bootcamp.data;
  return (
    <div className="col-md-8">
      <h1>{name}</h1>
      <p>{description}</p>
      <p className="lead mb-4">
        Average Course Cost:{" "}
        <span className="text-primary">${averageCost?.toLocaleString()}</span>
      </p>
      {children}
    </div>
  );
};

export default MainCol;
