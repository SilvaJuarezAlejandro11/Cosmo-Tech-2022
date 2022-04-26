import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ type, profile: { user, status, skills } }) => {
  let Style = '';
  if (type === 'Usuario') Style = 'invitado';
  if (type === 'Estudiante') Style = 'estudiante';
  if (type === 'Profesor') Style = 'profesor';

  return (
    <>
      <div className={`perfil text-center ${Style}`}>
        <div className='perfil-info'>
          <h1 className='degradado'>{user && user.name.split(' ', 1)}</h1>
          <h3>
            {skills.slice(0, 4).map((skill, index) => (
              <>
                {skill.toLowerCase()}
                {index + 1 === skills.length ? '' : `,${' '}`}
              </>
            ))}
          </h3>
        </div>
        <div className='descripcion text-center'>
          <h3>
            {type}, {status}
          </h3>
        </div>
        <div className='mas-sobre'>
          <Link to={`/profile/${user && user._id}`} className='degradado'>
            Ver más sobre este usuario
          </Link>
        </div>
      </div>
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
