import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner/Spinner';
import Alert from '../layout/Alert';
import Main from '../layout/Main';
import MyProject from '../my-projects/MyProject';
import { getProjectByShareId } from '../../actions/project';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectFollow = ({ auth, getProjectByShareId }) => {
  const [search, updateSearch] = useState('');
  const [formFilter, setFormFilter] = useState({
    languajeFilter: '',
    periodFilter: '',
    semesterFilter: '',
  });

  const [code, setCode] = useState({
    shareID: '',
  });

  const { shareID } = code;

  const onChange2 = (e) => {
    setCode({
      ...code,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getProjectByShareId(auth.user._id, code.shareID);
    console.log(auth.user._id);
    console.log(code.shareID);
  };

  const { languajeFilter, periodFilter, semesterFilter } = formFilter;

  const onChange = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <Fragment>
      <Main
        titulo='¡Aquí estan tus proyectos!'
        descripcion='En esta sección puedes gestionar tus proyectos.'
      >
        <form className='codigo' onSubmit={(e) => onSubmit(e)}>
          <Alert />
          <div className='grupo'>
            <h2 className='codigo-titulo'>
              Ingrese un proyecto en el que estas invitado
            </h2>
          </div>
          <div className='label-flex'>
            <label htmlFor='project-share'>
              Codigo para proyecto colaborativo:
            </label>
            <input
              type='text'
              name='shareID'
              value={shareID}
              id='project-share'
              onChange={(e) => onChange2(e)}
            />
          </div>
          <div className='grupo acciones'>
            <input type='submit' className='btn' value='Añadir' />
          </div>
        </form>
      </Main>
      {auth.loading ? (
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
          <div className='text-center proyecto-info'>
            <h1>Proyectos compartidos</h1>
            <h3>
              Visualiza y checa los proyectos de tu interes o de tus alumnos, ve
              y retroalimenta su aprendizaje a traves de su trabajo.
            </h3>
          </div>
          <section className='contenedor proyectos'>
            {auth.user.project_shared.length > 0
              ? auth.user.project_shared
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
                    <MyProject
                      key={project._id}
                      project={project}
                      isShared={true}
                      user_id={auth.user._id}
                      type={auth.type}
                    />
                  ))
              : 'No hay proyectos compartidos'}
          </section>
          <section className='contenedor mi-proyecto'>
            <Link to='/menu'>
              <div className='proyecto text-center'>
                <h1>Buscar Proyectos</h1>
                <i className='fas fa-search'></i>
              </div>
            </Link>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectFollow.propTypes = {
  getProjectByShareId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getProjectByShareId })(ProjectFollow);
