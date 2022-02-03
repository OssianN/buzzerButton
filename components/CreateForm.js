import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/userSlice";
import styles from "../styles/landingPage.module.scss";

const CreateRoomForm = ({ router, handleInputFocus, handleInputBlur }) => {
  const [create, setCreate] = useState({ room: "", name: "Host" });
  const { isError } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const roomLabel = useRef(null);
  const errorMessage = isError && isError.includes("room") ? isError : null;

  const handleChangeCreate = (e) => {
    const { name } = e.target;
    setCreate({
      ...create,
      [name]: e.target.value,
    });
    dispatch(setError(false));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/room",
      query: { ...create, host: true },
    });
  };

  return (
    <form className={styles.createRoomForm} onSubmit={handleCreate}>
      <h2 className={styles.formHeading}>Host Room</h2>
      <label className={styles.formLabel} htmlFor="room" ref={roomLabel}>
        room name
      </label>
      <input
        className={styles.formInput}
        name="room"
        id="room"
        onFocus={() => handleInputFocus(roomLabel)}
        onBlur={() => handleInputBlur(roomLabel)}
        onChange={handleChangeCreate}
        value={create.room}
      />
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
      <button className={styles.formButtonCreate} type="submit">
        Create
      </button>
    </form>
  );
};

export default CreateRoomForm;
