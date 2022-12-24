interface errors {
	[key: string]: any;
}

export default function validateSignup(values: any) {
	const errors: errors = {};
	// validate email
	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	// validate first name
	if (!values.firstName) {
		errors.firstName = "Required";
	} else if (values.firstName.length > 15 || values.firstName.length < 2) {
		errors.firstName = "Must be [2-15] characters";
	}

	// validate last name
	if (!values.lastName) {
		errors.lastName = "Required";
	} else if (values.lastName.length > 20 || values.lastName.length < 2) {
		errors.lastName = "Must be [2-20] characters";
	}

	// validate username
	if (!values.username) {
		errors.username = "Required";
	} else if (values.username.length > 20 || values.username.length < 6) {
		errors.username = "Must be [6-12] characters";
	}

	// validate password
	if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length > 20 || values.password.length < 8) {
		errors.password = "Must be [8-20] characters";
	}

	// validate confirm password
	if (!values.confirmPassword) {
		errors.confirmPassword = "Required";
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = "Password Not Match";
	}

	//validate birthdate
	if (!values.birthDate) {
		errors.birthDate = "Required";
	}

	// validate gender
	if (!values.gender) {
		errors.gender = "Required";
	}
	return errors;
}
