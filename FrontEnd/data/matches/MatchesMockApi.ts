import Match from "../../features/match/domain/Match";

export default class MatchesMockApi {
	public getAllMatches(): Array<Match> {
		return [];
	}
	public getMatch(id: string): Match | null {
		return null;
	}
	public addMatch(match: Match): void {}
	public removeMatch(id: string): void {}
	// remaining functionalities
}
