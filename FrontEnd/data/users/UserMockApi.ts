import axios from "axios";

type Props = {
	Username: string;
};
export async function getUser({username}:any,headers: any) {
	return axios
		.get(`http://localhost:8080/users/${username}`, { headers })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}
export async function getAllUsers(headers: any) {
	return axios
		.get("http://localhost:8080/users", { headers })
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { Users: [] };
		});
}
export async function deleteUser({ Username }: Props, headers:any) {
	return axios
		.delete(`http://localhost:8080/users/${Username}`, {
			data: { Username },
			headers
		})
		.then((res) => {
			console.log(res);
			return res.status == 200;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export async function changeUserRole(
	{ Username, requestedRole }: any,
	headers: any
) {
	return axios
		.put(`http://localhost:8080/users/${Username}`, {
			role: requestedRole,
		}, {headers})
		.then((res) => {
			console.log(res);
			return res.status == 200;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}


export async function editUserInfo(values: any, token) {
	return axios
		.put(`http://localhost:8080/editUser/${values.username}`, {
			FirstName: values.firstName,
			LastName: values.lastName,
			Email: values.email,
			Password: values.password, 
			Username: values.username,
			Birthdate: values.birthDate,
			Gender: values.gender,
			Nationality: values.nationality,
			Role: values.role,
		},{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			console.log(res);
			return { success: true, error: "" };
		})
		.catch((err) => {
			console.log(err);
			return { success: false, error: err };
		});
}