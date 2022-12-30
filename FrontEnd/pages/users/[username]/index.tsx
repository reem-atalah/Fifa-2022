import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminListElement from "../../../components/AdminListElement";
import Header from "../../../components/Header/Header";
import { getUser } from "../../../data/users/UserMockApi";

export interface User {
    ID: number
    Username: string
    FirstName: string
    LastName: string
    Email: string
    BirthDate: string
    Gender: string
    Password: string
    Nationality: string
    Role: string
}

export default function UserPage(user:any) {
    return (
        <>
            <Header/>
            <div>
                <h1 className="text-2xl font-bold " >User's Info</h1>
                <h1 className="text-4xl font-bold text-red-700" >{user.Username}</h1>
                <h2 className="text-xl text-red-700" >{user.FirstName + ' ' + user.LastName}</h2>
                <h3 className="text-sm text-red-500" >{user.Email}</h3>
                <h4 className="text-bold text-red-600" >{user.Role == "0" ? "Admin" : user.Role == "1" ? "Manager" : "Fan"}</h4>
                <h4 className="text-bold text-red-600">{user.Nationality || "منوفي"}  </h4>
                <h4 className="text-bold text-red-600">{user.Gender}</h4>
            </div>
            <Link href={{ pathname: `${user.ID}/edit`, query: { ...user } }} className="inline-block p-2 border-2 mt-5">
                Edit Info
            </Link>
        </>   
    )
}

export async function getServerSideProps(context : any) {
    const session = await getSession(context);
    if (!session || !session.user || !session.user.token) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin",
            },
        };
    } else if (session?.user?.name !== context.params.username) {
        let x = session?.user?.username
        return {
            redirect: {
                permanent: false,
                destination: "/NotAuthorized",
            },
        };
    }
    const username = context.params.username;
    const usersData = await getUser({ username },{
        Authorization: `Bearer ${session.user.token}`,
    });
    if(!usersData){
        return {
            redirect: {
                permanent: false,
                destination: "/NotAuthorized",
            },
        };
    }
    return {
        props: { ...usersData }, // will be passed to the page component as props
    };
}
