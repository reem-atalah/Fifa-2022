import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import validateSignin from "../../utils/validateSignin";
import TextInput from "../InputFields/TextInput/TextInput";
import { signIn } from "next-auth/react";

const SigninComponent = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validate={validateSignin}
			onSubmit={(values) => {
				signIn("credentials", {
					redirect: false,
					password: values.password,
					username: values.username,
					callbackUrl: "/",
				}).then((res) => {
					if (res?.ok) router.push(res?.url || "/signin");
					else setError("Username or Password is incorrect");
				});
			}}
		>
			<Form className="form">
				<TextInput
					label="UserName"
					name="username"
					type="text"
					placeholder="JaneAlex"
				/>

				<TextInput
					label="Password"
					name="password"
					type="password"
					placeholder="********"
				/>
				{error ? <p className="error-msg">{error}</p> : null}
				<button type="submit" className="form--submit">
					Sign In
				</button>
			</Form>
		</Formik>
	);
};

export default SigninComponent;
