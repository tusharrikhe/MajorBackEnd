const mongoose = require("mongoose");
const OrgProfileSchema = new mongoose.Schema({
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "org"
  },
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobPost: [
    {
      title: {
        type: String
      },
      place: {
        type: String
      }
    }
  ],
  followers: {
    type: [String]
  },
  about: {
    type: String
  },

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
module.exports = mongoose.model("orgProfile", OrgProfileSchema);
