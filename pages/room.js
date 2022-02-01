import React, { useState, useEffect } from "react";
import VipRoom from "../components/VipRoom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setUsersList,
  setError,
  setBuzzed,
  resetBuzz,
} from "../redux/userSlice";
import { useRouter } from "next/router";
import io from "socket.io-client";
import styles from "../styles/Home.module.css";

const Room = () => {
  const router = useRouter();
  // const socket = io("https://buzzer-button.herokuapp.com");
  const socket = io("http://localhost:4000");
  const dispatch = useDispatch();

  const { user, isError } = useSelector((state) => state.userSlice);

  useEffect(() => {
    socket.on("host list", (list) => {
      dispatch(setUsersList(list));
    });

    socket.on("buzzed", (id, time) => {
      dispatch(setBuzzed({ id, time }));
    });

    socket.on("buzz has reset", () => {
      dispatch(resetBuzz());
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
    socket.emit("buzz", user, Date.now(), (time) => {
      dispatch(setUser({ ...user, buzzed: time }));
    });
  };

  const handleResetBuzz = () => {
    socket.emit("reset buzz", user.room);
  };

  if (isError) {
    router.push("/");
    return <></>;
  }

  return user?.host ? (
    <VipRoom handleResetBuzz={handleResetBuzz} />
  ) : (
    <div className={styles.main}>
      <button onClick={handleClick}>click</button>
      <p>{user?.name}</p>
      <p>{user?.buzzed}</p>
    </div>
  );
};

export default Room;
