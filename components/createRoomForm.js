import React, { useState } from "react";

const CreateRoomForm = ({ router }) => {
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
