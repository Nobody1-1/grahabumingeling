import { MessageCircle, Mail, MapPin, Clock, Phone } from "lucide-react";

const LAT = -6.6836732663564025;
const LON = 110.68890539535808;
const embed = `https://www.google.com/maps?q=${LAT},${LON}&hl=id&z=16&output=embed`;

export default function KontakPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="relative overflow-hidden pt-24 pb-12">
				<div className="absolute inset-0 -z-10">
					<div className="absolute -top-40 right-1/2 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
					<div className="absolute -bottom-40 left-1/2 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />
				</div>
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Hubungi Kami</h1>
					<p className="mt-4 text-black/70 dark:text-white/80 max-w-3xl mx-auto">Siap membantu mewujudkan rumah impian Anda. Tim kami siap melayani dengan profesional dan ramah.</p>
				</div>
			</section>

			{/* Contact Info Cards */}
			<section className="py-12">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						<a href="https://wa.me/6285325085188" target="_blank" className="group rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur hover:border-green-500/50 transition-all">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
									<MessageCircle className="w-6 h-6 text-green-600" />
								</div>
								<div>
									<h3 className="font-medium">WhatsApp</h3>
									<p className="text-sm text-black/70 dark:text-white/70">+62 853-2508-5188</p>
								</div>
							</div>
						</a>

						<a href="mailto:info@grahabumingeling.com" className="group rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur hover:border-blue-500/50 transition-all">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
									<Mail className="w-6 h-6 text-blue-600" />
								</div>
								<div>
									<h3 className="font-medium">Email</h3>
									<p className="text-sm text-black/70 dark:text-white/70">info@grahabumingeling.com</p>
								</div>
							</div>
						</a>

						<div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-full bg-purple-100">
									<MapPin className="w-6 h-6 text-purple-600" />
								</div>
								<div>
									<h3 className="font-medium">Alamat</h3>
									<p className="text-sm text-black/70 dark:text-white/70">Ngeling, Pecangaan, Jepara</p>
								</div>
							</div>
						</div>

						<div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-full bg-orange-100">
									<Clock className="w-6 h-6 text-orange-600" />
								</div>
								<div>
									<h3 className="font-medium">Jam Kerja</h3>
									<p className="text-sm text-black/70 dark:text-white/70">08:00 - 17:00 WIB</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Map Section */}
			<section className="py-12">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h2 className="text-2xl font-semibold tracking-tight">Lokasi Kami</h2>
						<p className="mt-2 text-black/70 dark:text-white/80">Temukan lokasi Graha Bumi Ngeling di peta</p>
					</div>
					<div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5">
						<iframe title="Lokasi Graha Bumi Ngeling" className="w-full" style={{ height: 400 }} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
					<div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 sm:p-12">
						<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Siap Konsultasi?</h2>
						<p className="mt-2 text-white/90 max-w-2xl mx-auto">Tim sales kami siap membantu menjawab pertanyaan dan memberikan penawaran terbaik untuk rumah impian Anda.</p>
						<div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
							<a href="https://wa.me/6285325085188" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-blue-700 px-6 py-3 hover:bg-gray-50">
								<MessageCircle className="w-5 h-5" />
								Chat WhatsApp
							</a>
							<a href="tel:+6285325085188" className="inline-flex items-center justify-center gap-2 rounded-full border border-white text-white px-6 py-3 hover:bg-white/10">
								<Phone className="w-5 h-5" />
								Telepon Sekarang
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}