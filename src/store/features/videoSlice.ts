import apiClient from "./../../api/index";
import { videoURL } from "./../../api/URL";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Video } from "../../interfaces/video";

interface VideoState {
  videos: Video[] | null;
  loading: boolean;
  errors: any;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  errors: null,
};

export const getVideo = createAsyncThunk(
  "video/getVideo",
  async (params?: { category: number }) => {
    const response = await apiClient.get(
      `${videoURL.getVideo}${params?.category ? "?category="+params.category : ""}`
    );
    return response.data;
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideo.fulfilled, (state, action) => {
      state.videos = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideo.rejected, (state, action) => {
      state.videos = [];
      state.loading = false;
      state.errors = action.error.message;
    });
  },
});

export default videoSlice.reducer;
