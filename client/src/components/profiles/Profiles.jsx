import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';
import ProfileItem from './ProfileItem';

import { getProfiles } from '../../actions/profile';
const Profiles = ({ getProfiles, loading, users, students, teachers }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [search, updateSearch] = useState('');
  const [formFilter, setFormFilter] = useState({
    languajeFilter: '',
    periodFilter: '',
    statusFilter: '',
  });
  const { languajeFilter, statusFilter } = formFilter;

  const onChange = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <Fragment>
      <Main
        titulo='Nuestra Comunidad'
        descripcion='Busca el proyecto que necesites a través del perfil del usuario.'
      ></Main>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='contenedor'>
            <form className='filtros-perfil'>
              <div className='filtro-perfil'>
                <label htmlFor='ocupacion'>Filtrar por ocupación</label>
                <select
                  type='button'
                  id='ocupacion'
                  name='statusFilter'
                  defaultValue={statusFilter}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value=''>
                    {statusFilter === '' ? '--Seleccione--' : 'Sin Filtros'}
                  </option>
                  <option value='Desarrollador'>Desarrollador</option>
                  <option value='Instructor'>Maestro</option>
                  <option value='Desarrollador Junior'>Des. junior</option>
                  <option value='Desarrollador Senior'>Des. Senior</option>
                  <option value='Otro'>Otro</option>
                </select>
              </div>
              <div className='filtro-perfil'>
                <label htmlFor='lenguaje'>Filtrar por lenguaje</label>
                <select
                  type='button'
                  id='lenguaje'
                  name='languajeFilter'
                  defaultValue={languajeFilter}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value=''>
                    {languajeFilter === '' ? '--Seleccione--' : 'Sin Filtros'}
                  </option>
                  <option>Node</option>
                  <option>Java</option>
                  <option>HTML</option>
                  <option>Python</option>
                  <option>JavaScript</option>
                </select>
              </div>
              <div className='filtro-perfil'>
                <label htmlFor='buscar'>Buscar por nombre</label>
                <input
                  id='buscar'
                  type='search'
                  placeholder='Buscar perfil...'
                  value={search}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </form>
          </section>
          <section className='contenedor perfiles'>
            {users
              ? users
                  // eslint-disable-next-line array-callback-return
                  .filter((profile) => {
                    if (
                      search === '' &&
                      languajeFilter === '' &&
                      statusFilter === ''
                    ) {
                      return profile;
                    } else if (
                      profile.user.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      profile.skills
                        .join(',')
                        .toLowerCase()
                        .includes(languajeFilter.toLowerCase()) &&
                      profile.status
                        .toLowerCase()
                        .includes(statusFilter.toLowerCase())
                    ) {
                      return profile;
                    }
                  })
                  .map((profile) => (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      type='Usuario'
                    />
                  ))
              : ''}

            {students
              ? students
                  // eslint-disable-next-line array-callback-return
                  .filter((profile) => {
                    if (
                      search === '' &&
                      languajeFilter === '' &&
                      statusFilter === ''
                    ) {
                      return profile;
                    } else if (
                      profile.user.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      profile.skills
                        .join(',')
                        .toLowerCase()
                        .includes(languajeFilter.toLowerCase()) &&
                      profile.status
                        .toLowerCase()
                        .includes(statusFilter.toLowerCase())
                    ) {
                      return profile;
                    }
                  })
                  .map((profile) => (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      type='Estudiante'
                    />
                  ))
              : ''}
            {teachers
              ? teachers
                  // eslint-disable-next-line array-callback-return
                  .filter((profile) => {
                    if (
                      search === '' &&
                      languajeFilter === '' &&
                      statusFilter === ''
                    ) {
                      return profile;
                    } else if (
                      profile.user.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      profile.skills
                        .join(',')
                        .toLowerCase()
                        .includes(languajeFilter.toLowerCase()) &&
                      profile.status
                        .toLowerCase()
                        .includes(statusFilter.toLowerCase())
                    ) {
                      return profile;
                    }
                  })
                  .map((profile) => (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      type='Profesor'
                    />
                  ))
              : ''}
          </section>

          <h5 className='text-center'>Ya no hay más perfiles</h5>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  teachers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
  users: state.profile.profiles.usersProfiles,
  students: state.profile.profiles.studentsProfiles,
  teachers: state.profile.profiles.teacherProfiles,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
