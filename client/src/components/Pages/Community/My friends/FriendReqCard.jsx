import React from "react";
import {
  useAcceptRequest,
  useRemoveRequest,
} from "../../../../hooks/useFriends";

import Avatar from "../../../Avatar/Avatar";

const FriendReqCard = ({ allRequests }) => {
  const { requests, currentUser } = allRequests;

  const acceptRequestMutation = useAcceptRequest();
  const removeRequestMutation = useRemoveRequest();

  const acceptRequestHandler = () => {
    acceptRequestMutation.mutate({
      obj: {
        _id: currentUser?.result?._id,
        userName: currentUser?.result?.name,
      },
      userDetails: requests,
    });
  };

  const rejectRequestHandler = () => {
    removeRequestMutation.mutate({
      _id: currentUser?.result?._id,
      userId: { objId: requests._id },
    });
  };

  return (
    <div className="friend-req-card">
      <Avatar
        backgroundColor="purple"
        px="17px"
        py="13px"
        imgHeight="30px"
        imgWidth="30px"
        borderRadius="50%"
        color="white"
      >
        {requests?.requestedName?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="req-card-info">
        <span>{requests?.requestedName}</span>
        <div className="btns-wrapper">
          <button onClick={acceptRequestHandler}>Accept</button>
          <button onClick={rejectRequestHandler}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default FriendReqCard;
