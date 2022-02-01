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
              <li className={styles.users__li} key={i}>
                <h2>
                  {`${i + 1}. `}
                  {user.name}
                </h2>
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
            <li className={styles.users__li} key={i}>
              <h2>{user.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Vip;
