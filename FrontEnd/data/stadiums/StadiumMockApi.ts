import axios from "axios";

export async function getAllStadiums() {
	return axios
		.get("http://localhost:8080/stadiums")
		.then((res) => {
			return { stadiums: res.data };
		})
		.catch((err) => {
			console.log(err);
			return { stadiums: [] };
		});
}

export async function createStadium(values: any, headers: any) {
	return axios
		.post("http://localhost:8080/stadiums", { ...values }, { headers })
		.then((res) => {
			console.log(res);
			return res.data;
		});
}

export async function updateStadium(params: any, headers: any) {
	return axios
		.put(
			`http://localhost:8080/stadiums/${params.ID}`,
			{ ...params },
			{ headers }
		)
		.then((res) => {
			console.log(res);
			return true;
		});
}