import Match from "../features/match/domain/Match";
import Link
 from "next/link";
export default function MatchComponent({ match }: any) {
	match;
	return (
		<Link href={`/matches/${match.ID}`}>
			<div className="bg-white my-5 border-4 border-red-900 rounded mx-16 flex flex-col gap-3">
				<h2 className="text-center text-xl text-red-800"><span className="font-bold">{match.Stadium}</span> Stadium</h2>
				<div className="flex flex-row justify-around">
					<h1 className="text-4xl text-red-900 font-bold w-1/3 text-center">{match.Team1Name}</h1>
					<p className="text-red-700 text-lg w-1/3 text-center">vs</p>
					<h1 className="text-4xl text-red-900 font-bold w-1/3 text-center">{match.Team2Name}</h1>
				</div>
				<div>
					<div className="flex flex-row justify-around mx-96">
						<h3 className="text-red-700 text-lg">{match.Linesman1}</h3>
						<h3 className="text-red-700 text-lg font-bold">{match.Referee}</h3>
						<h3 className="text-red-700 text-lg">{match.Linesman1}</h3>
					</div>
					<div className="flex flex-row justify-around mx-96 text-slate-500 text-sm">
						<h3>Lines Man 1</h3>
						<h3>Referee</h3>
						<h3>Lines Man 2</h3>
					</div>
				</div>
				<div className="text-red-400 text-center">{match.Time}</div>
			</div>
		</Link>
	);
}
