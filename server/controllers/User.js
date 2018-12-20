const User = require('../models/UserModel');

exports.userCreate = (req, res, next) => {
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

exports.userLogin = (req, res) => {
	User.findOne({
		email: req.body.email,
		password: req.body.password,
	}, (err, user) => {
		if (err) return next(err);
		res.send({
			success: !!user,
			user,
		});
	});
};

exports.userGetAll = (req, res) => {
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

exports.userDeleteSingle = (req, res) => {
	User.findOneAndDelete({
		_id: req.params.id
	}, (err, user) => {
		if (err) return next(err);
		if (user) {
			res.send({
				success: true,
				id: user._id,
			});
		} else {
			res.send({success: false});
		}
	})
};

exports.userCheckEmailAvail = (req, res) => {
	User.find({ email: req.body.email }, (err, user) => {
		const [singleUser] = user;
		if (err) return next(err);
		res.send(!singleUser);
	})
};
