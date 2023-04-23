/* eslint-disable @next/next/no-img-element */
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./pagination";
import { API_URL, NEXT_URL } from "@/config/config";
import { useBootcampsMainCol } from "@/hooks/useBootcampsMainCol";
import { bootcampsAtom } from "@/state/bootcamps";

export type Bootcamp = {
  averageRating: number;
  id: string;
  name: string;
  description: string;
  averageCost: number;
  website: string;
  jobAssistance: boolean;
  jobGuarantee: boolean;
  housing: boolean;
  acceptGi: boolean;
  photo: string;
  location: {
    city: string;
    state: string;
  };
  courses: {
    title: string;
  }[];
  careers: string[];
};

const MainCol = () => {
  const [jotaiData] = useAtom(bootcampsAtom);

  const { data, error, isLoading, allData } = useBootcampsMainCol(
    jotaiData.zipcode,
    jotaiData.milesFrom,
    jotaiData.rating,
    jotaiData.budget
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  if (data.count === 0) {
    return <>No Bootcamps Found</>;
  }

  return (
    <div className="col-md-8">
      {/* <!-- Bootcamps --> */}
      {data.data.map((bootcamp: Bootcamp) => (
        <div className="card mb-3" key={bootcamp.id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <Image
                src={`${API_URL}/uploads/${bootcamp.photo}`}
                className="card-img"
                alt="..."
                fill
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link href={`/bootcamps/${bootcamp.id}`}>
                    {bootcamp.name}
                    <span className="float-right badge badge-success">
                      {bootcamp.averageRating
                        ? bootcamp.averageRating.toFixed(1)
                        : "No Review"}
                    </span>
                  </Link>
                </h5>
                <span className="badge badge-dark mb-2">
                  {bootcamp.location.city}, {bootcamp.location.state}
                </span>
                <p className="card-text">
                  {bootcamp.careers.map((career, index: number) => {
                    if (index === bootcamp.careers.length - 1) {
                      return career;
                    } else {
                      return `${career}, `;
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <!-- Pagination --> */}
      <Pagination allData={allData} data={data}></Pagination>
    </div>
  );
};

export default MainCol;
