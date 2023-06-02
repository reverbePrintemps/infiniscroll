import { useEffect, useRef, useState } from "react";
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
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current && imageIsLoaded) {
      showDescription
        ? (overlayRef.current.style.maxHeight = `${overlayRef.current.scrollHeight}px`)
        : (overlayRef.current.style.maxHeight = "0px");
    }
  }, [showDescription, imageIsLoaded]);

  return (
    <div
      className="Image"
      onClick={() => setShowDescription(!showDescription)}
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div
        ref={overlayRef}
        className={`Image__overlay ${showDescription ? "m-show" : ""}`}
      >
        <div className="Image__descriptionContainer">
          {image.description && (
            <>
              <h1 className="Image__description">{image.description}</h1>
              <div className="Image__descriptionDivider"></div>
            </>
          )}
          <h2 className="Image__username">
            <i>{image.user.name}</i>
          </h2>
        </div>
        <button
          className={`Image__favoriteButton ${favorite ? "m-active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(image.id);
          }}
        >
          Favorite
        </button>
      </div>
      {favorite && (
        <HeartIcon
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: "1",
            fill: "#fff",
            filter: "drop-shadow(var(--shadow-shallow))",
          }}
        />
      )}
      <img
        className="Image__img"
        src={image.urls.regular}
        alt={image.description || ""}
        onLoad={() => setImageIsLoaded(true)}
      />
    </div>
  );
};
