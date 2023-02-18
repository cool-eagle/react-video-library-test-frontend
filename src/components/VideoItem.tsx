import React from "react";
import { Video } from "../interfaces/video";
import { NavLink } from "react-router-dom";

interface Props {
  video: Video;
  handleDeleteVideo: (video_id: number) => void;
}

const VideoItem = ({ video, handleDeleteVideo }: Props) => {
  return (
    <div className="">
      <div className="">
        <div>
          <img src={video.poster_path} alt="video.name" />
        </div>
        <div className="">
          {video.name} {video.description}
          <span className="">(#{video.video_id})</span>
        </div>
        <button
          onClick={() => {
            handleDeleteVideo(video.video_id);
          }}
          className=""
        >
          Delete
        </button>
        <button>
          <NavLink to="/update" state={{ video }}>
            Update
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default VideoItem;
