import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddVideoForm from "../components/AddVideoForm";
import { Video } from "../interfaces/video";
import useRequest from "./../hooks/useRequest";
import { getByIdCategory } from "./../api/index";
import { useEffect, useState } from "react";

const UpdateVideo = () => {
  const [_getByIdCategory, , getByIdCategoryRes] = useRequest(getByIdCategory);
  const location: any = useLocation();
  const video: Video | undefined = location?.state?.video;
  const navigate = useNavigate();

  const [category, setCategory] = useState<string[] | null>(null);

  useEffect(() => {
    if (!video) {
      navigate("/");
      return;
    } else {
      _getByIdCategory(video.video_id);
    }
  }, [_getByIdCategory, navigate, video]);

  useEffect(() => {
    if (getByIdCategoryRes?.data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setCategory(
        getByIdCategoryRes.data.map((item: { genre_id: number }) =>
          item.genre_id.toString()
        )
      );
    } else if (getByIdCategoryRes?.message) {
      setCategory([]);
    }
  }, [getByIdCategoryRes]);
  return (
    <div className="w-5/6 flex items-center justify-center mx-auto mt-2">
      {category && (
        <AddVideoForm
          initialValue={video}
          initialCategory={category}
          updateForm
        />
      )}
    </div>
  );
};

export default UpdateVideo;
