var express = require('express'),
	app = express(),
	port = process.env.PORT || 3001;
var routes = require("./routes/routehandler");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app)
app.listen(port);
console.log("wwhs-pinboard started on port: " + port);
