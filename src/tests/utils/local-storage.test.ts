import {
  LocalStorageItems,
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/local-storage";

describe("LocalStorage utility functions", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("getFromLocalStorage returns the stored value for Favorites", () => {
    const favorites = ["photo1", "photo2"];
    window.localStorage.setItem(
      LocalStorageItems.Favorites,
      JSON.stringify(favorites)
    );

    const result = getFromLocalStorage(LocalStorageItems.Favorites);
    expect(result).toEqual(favorites);
  });

  test("getFromLocalStorage returns undefined when no value is stored", () => {
    const result = getFromLocalStorage(LocalStorageItems.Favorites);
    expect(result).toBeUndefined();
  });

  test("setToLocalStorage stores the item in local storage", () => {
    const favorites = ["photo1", "photo2"];
    setToLocalStorage({
      kind: LocalStorageItems.Favorites,
      value: favorites,
    });

    const storedValue = window.localStorage.getItem(
      LocalStorageItems.Favorites
    );
    const parsedValue = JSON.parse(storedValue || "");
    expect(parsedValue).toEqual(favorites);
  });
});
