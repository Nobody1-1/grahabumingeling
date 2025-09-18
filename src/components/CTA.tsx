"use client";

import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CTA() {
	return (
		<section id="kontak" className="py-16 bg-blue-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<AnimateOnScroll animation="fadeIn">
					<div className="rounded-2xl bg-blue-600 p-8 md:p-10 lg:flex lg:items-center lg:gap-x-10">
						<div className="lg:flex-auto">
							<AnimateOnScroll animation="slideUp" delay={0.2}>
								<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Tertarik dengan perumahan kami?</h2>
								<p className="mt-2 text-white/80 max-w-2xl">
									Konsultasikan kebutuhan hunian Anda dengan tim kami. Dapatkan penawaran khusus dan bantuan proses KPR hingga serah terima kunci.
								</p>
							</AnimateOnScroll>
						</div>
						<AnimateOnScroll animation="slideUp" delay={0.4} className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:flex-shrink-0">
							<a href="https://wa.me/6285325085188" target="_blank" className="inline-flex items-center rounded-full bg-white text-blue-700 px-5 py-3 hover:bg-blue-50">Hubungi Kami</a>
							<Link href="/tipe" className="inline-flex items-center rounded-full border border-white text-white px-5 py-3 hover:bg-white/10">Lihat Tipe Rumah</Link>
						</AnimateOnScroll>
					</div>
				</AnimateOnScroll>
			</div>
		</section>
	);
}