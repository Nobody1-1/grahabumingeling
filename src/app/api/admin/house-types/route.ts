import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ApiError } from "@/lib/types";

interface HouseType {
	id: number;
	name: string;
	price: number;
	image_url: string | null;
	images_json: string | null;
	spec_bedrooms: number;
	spec_bathrooms: number;
	spec_parking: number;
	spec_plafon_pvc: number;
	akses_cor_beton: number;
	created_at: string;
	updated_at: string;
}

export async function GET() {
	const rows = await query<HouseType>(
		"SELECT id, name, price, image_url, images_json, spec_bedrooms, spec_bathrooms, spec_parking, spec_plafon_pvc, akses_cor_beton, created_at, updated_at FROM house_types ORDER BY created_at DESC LIMIT 100"
	);
	return NextResponse.json(rows);
}

export async function POST(req: Request) {
	try {
		const { name, price, image_url, images, spec_bedrooms, spec_bathrooms, spec_parking, spec_plafon_pvc, akses_cor_beton } = await req.json();
		if (!name || !price) return NextResponse.json({ message: "Missing name/price" }, { status: 400 });
		const images_json = Array.isArray(images) ? JSON.stringify(images) : (typeof images === 'string' && images.trim().length > 0 ? JSON.stringify(images.split(/\r?\n|,\s*/).filter(Boolean)) : null);
		await query(
			"INSERT INTO house_types (name, price, image_url, images_json, spec_bedrooms, spec_bathrooms, spec_parking, spec_plafon_pvc, akses_cor_beton) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				name,
				Number(price),
				image_url || null,
				images_json,
				Number(spec_bedrooms || 0),
				Number(spec_bathrooms || 0),
				Number(spec_parking || 0),
				spec_plafon_pvc ? 1 : 0,
				akses_cor_beton ? 1 : 0,
			]
		);
		return NextResponse.json({ ok: true }, { status: 201 });
	} catch (e: unknown) {
		return NextResponse.json({ message: (e as Error)?.message || "Server error" }, { status: 500 });
	}
}
