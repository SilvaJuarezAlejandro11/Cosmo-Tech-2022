import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import Alert from '../layout/Alert';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  type,
}) => {
  //? fullname, status, githubusername, skills, bio
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      fullname: loading || !profile.fullname ? '' : profile.fullname,

      status: loading || !profile.status ? '' : profile.status,

      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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
    createProfile(formData, history, type, true);
  };

  return (
    <Fragment>
      <section className='opciones'>
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
                <option value='Desarrollador Junior'>
                  Desarrollador Junior
                </option>
                <option value='Desarrollador Senior'>
                  Desarrollador Senior
                </option>
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
              <input type='submit' className='btn' value='Editar' />
              <Link className='btn' to='/dashboard'>
                Regresar
              </Link>
            </div>
          </form>
        </section>
        <div className='relleno' />
      </section>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  type: state.auth.type,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
