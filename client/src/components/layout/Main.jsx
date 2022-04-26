import React, { Fragment } from 'react';
import { Imagenes } from '../../js/imagenes';

const Main = ({ titulo, descripcion, children }) => {
  Imagenes();

  return (
    <Fragment>
      <main className='hero'>
        <div className='empresa text-center'>
          <div>
            <h1 className='degradado'>{titulo}</h1>
          </div>
          <div className='batizLab-descripcion'>
            <p>{descripcion}</p>
          </div>
          <div className='main-opciones'>{children}</div>
        </div>
      </main>
    </Fragment>
  );
};

export default Main;
