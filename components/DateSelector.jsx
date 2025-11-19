/** @format */

import React, { useState } from "react";
import { DatePicker, InputGroup } from "rsuite";
import { format } from "date-fns";
import "rsuite/dist/rsuite.min.css";

export default function DateSelector({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}) {
	const [start, setStart] = useState(startDate || new Date());
	const [end, setEnd] = useState(endDate || new Date());

	const today = new Date();
	today.setHours(0, 0, 0, 0); // start of today

	const handleStartDateChange = (value) => {
		setStart(value);
		if (setStartDate) setStartDate(value);
	};

	const handleEndDateChange = (value) => {
		setEnd(value);
		if (setEndDate) setEndDate(value);
	};

	return (
		<InputGroup style={{ width: 428 }}>
			<DatePicker
				oneTap
				value={start}
				onChange={handleStartDateChange}
				format="dd.MM.yyyy"
				placeholder="Select Booking Date"
				style={{ width: 230 }}
				renderValue={(value) => format(value, "EEE, d MMM")}
				shouldDisableDate={(date) => date < today}
				limitStartYear={0} // restrict year range backward
				limitEndYear={5} // future years only
				calendarDefaultDate={today} // default shown calendar month/year
			/>
			<InputGroup.Addon>to</InputGroup.Addon>
			<DatePicker
				oneTap
				value={end}
				onChange={handleEndDateChange}
				format="dd.MM.yyyy"
				placeholder="Select End Date"
				style={{ width: 230 }}
				renderValue={(value) => format(value, "EEE, d MMM")}
				shouldDisableDate={(date) => date < today}
				limitStartYear={0}
				limitEndYear={5}
				calendarDefaultDate={today}
			/>
		</InputGroup>
	);
}
