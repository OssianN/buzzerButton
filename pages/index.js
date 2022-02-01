import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Join from "../components/JoinForm";
import Create from "../components/CreateForm";

const Home = () => {
  const router = useRouter();
  const { isError } = useSelector((state) => state.userSlice);

  return (
    <div>
      <Head>
        <title>BuzzerButton</title>
        <meta name="" content="" />
      </Head>

      <main>
        <p>{isError}</p>
        <Join router={router} />
        <Create router={router} />
      </main>
    </div>
  );
};

export default Home;
