import React from "react";
import SigninComponent from "../../components/SigninComponent/SigninComponent";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../layout/Layout";
import Link from "next/link";
import styles from "./signin.module.css";

const signin = () => {
	return (
		<>
			<Head>
				<title>signin</title>
			</Head>
			<Layout>
				<h1 className={styles["title"]}>Log in</h1>
				<p className={styles["paragraph"]}>
					Welcome back! Please enter your details
				</p>
				<SigninComponent />
				<p className={styles["info-msg"]}>
					don&apos;t have an account yet?{" "}
					<Link href="/signup" className="text-blue-500 font-bold">
						Sign Up
					</Link>
				</p>
			</Layout>
		</>
	);
};

export default signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	console.log("session is", session);

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
