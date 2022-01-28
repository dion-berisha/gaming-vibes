import { useEffect, useState } from "react";
import Api from "../../../api";
import { setToken } from "../../../helpers";

import { useRouter } from "next/router";

import { Formik } from "formik";
import * as yup from "yup";

import styles from "./login.module.scss";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email("This field must be a valid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is a required field"),
});

export default function Login() {
  const [loggedState, setLoggedState] = useState(null);

  const router = useRouter();

  // Loggin In state, when clicking submit button
  // Error state, if wrong credentials

  const userLoggin = async ({ username, password }) => {
    const logginRequest = await Api.login(
      "signup",
      "initiateAuth",
      username,
      password
    );

    const { IdToken, userId, RefreshToken, tenants, role } =
      await logginRequest;

    if (logginRequest.userId) {
      console.log(logginRequest);
      setLoggedState({ IdToken, userId, RefreshToken, tenants, role });
    }
  };

  useEffect(() => {
    if (loggedState) {
      const { IdToken, RefreshToken, userId, tenants, role } = loggedState;
      setToken(IdToken, RefreshToken, userId, tenants, role);

      // router.push('/app')
    }
  }, [loggedState]);

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        autoComplete="off"
        onSubmit={(values) => userLoggin(values)}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
          <form method="POST" onSubmit={handleSubmit}>
            <h3>Enter user details here:</h3>
            <div className={styles.formBody}>
              <div className={styles.itemWrapper}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="username"
                  value={values.username}
                  className={styles.inputField}
                  onChange={handleChange("username")}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.itemWrapper}>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  className={styles.inputField}
                  onChange={handleChange("password")}
                  onBlur={handleBlur}
                />
              </div>

              {/* Error Message here, when wrong login credentials */}
              <div className={styles.itemWrapper}>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
