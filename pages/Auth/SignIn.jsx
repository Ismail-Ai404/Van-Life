/** @format */

import React from "react";
import {
	useActionData,
	useLoaderData,
	useNavigation,
	Form,
	redirect,
} from "react-router-dom";
import { loginUser } from "../../api";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	const pathname =
		new URL(request.url).searchParams.get("redirectTo") || "/host";

	try {
		await loginUser({ email, password });
		localStorage.setItem("loggedin", true);
		return redirect(pathname);
	} catch (err) {
		return err.message;
	}
}

export default function SignInForm() {
	const errorMessage = useActionData();
	const message = useLoaderData();
	const navigation = useNavigation();

	return (
		<div className="form-container sign-in-container">
			<Form
				method="post"
				action="/login"
				replace
				className="sign-in-form"
			>
				<h1 className="form-title">Sign In</h1>

				{message && <p className="red">{message}</p>}
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

				<span>or use your account</span>

				<input
					className="sign-in-input"
					type="email"
					name="email"
					placeholder="Email"
				/>
				<input
					className="sign-in-input"
					type="password"
					name="password"
					placeholder="Password"
				/>

				<a className="forgot-password" href="#">
					Forgot your password?
				</a>

				<button
					disabled={navigation.state === "submitting"}
					className="sign-in-btn"
				>
					{navigation.state === "submitting"
						? "Logging in..."
						: "Sign In"}
				</button>
			</Form>
		</div>
	);
}
