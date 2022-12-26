import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
const AuthStatusComponent = () => {
	const session = useSession();
	if (session.status === "loading") return <div>Loading...</div>;
	if (session.status === "authenticated"){
		return (
			<>
			<div className="flex flex-row gap-4">
			<Link href={`/users/${session?.data?.user?.Username}`} className="text-white font-bold m-auto">{session?.data?.user?.Username}</Link> {/* leave it with error */}
			<button className="px-4 py-2 border-2 rounded text-white font-bold"  onClick={(e) => signOut({ redirect: false })}>Sign Out</button>
			</div>
			</>
		);
	}
	return (
		<Link
			href="/signin"
			className="px-4 py-2 border-2 rounded text-white font-bold"
		>
			Sign In
		</Link>
	);
};
export default function Header() {
	return (
		<header className="relative bg-red-700 border-b-8 border-b-[rgb(30,0,0)]">
			<div className="absolute inset-0 blur-sm z-[-1]"></div>
			<div className="container mx-auto px-4 py-4 flex flex-row justify-between items-center">
				<ul className="flex flex-row space-x-4">
					<li className="text-lg font-bold text-white">
						<Link href="/">Home</Link>
					</li>
					<li className="text-lg font-bold text-white">
						<Link href="/matches">Matches</Link>
					</li>
					<li className="text-lg font-bold text-white">
						<Link href="/matches">Stadiums</Link>
					</li>
					<li className="text-lg font-bold text-white">
						<Link href="/">Get Your Ticket</Link>
					</li>
				</ul>
				<div className="flex flex-row gap-3">
					<AuthStatusComponent />
				</div>
				<div className="logo ">
					<Link href="/" className="flex flex-col items-center space-y-2">
						<Image
							className="h-16 w-auto"
							src="/logocup.png"
							width="100"
							height="100"
							alt="world cup"
						/>
						<Image
							className="h-8 w-auto filter-opacity-50 "
							src="/logoword.png"
							width="100"
							height="100"
							alt="world cup"
						/>
					</Link>
				</div>
			</div>
		</header>
	);
}