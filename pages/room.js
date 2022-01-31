import React, { useState, useEffect } from "react";
import Vip from "../components/vip-room";
import { useRouter } from "next/router";
import io from "socket.io-client";
import styles from "../styles/Home.module.css";

const Room = () => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const router = useRouter();
  const socket = io("http://localhost:4000");

  useEffect(() => {
    socket.on("host list", (list) => {
      console.log("host list");
      setUsersList(list);
    });
    console.log(usersList, "list");
  });

  useEffect(() => {
    socket.on("message", ({ msg }) => {
      console.log(msg);
    });

    socket.on("buzzed", (name) => {
      console.log(name, "buzzed");
    });
  });

  useEffect(() => {
    const { name, room, host } = router.query;
    setUser({ name, room, host });

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log("error");
      }
    });
    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const handleClick = () => {
    socket.emit("buzz", user);
  };

  return user?.host ? (
    <Vip usersList={usersList} />
  ) : (
    <div className={styles.main}>
      <button onClick={handleClick}>click</button>
      <p>{user?.name}</p>
      <p>{user?.room}</p>
    </div>
  );
};

export default Room;
