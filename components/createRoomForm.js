import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../redux/userSlice";

const CreateRoomForm = ({ router }) => {
  const [create, setCreate] = useState({ room: "", name: "Host" });
  const dispatch = useDispatch();

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
    <form onSubmit={handleCreate}>
      <input name="room" onChange={handleChangeCreate} value={create.room} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateRoomForm;
