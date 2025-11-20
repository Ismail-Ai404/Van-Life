/** @format */
require("dotenv").config(); // <-- REQUIRED to load SECRET

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();
const port = 3000;
// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method"));

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/vanlife";
// mongoose.connect(dbURL);
// const dbUrl = ;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const MongoStore = require("connect-mongo");
const secret = process.env.SECRET || "this_is_a_fallback_secret";
const store = MongoStore.create({
	mongoUrl: dbUrl,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret,
	},
});

const sessionConfig = {
	store,
	name: "j928hd9wq8h2", // Avoid default name

	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
		maxAge: 1000 * 60 * 60 * 24 * 7, // one week
	},
};

app.use(session(sessionConfig));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
