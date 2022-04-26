import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*REDUX */
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

/*COMPONENT */
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated, setLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  // Redireccionar al menu principal si esta auntenticado

  if (isAuthenticated) {
    return <Redirect to='/menu' />;
  }

  return (
    <>
      <div className='text-center'>
        <div className='info text-center '>
          <h1>Iniciar Sesión</h1>
          <p>Lorem ipsum dolor sit amet consectetur,</p>
        </div>
        <Alert />
        <form onSubmit={(e) => onSubmit(e)} className='formulario'>
          <div className='grupo'>
            <label for='email'>Email:</label>
            <input
              className='form-control'
              id='email'
              type='email'
              placeholder='Ingrese su Email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label for='contraseña'>Contraseña:</label>
            <input
              id='password'
              type='password'
              placeholder='Ingrese su contraseña'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo acciones'>
            <button className='btn' onClick={(e) => setLogin(false)}>
              {' '}
              Regresar
            </button>{' '}
            <input type='submit' className='btn' value='Ingresar' />
          </div>
          <div className='grupo'>
            <div className='sin-cuenta'>
              <p>¿No tienes cuenta?</p>
              <Link to='#' onClick={(e) => setLogin(false)}>
                Registrarse.
              </Link>
            </div>
            <div className='olvidar'>
              <p>¿Se te olvidó la contraseña?</p>
              <Link to='/'>Recuperar constraseña.</Link>
            </div>
          </div>
        </form>
      </div>
      <div class='relleno' />
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
