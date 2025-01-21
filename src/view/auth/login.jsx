import { Formik } from 'formik';

export default function Login() {

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
