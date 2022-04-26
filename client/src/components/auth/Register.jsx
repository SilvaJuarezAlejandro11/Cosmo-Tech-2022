import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*REDUX */
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

/*COMPONENT */

import Alert from '../layout/Alert';

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  setUser,
  setLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Las contraseñas no coinciden', 'danger', 2000);
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  // Redireccionar al menu principal si ya esta autenticado

  if (isAuthenticated) {
    return <Redirect to='/menu' />;
  }

  return (
    <>
      <div className='text-center'>
        <div className='info text-center'>
          <h1>Registrase</h1>
          <p>Crea tu cuenta.</p>
        </div>
        <Alert />
        <form onSubmit={(e) => onSubmit(e)} className='formulario'>
          <div className='grupo'>
            <label for='name'>Nombre:</label>
            <input
              id='name'
              type='text'
              placeholder='Ingrese su nombre.'
              name='name'
              required
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='grupo'>
            <label for='email'>Email:</label>
            <input
              id='email'
              type='email'
              placeholder='Ingrese su email.'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label for='password'>Contraseña</label>
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
          <div className='grupo'>
            <label for='password2'>Confirmar contraseña</label>
            <input
              className='form-control'
              id='password2'
              type='password'
              placeholder='Confirme su contraseña.'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='grupo acciones'>
            <button className='btn' onClick={(e) => setUser(false)}>
              Regresar
            </button>
            <input type='submit' className='btn' value='Registrarse' />
          </div>
          <div className='grupo'>
            <div className='con-cuenta'>
              <p>¿Ya tienes cuenta?</p>
              <Link
                onClick={(e) => {
                  setUser(false);
                  setLogin(true);
                }}
                to='#'
              >
                Inicia Sesión.
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className='relleno'></div>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
