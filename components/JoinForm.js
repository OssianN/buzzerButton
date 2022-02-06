import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/userSlice";
import styles from "../styles/landingPage.module.scss";

const JoinRoomForm = ({ router, handleInputFocus, handleInputBlur }) => {
  const [join, setJoin] = useState({ room: "", name: "" });
  const { isError } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const roomLabel = useRef(null);
  const nameLabel = useRef(null);
  const errorMessage =
    isError &&
    (isError.includes("name taken") || isError.includes("room does not exist"))
      ? isError
      : null;

  const handleChangeJoin = (e) => {
    const { name } = e.target;
    setJoin({
      ...join,
      [name]: e.target.value,
    });
    dispatch(setError(false));
  };

  const handleJoin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ ...join, host: false }));
    router.push("/room");
  };

  return (
    <form className={styles.joinRoomForm} onSubmit={handleJoin}>
      <h2 className={styles.formHeading}>Join Room</h2>
      <label className={styles.formLabel} htmlFor="room" ref={roomLabel}>
        enter room name
      </label>
      <input
        className={styles.formInput}
        name="room"
        id="room"
        onFocus={() => handleInputFocus(roomLabel)}
        onBlur={() => handleInputBlur(roomLabel)}
        onChange={handleChangeJoin}
        value={join.room}
      />
      <label className={styles.formLabel} htmlFor="name" ref={nameLabel}>
        enter a username
      </label>
      <input
        className={styles.formInput}
        name="name"
        id="name"
        onFocus={() => handleInputFocus(nameLabel)}
        onBlur={() => handleInputBlur(nameLabel)}
        onChange={handleChangeJoin}
        value={join.name}
      />
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
      <button className={styles.formButtonJoin} type="submit">
        Join
      </button>
    </form>
  );
};

export default JoinRoomForm;
