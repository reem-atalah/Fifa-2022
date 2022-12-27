import axios from "axios";

type Props = {
	Username: string;
};
export async function deleteUser({ Username }: Props) {
	return axios
		.delete(`http://localhost:8080/users/${Username}`, {
			data: { Username },
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

export async function changeUserRole({ Username, requestedRole }: any) {
	return axios
		.put(`http://localhost:8080/users/${Username}`, {
			role: requestedRole,
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
