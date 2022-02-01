import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Join from "../components/JoinRoomForm";
import Create from "../components/CreateRoomForm";
import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter();
  const { isError } = useSelector((state) => state.userSlice);

  return (
    <div className={styles.container}>
      <Head>
        <title>BuzzerButton</title>
        <meta name="" content="" />
      </Head>

      <main className={styles.main}>
        <p>{isError}</p>
        <Join router={router} />
        <Create router={router} />
      </main>
    </div>
  );
};

export default Home;
