import { renderHook, waitFor } from "@testing-library/react";
import { Photo, usePhotos } from "../../hooks/api";
import { act } from "react-dom/test-utils";
import { api } from "../../api/unsplash";

jest.mock("../../api/unsplash", () => ({
  api: {
    search: {
      getPhotos: jest.fn(),
    },
  },
}));

describe("usePhotos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPhotos: Photo[] = [
    {
      id: "1",
      width: 100,
      height: 100,
      urls: {
        regular: "https://example.com/photo1.jpg",
        raw: "https://example.com/photo1.jpg",
        small: "https://example.com/photo1.jpg",
      },
      color: "blue",
      user: {
        username: "user2",
        name: "User 2",
      },
      description: "Photo 2",
    },
    {
      id: "2",
      width: 100,
      height: 100,
      urls: {
        regular: "https://example.com/photo2.jpg",
        raw: "https://example.com/photo2.jpg",
        small: "https://example.com/photo2.jpg",
      },
      color: "red",
      user: {
        username: "user2",
        name: "User 2",
      },
      description: "Photo 2",
    },
  ];

  it("should fetch and update photos on initial load", async () => {
    (api.search.getPhotos as jest.Mock).mockResolvedValueOnce({
      response: {
        results: mockPhotos,
      },
    });

    const { result } = renderHook(() => usePhotos());

    expect(result.current.photos).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();

    act(() => {
      result.current.fetchPhotos("cats");
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeUndefined();
    expect(result.current.photos).toEqual(mockPhotos);
  });

  it("should fetch and append more photos when fetchMore is called", async () => {
    (api.search.getPhotos as jest.Mock)
      .mockResolvedValueOnce({
        response: {
          results: mockPhotos,
        },
      })
      .mockResolvedValueOnce({
        response: {
          results: [mockPhotos[1]],
        },
      });

    const { result } = renderHook(() => usePhotos());

    act(() => {
      result.current.fetchPhotos("cats");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.fetchMore();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.photos).toEqual([...mockPhotos, mockPhotos[1]]);
  });

  it("should handle empty results", async () => {
    (api.search.getPhotos as jest.Mock).mockResolvedValueOnce({
      response: {
        results: [],
      },
    });

    const { result } = renderHook(() => usePhotos());

    act(() => {
      result.current.fetchPhotos("cats");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual("No results found 🙈");
    expect(result.current.photos).toEqual([]);
  });

  it("should handle API errors", async () => {
    const errorMessage = "No response from API";

    (api.search.getPhotos as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => usePhotos());

    act(() => {
      result.current.fetchPhotos("cats");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(errorMessage);
    expect(result.current.photos).toEqual([]);
  });
});
