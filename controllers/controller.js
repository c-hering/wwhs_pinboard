var sqlite3 = require('sqlite3').verbose()
const uuidGen = require('uuid/v4')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var db = new sqlite3.Database('./serverdb.db')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );

exports.home = (req,res) => {
	console.log("There must be some mistake!");
	res.send("WWHS Pinboard!")
};

exports.deleteMessages = (req,res) => {
	// db.run('DELETE FROM messages')
	db.run('DROP TABLE messages')
	db.run('VACUUM')
	res.send('messages deleted')
};

exports.getMessages = (req,res) => {
	var offset = parseInt(req.params.page) * 50
	if(req.params.order === 'time'){
		var data = [];
		db.run('CREATE TABLE IF NOT EXISTS messages (ID PRIMARY KEY,TIMESTAMP TEXT NOT NULL,RATING INT NOT NULL,MSG TEXT NOT NULL);')
		db.each('SELECT id, rating, msg FROM messages ORDER BY datetime(TIMESTAMP) DESC LIMIT 50 OFFSET ' + offset, (err,row) => {
			let tmp = {"id" : row.id, "rating" : row.rating, "msg" : row.msg}
			data.push(row);
		}, () => {
			res.json(data);
		});
	}else if(req.params.order == 'rating'){
		var data = [];
		db.run('CREATE TABLE IF NOT EXISTS messages (ID PRIMARY KEY,TIMESTAMP TEXT NOT NULL,RATING INT NOT NULL,MSG TEXT NOT NULL);')
		db.each('SELECT id, rating, msg FROM messages ORDER BY rating DESC LIMIT 50 OFFSET ' + offset, (err,row) => {
			let tmp = {"id" : row.id, "rating" : row.rating, "msg" : row.msg}
			data.push(row);
		}, () => {
			res.json(data);
		});
	}else{
		res.send('invalid parameter')
	}
};

exports.getMessagesLen = (req,res) => {
	db.each("SELECT count(*) FROM messages;", (err,len) => {
		let tmp = JSON.stringify(len).split(':');
		tmp = tmp[1].split('}');
		res.send(tmp[0]);
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

exports.testSMS = (req,res) => {
	console.log(req.body);
	console.log(req.body.Body);
	const twiml = new MessagingResponse();
	twiml.message('Test Success!');
	res.writeHead(200, {'Content-Type':'text/xml'});
	res.end(twiml.toString());
};

exports.newMessage = (req,res) => {
	db.run('CREATE TABLE IF NOT EXISTS messages (ID PRIMARY KEY,TIMESTAMP TEXT NOT NULL,RATING INT NOT NULL,MSG TEXT NOT NULL);')
	// console.log(req.body)
	log.info(req.body);
	if(req.body !== {}){
		var id = uuidGen();
		var message = req.body.Body;
		message = message.replace(/'/g,"''");
		db.serialize(() => {
			db.run("INSERT INTO messages (ID,TIMESTAMP,RATING,MSG) \ VALUES (" + "'" + id + "'" + "," + "datetime('now','localtime'),0,'" + message + "')")
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
						db.run("UPDATE messages SET rating=rating+1 WHERE id=" + "'" + id + "'")
					})
					res.send("Rating incremented up")
					break
				case "down":
					db.serialize(() => {
						db.run("UPDATE messages SET rating=rating-1 WHERE id=" + "'" + id + "'")
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
