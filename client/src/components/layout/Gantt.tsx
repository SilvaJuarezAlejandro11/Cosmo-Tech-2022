import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  PdfExport,
} from '@syncfusion/ej2-react-gantt';

 let ganttInst: GanttComponent | null;

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

    const toolbarBtnClick=(args:any)=>{
    if(args.item.id.includes("pdfexport")){
      (ganttInst as GanttComponent).pdfExport()
    }
  }
const Gantt = ({refSelfData}) => {
  return (
  <section className='contenedor'>
        <div className='text-center'>
          <h1>Grafica de Gantt del proyecto</h1>
        </div>
        <div className='gantt'>
          <GanttComponent
            ref={gantt => ganttInst = gantt}
            dataSource={refSelfData}
            taskFields={taskValues}
            toolbar={['ExpandAll', 'CollapseAll', 'PdfExport']}
            allowPdfExport={true}
            toolbarClick={toolbarBtnClick}
          >
            <Inject services={[Toolbar, PdfExport]}></Inject>
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



  )
}

export default Gantt