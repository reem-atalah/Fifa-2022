import axios from "axios";
import Match from "../../features/match/domain/Match";
type Props = {
	Username: string;
};

export async function getAllMatches() {
	return axios
		.get("http://localhost:8080/matches")
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { matches: [] };
		});
}

export async function createMatch(params: Props) {
	return axios
		.post("http://localhost:8080/matches", { ...params })
		.then((res) => {
			console.log(res);
			return res.data;
		});
}
export default class MatchesMockApi {
	public getAllMatches() {
		return axios
			.get("http://localhost:8080/matches")
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		return [];
	}
	public getMatch(id: string): Match | null {
		return null;
	}
	public addMatch(match: Match): void {}
	public removeMatch(id: string): void {}
	// remaining functionalities
}
