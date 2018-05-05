var express = require('express'),
	app = express(),
	port = process.env.PORT || 3001;
var routes = require("./routes/routehandler");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

routes(app)
app.listen(port);
console.log("wwhs-pinboard started on port: " + port);
