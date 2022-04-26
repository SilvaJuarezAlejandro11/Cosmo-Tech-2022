const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
  },
  title: {
    type: String,
    require: true,
  },
  languajes: {
    type: [String],
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
  },
  steps: {
    type: [String],
  },
  group: {
    type: String,
  },
  school: {
    type: String,
  },
  career: {
    type: String,
  },
  topic: {
    type: String,
  },
  delimitation: {
    type: String,
  },
  summary: {
    type: String,
  },
  introduction: {
    type: String,
  },
  objetiveGeneral: {
    type: [String],
  },
  objetiveParticular: {
    type: [String],
  },

  justification: {
    type: String,
  },
  theoretical: {
    type: String,
  },

  feasibilityFinancial: {
    type: String,
  },
  feasibilityTechnique: {
    type: String,
  },

  impactTechnology: {
    type: String,
  },
  impactSocial: {
    type: String,
  },
  impactSustainable: {
    type: String,
  },

  degreeInnovation: {
    type: String,
  },
  results: {
    type: [String],
  },
  innovation: {
    type: String,
  },
  sustainability: {
    type: String,
  },
  functionality: {
    type: String,
  },
  feasibility: {
    type: String,
  },
  conclusion: {
    type: String,
  },
  bibliography: {
    type: [String],
  },
  activity: [
    {
      title: {
        type: String,
      },
      jan: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      feb: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      marh: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      april: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      may: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      jun: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      jul: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      ago: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      sep: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      oct: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      nov: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
      dec: {
        week1: { type: Boolean },
        week2: { type: Boolean },
        week3: { type: Boolean },
        week4: { type: Boolean },
      },
    },
  ],
  file: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Project = mongoose.model('project', ProjectSchema);
