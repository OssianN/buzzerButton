import React, { useState, useEffect } from "react";
import Vip from "../components/vip-room";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { setUser, setUsersList, setError, setBuzzed } from "../redux/userSlice";
import styles from "../styles/Home.module.css";

const Room = () => {
  const router = useRouter();
  const socket = io("https://buzzer-button.herokuapp.com"); //http://localhost:4000
  const dispatch = useDispatch();

  const { user, isLoading, isError } = useSelector((state) => state.userSlice);

  useEffect(() => {
    socket.on("host list", (list) => {
      dispatch(setUsersList(list));
    });
  });

  useEffect(() => {
    socket.on("buzzed", (id) => {
      dispatch(setBuzzed(id));
    });
  });

  useEffect(() => {
    const { name, room, host } = router.query;

    if (host) {
      socket.emit("create", { room }, (error) => {
        if (error) {
          return dispatch(setError(error));
        }
        dispatch(setUser({ name, room, host }));
      });
      return;
    }

    socket.emit("join", { name, room, host }, (error, user) => {
      if (error) {
        return dispatch(setError(error));
      }
      dispatch(setUser(user));
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const handleClick = () => {
    socket.emit("buzz", user);
  };

  if (isError) {
    router.push("/");
    return <></>;
  }

  return user?.host ? (
    <Vip />
  ) : (
    <div className={styles.main}>
      <button onClick={handleClick}>click</button>
      <p>{user?.name}</p>
      <p>{user?.buzzed}</p>
    </div>
  );
};

export default Room;
