const mongoose = require("mongoose");

const dbConnection = () => {
	const conn = mongoose.connect("mongodb://localhost:27017/pickuplines");

	if (!conn) {
		console.log("database connection interupted");
		process.exit(1);
	}

    console.log("database connection successful");
};

module.exports = dbConnection;