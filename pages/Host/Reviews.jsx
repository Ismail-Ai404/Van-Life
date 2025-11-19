/** @format */

import React from "react";
import HalfRating from "../../components/HalfRating";
import RatingDistribution from "../../components/RatingDistribution";
import { BsStarFill } from "react-icons/bs";
import reviewsGraph from "../../assets/images/reviews-graph.png";

export default function Reviews() {
	// TODO ADD which car is being reviewed
	const reviewsData = [
		{
			rating: 5.0,
			name: "Alice",
			date: "March 15, 2023",
			text: "Absolutely perfect experience! The van was spotless and the host was super helpful.",
			id: "1",
		},
		{
			rating: 4.5,
			name: "Sandy",
			date: "December 12, 2022",
			text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
			id: "2",
		},
		{
			rating: 4.0,
			name: "Jake",
			date: "February 8, 2023",
			text: "Very comfortable trip, the van was clean and everything worked well. Would recommend!",
			id: "3",
		},
		{
			rating: 3.5,
			name: "Elliot",
			date: "January 3, 2023",
			text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue.",
			id: "4",
		},
		{
			rating: 3.0,
			name: "Nina",
			date: "April 20, 2023",
			text: "Good overall, but the air conditioning wasn’t very strong and it got a bit hot.",
			id: "5",
		},
		{
			rating: 2.5,
			name: "Tom",
			date: "May 1, 2023",
			text: "The van was okay, but we had some minor mechanical issues that delayed our trip.",
			id: "6",
		},
		{
			rating: 2.0,
			name: "Olivia",
			date: "March 30, 2023",
			text: "Not as clean as expected and the host was hard to reach at times.",
			id: "7",
		},
		{
			rating: 1.5,
			name: "Mark",
			date: "February 18, 2023",
			text: "Disappointed with the van’s condition. It had several scratches and smelled bad.",
			id: "8",
		},
		{
			rating: 1.0,
			name: "Sophia",
			date: "January 12, 2023",
			text: "Very poor experience. The van broke down halfway through and it ruined our trip.",
			id: "9",
		},
		{
			rating: 5.0,
			name: "James",
			date: "June 5, 2023",
			text: "Best van rental I’ve ever had! Smooth ride and very reliable.",
			id: "10",
		},
		{
			rating: 4.5,
			name: "Emma",
			date: "May 10, 2023",
			text: "Clean and spacious van, great for family trips.",
			id: "11",
		},
		{
			rating: 3.5,
			name: "Liam",
			date: "April 15, 2023",
			text: "Decent van, but could use some updates on the interior.",
			id: "12",
		},
	];

	const showRating = () =>
		reviewsData.map((review) => (
			<div key={review.id}>
				<div className="review">
					{/* {[...Array(review.rating)].map((_, i) => ( */}
					<HalfRating
						readOnly={true}
						className="review-star"
						value={review.rating}
						// key={i}
					/>

					<div className="info">
						<p className="name">{review.name}</p>
						<p className="date">{review.date}</p>
					</div>
					<p>{review.text}</p>
				</div>
				<hr />
			</div>
		));

	return (
		<section className="host-reviews">
			<div className="top-text">
				<h2>Your reviews</h2>
				<p>
					Last <span>30 days</span>
				</p>
			</div>
			{/* <img className="graph" src={reviewsGraph} alt="Review graph" /> */}
			<RatingDistribution reviews={reviewsData} />
			<h3>Reviews (2)</h3>
			{showRating()}
		</section>
	);
}
