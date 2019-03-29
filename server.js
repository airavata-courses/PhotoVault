const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const search = require("./routes/api/fileOps");
const uploadImg = require("./routes/api/uploadImg");
const apiGateway = require("./routes/api/apiGateway");
const passport = require("passport");
const url = require("url");
const cors = require("cors");
const http = require("http");
var consul = require("consul")();

//DB connection
const db = require("./config/keys").mongoURI;

//Connect to DB
mongoose
  .connect(db)
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
//app.options('*', cors());
//app.use(cors({   'allowedHeaders': ['sessionId', 'Content-Type'],   'exposedHeaders': ['sessionId'],   'origin': '*',   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',   'preflightContinue': false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.post('/api/users/login', function(req, res) {
//	console.log(req.body);
//	axios.post('http://searchService.service.consul:5000/api/users/login', req.body)
//	.then((response) => {
//		res.json(response.data);
//	}).catch((error) => {
//		console.log("Error: " + error.respose.data)
//		res.status(error.response.status).send(error.response.data);
//	})
//})

//app.get('/api/fileOps/searchString', (req, res) => {
//	console.log(req.body);
//	axios.get('http://searchService.service.consul:5000/api/fileOps/searchString')
//	.then((response)=> {
//		res.json(response.data);
//	}).catch((error)=> {
//		console.log("Error: "+error.response.data)
//		res.status(error.response.status).send(error.response.data);
//	})
//})

app.post("/", (request, response) => {
	console.log("body = ", request.body);
	key = request.body.key;
	if (key === "login") {
		username = request.body.email;
		password = request.body.password;

		var options = {

			hostname: "http://149.165.156.42:5000",
			port: 5000,
			path: "/api/users/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		};

		var req = http.request(options, function(res) {
			console.log("Status: "+ res.statusCode);
			console.log("Headers: " + JSON.stringify(res.headers));
			res.setEncoding("utf8");
			res.on("data", function(body) {
				console.log("Body: " + body);
				response.end(body);
			});
		});

		req.on("error", function(e) {
			console.log("problem with request: " + e.message);
			    });

		//write data to request body
		var body = JSON.stringify({
			      email: username,
			      password: password
			    });

		req.end(body);
	
		  } else if (key === "register") {

			firstName = request.body.firstName;
			lastName = request.body.lastName;

			username = request.body.email;
			password = request.body.password;
			confirmPassword = request.body.confirmPassword; 

			  var options = {
				  hostname: "149.165.156.42:5000",
				port: 5000,
				path: "/api/users/register",
				method: "POST",
				headers: {
					"Content-Type": "application/json",

					}
				};

			  var req = http.request(options, function(res) {
				        console.log("Status: " + res.statusCode);
				        console.log("Headers: " + JSON.stringify(res.headers));
				        res.setEncoding("utf8");
				        res.on("data", function(body) {
						        console.log("Body: " + body);
						response.end(body);
						      });
				      });

			  req.on("error", function(e) {
				        console.log("problem with request: " + e.message);
				      });
			      // write data to request body
			       var body = JSON.stringify({
			             email: username,
			             password: password,
				     confirmPassword: confirmPassword,
				     firstName: firstName,
				     lastName: lastName
			      });
			      req.end(body);
			      
		  
		  } else if (key === "searchString") {
			  //searchString = request.body.searchString;
			  //userId = request.body.userId;
			  //console.log("searchString = " + searchString);
			  //console.log("userId = "+ userId);

			  var options = {
				hostname: "searchService.service.consul",
				port: 5000,
				  path: "/api/fileOps/searchString",
				  method: "POST",
				  headers: {
					  "Content-Type": "application/json",
					  "Authorization": request.body.Authorization
				  }
			  };
//				console.log("after header");
			  

			  var req = http.request(options, function(res) {
				  console.log("Status: " + res.statusCode);
				  console.log("Headers: " + JSON.stringify(res.headers));
			  	res.setEncoding("utf8");
				  res.on("data", function(body) {
					console.log("Body: " , body);
					  response.end(body);
				  });
			  });
				//console.log("Before error");
			  req.on("error", function(e) {
			  	
				  console.log("problem with req: " + e.message);
				
			  });
			  
			
			  //write data to req body
			  var body = JSON.stringify({
				  searchString: request.body.searchString,
				  userId: request.body.userId
			  });
			  console.log("After body = ", body);
			  req.end(body);
			  
		  }
	else if (key === "explore") {
			  isPublic = request.query.isPublic;
			  console.log("isPublic");
				
			  var options = {
				  hostname: "149.165.168.210",
				  port: 6060,
				  path: "/explore/true",
				  method: "GET",
				  headers: {
					"Content-Type": "application/json"
				  }
			  };

			  var req = http.request(options, function(res) {
			  	res.setEncoding("utf8");
				  res.on("data", function(body) {
					  response.end(body);
				  });
			  });

			  req.on("error", function(e) {
				  console.log("req error: "+ e);
			  });
			  //write data to req body
			  var body = JSON.stringify({
				  isPublic: isPublic
			  });
			  req.end(body);
		  } else if (key === "upload") {
			  URL = request.body.endpoint.URL;
			  caption = request.body.endpoint.caption; 
			  date = request.body.endpoint.date; 
			  location = request.body.endpoint.location;
			  userId = request.body.endpoint.userId;
			  isPublic = request.body.endpoint.isPublic;
			  //endpoint = request.body.endpoint;
			//console.log("location: ", request.body.endpoint);
			
			  var options = {
				  hostname: "uploadService.service.consul",
				  port: 8000,
				 path: "/upload/?URL="+URL+"&caption="+caption+"&location="+location+"&userId="+userId+"&isPublic="+isPublic, 
				  method: "GET",
				  headers: {

					  "Content-Type": "application/json"
				  }
			  };
			  console.log("path = ", options.path);
			  var req = http.request(options, function(res) {
				console.log("Status: " + res.statusCode);
				  console.log("Headers: " + JSON.stringify(res.headers));
				  res.setEncoding("utf8");
				  res.on("data", function(body) {
					  //console.log("Body: " + body);
					  response.end(body);
				  });
			  });

			req.on("error", function(e) {
				console.log("Problem with request: " + e.message);
			});

			//write data to req body
			  //console.log("Before stringify");
			//var body = JSON.stringify({
				//URL: URL,
				//caption: caption,
				//date: date,
				//location: location,
				//userId: userId,
				//isPublic: isPublic
			//	endpoint: request.body.endpoint
			//});
			  //console.log("Body = ", body);
			  req.end();
		  }
			});

app.get("/test", (req, res) => res.json({ msg: "hello" }));

//Use routes

const port = 5000;
// parse application/x-www-form-urlencoded

//Passport middleware
app.use(passport.initialize());

//passport COnfig
require("./config/passport")(passport);

// parse application/json
app.use(bodyParser.json());
// app.use(cors());
//app.use(cors({ origin: "http://149.165.157.198:30001" }));
//app.use(cors({ Origin: "149.165.157.198:30001"}));
//app.use(cors({ origin: '*' }));
//app.use(cors({ origin: 'null' }));
// app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
 //  res.header(
//     "Access-Control-Allow-Headers",
    // "Origin, X-Requested-With, Content-Type, Accept"
  // );
 //  next();
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use("/api/users", users);
app.use("/api/fileOps", search);
app.use("/api/uploadImg", uploadImg);
app.use("/api/apiGateway", apiGateway);

// Then use it before your routes are set up:
//CI/CD test 
module.exports = app;
console.log("testing");
/*let details = {
	name: 'searchService',
	address : '',
	check:{
		http : 'http://localhost:5000/test',			
		interval: '10s',
		deregistercriticalserviceafter:'1m'
	}
};
console.log(details);
consul.agent.service.register(details, function(err){
	if(err) throw err;
})*/
