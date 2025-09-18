import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) return null;
					const users = await query(
						"SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
						[credentials.email]
					);
					const user = Array.isArray(users) ? (users as any)[0] : (users as any);
					if (!user) return null;
					const valid = await bcrypt.compare(credentials.password, user.password_hash);
					if (!valid) return null;
					return { id: String(user.id), name: user.name, email: user.email, role: user.role } as any;
				} catch (e) {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				(token as any).role = (user as any).role ?? "user";
			}
			return token as any;
		},
		async session({ session, token }) {
			(session.user as any).role = (token as any).role ?? "user";
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

