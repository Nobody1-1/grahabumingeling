import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ApiError } from "@/lib/types";

export async function GET() {
	const rows = await query(
		"SELECT id, title, slug, excerpt, content, cover_image_url, published_at, created_at, updated_at FROM blog_posts ORDER BY created_at DESC LIMIT 100"
	);
	return NextResponse.json(rows);
}

export async function POST(req: Request) {
	try {
		const { title, slug, excerpt, content, cover_image_url, published } = await req.json();
		if (!title || !slug) return NextResponse.json({ message: "Missing title/slug" }, { status: 400 });
		await query(
			"INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, published_at) VALUES (?, ?, ?, ?, ?, ?)",
			[title, slug, excerpt || null, content || null, cover_image_url || null, published ? new Date() : null]
		);
		return NextResponse.json({ ok: true }, { status: 201 });
	} catch (e: unknown) {
		return NextResponse.json({ message: (e as Error)?.message || "Server error" }, { status: 500 });
	}
}
