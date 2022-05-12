import React, { Fragment } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGantt } from '../../actions/project';
import Alert from '../layout/Alert';

const AddGantt = ({ match, addGantt }) => {
  const [formData2, setFormData] = useState({
    TaskID: '',
    TaskName: '',
    StartDate: '',
    Duration: '',
    Progress: '',
    ParentId: '',
  });

  const { TaskID, TaskName, StartDate, Duration, Progress, ParentId } =
    formData2;

  const onChange = (e) => {
    setFormData({
      ...formData2,
      [e.target.name]: e.target.value,
    });
    console.log(formData2);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData2);
    addGantt(formData2, match.params.id);
    setFormData({
      TaskID: '',
      TaskName: '',
      StartDate: '',
      EndDate: '',
      Duration: '',
      Progress: '',
      ParentId: '',
    });
  };
  return (
    <Fragment>
      <section className='contenedor'>
        <Alert />
        <div className='info text-center '>
          <h1>Grafica de gantt</h1>
          <p>
            Crea tu grafica de gantt agregando las tareas y subtareas de
            proyecto.
          </p>
        </div>
        <form className='formulario' onSubmit={(e) => onSubmit(e)}>
          <h1>Tareas:</h1>
          <div className='grupo'>
            <label htmlFor='TaskID'>ID de la subtarea</label>
            <input
              type='text'
              id='TaskID'
              placeholder='ingrese el ID de la tarea.'
              name='TaskID'
              value={TaskID}
              onChange={(e) => onChange(e)}
              pattern='^[0-9]+$'
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='taskName'>Nombre de la subtarea</label>
            <input
              type='text'
              id='taskName'
              placeholder='ingrese nombre de la tarea.'
              name='TaskName'
              value={TaskName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='StartDate'>Fecha de inicio</label>
            <input
              id='StartDate'
              type='date'
              name='StartDate'
              value={StartDate}
              onChange={(e) => onChange(e)}
              pattern='/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/'
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='duration'>Duración de la subtarea</label>
            <input
              type='text'
              id='duration'
              placeholder='ingrese la duración de la tarea.'
              name='Duration'
              value={Duration}
              onChange={(e) => onChange(e)}
              pattern='^[0-9]+$'
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='progress'>Progreso de la subtarea</label>
            <input
              type='text'
              id='progress'
              placeholder='ingrese el progreso de la tarea.'
              name='Progress'
              value={Progress}
              onChange={(e) => onChange(e)}
              pattern='^[0-9]+$'
              maxLength={3}
              required
            />
          </div>
          <div className='grupo'>
            <label htmlFor='parentid'>Id de la tarea principal</label>
            <input
              type='text'
              id='parentid'
              placeholder='ingrese el id de la tarea principal.'
              name='ParentId'
              value={ParentId}
              onChange={(e) => onChange(e)}
              pattern='^[0-9]+$'
              required
            />
          </div>
          <div className='grupo acciones'>
            <input type='submit' className='btn ' value='Crear' />
          </div>
        </form>
      </section>
    </Fragment>
  );
};

AddGantt.propTypes = {
  addGantt: PropTypes.func.isRequired,
};

export default connect(null, { addGantt })(withRouter(AddGantt));
