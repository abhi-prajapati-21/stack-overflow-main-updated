import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../LeftSidebar/LeftSidebar";
import Avatar from "../../Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio ";
import "./UsersProfile.css";
import { useUsers } from "../../../hooks/useUsers";
import { useCurrentUser } from "../../../hooks/useAuth";

const UserProfile = () => {
  const { id } = useParams();
  const { data: users, isLoading } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const currentProfile = users?.filter((user) => user._id === id)[0];

  const [Switch, setSwitch] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
                borderRadius="50%"
                imgHeight={window.screen.width < 768 ? "100px" : "200px"}
                imgWidth={window.screen.width < 768 ? "130px" : "200px"}
                profilePicture={currentProfile?.profilePicture}
                alt={`${currentProfile?.name}'s profile`}
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined on{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                {window.screen.width < 425 ? "Edit" : "Edit Profile"}
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
