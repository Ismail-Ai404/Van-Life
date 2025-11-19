/** @format */

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function HalfRating({ readOnly = false, value = 2.5 }) {
	return (
		<Stack spacing={1}>
			{!readOnly ? (
				<Rating
					name="half-rating"
					defaultValue={4.5}
					precision={0.5}
					value={value}
				/>
			) : (
				<Rating
					name="half-rating-read"
					defaultValue={4.5}
					precision={0.5}
					value={value}
					readOnly
				/>
			)}
		</Stack>
	);
}
