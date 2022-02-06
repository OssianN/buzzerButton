import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsersList } from "../redux/userSlice";
import InViewport from "./InViewport";
import styles from "./vipRoom.module.scss";

const Vip = ({ handleResetBuzz }) => {
  const dispatch = useDispatch();
  const { usersList, user } = useSelector((state) => state.userSlice);
  const buzzed = usersList.filter((user) => user.buzzed);
  const notBuzzed = usersList.filter((user) => !user.buzzed);

  const viewPortRef = useRef(null);

  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem("usersList"));
    if (localList) {
      dispatch(setUsersList(localList));
    }
  }, []);

  return (
    <div className={styles.hostContainer}>
      <h1 className={styles.roomHeading}>{user.room}</h1>
      <div className={styles.listContainer}>
        <div className={styles.buzzedListContainer} ref={viewPortRef}>
          <ol className={styles.buzzedList}>
            {usersList.length > 0 ? (
              buzzed
                .sort((a, b) => a.buzzed - b.buzzed)
                .map((user, i) => {
                  return (
                    <InViewport
                      root={viewPortRef.current}
                      rootMargin="-20px"
                      key={i}
                    >
                      <li className={styles.usersListItem}>
                        <span className={styles.userOrder}>{`${i + 1}. `}</span>
                        <h2 className={styles.userName}>{user.name}</h2>
                        <span></span>
                      </li>
                    </InViewport>
                  );
                })
            ) : (
              <p className={styles.waitingText}>
                waiting for players to join...
              </p>
            )}
          </ol>
          <button className={styles.resetButton} onClick={handleResetBuzz}>
            RESET
          </button>
        </div>

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
    </div>
  );
};

export default Vip;
