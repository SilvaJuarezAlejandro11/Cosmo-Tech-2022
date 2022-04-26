import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';
import Alert from '../layout/Alert';

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
            <section className='contenedor'>
              <Alert />

              {isVerified ? (
                <h1>Cuenta verificada</h1>
              ) : (
                <h1>Cuenta no verificada</h1>
              )}
            </section>
          </Main>
        </Fragment>
      )}
    </Fragment>
  );
};

Verification.propTypes = {
  isVerified: PropTypes.bool,
  confirmAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isVerified: state.auth.isVerified,
});

export default connect(mapStateToProps, null)(Verification);
