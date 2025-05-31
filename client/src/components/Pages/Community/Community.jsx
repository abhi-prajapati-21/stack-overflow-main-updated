import React, { Suspense } from "react";

import LeftSidebar from "../../LeftSidebar/LeftSidebar";
// import AllPosts from './Posts/AllPosts'
import FindFriend from "./Find Friend/FindFriend";
import { usePosts } from "../../../hooks/usePosts";
import { useCurrentUser } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";

const AllPosts = React.lazy(() => import("./Posts/AllPosts"));

const Community = () => {
  const { data: Posts } = usePosts();
  const { data: currentUser } = useCurrentUser();
  const { data: users } = useUsers();

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <Suspense fallback={<div>Loading</div>}>
          <AllPosts
            postsProps={{ Posts: Posts, currentUser: currentUser, users }}
          />
        </Suspense>
        <div className="find-friend-component">
          <FindFriend />
        </div>
      </div>
    </div>
  );
};

export default Community;
