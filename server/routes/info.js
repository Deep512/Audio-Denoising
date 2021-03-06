var express = require("express");
var router = express.Router();
const Users = require("../models/user");

router.get("/:uid", async function (req, res) {
	try {
		const user = await Users.findOne({username: req.params.uid});
		res.status(200).send(user.toObject());
	} catch (error) {
		res.status(404).send("Could not fetch user");
	}
	// console.log("C'mon", user);
	// if (!req.isAuthenticated()) {
	// 	console.log((r = "req not authenticated! (from info.js)"));
	// 	res.status(401).send("You shall not pass (from info.js)");
	// 	return;
	// }
	// Users.findById(
	// 	req.user._id,
	// 	{ password: false, _id: false, __v: false, salt: false },
	// 	(err, usr) => {
	// 		if (err || !usr) {
	// 			res.status(404).send("Could not fetch user");
	// 			return;
	// 		}
	// 		res.status(200).send(usr.toObject());
	// 		console.log("Request aythenticated from info.js");
	// 		return;
	// 	}
	// );
});

module.exports = router;
