import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmAccount } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Spinner from '../layout/spinner/Spinner';
import Main from '../layout/Main';

const Verification = ({ isVerified, match, confirmAccount }) => {
  console.log(match.params.id);
  localStorage.setItem('token', match.params.id);
  const [waiting, setWaiting] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    confirmAccount(match.params.id);
    setTimeout(() => {
      setWaiting('finish');
    }, 400);
  }, [isVerified, confirmAccount, match.params.id]);

  if (isVerified) {
    setTimeout(() => {
      setRedirect(true);
    }, 1000);
  }

  if (redirect) {
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
  confirmAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isVerified: state.auth.isVerified,
});

export default connect(mapStateToProps, { confirmAccount })(Verification);
