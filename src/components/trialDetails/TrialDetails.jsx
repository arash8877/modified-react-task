import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "./TrialDetails.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TrialContext } from "../../contexts/TrialContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoriteContext } from "../../contexts/FavContext";

const TrialDetails = () => {
  const { getTrial, trial } = useContext(TrialContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const navigate = useNavigate();
  const { nctId } = useParams();
  const { name, getProfileInfo } = useContext(AuthContext);
  const { protocolSection } = trial || {};

  // if (Object.keys(trial).length === 0) {
  //   navigate("/");
  // }


  const {
    identificationModule,
    descriptionModule,
    conditionsModule,
    statusModule,
    eligibilityModule,
    contactsLocationsModule,
  } = protocolSection || {};
  const { briefTitle } = identificationModule || {};
  const { detailedDescription } = descriptionModule || {};
  const { keywords } = conditionsModule || [];
  const { statusVerifiedDate } = statusModule || {};
  const { sex } = eligibilityModule || {};
  const [location] = contactsLocationsModule?.locations || [];
  const city = location?.city;
  const state = location?.state;

  const isFavorite = favorites.some(
    (favorite) => favorite.protocolSection.identificationModule.nctId === nctId
  );
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(nctId);
    } else {
      addFavorite(trial);
    }
  };

  useEffect(() => {
    getTrial(nctId);
  }, [nctId, getTrial]);

  // useEffect(() => {
  //   getProfileInfo();
  // }, [getProfileInfo]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo_and_back}>
          <div className={styles.logoWrapper}>
            <img
              className={styles.logo}
              src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="logo"
            />
          </div>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <Link to="/profile">
          <div className={styles.userName}>{name}</div>
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles.leftBar}>
          <div className={styles.leftBar_top}>
            <h4>{briefTitle}</h4>
            <p className={styles.description}>{detailedDescription}</p>
            <div className={styles.tagContainer}>
              {keywords &&
                keywords.map((condition, index) => {
                  return (
                    <div key={index} className={styles.tag}>
                      {condition}
                    </div>
                  );
                })}
            </div>
          </div>
          <button className={styles.favButton} onClick={toggleFavorite}>
            {isFavorite ? "Un-fav" : "Fav"}
          </button>
        </div>
        <div className={styles.rightBar}>
          <ul className={styles.list}>
            <li>ID: {nctId}</li>
            <li>Date: {statusVerifiedDate}</li>
            <li>Eligibility: {sex}</li>
            <li>
              Location: {city},{state}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrialDetails;
