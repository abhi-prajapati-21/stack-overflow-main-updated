import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadMedia } from "../../../../hooks/usePosts";

import "./CreatePost.css";

const PostForm = ({ currentUser }) => {
  const navigate = useNavigate();
  const uploadMediaMutation = useUploadMedia();

  const [postBody, setPostBody] = useState("");
  const [postMedia, setPostMedia] = useState(null);

  const postHandler = (e) => {
    e.preventDefault();

    if (!currentUser?.result) {
      alert("please login or signup first");
      return;
    }

    if (!postMedia && !postBody) {
      alert("add atleast one field (text or media)");
      return null;
    }

    const currentUserId = currentUser?.result?._id;

    const formData = new FormData();
    formData.append("image", postMedia);
    formData.append("postBody", postBody);
    formData.append("userName", currentUser?.result?.name);
    formData.append("userId", currentUserId);

    uploadMediaMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/Community");
      },
    });
  };

  return (
    <div className="create-post-form">
      <h1 style={{ fontWeight: "400" }} className="mx">
        Create Post
      </h1>

      <form
        onSubmit={postHandler}
        action="/media"
        method="post"
        encType="multipart/form-data"
      >
        <label htmlFor="desc" style={{ fontWeight: "600" }} className="mx">
          Description
        </label>
        <textarea
          id="desc"
          cols="30"
          name="postBody"
          rows="10"
          placeholder="Type something"
          className="mb"
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <label
          htmlFor="media"
          style={{ fontWeight: "600" }}
          className="mx strok-btn"
        >
          Add image/Video
        </label>
        <input
          type="file"
          id="media"
          name="image"
          accept="image/*, video/*"
          style={{ display: "none" }}
          onChange={(e) => setPostMedia(e.target.files[0])}
        />
        <input
          type="submit"
          value={uploadMediaMutation.isPending ? "Posting..." : "Post"}
          className="btn mx"
          style={{ fontSize: "1rem" }}
          disabled={uploadMediaMutation.isPending}
        />
      </form>
    </div>
  );
};

export default PostForm;
