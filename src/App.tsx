import { ScrollContainer } from "./components/ScrollContainer";
import { useFavorites } from "./hooks/local-storage";
import { Image } from "./components/Image";
import { Grid } from "./components/Grid";
import { usePhotos } from "./hooks/api";
import { useState } from "react";

import "./styles/App.css";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const { photos, loading, error, fetchMore, fetchPhotos } = usePhotos();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="App">
      <div className="App__innerContainer">
          />
        <ScrollContainer
          onIsReachingBottom={(isReachingBottom) => {
            if (isReachingBottom) {
              fetchMore();
            }
          }}
        >
          <Grid>
            {photos.map((photo, index) => (
              <Image
                key={photo.id}
                image={photo}
                onClick={(id) => toggleFavorite(id)}
                favorite={favorites?.includes(photo.id) || false}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </Grid>
        </ScrollContainer>
        {/* No styles for Error class in this exercise. Demo purposes only. :) */}
        {error && <div className="Error">{error}</div>}
      </div>
    </div>
  );
};

export default App;
