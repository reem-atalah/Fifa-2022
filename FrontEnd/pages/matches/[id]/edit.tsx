import React from "react";
import MatchForm from "../../../components/MatchForm/MatchForm";
import { getSession } from "next-auth/react";
import { getAllTeams } from "../../../data/matches/TeamsApi";
import { getAllStadiums } from "../../../data/stadiums/StadiumMockApi";
import { Role } from "../../../types";
import Header from "../../../components/Header/Header";
const edit = ({ teams, stadiums, ...props }: any) => {
	console.log(props);
	return (
		<>
			<Header />
			<div>edit</div>
			<MatchForm
				teams={teams}
				stadiums={stadiums}
				createNew={false}
				initialValues={props}
			/>
		</>
	);
};

export default edit;

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		};
	} else if (session?.user?.Role !== Role.manager) {
		return {
			redirect: {
				permanent: false,
				destination: "/NotAuthorized",
			},
		};
	}
	// console.log(context.query);
	if (!context.query.ID) {
		return {
			redirect: {
				permanent: false,
				destination: `/matches`,
			},
		};
	}

	// Fetch data from external API
	const { teams } = await getAllTeams();
	const { stadiums } = await getAllStadiums();
	const match = (({
		ID,
		Team1Name,
		Team2Name,
		Linesman1,
		Linesman2,
		Stadium,
		Referee,
		matchTime,
		matchDate,
	}) => {
		const [team1, team2] = teams.filter(
			(team: any) => team.Name === Team1Name || team.Name === Team2Name
		);
		const stadium = stadiums.find((stadium: any) => stadium.Name === Stadium);
		if (!team1 || !team2 || !stadium) {
			// invalid match details
			return {
				redirect: {
					permanent: false,
					destination: "/matches",
				},
			};
		}

		return {
			ID,
			Team1: team1.ID,
			Team2: team2.ID,
			Linesman1,
			Linesman2,
			StadiumID: stadium.ID,
			Referee,
			Time: matchTime,
			Date: matchDate,
		};
	})(context.query);

	return { props: { teams, stadiums, ...match } };
}
