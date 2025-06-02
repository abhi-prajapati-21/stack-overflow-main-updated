import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Avatar from "../../../Avatar/Avatar";
import Comment from "./Comment";
import likeIcon from "../../../../assets/like-svgrepo-com.svg";
import redLikeIcon from "../../../../assets/redLike.svg";
import commentIcon from "../../../../assets/comment-svgrepo-com.svg";
import deletePost from "../../../../assets/delete-svgrepo-com.svg";

import "../Community.css";
import {
  useDeletePost,
  usePostComment,
  usePostLike,
} from "../../../../hooks/usePosts";
import { useAddFriend } from "../../../../hooks/useFriends";

const Post = ({ postProp }) => {
  const { post, currentUser, users } = postProp;

  const [isActive, setActive] = useState("false");
  const [comment, setComment] = useState("");

  const deletePostMutation = useDeletePost();
  const postCommentMutation = usePostComment();
  const postLikeMutation = usePostLike();
  const addFriendMutation = useAddFriend();
  const userPosted = users?.filter(
    (user) => user?._id === post?.userPosted?.userId
  )[0];

  // Post is liked or not
  const isLiked = post.likes.filter((id) => id === currentUser?.result._id)[0];

  const likeHandler = () => {
    if (!currentUser?.result) {
      alert("please login or signup first");
      return null;
    }
    postLikeMutation.mutate({
      _id: post?._id,
      value: {
        value: "likes",
        userId: currentUser?.result?._id,
      },
    });
  };

  const commentHandler = () => {
    if (comment === "") {
      alert("field can't be empty");
      return null;
    }
    if (!currentUser?.result) {
      alert("please login or signup first");
      return null;
    }
    postCommentMutation.mutate({
      _id: post?._id,
      comment: {
        commentBody: comment,
        userCommented: currentUser?.result?.name,
        userId: currentUser?.result?._id,
      },
    });
    setComment("");
  };

  const addFriendHandler = () => {
    if (!currentUser?.result) {
      alert("please login or signup first");
      return null;
    }
    addFriendMutation.mutate({
      _id: post?.userPosted?.userId,
      nameDetails: {
        requestedId: currentUser?.result?._id,
        requestedName: currentUser?.result?.name,
      },
    });
  };

  const deletePostHandler = () => {
    const deleteWarning = "you want to delete this post?";

    if (window.confirm(deleteWarning) === true) {
      deletePostMutation.mutate(post?._id);
    }
  };

  let isInclude = [];
  isInclude = userPosted?.friendRequests?.filter(
    (friend) => friend?.requestedId === currentUser?.result?._id
  )[0];
  const isFriend = userPosted?.friends?.filter(
    (friend) => friend?.friendId === currentUser?.result?._id
  )[0];

  return (
    <div className="post">
      <div className="post-header">
        <Link to="/" className="link post-header-info">
          <Avatar
            backgroundColor="dodgerblue"
            px="17px"
            py="13px"
            imgHeight="45px"
            imgWidth="45px"
            borderRadius="50%"
            color="white"
            profilePicture={post?.userPosted?.profilePicture}
          >
            {post?.userPosted.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="info-box">
            <strong>{post?.userPosted?.userName}</strong>
            <p>{moment(post?.postedOn).fromNow()}</p>
          </div>
        </Link>
        {isInclude ? (
          <button
            className={`add-btn ${
              currentUser?.result?._id === post?.userPosted?.userId && "d-none"
            }`}
          >
            Request sent
          </button>
        ) : isFriend ? (
          <button
            className={`add-btn ${
              currentUser?.result?._id === post?.userPosted?.userId && "d-none"
            }`}
          >
            Friend
          </button>
        ) : (
          <button
            className={`add-btn ${
              currentUser?.result?._id === post?.userPosted?.userId && "d-none"
            }`}
            onClick={addFriendHandler}
          >
            Add Friend
          </button>
        )}
      </div>
      <div className="post-body">
        <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
          {post?.postBody}{" "}
        </p>
      </div>
      <div className="post-media">
        {post?.mediaType === "image" && (
          <>
            <img
              src={`https://staxh-overflow-updated.onrender.com/${post.postMedia}`}
              alt=""
              className="post-img"
              loading="lazy"
            />
          </>
        )}
        {post?.mediaType === "video" && (
          <video
            src={`https://staxh-overflow-updated.onrender.com/${post.postMedia}`}
            className="post-video"
            controls={true}
          ></video>
        )}
      </div>
      <div className="post-footer">
        <div className="post-count">
          <span>{post?.likes?.length} likes</span>
          <span>{post?.comments?.length} comments</span>
        </div>
        <div className="post-like-comment">
          <label htmlFor="like" onClick={likeHandler}>
            <img
              src={isLiked ? redLikeIcon : likeIcon}
              alt="like"
              width="17"
              id="like"
            />
            <span>Like</span>
          </label>
          <label htmlFor="comment" onClick={() => setActive(!isActive)}>
            <img src={commentIcon} alt="comment" width="22" id="comment" />
            <span>Comment</span>
          </label>
          {currentUser?.result?._id === post?.userPosted?.userId && (
            <label htmlFor="delete" onClick={deletePostHandler}>
              <img src={deletePost} alt="delete" width="21" id="comment" />
              <span>delete</span>
            </label>
          )}
        </div>
        <div className={isActive ? "comment-box" : "show-comment-box"}>
          <div className="add-comment flex-row">
            <Avatar
              backgroundColor="dodgerblue"
              px="16px"
              py="10px"
              imgHeight="30px"
              imgWidth="30px"
              borderRadius="50%"
              color="white"
              profilePicture={currentUser?.result?.profilePicture}
            >
              {currentUser?.result?.name
                ? currentUser?.result?.name.charAt(0).toUpperCase()
                : "?"}
            </Avatar>
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Type something"
            />
            <button className="comment-btn" onClick={commentHandler}>
              comment
            </button>
          </div>
          <div className="comments-wrapper">
            {post?.comments?.map((comment) => (
              <Comment
                key={comment?._id}
                commentProps={{ comment, currentUser }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
