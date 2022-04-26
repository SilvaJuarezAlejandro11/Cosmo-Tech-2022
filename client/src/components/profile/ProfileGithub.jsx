import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/spinner/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos, auth, profile }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <Fragment>
      <h2 className='mi-perfil-repo-titulo text-center'>
        {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id
          ? 'Mis repositorios'
          : `Repositorios de ${profile.user.name}`}
      </h2>
      {repos === null ? (
        <Spinner />
      ) : repos.length === 0 ? (
        <div className='no-repo'>
          <h4>No hay repositorios</h4>
        </div>
      ) : (
        <div className='mi-perfil-repositorios'>
          {repos.map((repo) => (
            <Fragment key={repo.id}>
              <a href={repo.html_url} className='mi-perfil-repositorio'>
                <div className='repositorio-flex'>
                  <div className='repositorio-titulo'>
                    <h2 className='relative degradado'>{repo.name}</h2>
                  </div>
                  <div className='repositorio-datos'>
                    <div className='stars'>
                      <h3>Stars: {repo.stargazers_count}</h3>
                    </div>
                    <div className='watchers'>
                      <h3>Watchers: {repo.watchers_count}</h3>
                    </div>
                    <div className='forks'>
                      <h3>Forks: {repo.forks_count}</h3>
                    </div>
                  </div>
                </div>
              </a>
            </Fragment>
          ))}
          {repos.length > 0 && (
            <h5 className='text-center'>Ya No Hay Mas Repositorios</h5>
          )}
        </div>
      )}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
