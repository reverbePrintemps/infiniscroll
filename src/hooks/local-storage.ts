import { useState, useEffect } from "react";
import { Photo } from "./api";
import {
  getFromLocalStorage,
  LocalStorageItems,
  setToLocalStorage,
} from "../utils/local-storage";

export const useFavorites = () => {
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
    setFavorites(getFromLocalStorage(LocalStorageItems.Favorites));
  }, []);

  useEffect(() => {
    if (favorites) {
      setToLocalStorage({
        kind: LocalStorageItems.Favorites,
        value: favorites,
      });
    }
  }, [favorites]);

  return { favorites, toggleFavorite };
};
