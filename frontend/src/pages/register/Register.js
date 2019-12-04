import React from 'react';
import axios from 'axios';
import { history } from '../../history';
import './Register.css';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Register = () => {

  const handleSubmit = values => {

    axios.post('https://lognation.herokuapp.com/api/auth/signup', values)
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
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    password: yup.string().min(8).required()
  })

  return (
    <div className="Register-Container">
      <div className="Register-Title"><h1>Register</h1></div>
      <div className="Register-Subtitle"><p>Fill the fields to create an user</p></div>
      <Formik
        initialValues={{}}
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
              placeholder="Type your Lastname" />
            <ErrorMessage
              component="div"
              name="lastName"
              className="Register-Error"
            />
          </div>

          <div Register-Group>
            <Field
              name="password"
              className="Register-Field"
              placeholder="Type your password"
            />
            <ErrorMessage
              component="div"
              name="password"
              className="Register-Error" />
          </div>

          <button className="Register-Btn" type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register;