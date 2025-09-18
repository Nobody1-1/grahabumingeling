export default function Footer() {
	return (
		<footer className="mt-16 border-t border-black/5 dark:border-white/10 py-8">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-black/70 dark:text-white/70">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<p>© {new Date().getFullYear()} Graha Bumi Ngeling. All rights reserved.</p>
					<div className="flex gap-4">

					</div>
				</div>
			</div>
		</footer>
	);
} 