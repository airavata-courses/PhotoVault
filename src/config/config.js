const AUTH_URL = 'http://149.165.157.198:30002';//vro -node 
const SEARCH_URL = 'http://149.165.157.198:30002';//mut -node
const EXPLORE_URL = 'http://149.165.157:198:30003';//mut - java
const UPLOAD_URL = 'http://149.165.157.198:30002';//mut - node
const PICTURE_DET_URL = 'http://149.165.157.198:30004'; //python
module.exports = {
  search: SEARCH_URL,
  upload: UPLOAD_URL,
  explore: EXPLORE_URL,
  details: PICTURE_DET_URL,
  auth: AUTH_URL
};
