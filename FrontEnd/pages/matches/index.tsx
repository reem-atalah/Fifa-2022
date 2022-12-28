import React from "react";
import Header from "../../components/Header/Header";
import { getAllMatches } from "../../data/matches/MatchesMockApi";
import Head from "next/head";
import MatchCard from "../../components/MatchCard/MatchCard";
import { getSession } from "next-auth/react";
import { Role } from "../../types";
import Link from "next/link";
type Props = {
	matches: Array<any>;
	showControl: Boolean;
};

export default function Matches({ matches, showControl }: Props) {
	return (
		<>
			<Head>
				<title>FIFA 2022</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<h1 className="text-center">Matches </h1>
			{showControl && (
				<Link href="/matches/new" className="block p-2 border-2 w-fit ml-auto">
					Create New
				</Link>
			)}
			<div className="bg-red-400 px-1 w-screen flex flex-wrap gap-2">
				{matches.map((match) => (
					<MatchCard key={match.ID} match={match} showControl={showControl} />
				))}
			</div>
		</>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	// Fetch data from external API
	const data = await getAllMatches();
	data.matches.forEach((match: any) => {
		const time = new Date(match.Time);
		match.matchTime = time.toLocaleTimeString("sv-SE");
		match.matchDate = time.toLocaleDateString("sv-SE");
	});
	return {
		props: { ...data, showControl: session?.user?.Role === Role.manager }, // will be passed to the page component as props
	};
}
