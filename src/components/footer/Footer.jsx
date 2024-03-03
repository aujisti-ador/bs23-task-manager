import React from 'react';
import "./Footer.css";

const Footer = ({ content }) => {
  return (
    <div className='footer-container'>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Footer;
