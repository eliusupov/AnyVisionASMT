const User = require('../models/UserModel');

exports.userCreate = async (req, res, next) => {
	const { email, password, role } = req.body;
	const newUser = new User (
		{
			email,
			password,
			role,
		}
	);
	try {
		const user = await User.findOne({ email });
		if (!user) {
			newUser.save((err) => {
				res.send({
					user: newUser,
					success: true,
				});
			})
		} else {
			res.send({success: false});
		}
	} catch (err) {
		return next(err);
	}
};

exports.userLogin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email, password });
		res.send({
			success: !!user,
			user,
		});
	} catch (err) {
		return next(err);
	}
};

exports.userGetAll = async (req, res, next) => {
	try {
		const users = await User.find();
		res.send({
			success: true,
			users,
		});
	} catch (err) {
		res.send({success: false});
		return next(err);
	}
};

exports.userDeleteSingle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findOneAndDelete({ _id: id });
		if (user) {
			res.send({
				success: true,
				id: user._id,
			});
		} else {
			res.send({success: false});
		}
	} catch (err) {
		return next(err);
	}
};

exports.userCheckEmailAvail = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		res.send(!user);
	} catch (err) {
		return next(err);
	}
};
