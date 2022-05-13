import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  PdfExport,
  ExcelExport
} from '@syncfusion/ej2-react-gantt';
import { PdfColor} from '@syncfusion/ej2-pdf-export';


  
const Gantt = ({refSelfData})  => {
   let ganttInst: GanttComponent | null;

   const taskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID:'ParentId'
    // child: 'subtasks',
    // dependency: 'Predeceesor',
  };

  const toolbarBtnClick=(args: any) =>{
      console.log(args.item.id);
 
    if(args.item.id.includes("pdfexport")){
      (ganttInst as GanttComponent).pdfExport({
        fileName:"projectData.pdf",
        enableFooter: false,
        showPredecessorLines: false,
        theme: "Fabric",
        ganttStyle: {
          taskbar: {
            taskColor: new PdfColor(240, 128, 128),
            taskBorderColor: new PdfColor(240, 128, 128),
            progressColor: new PdfColor(205, 92, 92)
          }
        }
      });
    }
    else if(args.item.id.includes("excelexport")){
      (ganttInst as GanttComponent).excelExport({
        fileName: "projectData.xlsx",
        theme: {
          header: {fontColor: "#C67878"},
          record: {fontColor: "#C67878"}
        },
        header: {
          headerRows: 1,
          rows: [{
            cells: [{
              colSpan: 4,
              value: "Project Time Tracking Report",
              style: { fontSize: 20, hAlign: 'Center'}
            }]
          }]
        },
        footer: {
          footerRows: 1,
          rows:[{
            cells:[{
              colSpan: 4,
              value: "Visit Again !!!",
              style: { fontSize: 18, hAlign: 'Center'}
            }]
          }]
        }
      });
    }
    else if(args.item.id.includes("csvexport")){
      (ganttInst as GanttComponent).csvExport();
    }
  }

  return (
 
<section className='contenedor'>
  <div className='text-center'>
    <h1>Grafica de Gantt del proyecto</h1>
  </div>
  <div className="gantt">
    <GanttComponent ref={gantt => ganttInst = gantt}
        dataSource={refSelfData} taskFields={taskValues}
        toolbar={['ExpandAll', 'CollapseAll', "ExcelExport", "CsvExport"]}
        allowPdfExport={true}
        allowExcelExport={true}
        toolbarClick={toolbarBtnClick}>
      <Inject services={[Toolbar, PdfExport, ExcelExport]}></Inject>
      <ColumnsDirective>
        <ColumnDirective field="TaskID" headerText="ID" ></ColumnDirective>
        <ColumnDirective field="TaskName" headerText="Nombre" ></ColumnDirective>
        <ColumnDirective field="StartDate" format="dd-MMM-yy" headerText='Fecha(dd-MMM-aa)' ></ColumnDirective>
        <ColumnDirective field="Duration" headerText='Duración en días'></ColumnDirective>
      </ColumnsDirective>
    </GanttComponent>
  </div>
</section>
  )
}

export default Gantt