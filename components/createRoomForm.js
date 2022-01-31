import React, { useState } from "react";

const createRoomForm = ({ socket, setError }) => {
  const [create, setCreate] = useState({ room: "", name: "Host" });

  const handleChangeCreate = (e) => {
    const { name } = e.target;
    setCreate({
      ...create,
      [name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    socket.emit("create", create, (error) => {
      setError(error);
    });
  };

  return (
    <form onSubmit={handleCreate}>
      <input name="room" onChange={handleChangeCreate} value={create.room} />
      <button type="submit">Create</button>
    </form>
  );
};

export default createRoomForm;
