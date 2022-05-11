import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectObjetives = ({
  project: { objetiveGeneral, objetiveParticular },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Objetivos</h1>
            <p>Objetivos generales y particulares del proyecto</p>
          </div>
        </section>
      )}
      {/* objetiveGeneral, objetiveParticular */}
      {toggle && (
        <Fragment>
          <div className='text-center proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i className='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1>Objetivos</h1>
            <section className='detalles-grid'>
              <div className='detalles-grid-01'>
                <h2>General</h2>
                {objetiveGeneral ? (
                  objetiveGeneral.map((general, index) => (
                    <Fragment key={index}>
                      <p>
                        <i className='list fa fa-circle'></i> {general}
                      </p>
                    </Fragment>
                  ))
                ) : (
                  <h3>No hay objetivos generales</h3>
                )}
              </div>
              <div className='detalles-grid-02'>
                <h2>Particulares</h2>
                {objetiveParticular ? (
                  objetiveParticular.map((particular, index) => (
                    <Fragment key={index}>
                      <p>
                        <i className='list fa fa-circle'></i> {particular}
                      </p>
                    </Fragment>
                  ))
                ) : (
                  <h3>No hay objetivos particulares</h3>
                )}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectObjetives.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectObjetives;
