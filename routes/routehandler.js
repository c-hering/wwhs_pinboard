module.exports = app => {
	var controller = require("../controllers/controller");

	app.route('/').get(controller.home);
	app.route('/test').get(controller.tester);

	app.route('/messages').post(controller.newMessage);
};
