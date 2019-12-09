import React from 'react';
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

const Forgot = () => {

  const handleSubmit = values => {

    axios.post('https://lognation.herokuapp.com/api/auth/forgotPassword', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          console.log(data)
        }
        alert('Sua nova senha foi enviada no seu email', history.push('/'))

      })
      .catch(() => alert('Usuário não encontrado!'))
  }
  const validations = yup.object().shape({
    email: yup.string().email().required()
  })
  return (
    <div className="Forgot-Container">
      <div className="Forgot-Title"><h1>Forgot my Id</h1></div>
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