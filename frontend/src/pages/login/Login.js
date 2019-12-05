import React from 'react';
import axios from 'axios';
import { history } from '../../history';
import './Login.css';
import { Link } from 'react-router-dom'
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';

const Login = () => {

  const handleSubmit = values => {
    console.log(values)

    axios.post('https://lognation.herokuapp.com/api/auth/login', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          console.log(data)
          console.log(data.accessToken)
          localStorage.setItem('app-token', data.accessToken)
          history.push('/home')
        }
      })
      .catch(() => alert('Não autorizado'))
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
      <Link to="/forgot"><p className="forgot-link">I forgot my credentials</p></Link>
      <Link to="/register"><p className="register-link">I do not have a register</p></Link>
    </div >
  )
}



export default Login;