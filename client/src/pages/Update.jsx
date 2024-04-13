import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "../style.scss";
const Update = () => {
	const [book, setBook] = useState({
		title: "",
		desc: "",
		price: null,
		cover: "",
	});
	const [error, setError] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const bookId = location.pathname.split("/")[2];
	const handleChange = (e) => {
		setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
	};

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			await axios.put(`http://localhost:5000/books/${bookId}`, book);
			navigate("/");
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};
	// let res = {data: {title: "", desc: "", price: null, cover: ""}};
	useEffect(() => {
		const getBook = async () => {
			try {
				const res = await axios.get(`http://localhost:5000/books/${bookId}`);
				setBook(res.data[0]);
				console.log(book);
				// navigate(`/update/${bookId}`);
			} catch (err) {
				console.log(err);
				setError(true);
			}
		};
		getBook();
	}, []);

	return (
		<div className="form">
			<h1>Update the Book </h1>
			<input
				type="text"
				placeholder="Book title"
				value={book.title}
				name="title"
				onChange={handleChange}
				className="wide"
			/>
			<textarea
				rows={5}
				type="text"
				placeholder="Book desc"
				value={book.desc}
				name="desc"
				onChange={handleChange}
			/>
			<input
				type="number"
				placeholder="Book price"
				name="price"
				value={book.price}
				onChange={handleChange}
			/>
			<input
				type="text"
				placeholder="Book cover"
				name="cover"
				value={book.cover}
				onChange={handleChange}
			/>
			<button onClick={handleClick}>Update</button>
			{error && "Something went wrong!"}
			<Link to="/">See all books</Link>
		</div>
	);
};

export default Update;
