import React from "react";
import { useCurrentUser } from "../../../../hooks/useAuth";

import LeftSidebar from "../../../LeftSidebar/LeftSidebar";
import PostForm from "./PostForm";

const CreatePost = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <PostForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default CreatePost;
