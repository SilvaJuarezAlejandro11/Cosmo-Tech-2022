import React, { Fragment } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/project';

const DeleteTask = ({ refSelfData, match, deleteTask }) => {
  const [formData3, setFormData] = useState({
    id: '',
  });

  const { id } = formData3;

  const onChange = (e) => {
    setFormData({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = refSelfData.filter((data) => data.TaskID === parseInt(id));
    const taskID = data.length !== 0 && data[0]._id;

    deleteTask(match.params.id, taskID);
  };

  return (
    <Fragment>
      <section className='contenedor'>
        <form className='formulario' onSubmit={(e) => onSubmit(e)}>
          <div className='grupo'>
            <label htmlFor='id'>ID de la tarea o subtarea</label>
            <input
              type='text'
              id='id'
              placeholder='ingrese el ID de la tarea o subtarea.'
              name='id'
              value={id}
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

DeleteTask.propTypes = {
  deleteTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteTask })(DeleteTask);
