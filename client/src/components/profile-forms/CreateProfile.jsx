import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

import Alert from '../layout/Alert';

const CreateProfile = ({ createProfile, history, type }) => {
  //? fullname, status, githubusername, skills, bio

  const [formData, setFormData] = useState({
    fullname: '',
    status: '',
    githubusername: '',
    skills: '',
    bio: '',
  });

  const { fullname, status, githubusername, skills, bio } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, type);
  };
  return (
    <Fragment>
      <section className='contenedor'>
        <div className='info text-center '>
          <h1>Crea tu perfil</h1>
          <p>Necesitamos cierta información para poder crear tu perfil.</p>
        </div>
        <Alert />
        <form className='formulario' onSubmit={(e) => onSubmit(e)}>
          <div className='grupo'>
            <label htmlFor='name'>Nombre:</label>
            <input
              id='name'
              type='text'
              placeholder='Ingrese su nombre completo.'
              name='fullname'
              value={fullname}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className='grupo'>
            <label htmlFor='status'>Ocupación:</label>
            <select
              id='status'
              name='status'
              defaultValue={status}
              onChange={(e) => onChange(e)}
              required
            >
              <option value='' disabled hidden>
                Seleccione su ocupación aquí.
              </option>
              <option value='Desarrollador'>Estudiante o Aprendiz</option>
              <option value='Instructor'>Instructor o Maestro</option>
              <option value='Desarrollador Junior'>Desarrollador Junior</option>
              <option value='Desarrollador Senior'>Desarrollador Senior</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>
          <div className='grupo'>
            <label htmlFor='githubusername'>Usuario en GitHub:</label>
            <input
              type='text'
              placeholder='Usuario de GitHub'
              name='githubusername'
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='grupo'>
            <label htmlFor='skills'>Lenguajes que maneja:</label>
            <input
              id=''
              type='text'
              placeholder='* Lenguajes que domines o seas bueno'
              name='skills'
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small className='text-center'>
              Por favor, utilize comas para separar los valores (ej.
              HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='grupo'>
            <label htmlFor='bio'>Biografía:</label>
            <textarea
              id='bio'
              placeholder='Una pequeña biografia de usted.'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className='grupo acciones'>
            <input type='submit' className='btn' value='Crear' />
            <Link className='btn' to='/dashboard'>
              Regresar
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  type: state.auth.type,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
