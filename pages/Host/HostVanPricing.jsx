/** @format */

import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
	const { currentVan } = useOutletContext();

	const [isEditing, setIsEditing] = React.useState(false);
	const [editedPrice, setEditedPrice] = React.useState(currentVan.price);
	const priceChanged = editedPrice !== currentVan.price;

	return (
		<>
			<h3
				onClick={() => setIsEditing(!isEditing)}
				className="host-van-price"
			>
				${currentVan.price}
				<span>/day</span>
			</h3>

			{isEditing && (
				<div className="price-editor">
					{/* TextField goes here */}
					{priceChanged && (
						<button className="save-button">Save</button>
					)}
				</div>
			)}
		</>
	);
}
