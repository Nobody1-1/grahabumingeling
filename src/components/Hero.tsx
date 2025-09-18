import Image from "next/image";
"use client";

import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Hero() {
	return (
		<section className="relative overflow-hidden pt-28">
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-40 right-1/2 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
				<div className="absolute -bottom-40 left-1/2 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />
			</div>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-10 items-center">
					<div>
						<AnimateOnScroll animation="slideUp">
							<h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Hunian Modern Nyaman untuk Keluarga Impian</h1>
						</AnimateOnScroll>
						<AnimateOnScroll animation="fadeIn" delay={0.2}>
							<p className="mt-4 text-base/7 text-black/70 dark:text-white/80">Temukan rumah idaman dengan desain elegan, lokasi strategis, dan fasilitas lengkap. Pengajuan KPR mudah, cicilan ringan, dan proses transparan.</p>
						</AnimateOnScroll>
						<AnimateOnScroll animation="slideUp" delay={0.4}>
							<div className="mt-6 flex flex-wrap gap-3">
								<Link href="#tipe" className="inline-flex items-center rounded-full bg-blue-600 text-white px-5 py-3 hover:bg-blue-700">Lihat Tipe Rumah</Link>
								<a href="https://wa.me/6285325085188" target="_blank" className="inline-flex items-center rounded-full border border-blue-600 text-blue-600 px-5 py-3 hover:bg-blue-50">Konsultasi Gratis</a>
							</div>
						</AnimateOnScroll>
						<AnimateOnScroll animation="fadeIn" delay={0.6}>
							<div className="mt-8 grid grid-cols-3 gap-6 text-center">
								<div>
									<p className="text-3xl font-bold">0 %</p>
									<p className="text-xs text-black/60 dark:text-white/70">DP</p>
								</div>
								<div>
									<p className="text-3xl font-bold">20 Menit</p>
									<p className="text-xs text-black/60 dark:text-white/70">Dari Pusat Kota</p>
								</div>
								<div>
									<p className="text-3xl font-bold">SHM</p>
									<p className="text-xs text-black/60 dark:text-white/70">Sertifikat</p>
								</div>
							</div>
						</AnimateOnScroll>
					</div>
					<AnimateOnScroll animation="fadeIn" delay={0.3} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
						<Image src="https://i.imgur.com/6ye4E6t.png" alt="Perumahan" fill className="object-cover" />
					</AnimateOnScroll>
				</div>
			</div>
		</section>
	);
}