import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, _id },
  profileID,
  auth,
  deleteEducation,
}) => {
  return (
    <Fragment>
      <table className='tabla'>
        <thead>
          <tr>
            <th colSpan={2} className='text-center'>
              <div className='proyecto-opciones'>
                {school}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profileID && (
                    <button
                      onClick={() => deleteEducation(_id, auth.type)}
                      className='borrar'
                    >
                      <i className='fas fa-trash'></i>{' '}
                    </button>
                  )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Periodo:</th>
            <th>
              <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
              {!to ? 'Ahora' : <Moment format='YYYY/MM/DD'></Moment>}
            </th>
          </tr>
          <tr>
            <th>Grado:</th>
            <th>{degree}</th>
          </tr>
          <tr>
            <th>Campo de estudio:</th>
            <th>{fieldofstudy}</th>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(ProfileEducation);
