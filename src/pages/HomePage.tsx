import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "./../store/index";
import { getVideo } from "./../store/features/videoSlice";
import { useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Video } from "./../interfaces/video";
import useRequest from "./../hooks/useRequest";
import { deleteVideo } from "../api";
import VideoItem from "./../components/VideoItem";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

interface CategoryItem {
  id: number;
  name: string;
}

const categoryItems: CategoryItem[] = [
  { id: 0, name: "All" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10752, name: "War" },
  { id: 10770, name: "TV Movie" },
];

const HomePage = () => {
  const { videos, loading, errors } = useSelector(
    (state: RootState) => state.video
  );
  const dispatch = useAppDispatch();
  const [routeParams, setRouteParams] = useSearchParams();
  const [
    _deleteVideo,
    deleteVideoLoading,
    ,
    deleteVideoError,
    deleteVideoStatus,
  ] = useRequest(deleteVideo);

  useEffect(() => {
    if (!deleteVideoLoading) {
      if (deleteVideoStatus === 204) {
        toast.success("User deletion successful");
      }
    }
    const categoryInfo = routeParams.get("category");
    if (categoryInfo && /\d/.test(categoryInfo)) {
      let category = Number(categoryInfo);
      dispatch(getVideo({ category }));
    } else {
      dispatch(getVideo());
      setRouteParams();
    }
  }, [
    dispatch,
    routeParams,
    setRouteParams,
    deleteVideoStatus,
    deleteVideoLoading,
  ]);

  useEffect(() => {
    if (deleteVideoError) {
      toast.error(deleteVideoError.message || "Something went wrong");
    }
  }, [deleteVideoError]);

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  const handleDeleteVideo = (id: number) => {
    _deleteVideo(id);
  };

  const categoryHandler = (id: number) => {
    if (id === 0) {
      setRouteParams();
    } else {
      setRouteParams(
        createSearchParams({
          category: id.toString(),
        })
      );
    }
  };
  return (
    <main className="flex flex-low">
      <Oval
        height={80}
        width={80}
        color="#64748B"
        wrapperStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          WebkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass=""
        visible={loading}
        ariaLabel="oval-loading"
        secondaryColor="#94A3B8"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
      <section className="flex flex-col">
        {categoryItems.map((categoryItem: CategoryItem) => (
          <div
            key={categoryItem.id}
            onClick={() => categoryHandler(categoryItem.id)}
          >
            {categoryItem.name}
          </div>
        ))}
      </section>
      <section>
        {videos
          ? videos.map((video: Video, index) => (
              <VideoItem
                key={index}
                video={video}
                handleDeleteVideo={handleDeleteVideo}
              />
            ))
          : "No videos"}
      </section>
    </main>
  );
};

export default HomePage;
