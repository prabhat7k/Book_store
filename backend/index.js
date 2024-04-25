import express from "express";
import mysql from "mysql2";
import cors from "cors";
import booksData from "./content.js";
// var isbn = require("node-isbn");
import isbn from "node-isbn";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
	host: "mysql-db",
	user: "root",
	password: "1212",
	database: "library",
});

// Listen for the 'acquire' event
pool.on("acquire", (connection) => {
	console.log("Connection %d acquired", connection.threadId);

	// Check if the connection is connected
	console.log(
		"Is connected:",
		connection._socket && connection._socket.readable && connection._socket.writable
	);
});

// Test the pool by acquiring a connection
pool.getConnection((err, connection) => {
	if (err) {
		console.error("Error acquiring connection:", err);
		return;
	}

	console.log("Connection %d was acquired successfully", connection.threadId);

	// Release the connection back to the pool when done
	connection.release();
});

db.query(
	`CREATE TABLE IF NOT EXISTS library.books(id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,\`desc\` TEXT NOT NULL,price INT NOT NULL,cover VARCHAR(255))`,
	(err, results) => {
		if (err) {
			console.error("Error creating books table:", err);
			return;
		}
		console.log("Books table created successfully");
	}
);
app.get("/", (req, res) => {
	res.json("server running");
});

app.get("/books", (req, res) => {
	const q = "SELECT * FROM books";
	db.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

app.get("/sample", (req, res) => {
	const insertQuery = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
	booksData.forEach((element) => {
		db.query(insertQuery, [element], (err, data) => {
			if (err) return res.json(err);
			else console.log(data);
		});
		// console.log([element]);
	});
	return res.json("OK");
});
app.get("/random", (req, res) => {
	const isbnCodes = [
		"0553588486", // A Game of Thrones
		"0590353403", // Harry Potter and the Philosopher's Stone
		"0446310786", // To Kill a Mockingbird
		"0451524934", // 1984
		"0743273567", // The Great Gatsby
		"0679783261", // Pride and Prejudice
		"0316769487", // The Catcher in the Rye
		"0618260307", // The Hobbit
		"0307474275", // The Da Vinci Code
		"0618640150", // The Lord of the Rings
		"0439023483", // The Hunger Games
		"0316769487", // The Catcher in the Rye
		"0064471101", // The Chronicles of Narnia
		"0345391802", // The Hitchhiker's Guide to the Galaxy
		"014242417X", // The Fault in Our Stars
		"0061122416", // The Alchemist
		"0399501487", // Lord of the Flies
		"159463193X", // The Kite Runner
		"0446675539", // Gone with the Wind
		"0061148512", // The Bell Jar
	];

	const randomIndex = Math.floor(Math.random() * isbnCodes.length);

	isbn.resolve(isbnCodes[randomIndex], function (err, book) {
		if (err) {
			return res.json(err);
		}

		const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
		const values = [
			book.title,
			book.description,
			Math.floor(Math.random() * 101 + 100),
			book.imageLinks.thumbnail,
		];
		db.query(q, [values], (err, data) => {
			if (err) return res.send(err);
			return res.json(data);
		});
	});
});

app.post("/books", (req, res) => {
	const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

	const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

	db.query(q, [values], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

app.delete("/books/:id", (req, res) => {
	const bookId = req.params.id;
	const q = " DELETE FROM books WHERE id = ? ";

	db.query(q, [bookId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});
app.get("/books/:id", (req, res) => {
	const bookId = req.params.id;
	const q = " SELECT * FROM books WHERE id = ? ";
	db.query(q, [bookId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});
app.put("/books/:id", (req, res) => {
	const bookId = req.params.id;
	const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

	const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

	db.query(q, [...values, bookId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

app.listen(5000, () => {
	console.log("Connected to backend");
});
