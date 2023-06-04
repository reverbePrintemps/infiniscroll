import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { useCallback, useState } from "react";
import { api } from "../api/unsplash";

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
  description: string | null;
};

const resultsPerPage = 10;

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchPhotos = useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: ApiResponse<Photos> = await api.search.getPhotos({
        query,
        perPage: resultsPerPage,
        page,
      });

      if (res.response) {
        setPhotos((prevPhotos) =>
          page === 1
            ? res.response.results
            : [...prevPhotos, ...res.response.results]
        );
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setLoading(false);
    }
  }, []);

  const fetchMore = useCallback(() => {
    !loading && fetchPhotos(searchQuery, page);
  }, [loading, fetchPhotos, searchQuery, page]);

  return {
    photos,
    loading,
    error,
    fetchMore,
    fetchPhotos: (query: string) => {
      setSearchQuery(query);
      fetchPhotos(query, 1);
    },
  };
};
