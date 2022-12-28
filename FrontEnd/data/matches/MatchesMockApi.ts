import axios from "axios";

export async function getAllMatches(headers: any) {
	return axios
		.get("http://localhost:8080/matches", { headers })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { matches: [] };
		});
}

export async function createMatch(params: any, headers: any) {
	return axios
		.post("http://localhost:8080/matches", { ...params }, { headers })
		.then((res) => {
			console.log(res);
			return res.data;
		});
}

export async function updateMatch(params: any, headers: any) {
	return axios
		.put(
			`http://localhost:8080/matches/${params.ID}`,
			{ ...params },
			{ headers }
		)
		.then((res) => {
			console.log(res);
			return true;
		});
}
