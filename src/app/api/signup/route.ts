import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		if (!name || !email || !password) {
			return NextResponse.json({ message: "Missing fields" }, { status: 400 });
		}
		const existing = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
		if (Array.isArray(existing) && existing.length > 0) {
			return NextResponse.json({ message: "Email already registered" }, { status: 409 });
		}
		const password_hash = await bcrypt.hash(password, 10);
		await query("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'user')", [name, email, password_hash]);
		return NextResponse.json({ message: "Registered" }, { status: 201 });
	} catch (err: unknown) {
		const errMsg = err instanceof Error ? err.message : "Server error";
		return NextResponse.json({ message: errMsg }, { status: 500 });
	}
}

