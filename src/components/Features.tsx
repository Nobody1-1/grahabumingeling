"use client";

"use client";

import { MapPin, BadgeCheck, LayoutGrid, Route } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const items = [
	{ title: "Lokasi Strategis", desc: "Dekat pusat perbelanjaan, sekolah, dan akses tol.", Icon: MapPin },
	{ title: "Material Terbaik", desc: "menggunakan material terbaik dan berkualitas tinggi.", Icon: BadgeCheck },
	{ title: "Desain Modern", desc: "Tata ruang efisien dan pencahayaan optimal.", Icon: LayoutGrid },
	{ title: "Akses Jalan", desc: "Akses jalan lebar dan dekat dengan jalan raya.", Icon: Route },
];

export default function Features() {
	return (
		<section id="fitur" className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<AnimateOnScroll animation="slideUp">
					<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Keunggulan Perumahan</h2>
					<p className="mt-2 text-black/70 dark:text-white/80 max-w-2xl">Nikmati kenyamanan tinggal di lingkungan yang aman, asri, dan terintegrasi dengan fasilitas terbaik.</p>
				</AnimateOnScroll>
				<div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{items.map(({ title, desc, Icon }, index) => (
						<AnimateOnScroll key={title} animation="slideUp" delay={index * 0.2}>
							<div className="rounded-xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
								<div className="size-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-700">
									<Icon size={20} strokeWidth={2.25} />
								</div>
								<h3 className="font-medium">{title}</h3>
								<p className="text-sm text-black/70 dark:text-white/70 mt-1">{desc}</p>
							</div>
						</AnimateOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}
