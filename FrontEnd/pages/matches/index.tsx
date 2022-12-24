import MatchComponent from "../../components/match";
import Match from "../../features/match/domain/Match";
import Image from "next/image";

type Props = {
	matches: Match[];
};

export default function Matches({ matches }: Props) {
	return (
		<div className="w-screen h-screen bg-red-400">
			<div className="container">
				<div className="flex flex-row gap-8 text-white justify-center">
					<div className="h-40 flex flex-col justify-center">
						<Image
							src="/logocup.png"
							height="277"
							width="128"
							alt="world cup"
						/>
						<Image
							className="filter-opacity-50 "
							src="/logoword.png"
							width="128"
							height="33"
							alt="world cup"
						/>
					</div>
					<div className="matches__header_text">
						<h1 className="text-9xl font-bold">Qatar 2022</h1>
						<h2 className="text-6xl font-bold">FIFA WORLD CUP</h2>
					</div>
				</div>
				<div className="matches__content">
					<h3 className="text-5xl font-bold text-white">Matches</h3>
					<div className="matches__content_list">
						{matches.map((match: Match) => MatchComponent({ match }))}
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	// api call

	let res = { matches: [] };
	return {
		props: { ...res }, // will be passed to the page component as props
	};
}
