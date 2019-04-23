const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  imagePath: {
    type: String,
    required: true
  },
  friends: {
    type: String
  },
  currentJob: {
    type: String
  },
  currentOrganisation: {
    type: String
  },
  headLiner: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  domain: {
    type: String
  },
  followers: {
    type: Number
  },
  education: [
    {
      institutionName: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      startYear: {
        type: Number,
        required: true
      },
      endYear: {
        type: String,
        required: true
      },
      societyAndActivities: {
        type: String
      }
    }
  ],
  skills: {
    type: [String],
    required: true
  },
  workExperience: [
    {
      companyName: {
        type: String
      },
      location: {
        type: String
      },
      startYear: {
        type: Number
      },
      endYear: {
        type: String
      },
      designation: {
        type: String
      },
      jobDetails: {
        type: String
      }
    }
  ],
  certification: [
    {
      name: {
        type: String
      },
      description: {
        type: String
      },
      institutionName: {
        type: String
      },
      issueYear: {
        type: Number
      },
      expiryDate: {
        type: Number
      }
    }
  ],
  post: [
    {
      title: {
        type: String
      },
      content: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model("userProfile", UserProfileSchema);
