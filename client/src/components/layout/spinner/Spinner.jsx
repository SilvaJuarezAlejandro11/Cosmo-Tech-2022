import React from 'react';
import { Fragment } from 'react';
import './spinner.css';

const Spinner = () => {
  return (
    <Fragment>
      <div className='spinner'>
        <div className='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Spinner;
