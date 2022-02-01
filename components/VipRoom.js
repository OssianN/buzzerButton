import React from "react";
import { useSelector } from "react-redux";
import styles from "./vipRoom.module.css";

const Vip = ({ handleResetBuzz }) => {
  const { usersList } = useSelector((state) => state.userSlice);
  const buzzed = usersList.filter((user) => user.buzzed);
  const notBuzzed = usersList.filter((user) => !user.buzzed);

  return (
    <div className={styles.host__container}>
      <ul className={styles.users__ul}>
        {buzzed
          .sort((a, b) => a.buzzed - b.buzzed)
          .map((user, i) => {
            return (
              <li className={styles.users__li} key={i}>
                <h2>{user.name}</h2>
                <p>{user.buzzed}</p>
              </li>
            );
          })}
        <button onClick={handleResetBuzz}>RESET</button>
      </ul>

      <ul className={styles.users__ul}>
        {notBuzzed.map((user, i) => {
          return (
            <li className={styles.users__li} key={i}>
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
