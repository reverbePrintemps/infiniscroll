import { HeartIcon } from "../assets/HeartIcon";
import { Skeleton } from "./Skeleton";
import { Photo } from "../hooks/api";
import {
  CSSProperties,
  useCallback,
  RefObject,
  useEffect,
  useState,
  useRef,
} from "react";

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
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState(image.urls.small);

  const imageTooSmall = useCallback((imageRef: RefObject<HTMLImageElement>) => {
    if (!imageRef.current) return false;
    return (
      imageRef.current.naturalWidth < imageRef.current.width ||
      imageRef.current.naturalHeight < imageRef.current.height
    );
  }, []);

  useEffect(() => {
    if (overlayRef.current && imageIsLoaded) {
      showDescription
        ? (overlayRef.current.style.maxHeight = `${overlayRef.current.scrollHeight}px`)
        : (overlayRef.current.style.maxHeight = "0px");
    }
  }, [showDescription, imageIsLoaded]);

  useEffect(() => {
    if (imageTooSmall(imageRef)) {
      setImageURL(image.urls.regular);
    }
  }, [imageTooSmall]);

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
        ref={imageRef}
        className={`Image__img ${imageIsLoaded ? "m-show" : ""}}`}
        src={imageURL}
        alt={image.description || ""}
        onLoad={() => setImageIsLoaded(true)}
        // 93.05% global coverage as of this writing
        loading="lazy"
      />
    </div>
  );
};
