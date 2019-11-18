import React from 'react';
import logo from './../logo.png'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends React.Component {

  render() {
    return (
      <div className="box-login">
        <img className="logo" src={logo} alt="Logo" />
        <Form>
          <FormGroup>
            <Label className="labelEmail" for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="myemail@squad2.com" />
          </FormGroup>
          <FormGroup>
            <Label className="labelPassword" for="examplePassword">Password</Label>
            <Input className="inputPassword" type="password" name="password" id="examplePassword" placeholder="type your password" />
          </FormGroup>
          <Button className="button">Submit</Button>
        </Form >
        <p className="link-register">I forgot my credentials</p>
      </div >
    )
  }
}

export default Login;