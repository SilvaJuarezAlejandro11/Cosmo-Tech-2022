const mongoose = require('mongoose');
const shortid = require('shortid');

const ProjectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
  },
  share_ID: {
    type: String,
    default: shortid.generate,
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
  file: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  refSelfData: [
    {
      TaskID: {
        type: Number,
      },
      TaskName: {
        type: String,
      },
      StartDate: {
        type: Date,
      },
      EndDate: {
        type: Date,
      },
      Duration: {
        type: Number,
      },
      Progress: {
        type: Number,
      },
      ParentId: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Project = mongoose.model('project', ProjectSchema);
