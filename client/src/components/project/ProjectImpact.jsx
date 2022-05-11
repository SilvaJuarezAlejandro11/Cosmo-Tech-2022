import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectImpact = ({
  project: { impactTechnology, impactSocial, impactSustainable },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Impacto del proyecto</h1>
            <p>
              Impacto técnologico, social y sustentable que realiza el proyecto.
            </p>
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
            <h1>Descripción de impacto</h1>
            <section className='detalles-grid'>
              <div className='detalles-grid-01'>
                <h1>Técnologico</h1>
                {impactTechnology ? (
                  <p>{impactTechnology}</p>
                ) : (
                  <h3>No hay impacto técnologico.</h3>
                )}
              </div>
              <div className='detalles-grid-02'>
                <h1>Social</h1>
                {impactSocial ? (
                  <p>{impactSocial}</p>
                ) : (
                  <h3>No hay impacto social.</h3>
                )}
              </div>
              <div className='detalles-grid-03'>
                <h1>Sustentable</h1>
                {impactSustainable ? (
                  <p>{impactSustainable}</p>
                ) : (
                  <h3>No hay impacto sustentable.</h3>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectImpact.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectImpact;
