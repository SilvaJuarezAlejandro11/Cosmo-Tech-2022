import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectConclusion = ({ project: { conclusion, bibliography } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div class='descripcion-detalle text-center'>
            <h1 class='degradado'>Conclusión del proyecto</h1>
            <p>Conclusión y bibliografías del proyecto.</p>
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
                <h1>Conclusión</h1>
                {conclusion ? (
                  <p>{conclusion}</p>
                ) : (
                  <h3>No hay conclusión del proyecto.</h3>
                )}
              </div>
              <div className='detalles-grid-02'>
                <h1>Bibliografías</h1>
                {bibliography ? (
                  <Fragment>
                    {bibliography.map((biblio, index) => (
                      <Fragment key={index}>
                        <h3 className='biblio'>
                          <a href={biblio} target='__blank'>
                            {biblio}
                          </a>
                        </h3>
                      </Fragment>
                    ))}
                  </Fragment>
                ) : (
                  <h3>No hay Bibliografías del proyecto.</h3>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectConclusion.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectConclusion;
