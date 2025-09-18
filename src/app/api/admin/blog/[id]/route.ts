import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
	try {
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
	} catch (e: any) {
		return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
	}
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		await query("DELETE FROM blog_posts WHERE id=?", [id]);
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
	}
}
