import React from "react";
import { useRemoveFriend } from "../../../../hooks/useFriends";

import Avatar from "../../../Avatar/Avatar";

const Friends = ({ allFriends }) => {
  const { requests, currentUser, users } = allFriends;

  const filteredlist = users?.filter(
    (user) => user?._id === requests?.friendId
  )[0];
  const friendWithId = filteredlist?.friends?.filter(
    (friend) => currentUser?.result?._id === friend.friendId
  )[0];
  const removeFriendMutation = useRemoveFriend();

  const removeFriendHandler = () => {
    console.log(friendWithId?._id);
    console.log(filteredlist);

    removeFriendMutation.mutate({
      obj: {
        _id: currentUser?.result?._id,
        userId: requests.friendId,
        friendObjId: friendWithId?._id,
      },
      Id: { objId: requests._id },
    });
  };

  return (
    <div className="friend-card">
      <Avatar
        backgroundColor="purple"
        px="17px"
        py="13px"
        imgHeight="30px"
        imgWidth="30px"
        borderRadius="50%"
        color="white"
      >
        {requests?.friendName?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="friend-info">
        <span>{requests?.friendName}</span>
        <div className="friends-btns-wrapper">
          <button onClick={removeFriendHandler}>Remove friend</button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
