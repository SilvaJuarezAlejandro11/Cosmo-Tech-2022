import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const ProfileExperience = ({
  experience: { company, title, location, to, from, _id },
  profileID,
  auth,
  deleteExperience,
}) => {
  return (
    <Fragment>
      <table className='tabla'>
        <thead>
          <tr>
            <th colSpan={2} className='text-center'>
              <div className='proyecto-opciones'>
                {company}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profileID && (
                    <button
                      onClick={() => deleteExperience(_id, auth.type)}
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
            <th>Ocupación:</th>
            <th>{title}</th>
          </tr>
          <tr>
            <th>Ubicación:</th>
            <th>{location}</th>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ProfileExperience);
