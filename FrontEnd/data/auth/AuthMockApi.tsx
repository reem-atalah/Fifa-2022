import axios from "axios";
import User from "../../models/User";
// import { Gender, Role } from "../../types";

export async function login(username: string, password: string) {
	return axios
		.post("http://localhost:8080/login", {
			Username: username,
			Password: password,
		})
		.then((res) => {
			const userData = res.data[0];
			return { id: userData["Username"], ...userData };

			// return new User(
			// 	userData["Username"],
			// 	userData["FirstName"],
			// 	userData["LastName"],
			// 	new Date(userData["BirthDate"]),
			// 	userData["Gender"],
			// 	userData["Email"],
			// 	userData["Role"],
			// 	userData["Password"],
			// 	userData["Nationality"]
			// );
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
}

export default class AuthMockApi {
	public async login(username: string, password: string): Promise<User | null> {
		return axios
			.post("http://localhost:8080/login", {
				Username: username,
				Password: password,
			})
			.then((res) => {
				const userData = res.data[0];
				return { id: userData["Username"], ...userData };

				// return new User(
				// 	userData["Username"],
				// 	userData["FirstName"],
				// 	userData["LastName"],
				// 	new Date(userData["BirthDate"]),
				// 	userData["Gender"],
				// 	userData["Email"],
				// 	userData["Role"],
				// 	userData["Password"],
				// 	userData["Nationality"]
				// );
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	}
	public register(): void {}
	public logout(): void {}
	// remaining functionalities
}
