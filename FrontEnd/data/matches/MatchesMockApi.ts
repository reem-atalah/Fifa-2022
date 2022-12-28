import axios from "axios";
import Match from "../../features/match/domain/Match";

export async function getAllMatches() {
	return axios
		.get("http://localhost:8080/matches")
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { matches: [] };
		});
}

export async function createMatch(params: any) {
	return axios
		.post("http://localhost:8080/matches", { ...params })
		.then((res) => {
			console.log(res);
			return res.data;
		});
}

export async function updateMatch(params: any) {
	return axios
		.put(`http://localhost:8080/matches/${params.ID}`, { ...params })
		.then((res) => {
			console.log(res);
			return true;
		});
}
