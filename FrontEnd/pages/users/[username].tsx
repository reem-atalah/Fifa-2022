import { useRouter } from "next/router";
import AdminListElement from "../../components/AdminListElement";
import Header from "../../components/header";

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

export default function UserPage(props:any) {
    const user : User = props.user;
    const users = props.users;

    const userInfo = <div>
        <h1 className="text-2xl font-bold " >User's Info</h1>
        <h1 className="text-4xl font-bold text-red-700" >{user.Username}</h1>
        <h2 className="text-xl text-red-700" >{user.FirstName + user.LastName}</h2>
        <h3 className="text-sm text-red-500" >{user.Email}</h3>
        <h4 className="text-bold text-red-600" >{user.Role == "0" ? "Admin" : user.Role == "1" ? "Manager" : "Fan"}</h4>
    </div>;
    const adminList = <>
        {user.Role=="0"?users.map((user: User) => AdminListElement(user)):<></>}
    </>;    
    return (
        <>
            <Header/>
            {userInfo}
            {adminList}
        </>   
    )
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:8080/users`);
    const data = await res.json();
    const users = data.users;   
    const paths = users.map((user: any) => ({ params: { username: user.Username }}));

    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context : any) {
    // Fetch data from external API
    // console.log("---")
    // console.log(context);
    const res = await fetch(`http://localhost:8080/users/${context.params.username}`);
    const data = await res.json();
    const user = data[0];

    const res2 = await fetch(`http://localhost:8080/users`);
    const data2 = await res2.json();

    return {
        props: { user,...data2 }, // will be passed to the page component as props
    };
}
