import Link from "next/link";
import Image from "next/image";
import { query } from "@/lib/db";

interface Post {
	id: number;
	title: string;
	slug: string;
	excerpt: string | null;
	cover_image_url: string | null;
	published_at: string | null;
}

async function getPosts(): Promise<Post[]> {
	const rows = await query<Post>(
		"SELECT id, title, slug, excerpt, cover_image_url, published_at FROM blog_posts WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT 10"
	);
	return rows;
}

export default async function BlogPage() {
	const posts = await getPosts();
	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
			<h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
			<p className="mt-4 text-black/70 dark:text-white/80">Artikel dan update terbaru seputar Graha Bumi Ngeling dan dunia properti.</p>
			<div className="mt-8 grid sm:grid-cols-2 gap-6">
				{posts.length === 0 && (
					<div className="rounded-xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
						<h2 className="font-medium">Belum ada artikel</h2>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">Konten blog akan segera hadir.</p>
					</div>
				)}
				{posts.map((p) => (
					<Link key={p.id} href={`/blog/${p.slug}`} className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur block">
						<div className="relative aspect-[16/9]">
							<Image src={p.cover_image_url || "/foto-rumah1.png"} alt={p.title} fill className="object-cover" />
						</div>
						<div className="p-5">
							<h3 className="font-medium text-lg">{p.title}</h3>
							<p className="text-sm text-black/70 dark:text-white/70 mt-1 line-clamp-2">{p.excerpt || ""}</p>
							{p.published_at && <p className="text-xs text-black/50 dark:text-white/50 mt-2">{new Date(p.published_at).toLocaleDateString("id-ID")}</p>}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
