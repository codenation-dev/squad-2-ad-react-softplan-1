import React from 'react';
import axios from 'axios';
import { history } from '../../history';
import './Forgot.css';
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';

const Forgot = () => {

  const handleSubmit = values => {

    axios.post('https://lognation.herokuapp.com/api/auth/forgotPassword', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          localStorage.setItem('app-token', data)
          history.push('/home')
        }
      })
  }
  const validations = yup.object().shape({
    email: yup.string().email().required()
  })
  return (
    <div className="Login-Container">

      <div className="Login-Title"><h1>Forgot my Id</h1></div>
      <div className="Login-Subtitle"><p>Fill the field with your registered email</p></div>

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

          <button className="Login-Btn" type="submit">Remind me</button>
        </Form>
      </Formik>
    </div >
  )
}



export default Forgot;