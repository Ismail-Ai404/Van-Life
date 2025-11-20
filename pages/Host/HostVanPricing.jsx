/** @format */

import React from "react";
import {
	useOutletContext,
	Form,
	useActionData,
	useRevalidator,
} from "react-router-dom";
import { TextField, Snackbar, Alert } from "@mui/material";
import { updateVanPrice } from "../../api";

//Todo fix snackbar message

// Action function to handle price update
export async function action({ request, params }) {
	const formData = await request.formData();
	const newPrice = formData.get("price");

	try {
		const result = await updateVanPrice(params.id, newPrice);

		return {
			success: result.success,
			price: Number(newPrice),
			message: result.success
				? "Price updated successfully!"
				: result.message || "Failed to update price.",
		};
	} catch (err) {
		return {
			success: false,
			message: err.message || "Failed to update price.",
		};
	}
}

export default function HostVanPricing() {
	const { currentVan } = useOutletContext();

	// Local state
	const [isEditing, setIsEditing] = React.useState(false);
	const [editedPrice, setEditedPrice] = React.useState(currentVan.price);

	const priceChanged = editedPrice !== currentVan.price;

	// Action data from form submission
	const actionData = useActionData();
	const revalidator = useRevalidator();

	// Snackbar state
	const [snackbar, setSnackbar] = React.useState({
		open: false,
		severity: "success",
		message: "",
	});

	// Trigger snackbar safely
	React.useEffect(() => {
		if (!actionData) return;

		const isSuccess = actionData?.success;
		const msg =
			actionData?.message ||
			(isSuccess
				? "Price updated successfully!"
				: "Failed to update price.");

		setSnackbar({
			open: true,
			severity: isSuccess ? "success" : "error",
			message: msg,
		});

		if (isSuccess) {
			setIsEditing(false);
			revalidator.revalidate(); // Pessimistic update
		}
	}, [actionData, revalidator]);

	return (
		<>
			<h3
				onClick={() => setIsEditing(!isEditing)}
				className="host-van-price"
				style={{ cursor: "pointer" }}
			>
				${currentVan.price}
				<span>/day</span>
			</h3>

			{isEditing && (
				<Form
					method="post"
					className="price-editor"
					style={{ marginTop: "10px" }}
				>
					<TextField
						label="Price"
						type="number"
						size="small"
						name="price"
						value={editedPrice}
						onChange={(e) => setEditedPrice(e.target.value)}
						sx={{ width: 120, marginRight: "10px" }}
					/>
					{priceChanged && <button type="submit">Save</button>}
				</Form>
			)}

			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() =>
					setSnackbar((prev) => ({ ...prev, open: false }))
				}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={snackbar.severity} sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
