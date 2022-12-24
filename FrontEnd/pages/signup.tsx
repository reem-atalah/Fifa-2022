import type { GetServerSidePropsContext } from "next";
import Layout from "../layout/Layout";
import Head from "next/head";
import { getSession } from "next-auth/react";
import SignupComponent from "../components/SignupComponent";
import Link from "next/link";

const signup = () => {
	return (
		<>
			<Head>
				<title>Signup</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<h1 className="text-5xl mb-8">Sign Up</h1>
				<SignupComponent />
				<p className="text-center">
					already have an account?{" "}
					<Link href="/signin" className="text-blue-500 font-bold">
						Sign In
					</Link>
				</p>
			</Layout>
		</>
	);
};

export default signup;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
