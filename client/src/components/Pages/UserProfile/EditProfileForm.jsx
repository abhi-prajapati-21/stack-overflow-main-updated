import React, { useState } from "react";
import {
  useUpdateProfile,
  useUploadProfilePicture,
} from "../../../hooks/useUsers";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const updateProfileMutation = useUpdateProfile();
  const uploadProfilePictureMutation = useUploadProfilePicture();

  const [name, setName] = useState(currentUser?.result.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First upload profile picture if selected
      if (profilePicture) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);

        await uploadProfilePictureMutation.mutateAsync({
          id: currentUser?.result._id,
          formData,
        });
      }

      // Then update other profile data
      const updateData = {
        name,
        about,
        tags: tags.length === 0 ? currentUser?.result?.tags : tags,
      };

      await updateProfileMutation.mutateAsync({
        id: currentUser?.result._id,
        updateData,
      });

      setSwitch(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label htmlFor="profilePicture">
          <h3>Profile Picture</h3>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewUrl && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={previewUrl}
                alt="Profile preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </label>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save Profile" className="user-submit-btn" />
        <button className="user-cancel-btn" onClick={() => setSwitch(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
