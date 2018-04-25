var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./serverdb.db')

exports.home = (req,res) => {
	console.log("There must be some mistake!");
	res.send("WWHS Pinboard!")
};

exports.newMessage = (req,res) => {
	console.log(req.body);

	if(req.body !== {}){
		var id = req.body.id;
		var rating = req.body.rating;
		var message = req.body.msg;

		console.log(id)

		db.serialize(() => {
			db.run("INSERT INTO messages (ID,RATING,MSG) \ VALUES (" + id + "," + rating + "," + message + ")")
		})
		res.send("Message Added!")
	}else{
		console.log("ERR: empty body in post req")
		res.send("Error adding message, seems you didn't send anything!")
	}
	// for twilio only
	// res.send("<Response><Message>Thanks for contributing to the pinboard!</Message></Response>");
};

exports.getMessages = (req,res) => {
	var data = [];

	db.run('CREATE TABLE IF NOT EXISTS messages (ID INT PRIMARY KEY NOT NULL,RATING INT NOT NULL,MSG TEST NOT NULL);')
	db.each('SELECT id, rating, msg FROM messages', (err,row) => {
		let tmp = {"id" : row.id, "rating" : row.rating, "msg" : row.msg}
		data.push(row);
	}, () => {
		res.send(data);
	});
};
