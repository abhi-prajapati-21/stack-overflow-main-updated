import React from "react";
import { Link } from "react-router-dom";

import "./Users.css";
import Avatar from "../../Avatar/Avatar";

const User = ({ user }) => {
  return (
    <Link to={`/Users/${user._id}`} className="user-profile-link">
      <Avatar
        backgroundColor="purple"
        px="20px"
        py="15px"
        borderRadius="50%"
        color="white"
        fontSize="20px"
        profilePicture={user?.profilePicture}
        alt={`${user?.name}'s profile`}
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <h5>{user.name}</h5>
    </Link>
  );
};

export default User;
