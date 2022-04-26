import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*REDUX */
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerTeacher } from '../../actions/auth';
import PropTypes from 'prop-types';

/*COMPONENT */
import Alert from '../layout/Alert';

const RegisterTeacher = ({
  setAlert,
  registerTeacher,
  isAuthenticated,
  setTeacher,
  setLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    employee_No: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, school, employee_No, email, password, password2 } = formData;

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
      registerTeacher({
        name,
        school,
        employee_No,
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
        <div className='info text-center'>
          <h1>Registro Profesor</h1>
          <p>Crea tu cuenta de maestro.</p>
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
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label for='school'>Elija su escuela:</label>
            <select
              id='school'
              name='school'
              defaultValue={school}
              onChange={(e) => onChange(e)}
            >
              <option value='' disabled hidden>
                Elija la escuela en la que usted enseña.
              </option>
              <option value='CECyT 9'>CECyT 9</option>
            </select>
          </div>
          <div className='grupo'>
            <label for='employee_No'>Numero de empleado;</label>
            <input
              id='employee_No'
              type='password'
              placeholder='Ingrese su numero de empleado.'
              name='employee_No'
              value={employee_No}
              onChange={(e) => onChange(e)}
              minLength='6'
              maxLength='8'
              required
            />
          </div>
          <div className='grupo'>
            <label for='email'>Email:</label>
            <input
              id='email'
              type='email'
              placeholder='Correo electronico.'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label for='password'>Contraseña:</label>
            <input
              id='password'
              type='password'
              placeholder='Ingrese su contraseña'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label for='password2'>Confirmar contraseña</label>
            <input
              id='password2'
              type='password'
              placeholder='Confirmar contraseña.'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='grupo acciones'>
            <button className='btn' onClick={(e) => setTeacher(false)}>
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
                  setTeacher(false);
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

RegisterTeacher.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerTeacher: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerTeacher })(
  RegisterTeacher
);
