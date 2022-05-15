import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';
import { updateProject, getProjectById } from '../../actions/project';
import Spinner from '../layout/spinner/Spinner';

const EditProject = ({
  updateProject,
  getProjectById,
  project: { project, loading },
  match,
}) => {
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  useEffect(() => {
    if (!Array.isArray(project)) {
      setFormData({
        title: loading || !project.title ? '' : project.title,

        languajes:
          loading || !project.languajes ? '' : project.languajes.join(','),

        authors: loading || !project.authors ? '' : project.authors.join(','),

        period: loading || !project.period ? '' : project.period,

        semester: loading || !project.semester ? '' : project.semester,
        file: loading || !project.file ? '' : project.file,

        requirements:
          loading || !project.requirements
            ? ''
            : project.requirements.join(','),
        steps: loading || !project.steps ? '' : project.steps.join(','),
        group: loading || !project.group ? '' : project.group,
        school: loading || !project.school ? '' : project.school,
        career: loading || !project.career ? '' : project.career,
        topic: loading || !project.topic ? '' : project.topic,
        delimitation:
          loading || !project.delimitation ? '' : project.delimitation,
        summary: loading || !project.summary ? '' : project.summary,
        introduction:
          loading || !project.introduction ? '' : project.introduction,
        objetiveGeneral:
          loading || !project.objetiveGeneral
            ? ''
            : project.objetiveGeneral.join(','),
        objetiveParticular:
          loading || !project.objetiveParticular
            ? ''
            : project.objetiveParticular.join(','),
        justification:
          loading || !project.justification ? '' : project.justification,
        theoretical: loading || !project.theoretical ? '' : project.theoretical,
        feasibilityFinancial:
          loading || !project.feasibilityFinancial
            ? ''
            : project.feasibilityFinancial,
        feasibilityTechnique:
          loading || !project.feasibilityTechnique
            ? ''
            : project.feasibilityTechnique,
        impactTechnology:
          loading || !project.impactTechnology ? '' : project.impactTechnology,
        impactSocial:
          loading || !project.impactSocial ? '' : project.impactSocial,
        impactSustainable:
          loading || !project.impactSustainable
            ? ''
            : project.impactSustainable,
        degreeInnovation:
          loading || !project.degreeInnovation ? '' : project.degreeInnovation,
        results: loading || !project.results ? '' : project.results.join(','),
        innovation: loading || !project.innovation ? '' : project.innovation,
        sustainability:
          loading || !project.sustainability ? '' : project.sustainability,
        functionality:
          loading || !project.functionality ? '' : project.functionality,
        feasibility: loading || !project.feasibility ? '' : project.feasibility,
        conclusion: loading || !project.conclusion ? '' : project.conclusion,
        bibliography:
          loading || !project.bibliography
            ? ''
            : project.bibliography.join(','),
      });
    }
  }, [loading, project]);

  const [displayInputs, toggleInputs] = useState(false);
  const [toDateDisabled, toggleDisabled] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    languajes: '',
    authors: '',
    period: '',
    semester: '',
    file: '',
    requirements: '',
    steps: '',
    group: '',
    school: '',
    career: '',
    topic: '',
    delimitation: '',
    summary: '',
    introduction: '',
    objetiveGeneral: '',
    objetiveParticular: '',
    justification: '',
    theoretical: '',
    feasibilityFinancial: '',
    feasibilityTechnique: '',
    impactTechnology: '',
    impactSocial: '',
    impactSustainable: '',
    degreeInnovation: '',
    results: '',
    innovation: '',
    sustainability: '',
    functionality: '',
    feasibility: '',
    conclusion: '',
    bibliography: '',
  });

  const [file2, setFile] = useState();
  const [images, setImages] = useState();

  const [isSubmitted, setIsSubmitted] = useState(true);

  const {
    title,
    languajes,
    authors,
    period,
    semester,
    file,
    requirements,
    steps,
    group,
    school,
    career,
    topic,
    delimitation,
    summary,
    introduction,
    objetiveGeneral,
    objetiveParticular,
    justification,
    theoretical,
    feasibilityFinancial,
    feasibilityTechnique,
    impactTechnology,
    impactSocial,
    impactSustainable,
    degreeInnovation,
    results,
    innovation,
    sustainability,
    functionality,
    feasibility,
    conclusion,
    bibliography,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsSubmitted(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const data = new FormData();
    data.append('title', title);
    data.append('languajes', languajes);
    data.append('authors', authors);
    data.append('period', period);
    data.append('semester', semester);
    if (file) {
      data.append('file', file);
    }
    data.append('requirements', requirements);
    data.append('steps', steps);
    data.append('group', group);
    data.append('school', school);
    data.append('career', career);
    data.append('topic', topic);
    data.append('delimitation', delimitation);
    data.append('summary', summary);
    data.append('introduction', introduction);
    data.append('objetiveGeneral', objetiveGeneral);
    data.append('objetiveParticular', objetiveParticular);
    data.append('justification', justification);
    data.append('theoretical', theoretical);
    data.append('feasibilityFinancial', feasibilityFinancial);
    data.append('feasibilityTechnique', feasibilityTechnique);

    data.append('impactTechnology', impactTechnology);
    data.append('impactSocial', impactSocial);
    data.append('impactSustainable', impactSustainable);
    data.append('degreeInnovation', degreeInnovation);
    data.append('results', results);
    data.append('innovation', innovation);
    data.append('functionality', functionality);
    data.append('feasibility', feasibility);
    data.append('conclusion', conclusion);
    data.append('bibliography', bibliography);
    if (file2) {
      data.append('file', file2);
    }
    if (images) data.append('images', Object.values(images)[0]);
    if (images) data.append('images', Object.values(images)[1]);
    if (images) data.append('images', Object.values(images)[2]);
    if (images) data.append('images', Object.values(images)[3]);
    if (images) data.append('images', Object.values(images)[4]);

    updateProject(data, project._id);
  };

  return (
    <Fragment>
      {project.length > 0 || !project ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='contenedor'>
            <form
              className='formulario formulario-grid'
              onSubmit={(e) => onSubmit(e)}
              encType='multipart/form-data'
            >
              <section className='formulario-grid-01'>
                <div className='info text-center'>
                  <h1>Edita tu proyecto</h1>
                  <p>Actualiza el proyecto actualizandolo aqui</p>
                </div>
                <Alert />
                <div className='grupo'>
                  <label htmlFor='title'>Titulo:</label>
                  <input
                    id='title'
                    type='text'
                    placeholder='Ingrese el titulo del proyecto.'
                    name='title'
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='grupo'>
                  <label htmlFor='languages'>Lenguajes:</label>
                  <input
                    id='languages'
                    type='text'
                    placeholder='Ingrese los lenguajes utilizados.'
                    name='languajes'
                    value={languajes}
                    onChange={(e) => onChange(e)}
                  />
                  <small className='text-center'>
                    Por favor, utilize comas para separar los valores (ej.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                </div>
                <div className='grupo'>
                  <label htmlFor='authors'>Autores:</label>
                  <input
                    id='authors'
                    type='text'
                    placeholder='Ingrese los autores del proyecto.'
                    name='authors'
                    value={authors}
                    onChange={(e) => onChange(e)}
                  />
                  <small className='text-center'>
                    Por favor, utilize comas para separar los valores (ej.
                    Alejandro,Arturo,Andres)
                  </small>
                </div>
                <div className='grupo'>
                  <label htmlFor='period'>Periodo en el que se realizó:</label>
                  <select
                    id='period'
                    name='period'
                    value={period}
                    onChange={(e) => onChange(e)}
                    required
                  >
                    <option value='' disabled hidden>
                      Seleccione el periodo.
                    </option>
                    <option value='2016-2017'>2016-2017</option>
                    <option value='2017-2018'>2017-2018</option>
                    <option value='2018-2019'>2018-2019</option>
                    <option value='2020-2021'>2020-2021</option>
                    <option value='2021-2022'>2021-2022</option>
                  </select>
                </div>
                <div className='grupo'>
                  <label htmlFor='semester'>
                    Semestre en el que se realizó:
                  </label>
                  <select
                    id='semester'
                    name='semester'
                    value={semester}
                    onChange={(e) => onChange(e)}
                    required
                  >
                    <option value='' disabled hidden>
                      Seleccione el periodo.
                    </option>
                    <option value='1°'>1°</option>
                    <option value='2°'>2°</option>
                    <option value='3°'>3°</option>
                    <option value='4°'>4°</option>
                    <option value='5°'>5°</option>
                    <option value='6°'>6°</option>
                  </select>
                </div>
                {!toDateDisabled && (
                  <div className='grupo'>
                    <label htmlFor='file'>URL del archivo:</label>
                    {project && (
                      <a href={project.file || file} id='file'>
                        {project.file || file}
                      </a>
                    )}
                  </div>
                )}
                {toDateDisabled && (
                  <div className='grupo archivo-campo'>
                    <label htmlFor='formFile'>
                      Ingrese su proyecto: (zip o rar)
                    </label>
                    <div
                      className={`archivo ${!file2 ? 'carpeta' : 'enviado'}`}
                    >
                      <input
                        type='file'
                        id='formFile'
                        name='file'
                        onChange={(e) => {
                          setIsSubmitted(false);
                          const file = e.target.files[0];
                          setFile(file);
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className='grupo'>
                  <div className='aviso'>
                    <label htmlFor='check'>¿Cambiar archivo?</label>
                    <small>
                      Si desea actualizar con el archivo da click en la caja.
                    </small>
                  </div>
                  <input
                    id='check'
                    type='checkbox'
                    onChange={() => {
                      toggleDisabled(!toDateDisabled);
                      setFormData({
                        ...formData,
                        file: false,
                      });
                    }}
                  />
                </div>
              </section>

              <section className='formulario-grid-02'>
                <div className='info text-center'>
                  <h1
                    onClick={() => toggleInputs(!displayInputs)}
                    type='button'
                  >
                    Más sobre el proyecto
                  </h1>
                  <h3>Opcional *</h3>
                  <p>
                    Ingrese más información que quiera proporcionar sobre su
                    proyecto (No es necesario llenar todos los campos)
                  </p>
                </div>
                <div className='text-center plus'>
                  {displayInputs ? (
                    <i
                      onClick={() => toggleInputs(false)}
                      className='fas fa-minus-circle'
                    ></i>
                  ) : (
                    <i
                      onClick={() => toggleInputs(true)}
                      className='fas fa-plus-circle'
                    ></i>
                  )}
                </div>

                {displayInputs && (
                  <section>
                    <div className='grupo'>
                      <label htmlFor='req'>Requisitos del proyecto:</label>
                      <textarea
                        id='req'
                        type='text'
                        className='proyecto-textarea'
                        placeholder='Ingrese los requisitos minimos.'
                        name='requirements'
                        value={requirements}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo'>
                      <label htmlFor='steps'>Pasos para la instalación:</label>
                      <textarea
                        id='steps'
                        type='text'
                        className='proyecto-textarea'
                        placeholder='Ingrese los pasos para la instalación del proyecto.'
                        name='steps'
                        value={steps}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo'>
                      <label htmlFor='group'>Grupo:</label>
                      <input
                        id='group'
                        type='text'
                        placeholder='Ingrese su grupo.'
                        name='group'
                        value={group}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='school'>Escuela:</label>
                      <input
                        id='school'
                        type='text'
                        placeholder='Ingrese su escuela.'
                        name='school'
                        value={school}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='career'>Carrera:</label>
                      <input
                        type='text'
                        placeholder='Ingrese su carrera técnica.'
                        name='career'
                        value={career}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='topic'>Tema del proyecto:</label>
                      <input
                        type='text'
                        placeholder='Ingrese el tema del proyecto.'
                        name='topic'
                        value={topic}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='delimitation'>
                        Delimitación del tema:
                      </label>
                      <textarea
                        id='delimitation'
                        type='text'
                        placeholder='Ingrese la delimitación del tema.'
                        name='delimitation'
                        value={delimitation}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='summary'>Resumen del proyecto:</label>
                      <textarea
                        id='summary'
                        type='text'
                        placeholder='Ingrese el resumen del proyecto'
                        name='summary'
                        value={summary}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='introduction'>
                        Introducción del proyecto:
                      </label>
                      <textarea
                        id='introduction'
                        type='text'
                        placeholder='Ingrese la introdución del proyecto.'
                        name='introduction'
                        value={introduction}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='objectiveGeneral'>
                        Objetivos generales:
                      </label>
                      <textarea
                        id='objetiveGeneral'
                        className='proyecto-textarea'
                        type='text'
                        placeholder='Ingrese los objetivos generales.'
                        name='objetiveGeneral'
                        value={objetiveGeneral}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo'>
                      <label htmlFor='objetiveParticular'>
                        Objetivos particulares:
                      </label>
                      <textarea
                        id='objetiveParticular'
                        type='text'
                        className='proyecto-textarea'
                        placeholder='Ingrese los objetivos particulares.'
                        name='objetiveParticular'
                        value={objetiveParticular}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo'>
                      <label htmlFor='justification'>
                        Justificación del proyecto:
                      </label>
                      <textarea
                        id='justification'
                        type='text'
                        placeholder='Ingrese la justificación del proyecto.'
                        name='justification'
                        value={justification}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='theoretical'>Sustento teórico:</label>
                      <textarea
                        id='theoretical'
                        type='text'
                        placeholder='Ingrese el sustento téorico del proyecto.'
                        name='theoretical'
                        value={theoretical}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='feasibilityFinancial'>
                        Factibilidad financiera:
                      </label>
                      <textarea
                        id='feasibilityFinancial'
                        type='text'
                        placeholder='Ingrese la factibilidad financiera del proyecto.'
                        name='feasibilityFinancial'
                        value={feasibilityFinancial}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='feasibilityTechnique'>
                        Factibilidad técnica:
                      </label>
                      <textarea
                        id='feasibilityTechnique'
                        type='text'
                        placeholder='Ingrese la factibilidad técnica del proyecto.'
                        name='feasibilityTechnique'
                        value={feasibilityTechnique}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='impactTechnology'>
                        Impacto técnologico:
                      </label>
                      <textarea
                        id='impactTechnology'
                        type='text'
                        placeholder='Ingrese el impacto técnologio del proyecto:'
                        name='impactTechnology'
                        value={impactTechnology}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='impactSocial'>Impacto social:</label>
                      <textarea
                        id='impactSocial'
                        type='text'
                        placeholder='Ingrese el impacto social del proyecto.'
                        name='impactSocial'
                        value={impactSocial}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='impactSustainable'>
                        Impacto sustentable:
                      </label>
                      <textarea
                        id='impactSustainable'
                        type='text'
                        placeholder='Ingrese el impacto en el desarrollo sustentable del proyecto.'
                        name='impactSustainable'
                        value={impactSustainable}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='degreeInnovation'>
                        Grado de inovación:
                      </label>
                      <textarea
                        type='text'
                        placeholder='Ingrese el grado de innovación del proyecto.'
                        name='degreeInnovation'
                        value={degreeInnovation}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='results'>Resultados:</label>
                      <textarea
                        id='results'
                        type='text'
                        placeholder='Ingrese los resultados obtenidos del proyecto.'
                        name='results'
                        value={results}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo'>
                      <label htmlFor='innovation'>
                        Innovación del proyecto:
                      </label>
                      <textarea
                        id='innovation'
                        type='text'
                        placeholder='Ingrese las innovaciones que proporciona el proyecto.'
                        name='innovation'
                        value={innovation}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='sustainability'>
                        Sustentabilidad del proyecto:
                      </label>
                      <textarea
                        id='sustainability'
                        type='text'
                        placeholder='Ingrese la sustentabilidad del proyecto'
                        name='sustainability'
                        value={sustainability}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='functionality'>
                        Funcionalidad del proyecto:
                      </label>
                      <textarea
                        id='functionality'
                        type='text'
                        placeholder='Ingrese la funcionalidad del proyecto.'
                        name='functionality'
                        value={functionality}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='feasibility'>
                        Factibilidad del proyecto:
                      </label>
                      <textarea
                        id='feasibility'
                        type='text'
                        placeholder='Ingrese la factibilidad del proyecto.'
                        name='feasibility'
                        value={feasibility}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='conclusion'>
                        Conclusión del proyecto:
                      </label>
                      <textarea
                        id='conclusion'
                        type='text'
                        placeholder='Ingrese la conclusión del proyecto.'
                        name='conclusion'
                        value={conclusion}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='grupo'>
                      <label htmlFor='bibliography'>Bibliografías</label>
                      <textarea
                        id='bibliography'
                        type='text'
                        placeholder='Ingrese las bibliografías que se utilizaron en el proyecto.'
                        name='bibliography'
                        value={bibliography}
                        onChange={(e) => onChange(e)}
                      />
                      <span className='text-center'>
                        Por favor, utilize comas para separar los cada uno de
                        los valores
                      </span>
                    </div>
                    <div className='grupo imagenes'>
                      <label htmlFor='images'>
                        Ingrese imagenes del proyecto: (img o png){' '}
                        {images && (
                          <small>
                            Se han puesto {images.length}{' '}
                            {images.length === 1 ? `imagen` : 'imagenes'}
                          </small>
                        )}
                      </label>

                      <div
                        className={`archivo ${!images ? 'carpeta' : 'enviado'}`}
                      >
                        <input
                          type='file'
                          id='images'
                          multiple
                          onChange={(e) => {
                            setIsSubmitted(false);
                            const files = e.target.files;
                            setImages(files);
                          }}
                        />
                      </div>
                    </div>
                  </section>
                )}
              </section>
              <section className='formulario-grid-03'>
                <div className='grupo acciones'>
                  <input
                    type='submit'
                    className='btn '
                    disabled={isSubmitted && true}
                    value='Editar'
                  />
                  <Link className='btn' to='/me/projects'>
                    Regresar
                  </Link>
                </div>
              </section>
            </form>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

EditProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateProject,
  getProjectById,
})(withRouter(EditProject));
