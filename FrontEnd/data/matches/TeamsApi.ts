import axios from "axios";

export async function getAllTeams() {
	return axios
		.get("http://localhost:8080/team")
		.then((res) => {
			// console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { teams: [] };
		});
}
