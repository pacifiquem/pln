const mongoose = require("mongoose");

const dbConnection = () => {
	const conn = mongoose.connect("mongodb+srv://testing-stuffs:testing-stuffs@testing-stuffs.mefjqrq.mongodb.net/pln");

	if (!conn) {
		console.log("database connection interupted");
		process.exit(1);
	}

    console.log("database connection successful");
};

module.exports = dbConnection;
