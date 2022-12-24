import Match from "../features/match/domain/Match";

type Props = {
	match: Match;
};
export default function MatchComponent({ match }: any) {
	match;
	console.log(match)
	return (
    <div className="bg-white my-5 border-4 border-red-900 rounded">
      Mohamed Nabawe Hamed
    </div>
  );
}
