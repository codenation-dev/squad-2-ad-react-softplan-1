import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return(
    <footer>
   
      <small> &copy;Squad2 - Powered by Codenation &amp; Softplan
        <br />
        <img src={logo} width="100" height="50" />
        Diego Geremias -
        Diego Vissini -
        Eduardo Kraus Nunes -
        Fernando Lima
      </small>
    </footer>
  )
}

export default Footer;