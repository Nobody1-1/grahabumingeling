import Image from "next/image";
import { query } from "@/lib/db";

interface HouseType {
	id: number;
	name: string;
	price: number;
    image_url: string | null;
    images_json?: string | null;
	spec_bedrooms: number;
	spec_bathrooms: number;
	spec_parking: number;
}

async function getHouseTypes(): Promise<HouseType[]> {
	const rows = await query<HouseType>(
        "SELECT id, name, price, image_url, images_json, spec_bedrooms, spec_bathrooms, spec_parking FROM house_types ORDER BY price ASC LIMIT 6"
	);
	return rows;
}

export default async function ListingsSection() {
	const houses = await getHouseTypes();
	return (
		<section id="tipe" className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between gap-4">
					<div>
						<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Pilihan Tipe Rumah</h2>
						<p className="mt-2 text-black/70 dark:text-white/80">Sesuaikan kebutuhan keluarga Anda dengan berbagai tipe rumah.</p>
					</div>
					<a href="https://wa.me/6285325085188" target="_blank" className="hidden sm:inline-flex items-center rounded-full border border-blue-600 text-blue-600 px-4 py-2 h-10">Minta Brosur</a>
				</div>
				<div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{houses.map((h) => (
						<div key={h.id} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
                            <div className="relative aspect-[4/3]">
                                {(() => {
                                    let first = h.image_url || "/foto-rumah1.png";
                                    try {
                                        if (h.images_json) {
                                            const arr = JSON.parse(h.images_json as any);
                                            if (Array.isArray(arr) && arr[0]) first = arr[0];
                                        }
                                    } catch {}
                                    return <Image src={first} alt={h.name} fill className="object-cover" />;
                                })()}
							</div>
							<div className="p-5">
								<div className="flex items-center justify-between">
									<h3 className="font-medium text-lg">{h.name}</h3>
									<span className="text-blue-600 font-semibold">Rp {h.price.toLocaleString("id-ID")}</span>
								</div>
								<ul className="mt-3 flex flex-wrap gap-2 text-xs text-black/70 dark:text-white/70">
									<li className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">{h.spec_bedrooms} Kamar</li>
									<li className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">{h.spec_bathrooms} Kamar Mandi</li>
									<li className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">{h.spec_parking} Parkir</li>
								</ul>
								<div className="mt-4 flex gap-3">
						<a href={`/tipe/${h.id}`} className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2">Lihat Detail</a>
						<a href="https://wa.me/6285325085188" target="_blank" className="inline-flex items-center rounded-full border border-blue-600 text-blue-600 px-4 py-2">Tanya Harga</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
} 