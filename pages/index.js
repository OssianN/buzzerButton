import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Head from "next/head";
import Join from "../components/joinRoomForm";
import Create from "../components/createRoomForm";
import styles from "../styles/Home.module.css";
import Room from "../components/room";
const socket = io("http://localhost:4000");

const Home = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    socket.on("user joined", (user) => {
      setUser(user);
      setUsersList([...usersList, user]);
    });
  }, []);

  useEffect(() => {
    socket.on("message", ({ msg }) => {
      console.log(msg);
    });

    socket.on("buzzed", (name) => {
      console.log(name, "buzzed");
    });
  });

  const handleClick = () => {
    socket.emit("buzz", user);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>BuzzerButton</title>
        <meta name="" content="" />
      </Head>

      <main className={styles.main}>
        {user ? (
          <>
            <Room
              socket={socket}
              user={user}
              usersList={usersList}
              handleClick={handleClick}
            />
          </>
        ) : (
          <>
            <p>{error}</p>
            <Join socket={socket} setError={setError} />
            <Create socket={socket} setError={setError} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
