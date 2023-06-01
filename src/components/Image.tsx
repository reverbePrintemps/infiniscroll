import { useState } from "react";
import { HeartIcon } from "../assets/HeartIcon";
import "../styles/Image.css";

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

type ImageProps = {
  image: Photo;
  favorite: boolean;
  onClick: (id: Photo["id"]) => void;
};

export const Image = ({ image, onClick, favorite }: ImageProps) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      className="Image"
      style={{ position: "relative" }}
      onClick={() => setShowDescription(!showDescription)}
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      {showDescription && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        >
          <h1>{image.description}</h1>
          <h2>{image.user.name}</h2>
          <button
            style={{ position: "absolute", bottom: "16px", left: "50%" }}
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick(image.id);
            }}
          >
            Favorite
          </button>
        </div>
      )}
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
        className="Image__img"
        width="100%"
        src={image.urls.regular}
        alt={image.description || ""}
      />
    </div>
  );
};
