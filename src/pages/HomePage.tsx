import React, { useEffect, useState } from "react";
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

  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    if (!deleteVideoLoading) {
      if (deleteVideoStatus === 204) {
        toast.success("Video deletion successful");
      }
    }
    reLoading();
  }, [deleteVideoLoading, deleteVideoStatus]);

  useEffect(() => {
    reLoading();
  }, [dispatch, routeParams, setRouteParams]);

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

  const reLoading = () => {
    const categoryInfo = routeParams.get("category");
    if (categoryInfo && /\d/.test(categoryInfo)) {
      let category = Number(categoryInfo);
      dispatch(getVideo({ category }));
    } else {
      dispatch(getVideo());
      setRouteParams();
    }
  };

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
    <main className="flex flex-row">
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
      <span
        className={`${
          openSideBar && "hidden"
        } md:hidden fixed text-gray-600 text-4xl shadow-lg top-5 left-4 cursor-pointer z-40`}
        onClick={() => {
          setOpenSideBar(true);
          window.scrollTo(0, 0);
        }}
      >
        <i className="bi bi-filter-left px-2 bg-slate-400 rounded-md"></i>
      </span>
      <section
        className={`${
          !openSideBar && "hidden md:block"
        } absolute opacity-90 md:static p-2 flex-none basis-60 shadow-lg text-center bg-slate-200 z-40`}
      >
        <div className="text-gray-600 text-xl">
          <div className="p-2.5 mt-1 flex justify-around items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-slate-400"></i>
            <h1 className="font-bold text-gray-600 text-[15px] ml-3">
              Categories
            </h1>
            <i
              className="bi bi-x cursor-pointer mr-2 md:hidden"
              onClick={() => setOpenSideBar(false)}
            ></i>
          </div>
          <div className="my-2 bg-slate-600 h-[1px]"></div>
        </div>
        {categoryItems.map((categoryItem: CategoryItem) => (
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-300 text-white"
            key={categoryItem.id}
            onClick={() => {
              categoryHandler(categoryItem.id);
              setOpenSideBar(false);
            }}
          >
            <span className="text-[15px] ml-4 text-gray-600 font-bold">
              {categoryItem.name}
            </span>
          </div>
        ))}
      </section>
      <section className="flex-grow p-8">
        <div className="mx-auto m-4 sm:grid sm:grid-cols-2 2xl:grid 2xl:grid-cols-3 gap-8">
          {videos
            ? videos.map((video: Video, index) => (
                <VideoItem
                  key={index}
                  video={video}
                  handleDeleteVideo={handleDeleteVideo}
                />
              ))
            : "No Videos"}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
