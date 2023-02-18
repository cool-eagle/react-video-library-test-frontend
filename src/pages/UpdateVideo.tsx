import React from 'react'
import { useLocation } from 'react-router-dom';
import { Video } from '../interfaces/video';

const UpdateVideo = () => {
  const location: any =useLocation();
  const video: Video | undefined = location?.state?.video
  return (
    <div>{video && video.video_id}</div>
  )
}

export default UpdateVideo