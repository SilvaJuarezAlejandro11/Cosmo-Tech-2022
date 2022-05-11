import React from 'react';

const GanttTask = ({ formData, setFormData }) => {
  const { TaskID, TaskName, StartDate, EndDate } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Tareas:</h1>
      <div className='grupo'>
        <label htmlFor='TaskID'>ID de la tarea</label>
        <input
          type='text'
          id='TaskID'
          placeholder='ingrese nombre de la tarea.'
          name='TaskID'
          value={TaskID}
          onChange={(e) => onChange(e)}
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
          required
        />
      </div>
    </>
  );
};

export default GanttTask;
