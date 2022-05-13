import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/project';

import AddTask from './AddTask';
import AddSubTask from './AddSubTask';
import Gantt from '../layout/Gantt';
import DeleteTask from './DeleteTask';
import Alert from '../layout/Alert';

const AddGantt = ({
  getProjectById,
  project: {
    project: { refSelfData },
  },
  match,
}) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  const [displayInputs, toggleInputs] = useState(false);
  const [displayInputs2, toggleInputs2] = useState(false);
  const [displayInputs3, toggleInputs3] = useState(false);

  return (
    <Fragment>
      <section className='contenedor'>
        <div className='info text-center'>
          <h1>Grafica de gantt</h1>
          <h3>Notas:</h3>
          <p>
            Debido a que este microservicio está en fase beta, le recomendamos
            lo siguiente:
            <br />- Procure no repetir los ID ya que si se encuentra un id
            repetido, habra un error al posicionar la subtarea a la tarea u
            otros errores que podria ocurrir.
          </p>
          <br />
          <Link className='btn' to='/me/projects'>
            Regresar a mis proyectos
          </Link>
        </div>
      </section>
      <section className='contenedor'>
        <Alert />
      </section>
      <section className='contenedor formulario-grid'>
        <section className='formulario-grid-01'>
          <div className='info text-center'>
            <h1 onClick={() => toggleInputs(!displayInputs)} type='button'>
              Ingrese una tarea
            </h1>
            <h3>Opcional *</h3>
            <p>
              Ingrese las tareas que se realizaron o se realizarán en el
              proyecto en nuestra grafica de gantt
            </p>
          </div>
          <div className='text-center plus'>
            {displayInputs ? (
              <i
                onClick={() => toggleInputs(false)}
                className='fas fa-minus-circle'
              ></i>
            ) : (
              <i
                onClick={() => toggleInputs(true)}
                className='fas fa-plus-circle'
              ></i>
            )}
          </div>
          {displayInputs && <AddTask match={match} />}
        </section>
        <section className='formulario-grid-02'>
          <div className='info text-center'>
            <h1 onClick={() => toggleInputs2(!displayInputs2)} type='button'>
              Ingrese una subtarea
            </h1>
            <h3>Opcional *</h3>
            <p>
              Ingrese las subtareas que contienen las tareas principales y
              relacionalas a través de sus id
            </p>
          </div>
          <div className='text-center plus'>
            {displayInputs2 ? (
              <i
                onClick={() => toggleInputs2(false)}
                className='fas fa-minus-circle'
              ></i>
            ) : (
              <i
                onClick={() => toggleInputs2(true)}
                className='fas fa-plus-circle'
              ></i>
            )}
          </div>
          {displayInputs2 && <AddSubTask match={match} />}
        </section>
      </section>
      <section className='contenedor'>
        <div className='info text-center'>
          <h1 onClick={() => toggleInputs3(!displayInputs3)} type='button'>
            Borrar una tarea o subtarea
          </h1>
          <h3>Opcional *</h3>
          <p>
            Borre las tareas o subtareas que ya no se necesitan o por
            simplemente ser un error.
          </p>
        </div>
        <div className='text-center plus'>
          {displayInputs3 ? (
            <i
              onClick={() => toggleInputs3(false)}
              className='fas fa-minus-circle'
            ></i>
          ) : (
            <i
              onClick={() => toggleInputs3(true)}
              className='fas fa-plus-circle'
            ></i>
          )}
        </div>
        {displayInputs3 && (
          <DeleteTask match={match} refSelfData={refSelfData} />
        )}
      </section>
      <Gantt refSelfData={refSelfData} />
    </Fragment>
  );
};

AddGantt.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProjectById })(
  withRouter(AddGantt)
);
