const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MediaSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  downloadLink: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  accessRights: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  hashtag: {
    type: String
  },
  size: {
    type: String
  },
  dateUpload: {
    type: Date
  },
  location: {
    type: String
  }
});

module.exports = MediaFile = mongoose.model('mediaFile', MediaSchema);
