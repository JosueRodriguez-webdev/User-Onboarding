import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    console.log("status change", status);
    status && setUserInfo((userInfo) => [...userInfo, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <label htmlFor="name">
          name
          <Field id="name" name="name" placeholder="John" />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </label>
        <label htmlFor="email">
          email
          <Field id="email" name="email" placeholder="Johndoe@gmali.com" />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </label>

        <label htmlFor="password">
          password
          <Field id="password" name="password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>

        <label>
          Termsofservice
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
        </label>
        <button type="submit">Submit Form</button>
      </Form>
      {userInfo.map((userInfo) => {
        return (
          <ul key={userInfo.id}>
            <li>name: {userInfo.name}</li>
            <li>email: {userInfo.email}</li>
            <li>password {userInfo.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const UserInfoHardcore = withFormik({
  mapPropsToValues(props) {
    console.log(props);

    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      termsofservice: props.termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(`you need a name to continue`),
    email: Yup.string().required(
      "email is req to continue...fill it in please"
    ),
    password: Yup.string().required(
      "you NEED as password ... a long one at that..."
    )
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then((response) => {
        console.log(`Success you got the data!`, response);
        setStatus(response.data);

        resetForm();
      })
      .catch((error) => {
        console.log(`Error, No info recieved from the API`, error.response);
      });
  }
})(UserForm);
export default UserInfoHardcore;
