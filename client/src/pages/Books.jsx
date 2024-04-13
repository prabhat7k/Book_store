import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./books.css";
import "./price.scss";
import BookItem from "./BookItem";
// this is book
const Books = () => {
	const [books, setBooks] = useState([]);

	const handleGenerate = async () => {
		try {
			await axios.get("http://localhost:5000/sample");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	const handleRandom = async () => {
		try {
			await axios.get("http://localhost:5000/random");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const fetchAllBooks = async () => {
			try {
				const res = await axios.get("http://localhost:5000/books");
				setBooks(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAllBooks();
	}, []);

	console.log(books);

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="/" style={{fontStyle: "oblique"}}>
					Book Store
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<button className="addHome nav-btn">
								<Link to="/add" style={{color: "inherit", textDecoration: "none"}}>
									Add a new book
								</Link>
							</button>
						</li>
						<li className="nav-item">
							<button
								className="addHome nav-btn"
								onClick={() => handleRandom()}
								style={{cursor: "pointer"}}
							>
								Random
							</button>
						</li>
						<li className="nav-item">
							<button
								className="addHome nav-btn"
								onClick={() => handleGenerate()}
								disabled={books.length === 0 ? false : true}
							>
								Add Sample.
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<div className="row" style={{padding: "2rem"}}>
				{books.map((book) => (
					<BookItem book={book} key={book.id} />
				))}
			</div>
		</div>
	);
};

export default Books;
