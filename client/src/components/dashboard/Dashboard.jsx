import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';
import { Fragment } from 'react';

import DashboardActions from './DashboardActions';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileGithub from '../profile/ProfileGithub';

import CreateProfile from '../profile-forms/CreateProfile';

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [edu, setEdu] = useState(false);

  const [exp, setExp] = useState(false);

  return (
    <Fragment>
      <Main
        titulo='Mi perfil'
        descripcion='Este es tu perfil, di nos quien eres, tus habilidades y tus estudios. Comparte tus proyectos personales a través de tu cuenta de github y ¡date a conocer!.'
      >
        <Link to='/profiles' className='btn'>
          Otros perfiles
        </Link>
        {profile === null
          ? ''
          : auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn'>
                Editar Perfil
              </Link>
            )}
      </Main>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {profile !== null ? (
            <Fragment>
              <section className='mi-perfil-grid'>
                <ProfileTop profile={profile} />
                <ProfileAbout
                  profile={profile}
                  auth={auth}
                  edu={edu}
                  setEdu={setEdu}
                  exp={exp}
                  setExp={setExp}
                />
              </section>
              <section className='contenedor mi-perfil-repo'>
                {profile.githubusername && (
                  <ProfileGithub
                    username={profile.githubusername}
                    auth={auth}
                    profile={profile}
                  />
                )}
              </section>
              <section className='contenedor'>
                <DashboardActions />
              </section>
            </Fragment>
          ) : (
            <Fragment>
              <section className='opciones'>
                <CreateProfile />
                <div className='relleno' />
              </section>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
