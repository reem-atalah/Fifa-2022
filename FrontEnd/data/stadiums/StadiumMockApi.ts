import axios from "axios";

export async function getAllStadiums() {
	return axios
		.get("http://localhost:8080/stadium")
		.then((res) => {
			return { stadiums: res.data };
		})
		.catch((err) => {
			console.log(err);
			return { stadiums: [] };
		});
}
