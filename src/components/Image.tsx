import { CSSProperties, useEffect, useRef, useState } from "react";
import { HeartIcon } from "../assets/HeartIcon";
import { Skeleton } from "./Skeleton";
import { Photo } from "../hooks/api";

import "../styles/Image.css";

type ImageProps = {
  image: Photo;
  favorite: boolean;
  onClick: (id: Photo["id"]) => void;
  style?: CSSProperties;
};

export const Image = ({ image, onClick, favorite, style }: ImageProps) => {
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
      style={style}
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
          disabled={!showDescription}
          className={`Image__favoriteButton ${favorite ? "m-active" : ""}`}
          onClick={(e) => {
            onClick && onClick(image.id);
            e.stopPropagation();
          }}
        >
          Favorite
        </button>
      </div>
      {favorite && <HeartIcon className="Image__favoriteIcon" />}
      {!imageIsLoaded && <Skeleton className="Image__img" />}
      <img
        className={`Image__img ${imageIsLoaded ? "m-show" : ""}}`}
        src={image.urls.small}
        alt={image.description || ""}
        onLoad={() => setImageIsLoaded(true)}
        // 93.05% global coverage as of this writing
        loading="lazy"
      />
    </div>
  );
};
