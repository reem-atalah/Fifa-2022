import React from "react";
import Header from "../../components/Header/Header";
import { getAllMatches } from "../../data/matches/MatchesMockApi";
import Head from "next/head";
import MatchCard from "../../components/MatchCard/MatchCard";
import { getSession } from "next-auth/react";
import { Role } from "../../types";
import Link from "next/link";
import styles from "./index.module.css";
import { getAllStadiums } from "../../data/stadiums/StadiumMockApi";
import { MdEdit } from "react-icons/md";


export default function Matches({ stadiumMatches, stadiums, showControl }: any) {
    return (
        <>
            <Head>
                <title>FIFA 2022</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <h1 className="text-center text-3xl font-bold">Stadiums </h1>
            {showControl && (
                <Link href="/stadiums/new" className="block p-2 border-4 bg-gray-500 w-fit text-2xl font-bold text-white ">
                    Create New
                </Link>
            )}
            {stadiums.map((stadium : any) => (
                <>
                    <div className="flex flex-row items-center  border-t-4 border-red-900 gap-4">
                <h1 key={stadium.ID} className="text-4xl font-bold text-red-900">{stadium.Name}</h1>
                    {showControl && (
                        <Link
                            href={{ pathname: `stadiums/edit`, query: { ...stadium } }}
                            className="hover:text-red-900 hover:underline font-bold text-lg text-gray-500"
                        >
                            Edit
                        </Link>
                    )}
                </div>
                    <div className="bg-red-400 px-1 w-screen flex flex-wrap gap-2">
                    {stadiumMatches[stadium.ID].map((match: any) => (
                        <MatchCard
                            key={match.ID}
                            match={match}
                            showControl={showControl}
                            className={styles["match-card"]}
                            asLink={true}
                        />
                    ))}
                    </div>
                </>
            ))}
        </>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    // Fetch data from external API
    const data = await getAllMatches({
        Authorization: `Bearer ${session?.user?.token}`,
    });

    data.matches.forEach((match: any) => {
        const time = new Date(match.Time);
        match.matchTime = time.toLocaleTimeString("sv-SE");
        match.matchDate = time.toLocaleDateString("sv-SE");
    });
    
    const data2 = await getAllStadiums();
    const stadiums = data2.stadiums
    const matches = data.matches
    // console.log(matches)
    //make object of stadium as a key and its corrosponding matches as value
    const stadiumMatches = stadiums.reduce((acc: any, stadium: any) => {
        acc[stadium.ID] = matches.filter((match: any) => match.Stadium === stadium.Name)
        return acc
    }, {})

    const showControl =
        session?.user?.role === Role.Manager || session?.user?.role === Role.Admin;
    return {
        props: { stadiumMatches,stadiums, showControl }, // will be passed to the page component as props
    };
}
