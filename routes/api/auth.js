const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const { check, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');

const mail = (email, id) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'batiz.lab.spankybot@gmail.com',
      pass: 'Elgato66',
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

// @Ruta GET api/auth
// @Descripción Obtener el usuario(en general) a travez del token
// @acceso Privada

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const student = await Student.findById(req.user.id).select('-password');
    const teacher = await Teacher.findById(req.user.id).select('-password');
    res.json(user || student || teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor.');
  }
});

// @Ruta POST api/auth
// @Descripción Iniciar sesión
// @acceso Publica

router.post(
  '/',
  [
    check('email', 'Ingrese un email valido').isEmail(),
    check('password', 'Se requiere una contraseña').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let student = await Student.findOne({ email });
      let teacher = await Teacher.findOne({ email });
      let general = user || student || teacher;
      // Ver si el usuario existe en la base de datos
      if (!general) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciales invalidas.' }] });
      }

      const isMatch = await bycrypt.compare(password, general.password);

      // Verificar contraseñas

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciales invalidas.' }] });
      }

      // Darle un nuevo token al usuario

      const payload = {
        user: {
          id: general.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          if (!general.verify) {
            mail(email, token);
          }
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
