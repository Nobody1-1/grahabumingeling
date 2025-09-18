export default function TentangPage() {
	return (
		<div>
			<section className="relative overflow-hidden pt-24 pb-12">
				<div className="absolute inset-0 -z-10">
					<div className="absolute -top-40 right-1/2 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
					<div className="absolute -bottom-40 left-1/2 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />
				</div>
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Tentang Graha Bumi Ngeling</h1>
					<p className="mt-4 text-black/70 dark:text-white/80 max-w-3xl">Kami membangun hunian modern yang memadukan kenyamanan, estetika, dan aksesibilitas di jantung Ngeling, Jepara. Fokus kami adalah menghadirkan kualitas hidup lebih baik bagi keluarga, dengan lingkungan yang aman dan fasilitas yang mendukung.</p>
				</div>
			</section>

			<section className="py-12">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
					<div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="font-semibold text-lg">Mengapa Kami</h2>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">Lokasi strategis, desain fungsional, dan proses KPR yang mudah—semua dirancang agar perjalanan memiliki rumah berjalan mulus.</p>
					</div>
					<div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="font-semibold text-lg">Komitmen Kualitas</h2>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">Material terpilih dan pengawasan konstruksi ketat memastikan hunian berkualitas dan tahan lama.</p>
					</div>
					<div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="font-semibold text-lg">Lingkungan Asri</h2>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">Ruang hijau dan fasilitas keluarga menciptakan suasana nyaman untuk tumbuh dan berkembang.</p>
					</div>
				</div>
			</section>

			<section className="py-12">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
					<div className="rounded-2xl border border-black/5 dark:border-white/10 p-8 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="text-2xl font-semibold">Visi</h2>
						<p className="mt-3 text-black/70 dark:text-white/80">Menjadi pengembang perumahan pilihan di Jepara yang menghadirkan standar hidup lebih baik melalui hunian berkualitas, berkelanjutan, dan terjangkau.</p>
					</div>
					<div className="rounded-2xl border border-black/5 dark:border-white/10 p-8 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="text-2xl font-semibold">Misi</h2>
						<ul className="mt-3 list-disc pl-5 text-black/70 dark:text-white/80 space-y-2">
							<li>Mengutamakan kualitas konstruksi dan desain yang fungsional.</li>
							<li>Menyediakan akses pembiayaan yang mudah dan transparan.</li>
							<li>Menciptakan lingkungan aman, asri, dan ramah keluarga.</li>
							<li>Mendukung pertumbuhan komunitas melalui fasilitas dan ruang bersama.</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
