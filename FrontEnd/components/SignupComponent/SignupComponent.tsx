import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import TextInput from "../InputFields/TextInput/TextInput";
import RadioInput from "../InputFields/RadioInput/RadioInput";
import validateSignup from "../../utils/validateSignup";
import styles from "./SignupComponent.module.css";
import { register } from "../../data/auth/AuthMockApi";
const SignupComponent = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	const handleSubmit = async (values: any) => {
		const res: any = await register(values);
		console.log(res);
		if (res.success) {
			router.push("/signin");
		} else {
			console.log(res.responseErr)
			setError(res.responseErr);
		}
	};

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
				requestManagement: false,
			}}
			validate={validateSignup}
			onSubmit={handleSubmit}
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
				<div className="flex items-center gap-2 p-2">
					<Field type="checkbox" name="requestManagement" className="w-4 h-4"/>
					<label>Request to be a Manager</label>
				</div>
				<button type="submit" className="form--submit">
					Sign Up
				</button>
				<p className="text-red-700 ">{error}</p>
			</Form>
		</Formik>
	);
};

export default SignupComponent;
