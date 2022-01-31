import React, { useState } from "react";

const JoinRoomForm = ({ socket, setError }) => {
  const [join, setJoin] = useState({ room: "", name: "" });

  const handleChangeJoin = (e) => {
    const { name } = e.target;
    setJoin({
      ...join,
      [name]: e.target.value,
    });
  };

  const handleJoin = (e) => {
    e.preventDefault();
    socket.emit("join", join, (error) => {
      if (error) {
        setError(error);
      }
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
