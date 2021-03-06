import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';

const Verification = ({ isVerified }) => {
  const [waiting, setWaiting] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setWaiting('finish');
    }, 400);
  }, [isVerified]);

  if (isVerified) {
    return <Redirect to='/menu' />;
  }

  return (
    <Fragment>
      {waiting !== 'finish' ? (
        <Spinner />
      ) : (
        <Fragment>
          <Main
            titulo={'Verificación de correo'}
            descripcion={
              'Se ha enviado una URL a tu correo para verificar tu cuenta. !Te esperamos!'
            }
          >
            {isVerified && (
              <section className='contenedor'>
                <h1>Se ha activado la cuenta, espera un momento</h1>
              </section>
            )}
          </Main>
        </Fragment>
      )}
    </Fragment>
  );
};

Verification.propTypes = {
  isVerified: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isVerified: state.auth.isVerified,
});

export default connect(mapStateToProps, null)(Verification);
