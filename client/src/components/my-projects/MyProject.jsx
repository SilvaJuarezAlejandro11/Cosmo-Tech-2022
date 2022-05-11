import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/project';

const MyProject = ({
  project: { _id, title, languajes, authors, period, semester, file },
  deleteProject,
}) => {
  return (
    <>
      <div className='proyecto text-center' id={_id}>
        <div className='proyecto-opciones'>
          <Link to={`/edit-project/${_id}`} className='editar'>
            <i className='fas fa-edit'></i>
          </Link>
          <h1>{title}</h1>
          <button className='borrar' onClick={() => deleteProject(_id)}>
            <i className='fas fa-trash'></i>
          </button>
        </div>
        <div className=''>
          <h3>
            {' '}
            {languajes.slice(0, 4).map((languaje, index) => (
              <Fragment key={index}>
                {languaje.toLowerCase()}
                {index + 1 === languajes.length ? '' : `,${' '}`}
              </Fragment>
            ))}
          </h3>
        </div>
        <div className='alumnos-info'>
          <h4>
            {authors.slice(0, 4).map((author, index) => (
              <Fragment key={index}>
                {author.toLowerCase().split(' ')[0]}{' '}
                {author.toLowerCase().split(' ')[1]}
                {index + 1 === authors.length ? '' : `,${' '}`}
              </Fragment>
            ))}
          </h4>
        </div>
        <div className='descripcion text-center'>
          <h4>{semester}</h4>
          <h4>{period}</h4>
        </div>
        <div className='mas-sobre'>
          <Link className='degradado' to={`/project/${_id}`}>
            Ver más sobre este proyecto
          </Link>
          <div className='proyecto-opciones'>
            <Link to={`/gantt/${_id}`} className='subir-archivo'>
              <i className='fas fa-calendar-alt'></i>
            </Link>
            <a className='degradado descargar' href={file}>
              Descargar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

MyProject.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(MyProject);
