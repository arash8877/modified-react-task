import React from "react";
import styles from "./Trial.module.css";
import { Link } from "react-router-dom";

const Trial = ({ trial }) => {
  console.log(trial);
  const { protocolSection } = trial;
  const {
    identificationModule,
    statusModule,
    eligibilityModule,
    contactsLocationsModule,
  } = protocolSection;
  const { briefTitle, officialTitle, nctId } = identificationModule;
  const { statusVerifiedDate } = statusModule;
  const { sex } = eligibilityModule;
  const [location] = contactsLocationsModule?.locations || [];
  const city = location?.city;
  const state = location?.state;

  return (
    <li className={styles.trial}>
      <Link to={`/trials/${nctId}`}>
        <h5 className={styles.title}>{briefTitle}</h5>
        <p className={styles.text}>{officialTitle}</p>
        <p className={styles.text}>nctId: {nctId}</p>
        <p className={styles.text}> Date: {statusVerifiedDate}</p>
        <p className={styles.text}>Eligibility: {sex} </p>
        {city && (
          <p className={styles.text}>
            Location: {city}
            {state && `, ${state}`}
          </p>
        )}
      </Link>
    </li>
  );
};

export default Trial;
