import React from "react";

import { useUsers } from "../../../hooks/useUsers";
import User from "./User";
import "./Users.css";

const UsersList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;
  if (!users) return <div>No users found</div>;

  return (
    <div className="userlist-container">
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;
