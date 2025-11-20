/** @format */

import React from "react";
import { useActionData, useNavigation, Form, redirect } from "react-router-dom";
// import { registerUser } from "../api";

export async function action({ request }) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		await registerUser({ name, email, password });
		return redirect("/login?message=Account created!");
	} catch (err) {
		return err.message;
	}
}
export async function loader({ request }) {
	return null;
}

export default function SignUpForm() {
	const errorMessage = useActionData();
	const navigation = useNavigation();

	return (
		<div className="form-container sign-up-container">
			<Form method="post" className="sign-up-form" replace>
				<h1 className="form-title">Create Account</h1>

				{errorMessage && <p className="red">{errorMessage}</p>}

				<div className="social-container">
					<a href="#" className="social">
						<i className="fab fa-facebook-f" />
					</a>
					<a href="#" className="social">
						<i className="fab fa-google-plus-g" />
					</a>
					<a href="#" className="social">
						<i className="fab fa-linkedin-in" />
					</a>
				</div>

				<span>or use your email for registration</span>

				<input
					type="text"
					name="name"
					placeholder="Name"
					className="sign-up-input"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="sign-up-input"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="sign-up-input"
				/>

				<button
					disabled={navigation.state === "submitting"}
					className="sign-up-btn"
				>
					{navigation.state === "submitting"
						? "Creating..."
						: "Sign Up"}
				</button>
			</Form>
		</div>
	);
}
