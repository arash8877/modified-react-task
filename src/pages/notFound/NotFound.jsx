import React, { useContext } from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NotFound = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <h1>Page Not Found!</h1>
      {userId ? (
        <>
          <div className={styles.link}>
            <Link to="/">Go to Trials</Link>
          </div>
        </>
      ) : (
        <>
          <h1>Please either check the url or login to your account.</h1>
          <div className={styles.link}>
            <Link to="/">Login</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NotFound;
