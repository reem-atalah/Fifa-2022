interface errors {
	[key: string]: any;
}
export default function validateSignin(values: any) {
	const errors: errors = {};

	// validate username
	if (!values.username) {
		errors.username = "Required";
	} else if (values.username.length > 20 || values.username.length < 3) {
		errors.username = "Must be [3-12] characters";
	}

	// validate password
	if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length > 20 || values.password.length < 5) {
		errors.password = "Must be [5-20] characters";
	}

	return errors;
}
