import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectImages = ({ project: { images } }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Imagenes del proyecto</h1>
            <p>Imagenes sobre el proyecto.</p>
          </div>
        </section>
      )}
      {toggle && (
        <Fragment>
          <div className='proyecto-info text-center imagenes-proyecto'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i className='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1>Imagenes</h1>
            <div className='imagenes-grid'>
              {images.map((image, index) => (
                <Fragment key={index}>
                  <div className='imagen'>
                    <img className='img-thumbnail' src={image} alt='...' />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectImages.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectImages;
