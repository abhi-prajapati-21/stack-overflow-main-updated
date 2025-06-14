import React from "react";

const Avatar = ({
  children,
  backgroundColor,
  px,
  py,
  color,
  borderRadius,
  fontSize,
  cursor,
  textDecoration,
  profilePicture,
  imgHeight,
  imgWidth,
  alt,
}) => {
  const style = {
    backgroundColor,
    padding: profilePicture ? "0" : `${py} ${px}`,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    height: imgHeight || "35px",
    width: imgWidth || "35px",
    objectFit: "cover",
    borderRadius: borderRadius || "0",
  };

  return (
    <div style={style}>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={alt || "Profile"}
          style={imageStyle}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
      ) : null}
      <span style={{ display: profilePicture ? "none" : "block" }}>
        {children}
      </span>
    </div>
  );
};

export default Avatar;
