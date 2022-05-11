import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProjectProgress from './ProjectProgress';

const ProjectSideBar = ({ project }) => {
  console.log(Object.keys(project).length);

  return (
    <Fragment>
      <aside className='side-bar'>
        <div className='opciones-proyecto text-center'>
          <Link to={'/menu'} className='btn'>
            Regresar
          </Link>
          <a href={project.file} className='btn'>
            Descargar
          </a>
        </div>
        <div className='indice-proyecto'>
          <div className='grafica text-center'>
            <ProjectProgress project={project} />
          </div>
          <div className='vinculos-proyecto'>
            <h3 className='text-center'>Información que no se ha hecho:</h3>
            {!project.group && <a href='#1'>Grupo</a>}
            {!project.school && <a href='#1'>Escuela</a>}
            {!project.career && <a href='#1'>Carrera</a>}
            {(project.requirements.length === 0 || !project.requirements) && (
              <a href='#1'>Requerimientos del proyecto</a>
            )}
            {!project.topic && <a href='#1'>Tema</a>}
            {!project.delimitation && <a href='#1'>Delimitación del tema</a>}
            {!project.summary && <a href='#1'>Resumen del proyecto</a>}
            {!project.introduction && (
              <a href='#1'>Introducción del proyecto</a>
            )}
            {(project.objetiveGeneral.length === 0 ||
              !project.objetiveGeneral) && <a href='#1'>Objetivos generales</a>}
            {(project.objetiveParticular.length === 0 ||
              !project.objetiveParticular) && (
              <a href='#1'>Objetivos particulares</a>
            )}
            {!project.justification && <a href='#1'>Justificación</a>}
            {!project.theoretical && <a href='#1'>Sustento teórico</a>}
            {!project.feasibilityFinancial && (
              <a href='#1'>Factibilidad financiera</a>
            )}
            {!project.feasibilityTechnique && (
              <a href='#1'>Factibilidad técnica</a>
            )}
            {!project.impactTechnology && <a href='#1'>Impacto técnologico</a>}
            {!project.impactSocial && <a href='#1'>Impacto social</a>}
            {!project.impactSustainable && <a href='#1'>Impacto sustentable</a>}
            {!project.degreeInnovation && <a href='#1'>Grado de innovación</a>}
            {!project.innovation && <a href='#1'>Innovación</a>}
            {(project.results.length === 0 || !project.results) && (
              <a href='#1'>Resultados del proyecto</a>
            )}
            {!project.sustainability && <a href='#1'>Sustentabilidad</a>}
            {!project.functionality && <a href='#1'>Funcionalidad</a>}
            {!project.feasibility && <a href='#1'>Factibilidad</a>}
            {!project.conclusion && <a href='#1'>Conclusión</a>}
            {(project.bibliography.length === 0 || !project.bibliography) && (
              <a href='#1'>Bibliografías</a>
            )}
            {(project.images.length === 0 || !project.images) && (
              <a href='#1'>Imagenes del proyecto</a>
            )}
            {(project.refSelfData.length === 0 || !project.refSelfData) && (
              <a href='#1'>Grafica de gantt</a>
            )}
            {Object.keys(project).length === 41 ? (
              ''
            ) : (
              <Fragment>
                <h3 className='text-center'>Información que se ha hecho:</h3>
                <a href='#1'>Titulo</a>
                <a href='#1'>Periodo</a>
                <a href='#1'>Semestre</a>
                <a href='#1'>Autores</a>
                <a href='#1'>Lenguajes</a>
                {project.group && <a href='#1'>Grupo</a>}
                {project.school && <a href='#1'>Escuela</a>}
                {project.career && <a href='#1'>Carrera</a>}
                {project.requirements.length > 0 && (
                  <a href='#1'>Requerimientos del proyecto</a>
                )}
                {project.topic && <a href='#1'>Tema</a>}
                {project.delimitation && <a href='#1'>Delimitación del tema</a>}
                {project.summary && <a href='#1'>Resumen del proyecto</a>}
                {project.introduction && (
                  <a href='#1'>Introducción del proyecto</a>
                )}
                {project.objetiveGeneral.length > 0 && (
                  <a href='#1'>Objetivos generales</a>
                )}
                {project.objetiveParticular.length > 0 && (
                  <a href='#1'>Objetivos particulares</a>
                )}
                {project.justification && <a href='#1'>Justificación</a>}
                {project.theoretical && <a href='#1'>Sustento teórico</a>}
                {project.feasibilityFinancial && (
                  <a href='#1'>Factibilidad financiera</a>
                )}
                {project.feasibilityTechnique && (
                  <a href='#1'>Factibilidad técnica</a>
                )}
                {project.impactTechnology && (
                  <a href='#1'>Impacto técnologico</a>
                )}
                {project.impactSocial && <a href='#1'>Impacto social</a>}
                {project.impactSustainable && (
                  <a href='#1'>Impacto sustentable</a>
                )}
                {project.degreeInnovation && (
                  <a href='#1'>Grado de innovación</a>
                )}
                {project.innovation && <a href='#1'>Innovación</a>}
                {project.results.length > 0 && (
                  <a href='#1'>Resultados del proyecto</a>
                )}
                {project.sustainability && <a href='#1'>Sustentabilidad</a>}
                {project.functionality && <a href='#1'>Funcionalidad</a>}
                {project.feasibility && <a href='#1'>Factibilidad</a>}
                {project.conclusion && <a href='#1'>Conclusión</a>}
                {project.bibliography.length > 0 && (
                  <a href='#1'>Bibliografías</a>
                )}
                {project.images.length > 0 && (
                  <a href='#1'>Imagenes del proyecto</a>
                )}
                {(project.refSelfData.length !== 0 ||
                  project.refSelfData ||
                  project.refSelfData.length > 0) && (
                  <a href='#1'>Grafica de gantt</a>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default ProjectSideBar;
