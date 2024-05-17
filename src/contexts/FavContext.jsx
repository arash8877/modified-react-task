import { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const localFavorites = localStorage.getItem("favorites");
    return localFavorites ? JSON.parse(localFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (trial) => {
    setFavorites((prevFavorites) => [...prevFavorites, trial]);
  };

  const removeFavorite = (nctId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (trial) => trial.protocolSection.identificationModule.nctId !== nctId
      )
    );
  };
  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };


  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};