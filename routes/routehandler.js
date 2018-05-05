module.exports = app => {
	var controller = require("../controllers/controller");

	app.route('/').get(controller.home);
	app.route('/messages/:order/:page').get(controller.getMessages);
	// app.route('/rating').get(controller.getRating);
	//app.route('/deleteMessages').get(controller.deleteMessages);

	app.route('/messages').post(controller.newMessage);
	app.route('/rating').post(controller.handleRating);
};
