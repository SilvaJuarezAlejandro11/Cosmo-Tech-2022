import React, { Fragment } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGantt } from '../../actions/project';

const AddGantt = ({ match, addGantt }) => {
  const [formData, setFormData] = useState({
    TaskID: '',
    TaskName: '',
    StartDate: '',
    EndDate: '',
  });

  const { TaskID, TaskName, StartDate, EndDate } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addGantt(formData, match.params.id);
    setFormData({ TaskID: '', TaskName: '', StartDate: '', EndDate: '' });
    console.log(formData);
  };
  return (
    <Fragment>
      <section className='contenedor'>
        <form className='formulario' onSubmit={(e) => onSubmit(e)}>
          <div className='grupo'>
            <label htmlFor='TaskID'>ID de la tarea</label>
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
            <label htmlFor='taskName'>Nombre de la tarea</label>
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
            <label htmlFor='EndDate'>Fecha limite</label>
            <input
              id='EndDate'
              type='date'
              name='EndDate'
              value={EndDate}
              onChange={(e) => onChange(e)}
              pattern='/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/'
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
