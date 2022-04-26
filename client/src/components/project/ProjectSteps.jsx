import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectSteps = ({ project: { steps } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Pasos a seguir</h1>
            <p>Instrucciones para copilarlo en tu computadora</p>
          </div>
        </section>
      )}
      {/* steps  */}
      {toggle && (
        <Fragment>
          <div className='text-center proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i className='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1>Pasos a seguir</h1>
            {steps.map((step, index) => (
              <Fragment key={index}>
                <h3>- {step}</h3>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectSteps.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectSteps;
