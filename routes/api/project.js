const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Project = require('../../models/Project');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

//* @desc Obtener mis proyectos
//* @route GET api/projects/me
//* @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).populate(
      'user',
      'avatar'
    );

    if (projects.length === 0) {
      return res
        .status(400)
        .json({ msg: 'No hay proyectos para este usuario' });
    }

    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error en el servidor');
  }
});

//* @desc Obtener proyectos
//* @route GET api/projects
//* @access Private

router.get('/', [auth], async (req, res) => {
  try {
    const projects = await Project.find().populate('user', ['name', 'avatar']);

    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error en el servidor');
  }
});

//* @desc Crear proyecto
//* @route POST api/projects
//* @access Private

router.post(
  '/',
  [
    auth,
    upload.fields([
      { name: 'file', maxCount: 1 },
      { name: 'images', maxCount: 5 },
    ]),

    [
      check('title', 'Se necesita un titulo.').not().isEmpty(),
      check(
        'languajes',
        'Se necesita los lenguajes utilizados para este proyecto.'
      )
        .not()
        .isEmpty(),
      check('authors', 'Se necesita minimo un autor de este proyecto.')
        .not()
        .isEmpty(),
      check(
        'period',
        'Se necesita el periodo escolar en el que se creó el periodo'
      )
        .not()
        .isEmpty(),
      check(
        'semester',
        'Se necesita el semestre en el que se realizó el proyecto'
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    if (typeof req.files['file'] === 'undefined') {
      return res.status(400).json({ errors: [{ msg: 'Escriba un archivo.' }] });
    }

    const allowedExtFile = /(\.rar|\.zip)$/i;
    if (!allowedExtFile.exec(req.files['file'][0].originalname)) {
      return res.status(400).json({
        errors: [
          {
            msg: 'El proyecto debe de estar comprimido en .zip o .rar para que sea aceptado.',
          },
        ],
      });
    }

    const allowedExtImages = /(\.jpeg|\.jpg|\.png|\.gif)$/i;

    let imagesError = 0;

    if (req.files['images']) {
      req.files['images'].forEach((image) => {
        if (!allowedExtImages.exec(image.originalname)) {
          return (imagesError = imagesError + 1);
        }
      });
    }

    if (imagesError) {
      console.log(imagesError);
      return res.status(400).json({
        errors: [
          {
            msg:
              'Todas las imagenes deben de ser .jpg, .jpeg, .png o gif. (' +
              imagesError +
              ' en total)',
          },
        ],
      });
    }
    const {
      files,
      body: {
        title,
        languajes,
        authors,
        period,
        semester,
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
      },
    } = req;

    const projectFields = {};

    projectFields.user = req.user.id;

    if (title) projectFields.title = title;
    if (languajes) {
      projectFields.languajes = languajes
        .split(',')
        .map((languaje) => languaje.trim());
    }
    if (authors) {
      projectFields.authors = authors.split(',').map((author) => author.trim());
    }
    if (period) projectFields.period = period;
    if (semester) projectFields.semester = semester;
    if (requirements) {
      projectFields.requirements = requirements
        .split(/\n/)
        .map((requirement) => requirement.trim());
    }
    if (steps) {
      projectFields.steps = steps.split(',').map((step) => step.trim());
    }
    if (group) projectFields.group = group;
    if (school) projectFields.school = school;
    if (career) projectFields.career = career;
    if (topic) projectFields.topic = topic;
    if (delimitation) projectFields.delimitation = delimitation;
    if (summary) projectFields.summary = summary;
    if (introduction) projectFields.introduction = introduction;

    if (objetiveGeneral) {
      projectFields.objetiveGeneral = objetiveGeneral
        .split(',')
        .map((general) => general.trim());
    }
    if (objetiveParticular) {
      projectFields.objetiveParticular = objetiveParticular
        .split(',')
        .map((particular) => particular.trim());
    }

    if (justification) projectFields.justification = justification;
    if (theoretical) projectFields.theoretical = theoretical;
    if (feasibilityFinancial)
      projectFields.feasibilityFinancial = feasibilityFinancial;
    if (feasibilityTechnique)
      projectFields.feasibilityTechnique = feasibilityTechnique;
    if (impactTechnology) projectFields.impactTechnology = impactTechnology;
    if (impactSocial) projectFields.impactSocial = impactSocial;

    if (impactSustainable) projectFields.impactSustainable = impactSustainable;
    if (degreeInnovation) projectFields.degreeInnovation = degreeInnovation;
    if (results) {
      projectFields.results = results.split(',').map((result) => result.trim());
    }
    if (innovation) projectFields.innovation = innovation;
    if (sustainability) projectFields.sustainability = sustainability;
    if (functionality) projectFields.functionality = functionality;
    if (feasibility) projectFields.feasibility = feasibility;
    if (conclusion) projectFields.conclusion = conclusion;
    if (conclusion) projectFields.conclusion = conclusion;
    if (bibliography) {
      projectFields.bibliography = bibliography
        .split(',')
        .map((biblio) => biblio.trim());
    }
    if (files) {
      const projectFile = req.files['file'][0];
      projectFields.file = projectFile.url;
    }
    if (req.files['images']) {
      projectFields.images = req.files['images'].map((image) => image.url);
    }
    try {
      let project = Project.findOne({ user: req.user.id });

      //? Crear proyecto

      project = new Project(projectFields);

      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  }
);

//* @desc Actualizar proyecto
//* @route POST api/projects/:pro_id
//* @access Private

router.post(
  '/:pro_id',
  [
    auth,
    upload.fields([
      { name: 'file', maxCount: 1 },
      { name: 'images', maxCount: 5 },
    ]),
    [
      check('title', 'Se necesita un titulo.').not().isEmpty(),
      check(
        'languajes',
        'Se necesita los lenguajes utilizados para este proyecto.'
      )
        .not()
        .isEmpty(),
      check('authors', 'Se necesita minimo un autor de este proyecto.')
        .not()
        .isEmpty(),
      check(
        'period',
        'Se necesita el periodo escolar en el que se creó el periodo'
      )
        .not()
        .isEmpty(),
      check(
        'semester',
        'Se necesita el semestre en el que se realizó el proyecto'
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    console.log(req.body);
    console.log(req.files['file']);
    if (req.body.file === '' && typeof req.files['file'] === 'undefined') {
      return res.status(400).json({
        errors: [{ msg: 'Ingrese su proyecto en forma de archivo.' }],
      });
    }
    const allowedExtFile = /(\.rar|\.zip)$/i;
    if (
      req.body.file === '' &&
      !allowedExtFile.exec(req.files['file'][0].originalname)
    ) {
      return res.status(400).json({
        errors: [
          {
            msg: 'El proyecto debe de estar comprimido en .zip o .rar para que sea aceptado.',
          },
        ],
      });
    }

    const allowedExtImages = /(\.jpeg|\.jpg|\.png|\.gif)$/i;

    let imagesError = 0;

    if (req.files['images']) {
      req.files['images'].forEach((image) => {
        if (!allowedExtImages.exec(image.originalname)) {
          return (imagesError = imagesError + 1);
        }
      });
    }

    if (imagesError) {
      console.log(imagesError);
      return res.status(400).json({
        errors: [
          {
            msg:
              'Todas las imagenes deben de ser .jpg, .jpeg, .png o gif. (' +
              imagesError +
              ' en total)',
          },
        ],
      });
    }
    const {
      files,
      body: {
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
      },
    } = req;

    const projectFields = {};

    if (title) projectFields.title = title;
    if (languajes) {
      projectFields.languajes = languajes
        .split(',')
        .map((languaje) => languaje.trim());
    }
    if (authors) {
      projectFields.authors = authors.split(',').map((author) => author.trim());
    }
    if (period) projectFields.period = period;
    if (semester) projectFields.semester = semester;
    if (requirements) {
      projectFields.requirements = requirements
        .split(',')
        .map((requirement) => requirement.trim());
    } else {
      projectFields.requirement = [];
    }
    if (steps) {
      projectFields.steps = steps.split(',').map((step) => step.trim());
    } else {
      projectFields.steps = [];
    }
    if (group) {
      projectFields.group = group;
    } else {
      projectFields.group = null;
    }
    if (school) {
      projectFields.school = school;
    } else {
      projectFields.school = null;
    }
    if (career) {
      projectFields.career = career;
    } else {
      projectFields.career = null;
    }
    if (topic) {
      projectFields.topic = topic;
    } else {
      projectFields.topic = null;
    }
    if (delimitation) {
      projectFields.delimitation = delimitation;
    } else {
      projectFields.delimitation = null;
    }
    if (summary) {
      projectFields.summary = summary;
    } else {
      projectFields.summary = null;
    }
    if (introduction) {
      projectFields.introduction = introduction;
    } else {
      projectFields.introduction = null;
    }

    if (objetiveGeneral) {
      projectFields.objetiveGeneral = objetiveGeneral
        .split(',')
        .map((general) => general.trim());
    } else {
      projectFields.general = [];
    }
    if (objetiveParticular) {
      projectFields.objetiveParticular = objetiveParticular
        .split(',')
        .map((particular) => particular.trim());
    } else {
      projectFields.particular = [];
    }

    if (justification) {
      projectFields.justification = justification;
    } else {
      projectFields.justification = null;
    }
    if (theoretical) {
      projectFields.theoretical = theoretical;
    } else {
      projectFields.theoretical = null;
    }
    if (feasibilityFinancial) {
      projectFields.feasibilityFinancial = feasibilityFinancial;
    } else {
      projectFields.feasibilityFinancial = null;
    }
    if (feasibilityTechnique) {
      projectFields.feasibilityTechnique = feasibilityTechnique;
    } else {
      projectFields.feasibilityTechnique = null;
    }
    if (impactTechnology) {
      projectFields.impactTechnology = impactTechnology;
    } else {
      projectFields.impactTechnology = null;
    }
    if (impactSocial) {
      projectFields.impactSocial = impactSocial;
    } else {
      projectFields.impactSocial = null;
    }

    if (impactSustainable) {
      projectFields.impactSustainable = impactSustainable;
    } else {
      projectFields.impactSustainable = null;
    }
    if (degreeInnovation) {
      projectFields.degreeInnovation = degreeInnovation;
    } else {
      projectFields.degreeInnovation = null;
    }
    if (results) {
      projectFields.results = results.split(',').map((result) => result.trim());
    } else {
      projectFields.results = [];
    }
    if (innovation) {
      projectFields.innovation = innovation;
    } else {
      projectFields.innovation = null;
    }
    if (sustainability) {
      projectFields.sustainability = sustainability;
    } else {
      projectFields.sustainability = null;
    }
    if (functionality) {
      projectFields.functionality = functionality;
    } else {
      projectFields.functionality = null;
    }
    if (feasibility) {
      projectFields.feasibility = feasibility;
    } else {
      projectFields.feasibility = null;
    }
    if (conclusion) {
      projectFields.conclusion = conclusion;
    } else {
      projectFields.conclusion = null;
    }
    if (bibliography) {
      projectFields.bibliography = bibliography
        .split(',')
        .map((biblio) => biblio.trim());
    } else {
      projectFields.bibliography = [];
    }
    if (file) {
      projectFields.file = file;
    } else {
      if (files) {
        const projectFile = req.files['file'][0];
        projectFields.file = projectFile.url;
      }
    }

    if (req.files['images']) {
      projectFields.images = req.files['images'].map((image) => image.url);
    } else {
      projectFields.images = [];
    }
    try {
      let project = await Project.findOne({ _id: req.params.pro_id });
      if (project) {
        project = await Project.findOneAndUpdate(
          { _id: req.params.pro_id },
          { $set: projectFields },
          { new: true }
        );

        return res.json(project);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  }
);

//* @desc Buscar proyecto por Id
//* @route GET api/projects/:pro_id
//* @access Private

router.get('/:pro_id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.pro_id,
    }).populate('user', ['title', 'authors']);

    if (!project)
      return res.status(400).json({
        msg: 'No se encontro ningun proyecto',
      });

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        msg: 'No se encontro ningun perfil',
      });
    }

    res.status(500).send('Error en el servidor.');
  }
});

//* @desc Obtener un proyecto por share_ID
//* @route PUT api/projects/:user_id/:share_id
//* @access Private

//? Corregido y listo para front-end

router.put('/:user_id/:share_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const project = await Project.findOne({
      share_ID: req.params.share_id,
    });

    if (project.user._id.toString() === req.params.user_id)
      return res.status(400).json({
        errors: [{ msg: 'Usted es el dueño de este proyecto.' }],
      });

    if (!project)
      return res.status(400).json({
        errors: [{ msg: 'No se encontro ningun proyecto' }],
      });

    let student = await Student.findById(req.params.user_id);
    if (student) {
      if (
        student.project_shared.filter(
          (pro) => pro.share_ID === req.params.share_id
        ).length > 0
      ) {
        return res.status(400).json({
          errors: [{ msg: 'Usted ya tiene este proyecto compartido' }],
        });
      }

      student.project_shared.unshift(project);

      await student.save();
      return res.json(student);
    }

    let teacher = await Teacher.findById(req.params.user_id);
    if (teacher) {
      if (
        teacher.project_shared.filter(
          (pro) => pro.share_ID === req.params.share_id
        ).length > 0
      ) {
        return res.status(400).json({
          errors: [{ msg: 'Usted ya tiene este proyecto compartido' }],
        });
      }

      teacher.project_shared.unshift(project);

      await teacher.save();
      return res.json(teacher);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        errors: [{ msg: 'No se encontro ningun proyecto' }],
      });
    }
    res.status(500).send('Error en el servidor.');
  }
});

//* @desc Dejar de seguir un proyecto por share_ID
//* @route DELETE api/projects/:user_id/:share_id
//* @access Private

router.delete('/:user_id/:share_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    let student = await Student.findById(req.params.user_id);
    if (student) {
      if (
        student.project_shared.filter(
          (pro) => pro.share_ID === req.params.share_id
        ).length === 0
      ) {
        return res.status(400).json({
          errors: [{ msg: 'Usted no tiene este proyecto compartido' }],
        });
      }

      student.project_shared = student.project_shared.filter(
        (pro) => pro.share_ID !== req.params.share_id
      );

      await student.save();
      return res.json(student);
    }

    let teacher = await Teacher.findById(req.params.user_id);
    if (teacher) {
      if (
        teacher.project_shared.filter(
          (pro) => pro.share_ID === req.params.share_id
        ).length === 0
      ) {
        return res.status(400).json({
          msg: 'Usted no tiene este proyecto compartido',
        });
      }

      teacher.project_shared = teacher.project_shared.filter(
        (pro) => pro.share_ID !== req.params.share_id
      );

      await teacher.save();
      return res.json(teacher);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        msg: 'No se encontro ningun proyecto',
      });
    }
    res.status(500).send('Error en el servidor.');
  }
});

//* @desc Crear Tareas o Sub tareas
//* @route UPDATE api/projects
//* @access Private

router.post(
  '/gantt/:pro_id',
  [
    auth,
    [
      check('TaskID', 'El id debe ser con numeros')
        .not()
        .isEmpty()
        .matches(/^[0-9]+$/),
      check('TaskName', 'Se requiere nombre').not().isEmpty(),
      check('StartDate', 'Se requiere fecha de inicio').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      TaskID,
      TaskName,
      StartDate,
      EndDate,
      Duration,
      Progress,
      ParentId,
    } = req.body;

    const newTask = {
      TaskID: parseInt(TaskID),
      TaskName,
      StartDate: new Date(StartDate),
      EndDate: EndDate ? new Date(EndDate) : '',
      Duration: Duration ? parseInt(Duration) : '',
      Progress: Progress ? parseInt(Progress) : '',
      ParentId: ParentId ? parseInt(ParentId) : '',
    };

    try {
      const project = await Project.findOne({ _id: req.params.pro_id });
      console.log(
        project.refSelfData.filter((data) => data.TaskID === newTask.TaskID)
          .length > 0
      );
      if (
        project.refSelfData.filter((data) => data.TaskID === newTask.TaskID)
          .length > 0
      ) {
        return res.status(400).json({
          errors: [{ msg: 'Este ID ya se esta usando.' }],
        });
      } else {
        project.refSelfData.unshift(newTask);

        await project.save();

        res.json(project);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//* @desc Borrar Tareas o subtareas
//* @route Delete api/projects
//* @access Private

router.delete('/gantt/:pro_id/:task_id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.pro_id });
    // Get remove index

    project.refSelfData = project.refSelfData.filter(
      (task) => task._id.toString() !== req.params.task_id
    );

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//* @desc Borrar proyecto
//* @route DELETE api/projects
//* @access Private

router.delete('/:pro_id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndRemove({ _id: req.params.pro_id });

    if (project) {
      res.json({ msg: 'Proyecto borrado' });
    } else {
      res.json({ msg: 'Error' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
