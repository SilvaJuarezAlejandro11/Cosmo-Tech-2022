import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectDegreeInnovation = ({
  project: { degreeInnovation, innovation },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div class='descripcion-detalle text-center'>
            <h1 class='degradado'>Innovación del proyecto</h1>
            <p>Grado de innovación y innovación del proyecto.</p>
          </div>
        </section>
      )}
      {toggle && (
        <Fragment>
          <div className='proyecto-info text-center'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i className='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <section className='detalles-grid'>
              <div className='detalles-grid-01'>
                <h1>Grado de innovación</h1>
                {degreeInnovation ? (
                  <p>{degreeInnovation}</p>
                ) : (
                  <h3>No hay grado de innovación.</h3>
                )}
              </div>
              <div className='detalles-grid-01'>
                <h1>Innovación</h1>
                {innovation ? <p>{innovation}</p> : <h3>No hay innovación.</h3>}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectDegreeInnovation.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectDegreeInnovation;
