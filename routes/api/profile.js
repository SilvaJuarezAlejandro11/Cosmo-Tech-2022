const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
const ProfileStudent = require('../../models/ProfileStudent');
const Student = require('../../models/Student');
const ProfileTeacher = require('../../models/ProfileTeacher');
const Teacher = require('../../models/Teacher');

//? ------ USUARIOS ----------

// * @route POST api/profile
// * @desc Create or update user profile
// * @access Private

//? Datos: fullname, status, gihubusername, skills, bio

router.post(
  '/',
  [
    auth,
    [
      check('fullname', 'Se requiere nombre o nombre completo').not().isEmpty(),
      check('status', 'Se requiere estatus').not().isEmpty(),
      check('skills', 'Se requiere habilidades').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, status, githubusername, skills, bio } = req.body;

    //? Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (fullname) profileFields.fullname = fullname;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (bio) profileFields.bio = bio;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //? Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //? Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

//? ------ ESTUDIANTES ----------

//? Datos: fullname, status, gihubusername, skills, bio

// * @route POST api/profile/student
// * @desc Create or update user profile
// * @access Private

router.post(
  '/student',
  [
    auth,
    [
      check('fullname', 'Se requiere nombre o nombre completo').not().isEmpty(),
      check('status', 'Se requiere estatus').not().isEmpty(),
      check('skills', 'Se requiere habilidades').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, status, githubusername, skills, bio } = req.body;

    //? Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (fullname) profileFields.fullname = fullname;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (bio) profileFields.bio = bio;

    try {
      let profileStudent = await ProfileStudent.findOne({ user: req.user.id });

      if (profileStudent) {
        //? Update
        profileStudent = await ProfileStudent.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profileStudent);
      }

      //? Create
      profileStudent = new ProfileStudent(profileFields);

      await profileStudent.save();
      res.json(profileStudent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

// * @route    PUT api/profile/student/education
// * @desc     Add profile education
//*  @access   Private

router.put(
  '/student/education',
  [
    auth,
    [
      check('school', 'Se necesita nombre de la escuela').not().isEmpty(),
      check('degree', 'Se necesita grado escolar').not().isEmpty(),
      check('fieldofstudy', 'Se necesita campo de estudio').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await ProfileStudent.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//* @route   DELETE api/profile/student/education/:edu_id
//* @desc    Delete education from profile
//* @access  Private

router.delete('/student/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await ProfileStudent.findOne({ user: req.user.id });
    // Get remove index

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//? ------ MAESTROS ----------

// * @route POST api/profile/teacher
// * @desc Create or update user profile
// * @access Private

router.post(
  '/teacher',
  [
    auth,
    [
      check('fullname', 'Se requiere nombre o nombre completo').not().isEmpty(),
      check('status', 'Se requiere estatus').not().isEmpty(),
      check('skills', 'Se requiere habilidades').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, status, githubusername, skills, bio } = req.body;

    //? Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (fullname) profileFields.fullname = fullname;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (bio) profileFields.bio = bio;

    try {
      let profileTeacher = await ProfileTeacher.findOne({ user: req.user.id });

      if (profileTeacher) {
        //? Update
        profileTeacher = await ProfileTeacher.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profileTeacher);
      }

      //? Create
      profileTeacher = new ProfileTeacher(profileFields);

      await profileTeacher.save();
      res.json(profileTeacher);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor.');
    }
  }
);

// * @route    PUT api/profile/teacher/education
// * @desc     Add profile education
//*  @access   Private

router.put(
  '/teacher/education',
  [
    auth,
    [
      check('school', 'Se necesita nombre de la escuela').not().isEmpty(),
      check('degree', 'Se necesita grado escolar').not().isEmpty(),
      check('fieldofstudy', 'Se necesita campo de estudio').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await ProfileTeacher.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//* @route   DELETE api/profile/teacher/education/:edu_id
//* @desc    Delete education from profile
//* @access  Private

router.delete('/teacher/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await ProfileTeacher.findOne({ user: req.user.id });
    // Get remove index

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// * @route    PUT api/profile/teacher/experience
// * @desc     Add profile experience
//*  @access   Private

router.put(
  '/teacher/experience',
  [
    auth,
    [
      check('title', 'Se necesita titulo').not().isEmpty(),
      check('company', 'Se necesita compania').not().isEmpty(),
      check('from', 'Se necesita fecha de inicio').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await ProfileTeacher.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//* @route   DELETE api/profile/teacher/experience/:exp_id
//* @desc    Delete experience from profile
//* @access  Private

router.delete('/teacher/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await ProfileTeacher.findOne({ user: req.user.id });
    // Get remove index

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//? ------ GENERAL ----------

// * @route GET api/profile/me
// * @desc Get my own profile
// * @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'avatar'
    );

    const studentProfile = await ProfileStudent.findOne({
      user: req.user.id,
    }).populate('user', 'avatar');

    const teacherProfile = await ProfileTeacher.findOne({
      user: req.user.id,
    }).populate('user', 'avatar');

    const profile = userProfile || studentProfile || teacherProfile;

    if (!profile) {
      return res.status(400).json({ msg: 'No hay perfil para este usuario' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// * @route GET api/profile
// * @desc Get all profiles
// * @access Public

router.get('/', async (req, res) => {
  try {
    const usersProfiles = await Profile.find().populate('user', [
      'name',
      'avatar',
    ]);

    const studentsProfiles = await ProfileStudent.find().populate('user', [
      'name',
      'avatar',
    ]);

    const teacherProfiles = await ProfileTeacher.find().populate('user', [
      'name',
      'avatar',
    ]);

    const profiles = {
      teacherProfiles,
      studentsProfiles,
      usersProfiles,
    };

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor.');
  }
});

// * @route GET api/profile/user/:user_id
// * @desc Get profile by user ID
// * @access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const userProfile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    const studentProfile = await ProfileStudent.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    const teacherProfile = await ProfileTeacher.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    const profile = userProfile || studentProfile || teacherProfile;

    if (!profile)
      return res.status(400).json({
        msg: 'No se encontro ningun perfil',
      });

    res.json(profile);
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

// * @route GET api/profile/github/:username
// * @desc Get user repos from Github
// * @access Public

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res
          .status(404)
          .json({ msg: 'No se encontro ningun perfil de github' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//* @route DELETE api/profile/
//* @desc Delete profile, user
//* @access Private

router.delete('/', auth, async (req, res) => {
  try {
    //? Remove profile
    const userProfile = await Profile.findOneAndRemove({ user: req.user.id });

    const studentProfile = await ProfileStudent.findOneAndRemove({
      user: req.user.id,
    });

    const teacherProfile = await ProfileTeacher.findOneAndRemove({
      user: req.user.id,
    });

    //? Remove user
    const user = await User.findOneAndRemove({ _id: req.user.id });

    const student = await Student.findOneAndRemove({ _id: req.user.id });

    const teacher = await Teacher.findOneAndRemove({ _id: req.user.id });

    const profile = userProfile || studentProfile || teacherProfile;

    const profileProperty = user || student || teacher;

    if (profile && profileProperty) {
      res.json({ msg: 'Usuario borrado' });
    } else {
      res.json({ msg: 'Error' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor.');
  }
});

module.exports = router;
