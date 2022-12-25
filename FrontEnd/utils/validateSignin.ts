interface errors {
	[key: string]: any;
}
export default function validateSignin(values: any) {
	const errors: errors = {};

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

	return errors;
}
