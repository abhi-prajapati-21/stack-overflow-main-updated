import React from "react";

import "./MyFriends.css";
import { useCurrentUser } from "../../../../hooks/useAuth";
import { useUsers } from "../../../../hooks/useUsers";
import LeftSidebar from "../../../LeftSidebar/LeftSidebar";
import FriendReqCard from "./FriendReqCard";
import Friends from "./Friends";

const MyFriends = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: users } = useUsers();

  const currentUserDetails = users?.filter(
    (user) => user?._id === currentUser?.result?._id
  )[0];

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1 style={{ marginTop: "60px" }}>Friend Requests</h1>
        <div className="req-container">
          {!currentUser?.result && (
            <h1 style={{ fontWeight: "400" }}>please Login or signup</h1>
          )}
          {currentUserDetails?.friendRequests.length <= 0 && (
            <h1 style={{ fontWeight: "400" }}>don't have any Friend Request</h1>
          )}
          {currentUserDetails?.friendRequests.map((requests) => (
            <FriendReqCard allRequests={{ requests, currentUser }} />
          ))}
        </div>

        <h1>My Friends</h1>
        <div className="friend-container">
          {!currentUser?.result && (
            <h1 style={{ fontWeight: "400" }}>please Login or signup</h1>
          )}
          {currentUserDetails?.friends.length <= 0 && (
            <h1 style={{ fontWeight: "400" }}>don't have any Friends</h1>
          )}
          {currentUserDetails?.friends.map((requests) => (
            <Friends allFriends={{ requests, currentUser, users }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFriends;
