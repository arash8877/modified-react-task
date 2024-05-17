import React, { useContext } from "react";
import styles from "./Register.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain characters!")
    .min(3, "Name must be at least 3 characters!"),
  email: Yup.string().required("Email is required!"),
  dob: Yup.string().required("Date of Birth is required!"),
  password: Yup.string().required("Password is required!"),
  repeatPassword: Yup.string().required("Please repeat password!"),
});

const Register = () => {
  const { register, error } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dob: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
      register(values);
    },
    validationSchema: formSchema,
  });

  function ageValidation() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <p>{formik.touched.name && formik.errors.name}</p>
          </div>
          <div>
            <input
              type="date"
              placeholder="DOB"
              max={ageValidation()}
              value={formik.values.dob}
              onChange={formik.handleChange("dob")}
              onBlur={formik.handleBlur("dob")}
            />
            <p>{formik.touched.dob && formik.errors.dob}</p>
          </div>
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
          <div>
            <input
              type="password"
              placeholder="Repeat Password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange("repeatPassword")}
              onBlur={formik.handleBlur("repeatPassword")}
            />
            <p>
              {" "}
              {formik.touched.repeatPassword && formik.errors.repeatPassword}
            </p>
          </div>
          <p>{error}</p>
          <button>Register</button>
        </form>
        <p className={styles.switch}>
          Already have an account? <Link to="/login"> Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

//------------------------------------------------------------

// const Register = () => {

//   return (
//     <section>
//       <form className="box" onSubmit={formik.handleSubmit}>
//         <h1 className="title has-text-centered mb-5">Register </h1>
//         <h1 className="has-text-centered has-text-danger py-3">{error}</h1>
//         <div className="field">
//           <label className="label">Name</label>
//           <div className="control">
//             <input
//               type="text"
//               className="input"
//               placeholder="Your name"
//               value={formik.values.name}
//               onChange={formik.handleChange("name")}
//               onBlur={formik.handleBlur("name")}
//             />
//             <p className="help has-text-danger">
//               {formik.touched.name && formik.errors.name}
//             </p>
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Email</label>
//           <div className="control">
//             <input
//               type="text"
//               className="input"
//               placeholder="Email Address"
//               value={formik.values.email}
//               onChange={formik.handleChange("email")}
//               onBlur={formik.handleBlur("email")}
//             />
//             <p className="help has-text-danger">
//               {formik.touched.email && formik.errors.email}
//             </p>
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Date of birth</label>
//           <div className="control">
//             <input
//               type="date"
//               className="input"
//               placeholder="Date of birth"
//               value={formik.values.dob}
//               onChange={formik.handleChange("dob")}
//               onBlur={formik.handleBlur("dob")}
//             />
//             <p className="help has-text-danger">
//               {formik.touched.dob && formik.errors.dob}
//             </p>
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Password</label>
//           <div className="control">
//             <input
//               type="password"
//               className="input"
//               placeholder="Password"
//               value={formik.values.password}
//               onChange={formik.handleChange("password")}
//               onBlur={formik.handleBlur("password")}
//             />
//             <p className="help has-text-danger">
//               {formik.touched.password && formik.errors.password}
//             </p>
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Repeat Password</label>
//           <div className="control">
//             <input
//               type="password"
//               className="input"
//               placeholder="Password"
//               value={formik.values.repeatPassword}
//               onChange={formik.handleChange("repeatPassword")}
//               onBlur={formik.handleBlur("repeatPassword")}
//             />
//             <p className="help has-text-danger">
//               {formik.touched.repeatPassword && formik.errors.repeatPassword}
//             </p>
//           </div>
//         </div>
//         <div className="field mt-5">
//           <button type="submit" className="button is-success is-fullwidth"></button>
//           register
//           </button>
//         </div>
//       </form>
//       <p>
//         Already have an account? <Link to="/login"> Login</Link>
//       </p>
//     </section>
//   );
// };

// export default Register;
