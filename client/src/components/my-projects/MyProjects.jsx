import React, { useEffect, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MyProject from './MyProject';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProjects } from '../../actions/project';
import Alert from '../layout/Alert';

const MyProjects = ({
  auth: { type },
  getCurrentProjects,
  project: { loading, project },
}) => {
  useEffect(() => {
    if (type !== 'studentType') {
      return <Redirect to='/menu' />;
    }
    getCurrentProjects();
  }, [getCurrentProjects, type]);

  const [search, updateSearch] = useState('');
  const [formFilter, setFormFilter] = useState({
    languajeFilter: '',
    periodFilter: '',
    semesterFilter: '',
  });

  const { languajeFilter, periodFilter, semesterFilter } = formFilter;

  const onChange = (e) => {
    updateSearch(e.target.value);
  };
  return (
    <Fragment>
      <Main
        titulo='¡Aquí estan tus proyectos!'
        descripcion='En esta sección puedes gestionar tus proyectos.'
      ></Main>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='contenedor'>
            <form className='filtros'>
              <div className='filtro'>
                <label htmlFor='periodo'>Filtrar por periodo</label>
                <select
                  type='button'
                  id='periodo'
                  name='periodFilter'
                  defaultValue={periodFilter}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value=''>
                    {periodFilter === '' ? '--Seleccione--' : 'Sin Filtros'}
                  </option>
                  <option value='2016-2017'>2016-2017</option>
                  <option value='2017-2018'>2017-2018</option>
                  <option value='2018-2019'>2018-2019</option>
                  <option value='2019-2020'>2019-2020</option>
                  <option value='2020-2021'>2020-2021</option>
                  <option value='2021-2022'>2021-2022</option>
                </select>
              </div>
              <div className='filtro'>
                <label htmlFor='semestre'>Filtrar por semestre</label>
                <select
                  type='button'
                  id='filtro'
                  name='semesterFilter'
                  defaultValue={semesterFilter}
                  onChange={(e) => {
                    setFormFilter({
                      ...formFilter,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value=''>
                    {semesterFilter === '' ? '--Seleccione--' : 'Sin Filtros'}
                  </option>
                  <option value='1°'>1° Semestre</option>
                  <option value='2°'>2° Semestre</option>
                  <option value='3°'>3° Semestre</option>
                  <option value='4°'>4° Semestre</option>
                  <option value='5°'>5° Semestre</option>
                  <option value='6°'>6° Semestre</option>
                </select>
              </div>
              <div className='filtro'>
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
              <div className='filtro'>
                <label htmlFor='buscar'>Buscar por nombre</label>
                <input
                  id='buscar'
                  type='search'
                  placeholder='Buscar proyecto...'
                  value={search}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </form>
          </section>
          <Alert />
          <section className='contenedor proyectos'>
            {project.length > 0 ? (
              project
                // eslint-disable-next-line array-callback-return
                .filter((project) => {
                  if (
                    periodFilter === '' &&
                    search === '' &&
                    semesterFilter === '' &&
                    languajeFilter === ''
                  ) {
                    return project;
                  } else if (
                    (project.title
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                      project.authors
                        .join(',')
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      project.steps
                        .join(',')
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      project.requirements
                        .join(',')
                        .toLowerCase()
                        .includes(search.toLowerCase())) &&
                    project.period
                      .toLowerCase()
                      .includes(periodFilter.toLowerCase()) &&
                    project.semester
                      .toLowerCase()
                      .includes(semesterFilter.toLowerCase()) &&
                    project.languajes
                      .join(',')
                      .toLowerCase()
                      .includes(languajeFilter.toLowerCase())
                  ) {
                    return project;
                  }
                })
                .map((project) => (
                  <MyProject key={project._id} project={project} />
                ))
            ) : (
              <h4>No hay proyectos ...</h4>
            )}
          </section>
          <section className='contenedor mi-proyecto'>
            <Link to='/create-project'>
              <div className='proyecto text-center'>
                <h1>Crear Proyecto</h1>
                <i className='fas fa-plus-circle'></i>
              </div>
            </Link>
          </section>
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

MyProject.propTypes = {
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getCurrentProjects })(MyProjects);
