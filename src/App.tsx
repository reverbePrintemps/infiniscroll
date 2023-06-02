import { api } from "./api/unsplash";
import { Grid } from "./components/Grid";
import { useEffect, useState } from "react";
import { Image, Photo } from "./components/Image";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import {
  LocalStorageItems,
  getFromLocalStorage,
  setToLocalStorage,
} from "./utils/local-storage";

import "./styles/App.css";

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
        document.body.offsetHeight - window.innerHeight / 2
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
      <Grid
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)",
          padding: "clamp(4px, calc(2%), 32px)",
          gap: "clamp(4px, calc(3vw), 32px)",
          margin: "auto",
        }}
      >
        {photos.map((photo) => (
          <Image
            key={photo.id}
            image={photo}
            onClick={(id) => toggleFavorite(id)}
            favorite={favorites?.includes(photo.id) || false}
          />
        ))}
      </Grid>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;
