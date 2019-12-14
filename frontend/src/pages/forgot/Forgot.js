import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import { handleForgot } from '../../Api';
import './Forgot.css';
import {
  ErrorMessage,
  Formik,
  Form,
  Field
} from 'formik';
import * as yup from 'yup';
import { Alert, Button } from 'react-bootstrap';

const Forgot = () => {

  const [showError, setShowError] = useState(false)
  const [showSuccess, setshowSuccess] = useState(false)

  const handleSubmit = async values => {
    console.log(values.email)
    try {
      const data = await handleForgot(values.email)
      console.log(data)
      setshowSuccess(true)
      setTimeout(() => {
        setshowSuccess(false)
        history.push('/')
      }, 5000);
    }
    catch (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    }
  }

  const validations = yup.object().shape({
    email: yup.string().email().required()
  })

  return (
    <div className="Forgot-Container">
      <div className="Forgot-Title"><h1>Forgot my password</h1></div>

      {showError &&
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>
            Invalid credentials!
          </p>
        </Alert>
      }

      {showSuccess &&
        <Alert variant="success" onClose={() => setshowSuccess(false)} dismissible>
          <Alert.Heading>Email sent!</Alert.Heading>
          <p>
            Your new password has been sent to your email!
          </p>
        </Alert>
      }

      <Formik
        initialValues={{ email: "" }}
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
            <Button className="Forgot-Btn" type="submit">Remind</Button>
            <Link to="/"><Button variant="secondary" className="Back-Btn">Return</Button></Link>
          </div>
        </Form>
      </Formik>
    </div >
  )
}



export default Forgot;