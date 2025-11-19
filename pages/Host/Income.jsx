/** @format */

import React, { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

const mockData = {
	"5d": [
		{ label: "Sep 25", value: 600 },
		{ label: "Sep 26", value: 1200 },
		{ label: "Sep 27", value: 800 },
		{ label: "Sep 28", value: 1500 },
		{ label: "Sep 29", value: 900 },
	],
	"30d": [
		{ label: "Aug", value: 3800 },
		{ label: "Sep", value: 1300 },
		{ label: "Oct", value: 2900 },
		{ label: "Nov", value: 2700 },
		{ label: "Dec", value: 1400 },
		{ label: "Jan", value: 600 },
	],
	"3m": [
		{ label: "Jul", value: 2000 },
		{ label: "Aug", value: 3800 },
		{ label: "Sep", value: 1300 },
		{ label: "Oct", value: 2900 },
	],
	"6m": [
		{ label: "Apr", value: 3500 },
		{ label: "May", value: 3700 },
		{ label: "Jun", value: 3100 },
		{ label: "Jul", value: 2000 },
		{ label: "Aug", value: 3800 },
		{ label: "Sep", value: 1300 },
	],
	"1y": [
		{ label: "Feb", value: 2100 },
		{ label: "Mar", value: 2800 },
		{ label: "Apr", value: 3500 },
		{ label: "May", value: 3700 },
		{ label: "Jun", value: 3100 },
		{ label: "Jul", value: 2000 },
		{ label: "Aug", value: 3800 },
		{ label: "Sep", value: 1300 },
		{ label: "Oct", value: 2900 },
		{ label: "Nov", value: 2700 },
		{ label: "Dec", value: 1400 },
		{ label: "Jan", value: 600 },
	],
	all: [
		{ label: "2019", value: 22000 },
		{ label: "2020", value: 28000 },
		{ label: "2021", value: 31000 },
		{ label: "2022", value: 35000 },
		{ label: "2023", value: 38000 },
	],
};

const formatCurrency = (num) =>
	`$${num.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const transactionsData = [
	{ amount: 720, date: "Jan 3, '23", endDate: "Jan 10, '23", id: "1" },
	{ amount: 560, date: "Dec 12, '22", endDate: "Dec 19, '22", id: "2" },
	{ amount: 980, date: "Dec 3, '22", endDate: "Dec 10, '22", id: "3" },
];

export default function Income() {
	const [range, setRange] = useState("30d");

	const selectedData = mockData[range] || [];
	const totalIncome = selectedData.reduce(
		(acc, item) => acc + item.value,
		0
	);
	const lastIndex = selectedData.length - 1;

	const timeRanges = [
		{ label: "Last 5 days", value: "5d" },
		{ label: "Last 30 days", value: "30d" },
		{ label: "Last 3 months", value: "3m" },
		{ label: "Last 6 months", value: "6m" },
		{ label: "Last 1 year", value: "1y" },
		{ label: "All time", value: "all" },
	];

	return (
		<section style={{ maxWidth: 600, margin: "auto" }}>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				Income
			</Typography>

			<Typography
				variant="caption"
				color="text.secondary"
				gutterBottom
			>
				{timeRanges.find((r) => r.value === range)?.label}
			</Typography>

			<Typography variant="h3" fontWeight="bold" mb={3}>
				{formatCurrency(totalIncome)}
			</Typography>

			<ResponsiveContainer width="100%" height={200}>
				<BarChart
					data={selectedData}
					margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
					/>
					<XAxis dataKey="label" />
					<YAxis />
					<Tooltip
						formatter={(value) => formatCurrency(value)}
					/>
					<Bar
						dataKey="value"
						fill="#fde4c6"
						shape={({ x, y, width, height, index }) => (
							<rect
								x={x}
								y={y}
								width={width}
								height={height}
								fill={
									index === lastIndex
										? "#f97316"
										: "#fde4c6"
								}
								rx={3}
							/>
						)}
					/>
				</BarChart>
			</ResponsiveContainer>

			<Box
				mt={3}
				display="flex"
				justifyContent="center"
				flexWrap="wrap"
				gap={1}
			>
				<ButtonGroup
					variant="outlined"
					size="small"
					aria-label="time range selector"
				>
					{timeRanges.map(({ label, value }) => (
						<Button
							key={value}
							onClick={() => setRange(value)}
							variant={
								value === range
									? "contained"
									: "outlined"
							}
							color={
								value === range ? "warning" : "inherit"
							}
						>
							{label}
						</Button>
					))}
				</ButtonGroup>
			</Box>

			{/* Your transactions section */}
			<Box mt={5}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h6">
						Your transactions ({transactionsData.length})
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Last <strong>30 days</strong>
					</Typography>
				</Box>
				<Box>
					{transactionsData.map((item) => (
						<Box
							key={item.id}
							display="flex"
							justifyContent="space-between"
							p={1}
							borderBottom="1px solid #ddd"
						>
							<Typography>${item.amount}</Typography>
							<Typography color="text.secondary">
								{item.date}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>
		</section>
	);
}
