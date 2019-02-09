const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const Photovault_photomedia = new Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String
    },
    fileName: {
      type: String
    },
    downloadLink: {
      type: String
    },
    filePath: {
      type: String
    },
    isPublic: {
      type: Boolean
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
    },
    fileType: {
      type: String
    },
    thumbnailLink: {
      type: String
    },
    thumbnailWidth: {
      type: String
    },
    thumbnailHeight: {
      type: String
    }
  },
  { collection: "photovault_photomedia" }
);

module.exports = MediaFile = mongoose.model(
  "photovault_photomedia",
  Photovault_photomedia
);
