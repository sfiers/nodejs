import React from "react";

function Like({ liked, onLikeToggle }) {
  let classes = "clickable fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i 
      className={classes}
    //   style={{ cursor: 'pointer' }}
      onClick={onLikeToggle}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
