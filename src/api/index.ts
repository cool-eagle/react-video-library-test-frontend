import axios from "axios";
import { videoURL } from "./URL";
import { Video } from "./../interfaces/video";

const host = "http://localhost:3100";
const apiClient = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default apiClient;

export const deleteVideo = (id: number) =>
  apiClient.delete(`${videoURL.deleteVideo}/${id}`);
export const updateVideo = (params: Video & { category: string[] }) =>
  apiClient.post(videoURL.updateVideo, params);
export const getByIdCategory = (id: number) =>
  apiClient.get(`${videoURL.getByIdCategory}/${id}`);
export const addVideo = (params: Video & { category: string[] }) =>
  apiClient.post(videoURL.addVideo, params);
