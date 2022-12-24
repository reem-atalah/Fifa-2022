import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Formik, Form } from "formik";
import TextInput from "../InputFields/TextInput/TextInput";
import RadioInput from "../InputFields/RadioInput/RadioInput";
import validateSignup from "../../utils/validateSignup";
import { Role } from "../../types";
import styles from "./SignupComponent.module.css";
const SignupComponent = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				birthDate: "",
				gender: "",
				role: "",
				nationality: "",
			}}
			validate={validateSignup}
			onSubmit={(values) => {
				axios
					.post("http://localhost:8080/register", {
						FirstName: values.firstName,
						LastName: values.lastName,
						Email: values.email,
						Password: values.password,
						Username: values.username,
						Birthdate: values.birthDate,
						Gender: values.gender,
						Nationality: values.nationality,
						Role: Role.fan,
					})
					.then((res) => {
						console.log(res);
						setError("");
						router.push("/signin");
					})
					.catch((err) => {
						console.log(err);
						setError(err.response.data);
					});
			}}
		>
			<Form className="form">
				<TextInput
					label="First Name"
					name="firstName"
					type="text"
					placeholder="Jane"
					className={styles["text-input"]}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					type="text"
					placeholder="Jane"
					className={styles["text-input"]}
				/>
				<TextInput
					label="Email"
					name="email"
					type="email"
					placeholder="Jane@gmail.com"
				/>
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
					className={styles["text-input"]}
				/>
				<TextInput
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					placeholder="********"
					className={styles["text-input"]}
				/>
				<TextInput
					label="Birth Date"
					name="birthDate"
					type="date"
					className={styles["text-input"]}
				/>
				<TextInput
					label="Nationality"
					name="nationality"
					type="text"
					placeholder="Egyptian"
					className={styles["text-input"]}
				/>
				<div className="flex justify-center gap-8">
					<RadioInput
						label="Female"
						name="gender"
						type="radio"
						value="Female"
					/>
					<RadioInput label="Male" name="gender" type="radio" value="Male" />
				</div>
				<button type="submit" className="form--submit">
					Sign Up
				</button>
			</Form>
		</Formik>
	);
};

export default SignupComponent;
