import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import validateSignin from "../utils/validateSignin";
import TextInput from "./TextInput";
import { signIn } from "next-auth/react";

const SigninComponent = () => {
	const router = useRouter();

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
					console.log(res);
					if (res?.ok) router.push(res?.url || "/signin");
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

				<TextInput label="Password" name="password" type="password" />

				<button type="submit" className="form--submit">
					Sign In
				</button>
			</Form>
		</Formik>
	);
};

export default SigninComponent;
