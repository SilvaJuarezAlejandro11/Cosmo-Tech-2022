import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner/Spinner';
import { getProjectById } from '../../actions/project';
import Main from '../layout/Main';
import ProjectLanguajes from './ProjectLanguajes';
import ProjectSteps from './ProjectSteps';
import ProjectIntro from './ProjectIntro';
import ProjectObjetives from './ProjectObjetives';
import ProjectJustification from './ProjectJustification';
import ProjectFeasibility from './ProjectFeasibility';
import ProjectImpact from './ProjectImpact';
import ProjectDegreeInnovation from './ProjectDegreeInnovation';
import ProjectResults from './ProjectResults';
import ProjectCharacteristics from './ProjectCharacteristics';
import ProjectConclusion from './ProjectConclusion';
import ProjectImages from './ProjectImages';
import ProjectTopDetails from './ProjectTopDetails';
import { Link } from 'react-router-dom';
import ProjectSideBar from './ProjectSideBar';
import ProjectGantt from './ProjectGantt';
const Project = ({
  project: { project, loading },
  auth,
  match,
  getProjectById,
}) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  return (
    <Fragment>
      <Main titulo={project.title} descripcion={project.period}>
        <div className='batizLab-autores'>
          {project.length === 0 || loading || project.length >= 1
            ? ''
            : project.authors.map((author, index) => (
                <Fragment key={index}>
                  <h3 className='nombre'>
                    <i className='fas fa-user'></i> {author}
                  </h3>
                </Fragment>
              ))}
        </div>
      </Main>
      {project.length === 0 || loading || project.length >= 1 ? (
        <Spinner />
      ) : (
        <Fragment>
          <main className='detalles-proyecto-grid'>
            <section className='contenedor detalles-proyecto'>
              <div className='side-bar-opciones-768 text-center'>
                <Link to={'/menu'} className='btn'>
                  Regresar
                </Link>
                <a href={project.file} className='btn'>
                  Descargar
                </a>
              </div>
              <ProjectTopDetails project={project} />
              <ProjectLanguajes project={project} />
              {project.steps.length > 0 && <ProjectSteps project={project} />}
              {(project.topic ||
                project.delimitation ||
                project.summary ||
                project.introduction) && <ProjectIntro project={project} />}
              {(project.objetiveGeneral.length > 0 ||
                project.objetiveParticular.length > 0) && (
                <ProjectObjetives project={project} />
              )}
              {(project.justification || project.theoretical) && (
                <ProjectJustification project={project} />
              )}
              {(project.feasibilityFinancial ||
                project.feasibilityTechnique) && (
                <ProjectFeasibility project={project} />
              )}
              {(project.impactTechnology ||
                project.impactSocial ||
                project.impactSustainable) && (
                <ProjectImpact project={project} />
              )}
              {(project.degreeInnovation || project.innovation) && (
                <ProjectDegreeInnovation project={project} />
              )}
              {project.results.length > 0 && (
                <ProjectResults project={project} />
              )}
              {(project.sustainability ||
                project.functionality ||
                project.feasibility) && (
                <ProjectCharacteristics project={project} />
              )}
              {(project.conclusion || project.bibliography.length > 0) && (
                <ProjectConclusion project={project} />
              )}
              {project.images.length > 0 && <ProjectImages project={project} />}

              {(project.refSelfData.length !== 0 ||
                project.refSelfData.length > 0) && (
                <ProjectGantt project={project} />
              )}
            </section>
            <ProjectSideBar project={project} />
          </main>
        </Fragment>
      )}
    </Fragment>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProjectById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProjectById })(Project);
