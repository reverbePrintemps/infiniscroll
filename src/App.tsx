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
      <Grid
        style={{
          width: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)",
          padding: "clamp(4px, calc(2%), 32px)",
          gap: "clamp(4px, calc(3vw), 32px)",
          margin: "auto",
          boxSizing: "border-box",
          maxWidth: "var(--mw-app)",
        }}
      >
        {photos.map((photo) => (
          <Image
            key={photo.id}
            image={photo}
            onClick={(id) => toggleFavorite(id)}
            favorite={favorites?.includes(photo.id) || false}
          />
        ))}
      </Grid>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;
