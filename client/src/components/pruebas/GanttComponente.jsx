import React from 'react';
import { useState } from 'react';
import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-gantt';
import GanttFormulario from './GanttFormulario';
import { projectData } from './data';

console.log(projectData);
console.log(new Date('2021-11-23T05:04:46.512+00:00'));
const GanttComponente = () => {
  const [task, setTask] = useState({
    TaskID: '',
    TaskName: '',
    StartDate: '',
    EndDate: '',
    Duration: '',
    ParentId: '',
  });
  const [subTask, setSubTask] = useState({
    TaskID: '',
    TaskName: '',
    StartDate: '',
    Duration: '',
    Progress: '',
    ParentId: '',
  });

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

  return (
    <section className='proyecto-info'>
      <div className='gantt'>
        <GanttFormulario
          task={task}
          setTask={setTask}
          subTask={subTask}
          setSubTask={setSubTask}
        />
        <GanttComponent dataSource={projectData} taskFields={taskValues}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' headerText='ID'></ColumnDirective>
            <ColumnDirective
              field='TaskName'
              headerText='Name'
            ></ColumnDirective>
            <ColumnDirective
              field='StartDate'
              format='dd-MMM-yy'
            ></ColumnDirective>
            <ColumnDirective
              field='Duration'
              textAlign='Right'
            ></ColumnDirective>
          </ColumnsDirective>
        </GanttComponent>
      </div>
    </section>
  );
};

export default GanttComponente;
