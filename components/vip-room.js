import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

const Vip = () => {
  const { usersList } = useSelector((state) => state.userSlice);

  return (
    <div className={styles.main}>
      <ul>
        {usersList?.map((user, i) => {
          const buzzStatus = user.buzzed ? "YES" : "NO";
          return (
            <li key={i}>
              <h2>{user.name}</h2>
              <p>{buzzStatus}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Vip;
