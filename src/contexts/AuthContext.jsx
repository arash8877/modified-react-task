
import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  //-------------------getProfileInfo from local storage --------------

  const getProfileInfo = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
      setUserId(user.id);
    }
  }, []);

  //-------------------Get all users from db --------------

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userList");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
    getProfileInfo();
  }, [users]);

  //-------------------Login ----------------------------

  const login = async (inputs) => {
    const user = users.find(
      (user) => user.email === inputs.email && user.password === inputs.password
    );
    if (user) {
      setError("");
      setUserId(user.id);
      setName(user.name);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("trials");
    } else {
      setError("Invalid email or password!");
    }
  };

  //-------------------Register ---------------------------

  const register = async (inputs) => {
    setError("");
    const newUser = {
      id: users.length + 1,
      name: inputs.name,
      email: inputs.email,
      dob: inputs.dob,
      password: inputs.password,
    };

    const existingUser = users.find((user) => user.email === inputs.email);
    if (existingUser) {
      setError("User already exists!");
      return;
    }

    if (inputs.password !== inputs.repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/userList", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("login");
    } catch (error) {
      console.error("Failed to register user:", error);
      setError("Failed to register user.");
    }
  };

  const logout = () => {
    setUserId(null);
    setName(null);
    localStorage.removeItem("user");
    navigate("login");
  };

  return (
    <AuthContext.Provider
      value={{ login, userId, error, register, name, getProfileInfo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

