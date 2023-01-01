import Link from "next/link";

export default function GetYourTicket(){
    return (
        <div>
            <h1 className="text-2xl">Go to Matches  😁 </h1>
            <Link href="/matches" className="text-blue-700 hover:underline hover:text-blue-900 text-xl ">matches </Link>
        </div>
    );
}