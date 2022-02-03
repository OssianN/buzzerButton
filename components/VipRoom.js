import React from "react";
import { useSelector } from "react-redux";
import styles from "./vipRoom.module.scss";

const Vip = ({ handleResetBuzz }) => {
  const { usersList } = useSelector((state) => state.userSlice);
  const buzzed = usersList.filter((user) => user.buzzed);
  const notBuzzed = usersList.filter((user) => !user.buzzed);

  return (
    <div className={styles.hostContainer}>
      <ol className={styles.buzzedList}>
        {buzzed
          .sort((a, b) => a.buzzed - b.buzzed)
          .map((user, i) => {
            return (
              <li className={styles.usersListItem} key={i}>
                <span className={styles.userOrder}>{`${i + 1}. `}</span>
                <h2 className={styles.userName}>{user.name}</h2>
                <span></span>
              </li>
            );
          })}
        <button className={styles.resetButton} onClick={handleResetBuzz}>
          RESET
        </button>
      </ol>

      <ul className={styles.notBuzzedList}>
        {notBuzzed.map((user, i) => {
          return (
            <li className={styles.usersListItem} key={i}>
              <span></span>
              <h2 className={styles.userName}>{user.name}</h2>
              <span></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Vip;
