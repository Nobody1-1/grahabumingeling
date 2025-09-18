import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define types for user and database user
interface DbUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Extend JWT and Session types
interface ExtendedJWT extends JWT {
  role?: string;
}

interface ExtendedSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

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
					const users = await query<DbUser>(
						"SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
						[credentials.email]
					);
					const user = users.length > 0 ? users[0] : null;
					if (!user) return null;
					const valid = await bcrypt.compare(credentials.password, user.password_hash);
					if (!valid) return null;
					return { id: String(user.id), name: user.name, email: user.email, role: user.role } as UserWithRole;
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
			const extendedToken = token as ExtendedJWT;
			if (user) {
				const userWithRole = user as UserWithRole;
				extendedToken.role = userWithRole.role ?? "user";
			}
			return extendedToken;
		},
		async session({ session, token }) {
			const extendedSession = session as ExtendedSession;
			const extendedToken = token as ExtendedJWT;
			extendedSession.user.role = extendedToken.role ?? "user";
			return extendedSession;
		},
	},
	pages: {
		signIn: "/login",
	},
};

