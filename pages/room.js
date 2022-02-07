import React, { useEffect } from "react";
import VipRoom from "../components/VipRoom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setUsersList,
  setLoadingTrue,
  setLoadingFalse,
  setError,
  setBuzzed,
  resetBuzz,
} from "../redux/userSlice";
import { useRouter } from "next/router";
import { colorText } from "../utils";
import io from "socket.io-client";
import styles from "../styles/room.module.scss";

const Room = () => {
  const router = useRouter();
  const socket = io("https://buzzer-button.herokuapp.com");
  // const socket = io("http://localhost:4000");
  const dispatch = useDispatch();

  const { user, isLoading, isError } = useSelector((state) => state.userSlice);

  const joinRoomAsHost = ({ room, host }) => {
    socket.emit("join host", { room }, () => {
      dispatch(setUser({ id: socket.id, room, host }));

      setTimeout(() => {
        dispatch(setLoadingFalse());
      }, 500);
    });
  };

  const joinRoom = ({ name, room, host }) => {
    socket.emit("join", { name, room, host }, (error, user) => {
      if (error) {
        return dispatch(setError(error));
      }

      dispatch(setUser(user));
      setTimeout(() => {
        dispatch(setLoadingFalse());
      }, 500);
    });
  };

  useEffect(() => {
    dispatch(setLoadingTrue());
    const { name, room, host } = JSON.parse(localStorage.getItem("user"));
    const localUsersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const user = { name, room, host };

    if (room !== localUsersList[0]?.room) {
      localStorage.setItem("usersList", JSON.stringify([]));
    }

    if (!host) {
      joinRoom(user);
      return;
    }

    joinRoomAsHost(user);
  }, []);

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

  if (isLoading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <h2 className={styles.loadingMessage}>{colorText("LOADING")}</h2>
      </div>
    );
  }

  return user.host ? (
    <VipRoom handleResetBuzz={handleResetBuzz} />
  ) : (
    <div className={styles.roomContainer}>
      <h2 className={styles.roomHeading}>{user.room}</h2>
      <span className={styles.lineSpan}></span>
      <h3
        className={`${styles.userName} ${user.buzzed ? styles.buzzed : null}`}
      >
        {user.name}
      </h3>
      <button
        className={`${
          user.buzzed ? styles.buzzButtonBuzzed : styles.buzzButton
        }`}
        onClick={handleClick}
      >
        {user.buzzed ? "BUZZED" : "BUZZ"}
      </button>
    </div>
  );
};

export default Room;
