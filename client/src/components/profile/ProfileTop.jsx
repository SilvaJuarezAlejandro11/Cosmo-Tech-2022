import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import invitadoPerfil from '../../img/invitadoperfil.svg';
import estudiantePerfil from '../../img/estudianteperfil.svg';
import profesorPerfil from '../../img/profesorperfil.svg';

const ProfileTop = ({
  profile: {
    skills,
    education,
    experience,
    githubusername,
    user: { name },
  },
}) => {
  return (
    <Fragment>
      <section className='contenedor mi-perfil'>
        <div className='mi-perfil-imagen'>
          {!education && !experience ? (
            <img src={invitadoPerfil} alt='Imagen perfil' />
          ) : education && !experience ? (
            <img src={estudiantePerfil} alt='Imagen perfil' />
          ) : (
            <img src={profesorPerfil} alt='Imagen perfil' />
          )}
        </div>
        <div className='mi-perfil-info text-center'>
          <div className='mi-perfil-datos'>
            <h2>{name}</h2>
            <h3>
              <i className='fab fa-github'></i>{' '}
              {githubusername ? githubusername : ''}
            </h3>
          </div>
          <div className='mi-perfil-lenguajes'>
            {skills.map((skill, index) => (
              <div key={index} className='mi-perfil-lenguaje'>
                <h3>
                  <i className='fas fa-check'></i> {skill}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
