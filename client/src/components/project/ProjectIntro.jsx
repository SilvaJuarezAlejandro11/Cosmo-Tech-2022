import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ProjectIntro = ({
  project: { topic, delimitation, summary, introduction },
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      {!toggle && (
        <section onClick={() => setToggle(true)} className='detalle-proyecto'>
          <div className='descripcion-detalle text-center'>
            <h1 className='degradado'>Entradas del proyecto</h1>
            <p>Tema, delimitación del tema, resumen, introducción</p>
          </div>
        </section>
      )}

      {toggle && (
        <Fragment>
          <div className='text-center proyecto-info'>
            <div onClick={() => setToggle(false)} className='regresar'>
              <h3>
                <i class='fas fa-arrow-circle-left'></i> Regresar
              </h3>
            </div>
            <h1>Tema</h1>
            {topic ? (
              <Fragment>
                <p>{topic}</p>
              </Fragment>
            ) : (
              <h3>No hay tema</h3>
            )}
            <h1>Delimitación del tema</h1>
            {delimitation ? (
              <p>{delimitation}</p>
            ) : (
              <h3>No hay delimitación del tema</h3>
            )}
            <h1>Resumen</h1>
            {summary ? <p>{summary}</p> : <h3>No hay resumen</h3>}
            <h1>Introducción</h1>
            {introduction ? (
              <p>{introduction}</p>
            ) : (
              <h3>No hay introducción</h3>
            )}
          </div>
        </Fragment>
      )}
      {/* Topic, delimitation, summary, introduction */}
      {/* {!topic && !delimitation && !summary && !introduction ? (
        ''
      ) : (
        <div className='profile-top line-details bg-light p-2'>
          {topic && <h2 className='text-primary display-4'>{topic}</h2>}
          {delimitation && (
            <h2 className='text-secondary fs-6'>{delimitation}</h2>
          )}

          {summary && (
            <Fragment>
              <h2 className='text-primary display-5'>Resumen</h2>
              <p className='lead text-dark underline pb-3 m-5 mt-0'>
                {summary}
              </p>
            </Fragment>
          )}

          {introduction && (
            <Fragment>
              <h2 className='text-primary display-5 '>Introducción</h2>
              <p className='lead text-dark underline pb-3 m-5 mt-0'>
                {introduction}
              </p>
            </Fragment>
          )}
        </div>
      )} */}
    </Fragment>
  );
};

ProjectIntro.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectIntro;
