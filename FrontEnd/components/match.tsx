import Match from "../features/match/domain/Match";

type Props = {
	match: Match;
};
export default function MatchComponent({ match }: Props) {
	match;
	return <div>Match Component</div>;
}
