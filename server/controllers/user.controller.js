const User = require('../models/user.model');

exports.user_create = (req, res, next) => {
	let newUser = new User (
		{
			email: req.body.email,
			password: req.body.password,
			role: req.body.role,
		}
	);
	
	User.find({ email: req.body.email }, (err, user) => {
		const [singleUser] = user;
		if (!singleUser) {
			newUser.save((err) => {
				if (err) {
					res.send({success: false})
					return next(err);
				}
				res.send({
					user: newUser,
					success: true,
				});
			})
		} else {
			res.send({success: false});
		}
		if (err) return next(err);
	})
};

exports.user_login = (req, res) => {
	User.find({
		email: req.body.email,
		password: req.body.password,
	}, (err, user) => {
		const [singleUser] = user;
		if (err) return next(err);
		res.send({
			success: !!singleUser,
			user: singleUser,
		});
	});
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
		res.send({
			success: true,
			id: req.params.id,
		});
	})
};

exports.user_check_email_avail = (req, res) => {
	User.find({ email: req.body.email }, (err, user) => {
		const [singleUser] = user;
		if (err) return next(err);
		res.send(!singleUser);
	})
};
