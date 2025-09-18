import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const { name, price, image_url, images, spec_bedrooms, spec_bathrooms, spec_parking, spec_plafon_pvc, akses_cor_beton } = await req.json();
		const images_json = Array.isArray(images) ? JSON.stringify(images) : (typeof images === 'string' && images.trim().length > 0 ? JSON.stringify(images.split(/\r?\n|,\s*/).filter(Boolean)) : null);
		await query(
			"UPDATE house_types SET name=?, price=?, image_url=?, images_json=?, spec_bedrooms=?, spec_bathrooms=?, spec_parking=?, spec_plafon_pvc=?, akses_cor_beton=? WHERE id=?",
			[name, Number(price), image_url || null, images_json, Number(spec_bedrooms || 0), Number(spec_bathrooms || 0), Number(spec_parking || 0), spec_plafon_pvc ? 1 : 0, akses_cor_beton ? 1 : 0, id]
		);
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
	}
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		await query("DELETE FROM house_types WHERE id=?", [id]);
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
	}
}
