import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./books.css";
import "./price.scss";
// this is book
const BookItem = (props) => {
	const [showMore, setShowMore] = useState(false);

	const handleToggleShowMore = () => {
		setShowMore(!showMore);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/books/${id}`);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div key={props.book.id} className="col-md-3" style={{width: "18rem"}}>
			<div className="card mb-4" style={{alignItems: "center"}}>
				{/* <div
								style={{
									position: "relative",
									height: "40vh",
								}}
							> */}
				<img
					className=""
					src={props.book.cover}
					alt={props.book.title}
					style={{
						height: "50vh",
						aspectRatio: "3 / 4",
						borderTopLeftRadius: "calc(.25rem - 1px)",
						borderTopRightRadius: "calc(.25rem - 1px)",
					}}
				/>
				<span className="price-tag">
					<span> ₹{props.book.price}</span>
				</span>
				{/* </div> */}

				<div className="card-body">
					<h5 className="card-title" style={{fontSize: "1rem", fontStyle: "oblique"}}>
						{props.book.title}
					</h5>
					<p className="card-text" style={{width: "100%", fontSize: ".8rem"}}>
						{showMore
							? props.book.desc
							: props.book.desc.length > 60
							? props.book.desc.slice(0, 60) + "..."
							: props.book.desc}
						{"  "}
						{props.book.desc.length > 60 && (
							<span
								onClick={handleToggleShowMore}
								style={{color: "blue", cursor: "pointer", fontSize: ".8rem"}}
							>
								{showMore ? "(see less)" : "(see more)"}
							</span>
						)}
					</p>

					{/* <span
									class="badge badge-info"
									style={{
										fontSize: "1.2rem",
									}}
								>
									{props.book.price}
								</span> */}

					<button
						className="btn btn-sm btn-danger"
						onClick={() => handleDelete(props.book.id)}
					>
						Delete
					</button>
					<button className="btn btn-sm btn-primary">
						<Link
							to={`/update/${props.book.id}`}
							style={{color: "inherit", textDecoration: "none"}}
						>
							Update
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookItem;
