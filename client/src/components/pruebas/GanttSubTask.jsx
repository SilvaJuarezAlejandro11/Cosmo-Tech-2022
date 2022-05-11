import React from 'react';

const GanttSubTask = ({ formData2, setFormData2 }) => {
  const { TaskID2, TaskName2, StartDate2, Duration, Progress, ParentId } =
    formData2;
  const onChangeSub = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Sub tareas:</h2>
      <div className='grupo'>
        <label htmlFor='TaskID2'>ID de la subtarea</label>
        <input
          type='text'
          id='TaskID2'
          placeholder='ingrese nombre de la tarea.'
          name='TaskID2'
          value={TaskID2}
          onChange={(e) => onChangeSub(e)}
          required
        />
      </div>
      <div className='grupo'>
        <label htmlFor='taskName2'>Nombre de la subtarea</label>
        <input
          type='text'
          id='taskName2'
          placeholder='ingrese nombre de la tarea.'
          name='TaskName2'
          value={TaskName2}
          onChange={(e) => onChangeSub(e)}
          required
        />
      </div>
      <div className='grupo'>
        <label htmlFor='StarDate2'>Fecha de inicio</label>
        <input
          id='StartDate2'
          type='date'
          name='StartDate2'
          value={StartDate2}
          onChange={(e) => onChangeSub(e)}
          required
        />
      </div>
      <div className='grupo'>
        <label htmlFor='duration'>Duración de la tarea</label>
        <input
          type='text'
          id='duration'
          placeholder='ingrese la duración de la tarea.'
          name='Duration'
          value={Duration}
          onChange={(e) => onChangeSub(e)}
          required
        />
      </div>
      <div className='grupo'>
        <label htmlFor='progress'>Progreso de la tarea</label>
        <input
          type='text'
          id='progress'
          placeholder='ingrese el progreso de la tarea.'
          name='Progress'
          value={Progress}
          onChange={(e) => onChangeSub(e)}
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
          onChange={(e) => onChangeSub(e)}
          required
        />
      </div>
    </>
  );
};

export default GanttSubTask;
