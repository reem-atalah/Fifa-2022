import React from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import MatchForm from "../../components/MatchForm/MatchForm";
import type { GetServerSidePropsContext } from "next";
import { Role } from "../../types";
import { getSession } from "next-auth/react";
import { getAllTeams } from "../../data/matches/TeamsApi";
import { getAllStadiums } from "../../data/stadiums/StadiumMockApi";

const NewMatch = ({ teams, stadiums }: any) => {
	return (
		<>
			<Head>
				<title>FIFA 2022</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<h1 className="text-2xl font-bold text-center my-2 py-2">
				Create New Match
			</h1>
			<MatchForm teams={teams} stadiums={stadiums} createNew={true} />
		</>
	);
};

export default NewMatch;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Fetch data from external API
	const session = await getSession(context);
	if (!session || !session.user || !session.user.token) {
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		};
	} else if (
		session?.user?.role !== Role.Manager &&
		session?.user?.role !== Role.Admin
	) {
		return {
			redirect: {
				permanent: false,
				destination: "/NotAuthorized",
			},
		};
	}
	const teams = await getAllTeams();
	const stadiums = await getAllStadiums();

	return { props: { ...teams, ...stadiums } };
}
