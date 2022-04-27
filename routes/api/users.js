const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Importar modelo del usuario
const User = require('../../models/User');
// Importar modelo del estudiante
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const nodemailer = require('nodemailer');

const mail = (email, id) => {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
      user: config.get('AUTH_MAIL'),
      pass: config.get('AUTH_PASS'),
    },
  });

  var mailOptions = {
    from: '"BatizLab" <batiz.lab.spankybot@gmail.com>',
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
    <h2>Da click <a href='https://cosmotech-6iv8-2022.herokuapp.com/verification/account/${id}'> <<< Aquí >>> </a> para activar tu cuenta</h2>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('El email no se envió', error);
    } else {
      console.log('email enviado');
    }
  });
};

// @Ruta GET api/users/verification/:id
// @Descripción registrar usuario
// @acceso Publica

router.get('/verification/:id', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.id, config.get('jwtSecret'));

    let user = await User.findById(decoded.user.id);
    let student = await Student.findById(decoded.user.id);
    let teacher = await Teacher.findById(decoded.user.id);
    let general = user || student || teacher;

    general.verify = true;

    await general.save();
    return;
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      errors: [
        {
          msg: 'Verificación denegada.',
        },
      ],
    });
  }
});

// @Ruta POST api/users
// @Descripción registrar usuario
// @acceso Publica
router.post(
  '/',
  [
    check('name', 'Se necesita un nombre.').not().isEmpty(),
    check('email', 'Ingrese un email valido.').isEmail(),
    check(
      'password',
      'Ingrese una contraseña con 6 o mas caracteres.'
    ).isLength({
      min: 6,
      max: 14,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    if (email.endsWith('@alumno.ipn.mx' || '@ipn.mx')) {
      return res.status(400).json({
        errors: [
          {
            msg: 'No se aceptan cuentas institucionales en este tipo de registro.',
          },
        ],
      });
    }
    if (!email.endsWith('.com' || '.xyz')) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Ingrese un email valido.',
          },
        ],
      });
    }
    try {
      let user = {
        email: await User.findOne({ email }),
        name: await User.findOne({ name }),
      };

      // Ver si el usuario ya existe en la plataforma

      if (user.name || user.email) {
        return res.status(400).json({
          errors: [{ msg: 'User already exist' }],
        });
      }

      // Obtener el gravatar del usuario

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        type: 'userType',
        email,
        password,
        avatar,
        verify: false,
      });

      // Encriptar la contraseña

      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);

      // OTRA FORMA DE HACERLO
      // user.password = await bycrypt.hash(password, 10);

      // Guardar usuario

      await user.save();

      // Darle un nuevo token al usuario

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          mail(email, token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

// @Ruta POST api/users/students
// @Descripción registrar usuario estudiante
// @acceso Publica
router.post(
  '/students',
  [
    check('name', 'Se necesita un nombre.').not().isEmpty(),
    check('school', 'Se necesita el nombre de la escuela en la que estudias')
      .not()
      .isEmpty(),
    check('ballot', 'Ingrese una boleta valida ').isLength(10),
    check('email', 'Ingrese un email valido.').isEmail(),
    check(
      'password',
      'Ingrese una contraseña con 6 o mas caracteres.'
    ).isLength({
      min: 6,
      max: 14,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, school, ballot, email, password } = req.body;

    if (!email.endsWith('@alumno.ipn.mx')) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Solo se aceptan cuentas institucionales de alumno en este tipo de registro.',
          },
        ],
      });
    }

    try {
      let student = {
        email: await Student.findOne({ email }),
        name: await Student.findOne({ name }),
      };

      // Ver si el usuario ya existe en la plataforma

      if (student.email || student.name) {
        return res.status(400).json({
          errors: [{ msg: 'El usuario ya existe en la plataforma.' }],
        });
      }
      // Obtener el gravatar del usuario

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      student = new Student({
        name,
        type: 'studentType',
        school,
        ballot,
        email,
        password,
        avatar,
        verify: false,
      });

      // Encriptar la contraseña

      const salt = await bycrypt.genSalt(10);
      student.password = await bycrypt.hash(password, salt);
      student.ballot = await bycrypt.hash(ballot, salt);
      // OTRA FORMA DE HACERLO
      // user.password = await bycrypt.hash(password, 10);

      // Guardar usuario

      await student.save();

      // Darle un nuevo token al usuario

      const payload = {
        user: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          mail(email, token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

// @Ruta POST api/users/teachers
// @Descripción registrar usuario estudiante
// @acceso Publica
router.post(
  '/teachers',
  [
    check('name', 'Se necesita un nombre.').not().isEmpty(),
    check('school', 'Se requiere nombre de la escuela en donde usted enseña')
      .not()
      .isEmpty(),
    check('employee_No', 'Ingrese un numero de empleado correcto ').isLength({
      min: 6,
      max: 8,
    }),
    check('email', 'Ingrese un email valido.').isEmail(),
    check(
      'password',
      'Ingrese una contraseña con 6 o mas caracteres.'
    ).isLength({
      min: 6,
      max: 14,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, school, employee_No, email, password } = req.body;

    if (!email.endsWith('@ipn.mx')) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Solo se aceptan cuentas institucionales de profesor en este tipo de registro.',
          },
        ],
      });
    }

    try {
      let teacher = {
        email: await Teacher.findOne({ email }),
        name: await Teacher.findOne({ name }),
      };
      // Ver si el usuario ya existe en la plataforma

      if (teacher.email || teacher.name) {
        return res.status(400).json({
          errors: [{ msg: 'El usuario ya existe en la plataforma.' }],
        });
      }

      // Obtener el gravatar del usuario

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      teacher = new Teacher({
        name,
        type: 'teacherType',
        school,
        employee_No,
        email,
        password,
        avatar,
        verify: false,
      });

      // Encriptar la contraseña

      const salt = await bycrypt.genSalt(10);
      teacher.password = await bycrypt.hash(password, salt);
      teacher.employee_No = await bycrypt.hash(employee_No, salt);
      // OTRA FORMA DE HACERLO
      // user.password = await bycrypt.hash(password, 10);

      // Guardar usuario

      await teacher.save();

      // Darle un nuevo token al usuario

      const payload = {
        user: {
          id: teacher.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          mail(email, token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

module.exports = router;
