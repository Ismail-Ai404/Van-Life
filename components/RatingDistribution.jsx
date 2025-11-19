/** @format */

import React from "react";
import "./RatingDistribution.css";

export default function RatingDistribution({ reviews }) {
	// Only whole stars 5, 4, 3, 2, 1
	const starBuckets = [5, 4, 3, 2, 1];
	const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

	// Count each review by flooring rating to nearest whole star
	reviews.forEach(({ rating }) => {
		const floored = Math.floor(rating);
		if (floored >= 1 && floored <= 5) {
			starCounts[floored] += 1;
		}
	});

	const totalReviews = reviews.length;

	const getPercentage = (count) => {
		if (totalReviews === 0) return 0;
		return Math.round((count / totalReviews) * 100);
	};

	// Overall rating: precise average with decimals
	const overallRating = () => {
		if (totalReviews === 0) return 0;
		const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
		return (sum / totalReviews).toFixed(1);
	};

	return (
		<div className="rating-container">
			<div className="rating-header">
				<span className="rating-score">{overallRating()}</span>
				<span className="rating-star">★</span>
				<span className="rating-label">overall rating</span>
			</div>

			{starBuckets.map((star) => (
				<div key={star} className="rating-row">
					<span className="rating-text">{star} stars</span>

					<div className="rating-bar">
						<div
							className="rating-bar-fill"
							style={{
								width: `${getPercentage(
									starCounts[star]
								)}%`,
							}}
						/>
					</div>

					<span className="rating-percent">
						{getPercentage(starCounts[star])}%
					</span>
				</div>
			))}
		</div>
	);
}
