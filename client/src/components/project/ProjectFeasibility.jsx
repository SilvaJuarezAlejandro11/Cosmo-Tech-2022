import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectFeasibility = ({
  project: { feasibilityFinancial, feasibilityTechnique },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Grado de factibilidad</h1>
            <p>Factibilidad técnica y financiera del proyecto.</p>
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
            <h1>Grado de factibilidad</h1>
            <section className='detalles-grid'>
              <div className='detalles-grid-01'>
                <h1>Técnica</h1>
                {feasibilityTechnique ? (
                  <p>{feasibilityTechnique}</p>
                ) : (
                  <h3>No hay factibilidad técnica.</h3>
                )}
              </div>
              <div className='detalles-grid-02'>
                <h1>Financiera</h1>
                {feasibilityFinancial ? (
                  <p>{feasibilityFinancial}</p>
                ) : (
                  <h3>No hay factibilidad financiera.</h3>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectFeasibility.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectFeasibility;
