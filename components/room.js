import React from "react";
import Vip from "./vip-room";
import styles from "../styles/Home.module.css";

const Room = ({ user, usersList, handleClick }) => {
  return user.host ? (
    <Vip usersList={usersList} />
  ) : (
    <div className={styles.main}>
      <button onClick={handleClick}>click</button>
      <p>{user.name}</p>
      <p>{user.status}</p>
    </div>
  );
};

export default Room;
