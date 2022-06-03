import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AddEducation from '../profile-forms/AddEducation';
import AddExperience from '../profile-forms/AddExperience';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';

const ProfileAbout = ({
  profile: {
    education,
    experience,
    bio,
    status,
    user: { name, _id },
  },
  auth,
  edu,
  setEdu,
  exp,
  setExp,
}) => {
  return (
    <Fragment>
      <section className='contenedor mas-sobre-mi'>
        <h1 className='text-center'>
          Más sobre{' '}
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === _id
            ? 'mi'
            : `${name}`}
        </h1>
        <div className='mas-sobre-mi-info'>
          <div className='ocupacion'>
            <h3>
              <i className='far fa-address-card'></i> Ocupación:
            </h3>
            <p>{status}</p>
          </div>
          <div className='bio'>
            <h3>
              <i className='far fa-address-book'></i> Biografía:
            </h3>
            <p>{bio}</p>
          </div>
          <div className='educacion' id='educacion'>
            <h2>Educación:</h2>

            {auth.type !== 'userType' ? (
              <Fragment>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === _id && (
                    <div className='text-center plus' id='plus'>
                      {edu ? (
                        <i
                          onClick={(e) => setEdu(false)}
                          className='fas fa-minus-circle'
                        ></i>
                      ) : (
                        <i
                          onClick={(e) => setEdu(true)}
                          className='fas fa-plus-circle'
                        ></i>
                      )}
                    </div>
                  )}

                {edu && <AddEducation setEdu={setEdu} />}
              </Fragment>
            ) : (
              ''
            )}
            {!education ? (
              <div className='no-item'>
                <h4>No hay expediente academico</h4>
              </div>
            ) : education.length > 0 ? (
              <Fragment>
                {education.map((education) => (
                  <ProfileEducation
                    key={education._id}
                    education={education}
                    profileID={_id}
                    auth={auth}
                  />
                ))}
              </Fragment>
            ) : (
              <div className='no-item'>
                <h4>No hay expediente academico</h4>
              </div>
            )}
          </div>
          <div className='experiencia'>
            <h2>Experiencia laboral:</h2>
            {auth.type === 'teacherType' ? (
              <Fragment>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === _id && (
                    <div className='text-center plus' id='plus2'>
                      {exp ? (
                        <i
                          onClick={(e) => setExp(false)}
                          className='fas fa-minus-circle'
                        ></i>
                      ) : (
                        <i
                          onClick={(e) => setExp(true)}
                          className='fas fa-plus-circle'
                        ></i>
                      )}
                    </div>
                  )}
                {exp && <AddExperience setExp={setExp} />}
              </Fragment>
            ) : (
              ''
            )}
            {!experience ? (
              <div className='no-item'>
                <h4>No hay expediente de trabajo</h4>
              </div>
            ) : experience.length > 0 ? (
              <Fragment>
                {experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                    profileID={_id}
                    auth={auth}
                  />
                ))}
              </Fragment>
            ) : (
              <div className='no-item'>
                <h4>No hay expediente de trabajo</h4>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
