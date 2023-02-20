import React from "react";
import { Video } from "../interfaces/video";
import { NavLink } from "react-router-dom";
import { modalState, movieState } from "./../atoms/modalAtom";
import { useRecoilState } from "recoil";

interface Props {
  video: Video;
  handleDeleteVideo: (video_id: number) => void;
}

const VideoItem = ({ video, handleDeleteVideo }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white w-full max-w-sm">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setCurrentMovie(video);
            setShowModal(true);
          }}
        >
          <div className="absolute h-full w-full opacity-0 hover:opacity-90 rounded-t-lg transition duration-500 bg-white z-30 flex flex-col justify-center items-center text-center p-8">
            <p className="leading-4 mt-4 text-left">{video.description}</p>
          </div>
          <img
            src={video.poster_path}
            alt="video.name"
            className="rounded-t-lg z-0"
          />
        </div>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {video.name}
          </h5>
          <div className="flex justify-around">
            <button
              onClick={() => {
                handleDeleteVideo(video.video_id);
              }}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Delete
            </button>
            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              <NavLink to="/update" state={{ video }}>
                Update
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
