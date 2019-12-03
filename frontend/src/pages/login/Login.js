import React from 'react';
//import logo from './../logo.png'
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';

// <img className="logo" src={logo} alt="Logo" />

const Login = () => {
  const handleSubmit = values => console.log(values)
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  return (
    <>
      <div className="box-login">
        <h1>Login</h1>
        <p>Fill the fields to access the system</p>
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className="Form">
            <div>
              <Field name="email" className="Formfield" />
              <ErrorMessage
                component="span"
                name="email"
                className="Error" />
            </div>
            <div>
              <Field name="password" className="Formfield" />
              <ErrorMessage
                component="span"
                name="password"
                className="Error" />
            </div>
            <button className="Form-Btn" type="submit">Login</button>
          </Form>
        </Formik>
      </div >
    </>
  )
}



export default Login;