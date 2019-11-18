import React from 'react';
import logo from './../logo.png'
import { Button, Form, FormGroup, Input } from 'reactstrap';




class ForgotLogin extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="box-login">
            <img className="logo" src={logo} alt="Logo" />

            <Form>
              <p className="forgot-title">Type your email to recover </p>
              <FormGroup>
                <Input className="inputEmail" type="email" name="email" id="exampleEmail" placeholder="myemail@squad2.com" isrequired="true" />
              </FormGroup>

              <Button onClick={() => alert('Envia Email, depois redireciona a Home')} className="button-register">Submit</Button>
            </Form >

            <div className="note-email">
              <p>A link to reset your password</p>
              <p>will be sent to your email!
          </p>
            </div>
          </div >
        </header>
      </div>
    )
  }
}

export default ForgotLogin;