import { createContext, useEffect, useState } from "react";
export const TrialContext = createContext();

export const TrialProvider = ({ children }) => {
  const [trials, setTrials] = useState([]);
  const [trial, setTrial] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getTrials = async () => {
      try {
        const res = await fetch("https://clinicaltrials.gov/api/v2/studies");
        const data = await res.json();
        setTrials(data.studies);
      } catch (error) {
        setError(error.toString());
      }
    };
    getTrials();
  }, []);

  const getTrial = async (id) => {
    try {
      const res = await fetch(
        `https://clinicaltrials.gov/api/v2/studies/${id}`
      );
      const data = await res.json();
      setTrial(data);
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <TrialContext.Provider value={{ trials, error, trial, getTrial }}>
      {children}
    </TrialContext.Provider>
  );
};