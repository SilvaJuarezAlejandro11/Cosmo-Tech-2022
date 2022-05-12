import React from 'react';
import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-gantt';

const ProjectGantt = ({ project: { refSelfData } }) => {
  const taskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'ParentId',
    // child: 'subtasks',
    // dependency: 'Predeceesor',
  };

  console.log(refSelfData);

  return (
    <section className='gantt-detalle'>
      <div className='text-center'>
        <h1>Grafica de Gantt</h1>
      </div>
      <GanttComponent dataSource={refSelfData} taskFields={taskValues}>
        <ColumnsDirective>
          <ColumnDirective field='TaskID' headerText='ID'></ColumnDirective>
          <ColumnDirective field='TaskName' headerText='Name'></ColumnDirective>
          <ColumnDirective
            field='StartDate'
            format='dd-MMM-yy'
          ></ColumnDirective>
          <ColumnDirective field='Duration' textAlign='Right'></ColumnDirective>
        </ColumnsDirective>
      </GanttComponent>
    </section>
  );
};

export default ProjectGantt;
