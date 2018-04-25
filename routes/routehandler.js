module.exports = app => {
	var controller = require("../controllers/controller");

	app.route('/').get(controller.home);
	app.route('/messages').get(controller.getMessages);
	// app.route('/rating').get(controller.getRating);

	app.route('/messages').post(controller.newMessage);
};
