import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { login } from "../../../data/auth/AuthMockApi";
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
				if (credentials?.password && credentials.username)
					return login(credentials?.username, credentials?.password);
				return null;
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
				token.role = user.role;
				token.token = user.token;
				token.user = user;
			}
			return Promise.resolve(token);
		},
		session: async ({ session, token }) => {
			(session.user as any) = token.user;
			return Promise.resolve(session);
		},
	},
};
export default NextAuth(authOptions);
