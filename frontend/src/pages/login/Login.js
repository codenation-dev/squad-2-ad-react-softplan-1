import React from 'react';
import axios from 'axios';
import { history } from '../../history';
import './Login.css';

import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';



const Login = () => {

  const handleSubmit = values => {

    axios.post('https://lognation.herokuapp.com/api/auth/login', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          localStorage.setItem('app-token', data)
          history.push('/home')
        }
      })
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  return (
    <div className="Login-Container">

      <div className="Login-Title"><h1>Login</h1></div>
      <div className="Login-Subtitle"><p>Fill the fields to access the system</p></div>

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Login">
          <div className="Login-Group">
            <Field
              name="email"
              className="Login-Field"
              placeholder="Type your email"
            />
            <ErrorMessage
              component="div"
              name="email"
              className="Login-Error"
            />
          </div>
          <div>
            <Field
              name="password"
              className="Login-Field"
              placeholder="Type your password"
            />
            <ErrorMessage
              component="div"
              name="password"
              className="Login-Error" />
          </div>
          <button className="Login-Btn" type="submit">Login</button>
        </Form>
      </Formik>
    </div >
  )
}



export default Login;