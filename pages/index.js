import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Join from "../components/joinRoomForm";
import Create from "../components/createRoomForm";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   setUser(user);
  //   setUsersList([...usersList, user]);
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>BuzzerButton</title>
        <meta name="" content="" />
      </Head>

      <main className={styles.main}>
        <p>{error}</p>
        <Join router={router} />
        <Create router={router} />
      </main>
    </div>
  );
};

export default Home;
