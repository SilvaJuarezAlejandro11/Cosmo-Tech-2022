import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';
import { getProfileById } from '../../actions/profile';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import DashboardActions from '../dashboard/DashboardActions';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const [edu, setEdu] = useState(false);

  const [exp, setExp] = useState(false);
  return (
    <Fragment>
      <Main
        titulo={`${
          profile === null
            ? '...'
            : auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id
            ? 'Mi perfil'
            : profile.fullname
        }`}
        descripcion={`Este es ${
          profile === null
            ? '...'
            : auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id
            ? 'tu perfil, pon tus proyectos hechos por ti y date a conocer en esta comunidad.'
            : `el perfil de ${profile.fullname}, conocelo y ve sus obras más notorias`
        }`}
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
      {profile === null || loading ? (
        <Spinner />
      ) : (
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
            {profile === null
              ? ''
              : auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && <DashboardActions />}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
