import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../redux/userSlice";

const JoinRoomForm = ({ router }) => {
  const [join, setJoin] = useState({ room: "", name: "" });
  const dispatch = useDispatch();

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
    router.push({
      pathname: "/room",
      query: join,
    });
  };

  return (
    <form onSubmit={handleJoin}>
      <input name="room" onChange={handleChangeJoin} value={join.room} />
      <input name="name" onChange={handleChangeJoin} value={join.name} />
      <button type="submit">Join</button>
    </form>
  );
};

export default JoinRoomForm;
