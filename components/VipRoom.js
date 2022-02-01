import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

const Vip = ({ handleResetBuzz }) => {
  const { usersList } = useSelector((state) => state.userSlice);

  return (
    <div className={styles.main}>
      <button onClick={handleResetBuzz}>RESET</button>
      <ul>
        {[...usersList]
          ?.sort((a, b) => a.buzzed - b.buzzed)
          .map((user, i) => {
            return (
              <li key={i}>
                <h2>{user.name}</h2>
                <p>{user.buzzed}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Vip;
