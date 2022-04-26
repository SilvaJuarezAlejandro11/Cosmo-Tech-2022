import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectLanguajes = ({ project: { languajes } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Lenguajes</h1>
            <p>Lenguajes con las que se ha hecho este proyecto</p>
          </div>
        </section>
      )}
      {/* Languajes */}
      {toggle && (
        <Fragment>
          <div className='text-center proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i class='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1 className=''>Lenguajes que maneja</h1>
            {languajes.map((languaje, index) => (
              <Fragment key={index}>
                <h3>- {languaje}</h3>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectLanguajes.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectLanguajes;
