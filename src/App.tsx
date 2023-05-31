import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const apiConfig = {
  accessKey: process.env.REACT_APP_unsplash_access_key!,
};
const api = createApi(apiConfig);

type Photo = {
  id: number | string;
  width: number;
  height: number;
  urls: { large?: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { urls } = photo;

  return <img width={200} className="img" src={urls.regular} />;
};

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.search
      .getPhotos({ query: "nature", page, perPage: 10 })
      .then((res: ApiResponse<Photos>) => {
        if (res.response?.results) {
          setPhotos((prevPhotos) =>
            page === 1
              ? res.response.results
              : [...prevPhotos, ...res.response.results]
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <div className="photos">
        {photos.map((photo) => (
          <PhotoComp key={photo.id} photo={photo} />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;
