import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";
import { HeartIcon } from "./assets/HeartIcon";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import {
  LocalStorageItems,
  getFromLocalStorage,
  setToLocalStorage,
} from "./utils/local-storage";

const apiConfig = {
  accessKey: process.env.REACT_APP_unsplash_access_key!,
};
const api = createApi(apiConfig);

export type Photo = {
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

type PhotoProps = {
  id: Photo["id"];
  favorite: boolean;
  urls: Photo["urls"];
  onClick: (id: Photo["id"]) => void;
};

const Image = ({ id, urls, onClick, favorite }: PhotoProps) => {
  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      {favorite && (
        <HeartIcon
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: "1",
            fill: "#fff",
          }}
        />
      )}
      <img
        style={{ position: "absolute", top: 0, left: 0 }}
        width="100%"
        className="img"
        src={urls.regular}
      />
      <button
        style={{ position: "absolute", bottom: "16px", left: "50%" }}
        onClick={() => onClick && onClick(id)}
      >
        Favorite
      </button>
    </div>
  );
};

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Photo["id"][] | undefined>(
    getFromLocalStorage(LocalStorageItems.Favorites)
  );

  const toggleFavorite = (id: Photo["id"]) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites?.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      } else {
        return prevFavorites ? [...prevFavorites, id] : [id];
      }
    });
  };

  useEffect(() => {
    if (favorites) {
      setToLocalStorage({
        kind: LocalStorageItems.Favorites,
        value: favorites,
      });
    }
  }, [favorites]);

  useEffect(() => {
    setFavorites(getFromLocalStorage(LocalStorageItems.Favorites));
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

  return (
    <div className="App">
      <div className="photos">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            id={photo.id}
            urls={photo.urls}
            onClick={(id) => toggleFavorite(id)}
            favorite={favorites?.includes(photo.id) || false}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;
