import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ApiError } from "@/lib/types";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	try {
		const params = await context.params;
		const id = Number(params.id);
		const body = await req.json();
		
		// Handle publish/unpublish toggle
		if (body.hasOwnProperty('published')) {
			await query(
				"UPDATE blog_posts SET published_at=? WHERE id=?",
				[body.published ? new Date() : null, id]
			);
		} else {
			// Handle full update
			const { title, slug, excerpt, content, cover_image_url, published } = body;
			await query(
				"UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover_image_url=?, published_at=? WHERE id=?",
				[title, slug, excerpt || null, content || null, cover_image_url || null, published ? new Date() : null, id]
			);
		}
		return NextResponse.json({ ok: true });
	} catch (e: unknown) {
		return NextResponse.json({ message: (e as Error)?.message || "Server error" }, { status: 500 });
	}
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
	try {
		const params = await context.params;
		const id = Number(params.id);
		await query("DELETE FROM blog_posts WHERE id=?", [id]);
		return NextResponse.json({ ok: true });
	} catch (e: unknown) {
		return NextResponse.json({ message: (e as Error)?.message || "Server error" }, { status: 500 });
	}
}
