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
import {projectData} from '../pruebas/data'

 let ganttInst: GanttComponent | null;

   const taskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks',
    dependency: 'Predeceesor',
  };

  const toolbarBtnClick=(args: any) =>{
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
  
const Gantt = ({refSelfData}) => {
  return (
 
<section className="contenedor">
       <div className='text-center'>
          <h1>Grafica de Gantt del proyecto</h1>
        </div>
           <div className="gantt">
      <GanttComponent ref={gantt => ganttInst = gantt}
        dataSource={projectData} taskFields={taskValues}
        toolbar={['ExpandAll', 'CollapseAll',"PdfExport", "ExcelExport", "CsvExport"]}
        allowPdfExport={true}
        allowExcelExport={true}
        toolbarClick={toolbarBtnClick}>
          <Inject services={[Toolbar, PdfExport, ExcelExport]}></Inject>
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="ID" width="200"></ColumnDirective>
            <ColumnDirective field="TaskName" headerText="Name" width="250"></ColumnDirective>
            <ColumnDirective field="StartDate" format="dd-MMM-yy" width="200"></ColumnDirective>
            <ColumnDirective field="Duration" width="200"></ColumnDirective>
          </ColumnsDirective>
      </GanttComponent>
           </div>
</section>
  )
}

export default Gantt