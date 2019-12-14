import React, { useState } from 'react';
import { history } from '../../history';
import { handleRegister } from '../../Api'
import './Register.css';
import { Link } from 'react-router-dom';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Alert, Button } from 'react-bootstrap';

const Register = () => {

  const [showError, setShowError] = useState(false)
  const [showSuccess, setshowSuccess] = useState(false)

  const handleSubmit = async values => {

    try {
      const data = await handleRegister(values)
      console.log(data)
      setshowSuccess(true)
      setTimeout(() => {
        setshowSuccess(false)
        history.push('/')
      }, 5000);
    }

    catch (error) {
      console.log(error)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 2000)
    }
  }

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().min(2).required(),
    lastName: yup.string(),
    password: yup.string().min(8).required()
  })

  return (
    <div className="Register-Container">
      <div className="Register-Title"><h1>Register</h1></div>

      {showError &&
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>
            User cannot be created!
          </p>
        </Alert>
      }

      {showSuccess &&
        <Alert variant="success" onClose={() => setshowSuccess(false)} dismissible>
          <Alert.Heading>User Create!</Alert.Heading>
          <p>
            Your new user has been created!
          </p>
        </Alert>
      }

      <Formik
        initialValues={{ email: "", firstName: "", lastName: "", password: "" }}

        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Register">
          <div className="Register-Group">
            <Field
              name="email"
              className="Register-Field"
              placeholder="Type your email" />
            <ErrorMessage
              component="div"
              name="email"
              className="Register-Error"
            />
          </div>

          <div className="Register-Group">
            <Field
              name="firstName"
              className="Register-Field"
              placeholder="Type your Name" />
            <ErrorMessage
              component="div"
              name="firstName"
              className="Register-Error"
            />
          </div>

          <div className="Register-Group">
            <Field
              name="lastName"
              className="Register-Field"
              placeholder="Type your Lastname (optional)" />
            <ErrorMessage
              component="div"
              name="lastName"
              className="Register-Error"
            />
          </div>

          <div className="Register-Group">
            <Field
              type="password"
              name="password"
              className="Register-Field"
              placeholder="Type your password"
            />
            <ErrorMessage
              component="div"
              name="password"
              className="Register-Error" />
          </div>

          <div className="Btn-Div">
            <Button className="Register-Btn" type="submit">Register</Button>
            <Link to="/"><Button variant="secondary" className="Back-Btn">Return</Button></Link>
          </div>
        </Form>
      </Formik>

    </div>
  )
}

export default Register;