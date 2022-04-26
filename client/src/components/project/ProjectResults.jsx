import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectResults = ({ project: { results } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div class='descripcion-detalle text-center'>
            <h1 class='degradado'>Resultados del proyecto</h1>
            <p>Resultados que se han logrado con respecto al proyecto.</p>
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
            <h1>Analisis de resultados</h1>
            {results.map((result, index) => (
              <Fragment key={index}>
                <h3>- {result}</h3>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectResults.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectResults;
