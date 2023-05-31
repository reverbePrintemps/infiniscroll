import { Photo } from "../App";

export enum LocalStorageItems {
  Favorites = "favorites",
}

type LocalStorageItemsType = {
  kind: LocalStorageItems.Favorites;
  value: Photo["id"][];
};

type ReturnType<T extends LocalStorageItemsType["kind"]> =
  T extends LocalStorageItems.Favorites ? [string] | undefined : never;

export const getFromLocalStorage = <T extends LocalStorageItemsType["kind"]>(
  item: T
): ReturnType<T> | undefined => {
  const storedValue = window.localStorage.getItem(item);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return undefined;
};

export const setToLocalStorage = (item: LocalStorageItemsType) => {
  window.localStorage.setItem(item.kind, JSON.stringify(item.value));
};
