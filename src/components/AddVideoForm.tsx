import React, { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { addVideo } from "../api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Video } from "../interfaces/video";
import { Item, MultiSelect } from "./MultiSelect";

const categoryItems: Item[] = [
  { id: "12", value: "Adventure" },
  { id: "14", value: "Fantasy" },
  { id: "16", value: "Animation" },
  { id: "18", value: "Drama" },
  { id: "27", value: "Horror" },
  { id: "28", value: "Action" },
  { id: "35", value: "Comedy" },
  { id: "36", value: "History" },
  { id: "37", value: "Western" },
  { id: "53", value: "Thriller" },
  { id: "80", value: "Crime" },
  { id: "99", value: "Documentary" },
  { id: "878", value: "Science Fiction" },
  { id: "9648", value: "Mystery" },
  { id: "10402", value: "Music" },
  { id: "10749", value: "Romance" },
  { id: "10751", value: "Family" },
  { id: "10752", value: "War" },
  { id: "10770", value: "TV Movie" },
];

const validationSchema = Yup.object().shape({
  video_id: Yup.string().required("Id is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  poster_path: Yup.string().required("Poster path is required"),
  video_path: Yup.string().required("Video path is required"),
});

export interface VideoWithCategory extends Video {
  category: Item[];
}

const AddVideoForm = () => {
  const [_addVideo, , addVideoRes] = useRequest(addVideo);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<VideoWithCategory>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<VideoWithCategory> = (
    data: VideoWithCategory
  ) => {
    _addVideo({
      video_id: data.video_id,
      name: data.name,
      description: data.description,
      poster_path: data.poster_path,
      video_path: data.video_path,
      category: data.category?.map((x) => x.id) || [],
    });
  };

  useEffect(() => {
    console.log("addVideoRes: ", addVideoRes);
    if (addVideoRes?.addData?.affectedRows) {
      reset();
      toast.success("Video addition success");
    } else if (addVideoRes?.message) {
      toast.error(addVideoRes.message);
    }
  }, [addVideoRes, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">ID</label>
        <input
          type="number"
          {...register("video_id", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="text-red-500 text-xs italic">
          {errors.video_id?.message}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="text-red-500 text-xs italic">
          {errors.name?.message}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          rows={5}
          cols={100}
          {...register("description", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="text-red-500 text-xs italic">
          {errors.description?.message}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Poster path
        </label>
        <input
          type="text"
          {...register("poster_path", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="text-red-500 text-xs italic">
          {errors.poster_path?.message}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Video path
        </label>
        <input
          type="text"
          {...register("video_path", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="text-red-500 text-xs italic">
          {errors.video_path?.message}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Categories
        </label>
        <div className="shadow appearance-none border rounded w-full py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <MultiSelect
                items={categoryItems}
                placeholder="Click Here"
                field={field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={!isValid}
          className={`${
            isValid
              ? "bg-blue-500 hover:bg-blue-700 hover:cursor-pointer"
              : "bg-blue-300"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddVideoForm;
