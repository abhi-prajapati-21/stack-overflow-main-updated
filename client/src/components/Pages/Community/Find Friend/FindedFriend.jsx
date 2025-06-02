import React from "react";
import { useAddFriend } from "../../../../hooks/useFriends";
import "./FindFriend.css";
import Avatar from "../../../Avatar/Avatar";

const FindedFriend = ({ userProps }) => {
  const { user, currentUser, Allusers } = userProps;
  const addFriendMutation = useAddFriend();

  const userPosted = Allusers?.filter(
    (singleUser) => singleUser?._id === user?._id
  )[0];

  const addFriendHandler = () => {
    if (!currentUser?.result) {
      alert("please login or signup first");
      return null;
    }

    addFriendMutation.mutate({
      _id: user?._id,
      nameDetails: {
        requestedId: currentUser?.result?._id,
        requestedName: currentUser?.result?.name,
      },
    });
  };

  const isInclude = userPosted?.friendRequests?.filter(
    (friend) => friend?.requestedId === currentUser?.result?._id
  )[0];
  const isFriend = userPosted?.friends?.filter(
    (friend) => friend?.friendId === currentUser?.result?._id
  )[0];

  return (
    <div className="finded-friend-card">
      <Avatar
        backgroundColor="dodgerblue"
        px="16px"
        py="10px"
        borderRadius="50%"
        imgHeight="30px"
        imgWidth="30px"
        color="white"
        profilePicture={user?.profilePicture}
        alt={`${user?.name}'s profile`}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>
      <h5 style={{ margin: "0px 0px 0px 10px" }}>{user?.name}</h5>
      {isInclude ? (
        <button
          className={` ${currentUser?.result?._id === user?._id && "d-none"}`}
        >
          Request sent
        </button>
      ) : isFriend ? (
        <button
          className={` ${currentUser?.result?._id === user?._id && "d-none"}`}
        >
          Friend
        </button>
      ) : (
        <button
          onClick={addFriendHandler}
          className={` ${user?._id === currentUser?.result?._id && "d-none"}`}
          disabled={addFriendMutation.isPending}
        >
          {addFriendMutation.isPending ? "Sending..." : "Add Friend"}
        </button>
      )}
    </div>
  );
};

export default FindedFriend;
