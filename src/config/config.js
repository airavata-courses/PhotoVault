//const AUTH_URL = 'http://149.165.157.198:30002';//vro -node
const AUTH_URL = '/loginBackend'; //vro -node
const SEARCH_URL = '/loginBackend'; //mut -node
const EXPLORE_URL = '/exploreBackend'; //mut - java
const UPLOAD_URL = '/loginBackend'; //mut - node
const PICTURE_DET_URL = '/uploadBackend'; //python
module.exports = {
  search: SEARCH_URL,
  upload: UPLOAD_URL,
  explore: EXPLORE_URL,
  details: PICTURE_DET_URL,
  auth: AUTH_URL
};
