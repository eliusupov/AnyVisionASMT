const User = require('../models/user.model');

exports.user_create = (req, res) => {
	let user = new User (
		{
			userName: req.body.userName,
			password: req.body.password,
		}
	);
	
	user.save((err) => {
		if (err) return next(err);
		res.send('User Created successfully')
	})
};

exports.user_get_all = (req, res) => {
	User.find((err, users) => {
		if (err) {
			res.send({
				success: false,
				err,
			});
			return next(err);
		}
		res.send({
			success: true,
			users,
		});
	})
};

exports.user_delete_single = (req, res) => {
	User.findOneAndDelete(req.params.id, (err) => {
		if (err) return next(err);
		res.send('Deleted successfully!');
	})
};
