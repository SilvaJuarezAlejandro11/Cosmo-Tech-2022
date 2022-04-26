import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';

const DashboardActions = ({ auth: { type }, _id, deleteAccount }) => {
  return (
    <div
      className={`acciones-grid ${
        type === 'userType' ? 'btn-borrar-cuenta-solo' : ''
      }`}
    >
      {type !== 'userType' ? (
        <div className=''>
          <a href='#plus' className='btn'>
            <i className='fas fa-graduation-cap text-primary'></i> Agregar
            historial academico
          </a>
        </div>
      ) : (
        ''
      )}
      {type === 'teacherType' ? (
        <div className=''>
          <a href='#plus2' className='btn'>
            <i className='fab fa-black-tie text-primary'></i> Agregar
            experiencia laboral
          </a>
        </div>
      ) : (
        ''
      )}
      <div className={`${type === 'teacherType' ? 'btn-borrar-cuenta' : ''}`}>
        <button onClick={() => deleteAccount()} className={`btn`}>
          <i className='fas fa-user-minus'></i>
          Borrar mi cuenta
        </button>
      </div>
    </div>
  );
};

DashboardActions.propTypes = {
  auth: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  _id: state.profile.profile.user._id,
});

export default connect(mapStateToProps, { deleteAccount })(DashboardActions);
