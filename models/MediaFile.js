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
    src: {
      type: String
    },
    filePath: {
      type: String
    },
    accessRights: {
      type: String
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
    thumbnail: {
      type: String
    },
    thumbnailWidth: {
      type: String
    },
    thumbnailHeight: {
      type: String
    },
  },
  { collection: "photovault_photomedia" }
);

module.exports = MediaFile = mongoose.model(
  "photovault_photomedia",
  Photovault_photomedia
);
