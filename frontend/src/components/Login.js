import React from 'react';
import logo from './../logo.png'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';



class Login extends React.Component {

  render() {
    return (
      <div className="box-login">
        <img className="logo" src={logo} alt="Logo" />

        <Form>
          <FormGroup>
            <Input className="inputEmail" type="email" name="email" id="exampleEmail" placeholder="myemail@squad2.com" isrequired="true" />
          </FormGroup>
          <FormGroup>

            <Input className="inputPassword" type="password" name="password" id="examplePassword" placeholder="type your password" isrequired="true" />
          </FormGroup>
          <Button onClick={() => alert('verifica dados')} className="button">Submit</Button>
        </Form >
        <div>
          <p><Link className="link-forgot" to="/forgot">I forgot my credentials</Link></p>
          <p><Link className="link-register" to="/register">I do not have a registration...</Link></p>
        </div>
      </div >
    )
  }
}

export default Login;