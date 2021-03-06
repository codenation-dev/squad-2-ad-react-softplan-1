import React, { useState } from 'react';
import { history } from '../../history';
import './Login.css';
import { handleLogin } from './../../Api'
import { Spinner, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = async values => {
    try {
      setLoading(true)
      const data = await handleLogin(values)
      localStorage.setItem('appToken', data.accessToken)
      localStorage.setItem('firstName', data.firstName)
      localStorage.setItem('userToken', data.token)
      setLoading(false)
      history.push('/dashboard')
    }

    catch (error) {
      setShowError(true)
      setLoading(false)
      setTimeout(() => {
        setShowError(false)
      }, 2000)
    }
  }

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  return (
    <div className="Login-Container">
      <div className="Forgot-Title"><h1>Login</h1></div>
      {showError &&
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>
            Incorrect user or password!
          </p>
        </Alert>
      }

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Login" id="formLogin">
          <div className="Login-Group">
            <Field
              type="email"
              name="email"
              className="Login-Field"
              placeholder="Type your e-mail"


            />
            <ErrorMessage
              component="div"
              name="email"
              className="Login-Error"
            />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              className="Password-Field"
              placeholder="Type your password"

            />
            <ErrorMessage
              component="div"
              name="password"
              className="Login-Error" />
          </div>
          <div className="Btn-Div">
            <Button
              className="Login-Btn"
              type="submit"
              disabled={loading}>
              {loading && <span>Loading  </span>}
              {loading && <Spinner animation="border" />}
              {!loading && <span>Login</span>}
            </Button>
          </div>
        </Form>
      </Formik>
      <Link to="/forgot"><p className="forgot-link"> Forgot your password ?</p></Link>
      <Link to="/register"><p className="register-link">Don't you have an account? Get started</p></Link>
    </div >
  )
}

export default Login;