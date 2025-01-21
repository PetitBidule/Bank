import { Formik } from 'formik';
import axios from "axios";

export default function Login() {

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });


  const submitLogin = async (body) => {
  console.log(body);
  await client
      .post('login', body)
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
            } 
             return errors;
           }}
           onSubmit={(values, { setSubmitting }) => {
             setTimeout(async () => {
               await submitLogin(values);
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
  )
}
