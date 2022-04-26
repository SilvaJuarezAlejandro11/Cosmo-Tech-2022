import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectTopDetails = ({
  project: {
    title,
    period,
    authors,
    semester,
    group,
    requirements,
    school,
    career,
  },
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Informacion del proyecto</h1>
            <p>
              Requisitos, titulo, periodo, semestre, grupo, escuela y autores
            </p>
          </div>
        </section>
      )}
      {toggle && (
        <Fragment>
          <div className='text-center proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i class='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1>{title}</h1>
            <h3>{period}</h3>
            <h3>{semester} semestre</h3>
            {group && <h3>{group}</h3>}
            {school && <h3>{school}</h3>}
            {career && <h3>{career}</h3>}
            <div className=''>
              <h1>Autores del proyecto</h1>
              <h3>
                {authors.map((author, index) => (
                  <Fragment key={index}>
                    <h3 className='nombre'>
                      <i className='fas fa-user'></i> {author}
                    </h3>
                  </Fragment>
                ))}
              </h3>
            </div>
            {requirements.length > 0 ? (
              <div className='requerimientos'>
                <h1>Requerimientos del sistema</h1>
                <h3>
                  {requirements.map((requirement, index) => (
                    <Fragment key={index}>
                      <h3 className='nombre'>
                        <i className='fas fa-user'></i> {requirement}
                      </h3>
                    </Fragment>
                  ))}
                </h3>
              </div>
            ) : (
              <h2>No hay requerimientos del sistema</h2>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectTopDetails.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectTopDetails;
