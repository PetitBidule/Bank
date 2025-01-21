import axios from "axios";
import { useEffect, useState } from "react";
import { Formik } from 'formik';

export default function Register() {


  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });


  const addPosts = async (body) => {
    console.log(body);
   await client
      .post('register', body)
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e));
};

  return (
    <>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
            errors.email = 'Invalid email address';
        } else if (values.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")==null){
          errors.email = 'Password Not Valid';
        }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(async () => {
           alert(JSON.stringify(values, null, 2));
           await addPosts(values);
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
           <input
            type="text"
            name="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            placeholder="firstName"
          />
             <input
              type="text"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
              placeholder="lastName"
            />
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             placeholder="Email"
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             placeholder="Password"
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
    </>
  );
}
