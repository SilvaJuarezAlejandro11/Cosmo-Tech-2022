import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'copy-text-to-clipboard';

const Project = ({
  project: { _id, title, languajes, authors, period, semester, share_ID },
  type,
}) => {
  const clipboard = (share_ID) => {
    if (share_ID) copy(`${share_ID}`);
    alert(`Codigo copiado: ${share_ID}`);
  };

  return (
    <>
      <div className='proyecto text-center ' id={_id}>
        <div className=''>
          <h1 className='degradado titulo-proyectos'>{title}</h1>
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

          {type === 'teacherType' && (
            <div className='proyecto-opciones'>
              <h3>Seguir proyecto</h3>
              <button
                className='compartir'
                onClick={() => {
                  clipboard(share_ID);
                }}
              >
                <i className='fas fa-share-alt'></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Project;
