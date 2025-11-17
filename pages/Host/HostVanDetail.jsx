/** @format */

import React from "react";
import {
	useParams,
	Link,
	NavLink,
	Outlet,
	useLoaderData,
} from "react-router-dom";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
	await requireAuth(request);
	return getVan(params.id);
}

export default function HostVanDetail() {
	const currentVan = useLoaderData();

	return (
		<section>
			<Link to=".." relative="path" className="back-button">
				&larr; <span>Back to all vans</span>
			</Link>

			<div className="host-van-detail-layout-container">
				<div className="host-van-detail">
					<img src={currentVan.imageUrl} />
					<div className="host-van-detail-info-text">
						<i
							className={`van-type van-type-${currentVan.type}`}
						>
							{currentVan.type}
						</i>
						<h3>{currentVan.name}</h3>
						<h4>${currentVan.price}/day</h4>
					</div>
				</div>

				<nav className="host-van-detail-nav">
					<NavLink
						to="."
						end
						className={({ isActive }) =>
							isActive ? "active" : ""
						}
					>
						Details
					</NavLink>
					<NavLink
						to="pricing"
						className={({ isActive }) =>
							isActive ? "active" : ""
						}
					>
						Pricing
					</NavLink>
					<NavLink
						to="photos"
						className={({ isActive }) =>
							isActive ? "active" : ""
						}
					>
						Photos
					</NavLink>
				</nav>
				<Outlet context={{ currentVan }} />
			</div>
		</section>
	);
}
