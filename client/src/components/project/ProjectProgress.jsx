import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProjectProgress = ({ project }) => {
  console.log(Object.keys(project).length);
  const porcentaje = () => {
    let progreso = (Object.keys(project).length * 100) / 41;
    return progreso.toFixed(2);
  };

  let texto = porcentaje();
  console.log(texto);

  return (
    <>
      {console.log(Object.keys(project).length)}
      <div className='barra-circular'>
        <CircularProgressbar
          value={texto}
          text={`${texto}% completado`}
          styles={{
            text: {
              fontSize: '50%',
            },
          }}
        />
      </div>
    </>
  );
};

ProjectProgress.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectProgress;
