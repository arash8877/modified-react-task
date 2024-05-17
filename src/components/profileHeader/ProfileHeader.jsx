import React, { useContext, useEffect } from "react";
import styles from "./ProfileHeader.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {FavoriteContext} from "../../contexts/FavContext"

const ProfileHeader = () => {
  const { name, getProfileInfo,logout } = useContext(AuthContext);
    const { clearFavorites } = useContext(FavoriteContext);
  const handleLogout = () => {
    console.log("handleLogout");
    logout();
    clearFavorites();
  };

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);


  return (
    <div className={styles.header}>
      <div className={styles.logo_and_name}>
        <div className={styles.logoWrapper}>
          <img
            className={styles.logo}
            src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="logo"
          />
        </div>
        <p className={styles.text}>Hi, {name}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleLogout()}>Logout</button>
        <Link to="/trials">
          <button className={styles.button}>Go to Trials</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
