import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Join from "../components/JoinForm";
import Create from "../components/CreateForm";
import { colorText } from "../utils";
import styles from "../styles/landingPage.module.scss";

const Home = () => {
  const router = useRouter();

  const handleInputFocus = (labelRef) => {
    labelRef.current.style.transform = "translateY(-10px)";
    labelRef.current.style.color = "white";
  };

  const handleInputBlur = (labelRef) => {
    if (!window) return;

    const translateAmout = window.innerHeight > 900 ? "2.3rem" : "1.6rem";
    labelRef.current.style.transform = `translateY(${translateAmout})`;
    labelRef.current.style.color = "#c7c7c7";
  };

  return (
    <>
      <Head>
        <title>BuzzerButton</title>
        <meta name="Buzz" content="" />
      </Head>

      <main className={styles.landingContainer}>
        <h1 className={styles.mainHeading}>{colorText("BUZZER")}</h1>
        <Join
          router={router}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />
        <Create
          router={router}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />
      </main>
    </>
  );
};

export default Home;
