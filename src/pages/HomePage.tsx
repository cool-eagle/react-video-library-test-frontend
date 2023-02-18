import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "./../store/index";
import { getVideo } from "./../store/features/videoSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Video } from "./../interfaces/video";

const HomePage = () => {
  const { videos, loading, errors } = useSelector(
    (state: RootState) => state.video
  );
  const dispatch = useAppDispatch();
  const [routeParams, setRouteParams] = useSearchParams();
  // const [category, setCategory] = useState<number | undefined>();

  // useEffect(() => {
  // }, [dispatch, category]);

  useEffect(() => {
    const categoryInfo = routeParams.get("category");
    if (categoryInfo && /\d/.test(categoryInfo)) {
      let category = Number(categoryInfo);
      dispatch(getVideo({ category }));
    } else {
      dispatch(getVideo());
      setRouteParams();
    }
  }, [dispatch, routeParams, setRouteParams]);
  return (
    <main>
      <section>
        category
      </section>
      <section>
        {videos &&
          videos.map((video: Video, index) => (
            <div key={index}>{video.name}</div>
          ))}
      </section>
    </main>
  );
};

export default HomePage;
