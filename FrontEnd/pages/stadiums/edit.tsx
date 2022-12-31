import React from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import MatchForm from "../../components/MatchForm/MatchForm";
import type { GetServerSidePropsContext } from "next";
import { Role } from "../../types";
import { getSession } from "next-auth/react";
import { getAllTeams } from "../../data/matches/TeamsApi";
import { getAllStadiums } from "../../data/stadiums/StadiumMockApi";
import StadiumForm from "../../components/StadiumFrom/StadiumFrom";

const EditStadium = ({ stadiums, stadium }: any) => {
    return (
        <>
            <Header />
            <h1 className="text-2xl font-bold text-center my-2 py-2">
                Create New Stadium
            </h1>
            <StadiumForm stadiums={stadiums} initialValues={stadium} createNew={false} />
        </>
    );
};

export default EditStadium;

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
    const stadiums = await getAllStadiums();
    const stadium = context.query;
    return { props: { ...stadiums,stadium } };
}
