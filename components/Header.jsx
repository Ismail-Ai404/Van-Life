/** @format */

import React from "react";
import avatar from "../assets/images/avatar-icon.png";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
	function fakeLogOut() {
		localStorage.removeItem("loggedin");
	}

	return (
		<header>
			<Link className="site-logo" to="/">
				#VanLife
			</Link>
			<nav>
				<NavLink
					to="host"
					className={({ isActive }) =>
						isActive ? "active" : ""
					}
				>
					Host
				</NavLink>
				<NavLink
					to="about"
					className={({ isActive }) =>
						isActive ? "active" : ""
					}
				>
					About
				</NavLink>
				<NavLink
					to="vans"
					className={({ isActive }) =>
						isActive ? "active" : ""
					}
				>
					Vans
				</NavLink>
				<Link to="login" className="login-link">
					<img
						src={avatar}
						alt="User avatar"
						className="login-icon"
					/>
				</Link>
				<button onClick={fakeLogOut}>X</button>
			</nav>
		</header>
	);
}
