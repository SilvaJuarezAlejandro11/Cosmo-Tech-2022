import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectCharacteristics = ({
  project: { sustainability, functionality, feasibility },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div class='descripcion-detalle text-center'>
            <h1 class='degradado'>Caracteristicas del proyecto</h1>
            <p>Funcionalidad, sustentabilidad y factibilidad del proyecto.</p>
          </div>
        </section>
      )}
      {toggle && (
        <Fragment>
          <div className='proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i className='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <section className='detalles-grid'>
              <div className='detalles-grid-01'>
                <h1>Funcionalidad</h1>
                {functionality ? (
                  <p>{functionality}</p>
                ) : (
                  <h3>No hay funcionalidad de proyecto.</h3>
                )}
              </div>
              <div className='detalles-grid-02'>
                <h1>Sustentabilidad</h1>
                {sustainability ? (
                  <p>{sustainability}</p>
                ) : (
                  <h3>No hay sustentabilidad del proyecto.</h3>
                )}
              </div>
              <div className='detalles-grid-03'>
                <h1>Factibilidad</h1>
                {feasibility ? (
                  <p>{feasibility}</p>
                ) : (
                  <h3>No hay factibilidad del proyecto</h3>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectCharacteristics.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCharacteristics;
