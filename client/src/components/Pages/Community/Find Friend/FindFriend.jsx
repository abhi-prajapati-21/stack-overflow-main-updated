import React, { useState } from "react";

import "./FindFriend.css";
import searchIcon from "../../../../assets/search-solid.svg";
import FindedFriend from "./FindedFriend";
import { useUsers } from "../../../../hooks/useUsers";
import { useCurrentUser } from "../../../../hooks/useAuth";

const FindFriend = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: Allusers } = useUsers();
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="find-friend-main">
      <div className="find-friend-header">
        <h3 style={{ margin: "0" }}>Find Friend</h3>
      </div>
      <form style={{ position: "relative" }}>
        <img src={searchIcon} alt="" width="17" />
        <input
          type="text"
          placeholder="Search friend"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div style={{ padding: "10px" }} className="finded-friends">
        {Allusers?.filter((user) =>
          user?.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((user, index) => (
          <FindedFriend
            userProps={{ user, currentUser, Allusers }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FindFriend;
