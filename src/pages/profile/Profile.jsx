import React, { useContext } from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import { FavoriteContext } from "../../contexts/FavContext";
import Trial from "../../components/trial/Trial";

const Profile = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div className={styles.favoritesContainer}>
        {favorites.length > 0 ?
          favorites.map((trial, index) => {
            return <Trial key={index} trial={trial} />;
          }) : <h4 className={styles.favText}>There is no favorite trial yet!</h4>}
      </div>
    </div>
  );
};

export default Profile;
