import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import axios from "axios";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				return axios
					.post("http://localhost:8080/login", {
						Username: credentials?.username,
						Password: credentials?.password,
					})
					.then((res) => {
						const userData = res.data[0];
						return { id: userData["Username"], ...userData };
					})
					.catch((err) => {
						console.log(err);
						return null;
					});
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	session: { strategy: "jwt" },
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			console.log("token is", token);
			return token;
		},
	},
};
export default NextAuth(authOptions);
