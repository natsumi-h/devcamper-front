import Head from "next/head";
import MainCol from "@/components/bootcamps/mainCol";
import Sidebar from "@/components/bootcamps/sidebar";

const Bootcamps = () => {
  return (
    <>
      <Head>
        <title>DevCamper | Find a coding bootcamp</title>
        <meta name="description" content="DevCamper | Find a coding bootcamp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="browse my-5">
        <div className="container">
          <div className="row">
            <Sidebar></Sidebar>
            <MainCol></MainCol>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bootcamps;
