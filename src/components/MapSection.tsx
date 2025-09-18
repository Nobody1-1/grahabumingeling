const LAT = -6.6836732663564025;
const LON = 110.68890539535808;

export default function MapSection() {
	const embed = `https://www.google.com/maps?q=${LAT},${LON}&hl=id&z=16&output=embed`;
	const link = `https://www.google.com/maps?q=${LAT},${LON}`;
	return (
		<section id="lokasi" className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between gap-4 mb-6">
					<div>
						<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Lokasi Graha Bumi Ngeling</h2>
						<p className="mt-2 text-black/70 dark:text-white/80">Alamat : 8M8Q+FHC, Rw. 1, Ngeling, Pecangaan, Jepara Regency, Central Java</p>
					</div>
					<a href={link} target="_blank" className="hidden sm:inline-flex items-center rounded-full border border-blue-600 text-blue-600 px-4 py-2 h-10">Buka di Google Maps</a>
				</div>
				<div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5">
					<iframe
						title="Lokasi Graha Bumi Ngeling (Google Maps)"
						className="w-full"
						style={{ height: 400 }}
						src={embed}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
					<div className="px-4 py-3 text-sm text-black/70 dark:text-white/70">Graha Bumi Ngeling</div>
				</div>
			</div>
		</section>
	);
}
