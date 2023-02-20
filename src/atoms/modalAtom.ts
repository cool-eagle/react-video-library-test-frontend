import { atom } from "recoil";
import { Video } from './../interfaces/video';

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<Video | null>({
  key: "movieState",
  default: null,
});