import axios from "axios";
// import User from "../../models/User";
import { Role } from "../../types";

export async function login(username: string, password: string) {
	return axios
		.post("http://localhost:8080/login", {
			Username: username,
			Password: password,
		})
		.then((res) => {
			console.log(res);
			const userData = res.data;
			return {
				id: userData.id,
				name: userData.name,
				email: userData.email,
				role: Role[userData.role as keyof typeof Role],
				token: userData.token,
			};
			// return { id: userData["Username"], ...userData };
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
}

export async function register(values: any) {
	return axios
		.post("http://localhost:8080/register", {
			FirstName: values.firstName,
			LastName: values.lastName,
			Email: values.email,
			Password: values.password,
			Username: values.username,
			Birthdate: values.birthDate,
			Gender: values.gender,
			Nationality: values.nationality,
			Role: values.requestManagement ? Role.PendingManager : Role.Fan,
		})
		.then((res) => {
			console.log(res);
			return { success: true, error: "" };
		})
		.catch((err) => {
			console.log(err);
			return { success: false, responseErr: err.response.data };
		});
}
