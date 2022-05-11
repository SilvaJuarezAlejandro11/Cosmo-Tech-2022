import React from 'react';
import { useState } from 'react';
import GanttSubTask from './GanttSubTask';
import GanttTask from './GanttTask';

const GanttFormulario = ({ task, setTask, subTask, setSubTask }) => {
  const [formData2, setFormData2] = useState({
    TaskID2: '2',
    TaskName2: 'Ejemplo subtarea 1',
    StartDate2: '',
    Duration: '',
    Progress: '',
    ParentId: '',
  });

  const [formData, setFormData] = useState({
    TaskID: '1',
    TaskName: 'Ejemplo Tarea 1',
    StartDate: '',
    EndDate: '',
    Duration: '',
    Progress: '',
    ParentId: '',
  });

  const [toggle, toggleButton] = useState(false);
  const [toggle2, toggleButton2] = useState(false);

  const { TaskID, TaskName, StartDate, EndDate } = formData;
  const { TaskID2, TaskName2, StartDate2, Duration, Progress, ParentId } =
    formData2;

  const onSubmit = (e) => {
    e.preventDefault();

    setTask({
      TaskID: parseInt(TaskID),
      TaskName,
      Startdate: new Date(StartDate),
      EndDate: new Date(EndDate),
    });

    setSubTask({
      TaskID: parseInt(TaskID2),
      TaskName: TaskName2,
      Startdate: new Date(StartDate2),
      Duration: parseInt(Duration),
      Progress: parseInt(Progress),
      ParentId: parseInt(ParentId),
    });

    setFormData2({
      TaskID2: '2',
      TaskName2: 'Ejemplo subtarea 1',
      StartDate2: '',
      Duration: '',
      Progress: '',
      ParentId: '',
    });

    setFormData({
      TaskID: '1',
      TaskName: 'Ejemplo Tarea 1',
      StartDate: '',
      EndDate: '',
      Duration: '',
      Progress: '',
      ParentId: '',
    });

    console.log(task);
    console.log(subTask);
  };

  return (
    <section className='contenedor my-5'>
      <form
        onSubmit={(e) => onSubmit(e)}
        className='formulario text-center p-5'
      >
        {toggle && (
          <input
            type='button'
            value='Quitar Tarea'
            className='btn'
            onClick={(e) => toggleButton(false)}
          />
        )}
        {toggle2 && (
          <input
            type='button'
            value='Quitar SubTarea'
            className='btn'
            onClick={(e) => toggleButton2(false)}
          />
        )}
        {!toggle && (
          <input
            type='button'
            value='Agregar Tarea'
            className='btn'
            onClick={(e) => toggleButton(true)}
          />
        )}
        {!toggle2 && (
          <input
            type='button'
            value='Agregar SubTarea'
            className='btn'
            onClick={(e) => toggleButton2(true)}
          />
        )}

        {toggle && <GanttTask formData={formData} setFormData={setFormData} />}
        {toggle2 && (
          <GanttSubTask formData2={formData2} setFormData2={setFormData2} />
        )}
        {toggle || toggle2 ? (
          <div className='grupo acciones'>
            <input type='submit' className='btn' value='Terminar' />
          </div>
        ) : (
          ''
        )}
      </form>
    </section>
  );
};

export default GanttFormulario;
