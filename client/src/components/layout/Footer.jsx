import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = ({ auth: { type } }) => {
  return (
    <footer>
      <nav className='footer'>
        <div className='titulo'>
          <h1>
            <Link to={`${type ? '/menu' : '/'}`}>BatizLab</Link>
          </h1>
        </div>
        <div className='vinculos'>
          <div className='social'>
            <i className='fab fa-facebook'></i>
            <a href='https://facebook.com'>BatizLab</a>
          </div>
          <div className='social'>
            <i className='fab fa-instagram'></i>
            <a href='https://instagram.com'>BatizLab</a>
          </div>
          <div className='social'>
            <i className='fab fa-linkedin'></i>
            <a href='https://linkedin.com'>BatizLab</a>
          </div>
          <div className='social'>
            <i className='fab fa-google'></i>
            <a href='https://google.com'>BatizLab@gmail.com</a>
          </div>
        </div>
      </nav>
      <div className='copyright text-center'>
        <p>BatizLab 2020-22 Derechos Reservados</p>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Footer);
