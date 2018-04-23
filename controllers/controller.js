exports.home = (req,res) => {
	console.log("connection made for home page");
	res.send("WWHS Pinboard!")
};

exports.newMessage = (req,res) => {
	console.log(req.body);
	res.send("<Response><Message>Thanks for contributing to the pinboard!</Message></Response>");
};

exports.tester = (req,res) => {
	console.log("connection made for tester");
	res.send("Test Successful!");
};
