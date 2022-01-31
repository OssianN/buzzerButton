import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Vip = ({ usersList }) => {
  return (
    <div className={styles.main}>
      <ul>
        {usersList?.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Vip;
