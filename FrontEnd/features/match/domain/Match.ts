import { Stadium } from "../../../types";
export default class Match {
	firstTeam: string;
	secondTeam: string;
	timeDate: Date;
	referee: string;
	firstLineman: string;
	secondLineman: string;
	venue: Stadium;

	public constructor(
		firstTeam: string,
		secondTeam: string,
		timeDate: Date,
		referee: string,
		firstLineman: string,
		secondLineman: string,
		venue: Stadium
	) {
		this.firstTeam = firstTeam;
		this.secondTeam = secondTeam;
		this.referee = referee;
		this.timeDate = timeDate;
		this.venue = venue;
		this.firstLineman = firstLineman;
		this.secondLineman = secondLineman;
	}

    
}
