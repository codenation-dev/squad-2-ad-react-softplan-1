import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import './Forgot.css';
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';
import { Alert } from 'react-bootstrap';

const Forgot = () => {

  const [showError, setShowError] = useState(false)
  const [showSuccess, setshowSuccess] = useState(false)

  const handleSubmit = values => {

    axios.post('https://lognation.herokuapp.com/api/auth/forgotPassword', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          console.log(data)
        }
        setshowSuccess(true)
        setTimeout(() => {
          setshowSuccess(false)
          history.push('/')
        }, 5000);

      })
      .catch(() => {
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
        }, 5000)
      })
  }

  const validations = yup.object().shape({
    email: yup.string().email().required()
  })

  return (
    <div className="Forgot-Container">
      <div className="Forgot-Title"><h1>Forgot my Id</h1></div>

      { showError && 
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>
          User not found!
          </p>
        </Alert> 
      }

      { showSuccess && 
        <Alert variant="success" onClose={() => setshowSuccess(false)} dismissible>
          <Alert.Heading>Email sent!</Alert.Heading>
          <p>
          Your new password has been sent to your email!
          </p>
        </Alert> 
      }

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="Forgot">
          <div className="Forgot-Group">
            <Field
              name="email"
              className="Forgot-Field"
              placeholder="Type your email"
            />
            <ErrorMessage
              component="div"
              name="email"
              className="Forgot-Error"
            />
          </div>
          <div className="Btn-Div">
            <button className="Forgot-Btn" type="submit">Remind</button>
            <Link to="/"><button className="Back-Btn">Return</button></Link>
          </div>
        </Form>
      </Formik>
    </div >
  )
}



export default Forgot;