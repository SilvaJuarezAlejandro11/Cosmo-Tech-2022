import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*REDUX */
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerStudent } from '../../actions/auth';
import PropTypes from 'prop-types';

/*COMPONENT */
import Alert from '../layout/Alert';

const RegisterStudent = ({
  setAlert,
  registerStudent,
  isAuthenticated,
  setStudent,
  setLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    ballot: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, school, ballot, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Las contraseñas no coinciden.', 'danger', 2000);
    } else {
      registerStudent({
        name,
        school,
        ballot,
        email,
        password,
        password2,
      });
    }
  };

  // Redireccionar al menu principal si esta auntenticado

  if (isAuthenticated) {
    return <Redirect to='/menu' />;
  }

  return (
    <>
      <div className='text-center'>
        <div className='info text-center '>
          <h1>Registro Estudiante</h1>
          <p>Crea tu cuenta de estudiante.</p>
        </div>
        <Alert />
        <form onSubmit={(e) => onSubmit(e)} className='formulario'>
          <div className='grupo'>
            <label htmlFor='name'>Nombre:</label>
            <input
              id='name'
              type='text'
              placeholder='Ingrese su nombre.'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='school'>Escuela:</label>
            <select
              id='school'
              name='school'
              defaultValue={school}
              onChange={(e) => onChange(e)}
              required
            >
              <option value='' disabled hidden>
                Elija su escuela aquí.
              </option>
              <option value='CECyT 9'>CECyT 9</option>
            </select>
          </div>
          <div className='grupo'>
            <label htmlFor='ballot'>Numero de boleta:</label>
            <input
              id='ballot'
              type='password'
              placeholder='Ingrese su boleta'
              name='ballot'
              value={ballot}
              onChange={(e) => onChange(e)}
              minLength='8'
              maxLength='10'
            />
          </div>
          <div className='grupo'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              placeholder='Ingrese su email.'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='grupo'>
            <label htmlFor='password'>Contraseña:</label>
            <input
              id='password'
              placeholder='Ingrese su contraseña.'
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='password2'>Confirmar contraseña:</label>
            <input
              id='password2'
              type='password'
              placeholder='Confirme su contraseña.'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
              minLength='6'
            />
          </div>
          <div className='grupo acciones'>
            <button className='btn' onClick={(e) => setStudent(false)}>
              {' '}
              Regresar
            </button>{' '}
            <input type='submit' className='btn' value='Registrarse' />
          </div>
          <div className='grupo'>
            <div className='con-cuenta'>
              <p> ¿Ya tienes una cuenta?</p>
              <Link
                onClick={(e) => {
                  setStudent(false);
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

RegisterStudent.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerStudent: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerStudent })(
  RegisterStudent
);
