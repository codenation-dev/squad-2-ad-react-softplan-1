import React from 'react';
//import logo from './../logo.png'
import { Button, Label, Form, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class RegisterUser extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="box-login">

            <Form>
              <h1 className="register-user">Register your User </h1>
              <FormGroup>
                <label for="exampleSelects">Sistema</label>
                <select type="select" name="select" id="exampleSelect">
                  <option>Squad2 - Financeiro</option>
                  <option>Squad2 - Tributário</option>
                  <option>Squad2 - Vendas</option>
                  <option>Squad2 - Logística</option>
                  <option>Squad2 - CRM</option>
                </select>
              </FormGroup>
              <FormGroup>
                <input className="inputName" type="text" name="name" id="exampleName" placeholder="Type your full name here..." isrequired="true" />
              </FormGroup>
              <FormGroup>
                <input className="inputEmailReg" type="email" name="email" id="exampleEmail" placeholder="Type your email" isrequired="true" />
              </FormGroup>
              <FormGroup>
                <input className="inputPassword" type="password" name="password" id="examplePassword" placeholder="A password with 8 characters" isrequired="true" />
              </FormGroup>
              <Button onClick={() => alert('Registra em Banco e Redireciona para Home')} className="button">Submit</Button>
            </Form >
            <div>
              <p><Link className="link-forgot" to="/">Back to Login</Link></p>
            </div>
          </div >
        </header>
      </div>
    )
  }
}

export default RegisterUser;