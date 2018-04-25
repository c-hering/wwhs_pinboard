var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./serverdb.db')

exports.home = (req,res) => {
	console.log("There must be some mistake!");
	res.send("WWHS Pinboard!")
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

// useless routing, kept for example?
// exports.getRating = (req,res) => {
// 	let id = parseInt(req.query.id)
// 	if(!isNaN()){
// 		db.run('CREATE TABLE IF NOT EXISTS messages (ID INT PRIMARY KEY NOT NULL,RATING INT NOT NULL,MSG TEST NOT NULL);')
// 		db.each('SELECT rating FROM messages WHERE id='+req.query.id, (err,row) => {
// 			res.send(row.rating)
// 		})
// 	}else{
// 		res.send("invalid query parameter")
// 	}
// };

exports.newMessage = (req,res) => {
	if(req.body !== {}){
		var id = req.body.id;
		var rating = req.body.rating;
		var message = req.body.msg;

		db.serialize(() => {
			db.run("INSERT INTO messages (ID,RATING,MSG) \ VALUES (" + id + "," + rating + "," + message + ")")
		})
		res.send("Message Added!")
	}else{
		console.log("ERR: empty body in post req")
		res.send("Invalid Body")
	}
	// for twilio only
	// res.send("<Response><Message>Thanks for contributing to the pinboard!</Message></Response>");
};

exports.handleRating = (req,res) => {
	if(req.body !== {}){
		var id = req.body.id
		var voteType = req.body.vote
		if(id !== null && voteType !== null){
			switch(voteType){
				case "up":
					db.serialize(() => {
						db.run("UPDATE messages SET rating=rating+1 WHERE id=" + id)
					})
					res.send("Rating incremented up")
					break
				case "down":
					db.serialize(() => {
						db.run("UPDATE messages SET rating=rating-1 WHERE id=" + id)
					})
					res.send("Rating incremented down")
			}
		}else{
			res.send("Invalid Body Params")
		}
	}else{
		res.send("Invalid Body")
	}
};
