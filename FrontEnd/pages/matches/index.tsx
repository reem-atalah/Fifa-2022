import MatchComponent from "../../components/match";
import Match from "../../features/match/domain/Match";
import Image from "next/image";
import Header from "../../components/header";

type Props = {
  matches: Match[];
};

export default function Matches({ matches }: Props) {
	return (
		<div className="bg-red-400">
			<div className="container">
				{/* <div className="flex flex-row gap-8 text-white justify-start pl-3 pt-3">
					<div className="flex flex-col justify-center">
						<Image
							src="/logocup.png"
							height="138"
							width="64"
							alt="world cup"
						/>
						<Image
							className="filter-opacity-50 "
							src="/logoword.png"
							width="64"
							height="16"
							alt="world cup"
						/>
					</div>
					<div className="matches__header_text">
						<h1 className="text-7xl font-bold">Qatar 2022</h1>
						<h2 className="text-4xl font-bold">FIFA WORLD CUP</h2>
					</div>
				</div> */}
				<Header/>
				<div className="matches__content">
					<h3 className="text-5xl font-bold text-[rgb(40,0,0)] text-center">Matches</h3>
					<div className="matches__content_list">
						{matches?.map((match) => MatchComponent({ match }))}
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/matches`);
  const data = await res.json();

  return {
    props: { ...data }, // will be passed to the page component as props
  };
}
