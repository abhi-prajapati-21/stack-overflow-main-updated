import React from "react";
import moment from "moment";

import "./Post.css";
import Avatar from "../../../Avatar/Avatar";

const Comment = ({ commentProps }) => {
  const { comment, currentUser } = commentProps;

  return (
    <div className="comment">
      <Avatar
        backgroundColor="dodgerblue"
        px="16px"
        py="10px"
        imgHeight="30px"
        imgWidth="30px"
        borderRadius="50%"
        color="white"
        profilePicture={comment?.profilePicture}
      >
        {comment?.userCommented?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="comment-details">
        <span className="comment-timing" style={{ fontWeight: "600" }}>
          {comment?.userCommented}
          <span style={{ color: "grey", fontWeight: "400" }}>
            {moment(comment?.commentedOn).fromNow()}{" "}
          </span>
        </span>
        <p style={{ margin: "3px 0px 0px 0px" }}>{comment?.commentBody} </p>
      </div>
    </div>
  );
};

export default Comment;
