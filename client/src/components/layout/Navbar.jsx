import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

/*REDUX */

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, type }, logout }) => {
  const locaction = useLocation().pathname;

  const authLinks = (
    <>
      <Link to='/profiles'>Comunidad</Link>
      <Link to='/dashboard'>Perfil</Link>
      <Link to='/menu'>Proyectos</Link>
      {type === 'studentType' ? (
        <Link to='/me/projects'>Mis proyectos</Link>
      ) : (
        ''
      )}
      <Link onClick={logout} to='/'>
        <i className='fas fa-sign-out-alt'></i>
      </Link>
    </>
  );

  const guestLinks = (
    <>
      <Link to='/profiles'>Comunidad</Link>
      {locaction === '/' ? (
        <a href='#iniciarSesion'>Registrarse</a>
      ) : (
        <Link to='/'>Registrarse</Link>
      )}
      {locaction === '/' ? (
        <a href='#iniciarSesion'>Iniciar Sesión</a>
      ) : (
        <Link to='/'>Iniciar Sesión</Link>
      )}
    </>
  );

  return (
    <header>
      <nav className='header'>
        <div className='titulo'>
          <h1>
            <Link to={`${type ? '/menu' : '/'}`}>Cosmo-Tech</Link>
          </h1>
        </div>
        <div className='vinculos'>
          <Link to='/'>Inicio</Link>
          {!loading && isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
