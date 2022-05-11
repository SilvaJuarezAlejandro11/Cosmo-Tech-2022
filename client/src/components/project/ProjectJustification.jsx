import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectJustification = ({ project: { justification, theoretical } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Razones del proyecto</h1>
            <p>Justificación y el sustento teórico del proyecto.</p>
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
            <h1>Justificación</h1>
            {justification ? (
              <p>{justification}</p>
            ) : (
              <h3>No hay justificación del proyecto.</h3>
            )}
            <h1>Sustento teórico</h1>
            {theoretical ? (
              <p>{theoretical}</p>
            ) : (
              <h3>No hay sustento teórico del proyecto</h3>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectJustification.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectJustification;
