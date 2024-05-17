import React, { useContext } from "react";
import styles from "./Login.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  //to handle form-validation
  email: Yup.string().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const Login = () => {
  const { login, error } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
    validationSchema: formSchema,
  });

  return (
    <section className={styles.container}>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logo}
          src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo"
        />
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <p>{formik.touched.email && formik.errors.email}</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <p>{formik.touched.password && formik.errors.password}</p>
          </div>
          <p>{error}</p>
          <button>Login</button>
        </form>
      </div>
      <p className={styles.switch}>
        Don't have an account? <Link to="/register"> Register</Link>
      </p>
    </section>
  );
};

export default Login;
