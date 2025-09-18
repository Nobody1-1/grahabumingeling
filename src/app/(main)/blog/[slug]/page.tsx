import Image from "next/image";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

interface Post {
	id: number;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string | null;
	cover_image_url: string | null;
	published_at: string | null;
}

async function getPost(slug: string): Promise<Post | null> {
	const rows = await query<Post>(
		"SELECT id, title, slug, excerpt, content, cover_image_url, published_at FROM blog_posts WHERE slug = ? LIMIT 1",
		[slug]
	);
	if (Array.isArray(rows) && rows.length > 0) return rows[0];
	return null;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug);
	if (!post) return notFound();
	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
			{post.cover_image_url && (
				<div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
					<Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
				</div>
			)}
			<h1 className="mt-6 text-3xl font-semibold tracking-tight">{post.title}</h1>
			{post.published_at && (
				<p className="mt-2 text-xs text-black/50 dark:text-white/50">{new Date(post.published_at).toLocaleDateString("id-ID")}</p>
			)}
			{post.excerpt && <p className="mt-4 text-black/70 dark:text-white/80">{post.excerpt}</p>}
			{post.content && (
				<div className="prose dark:prose-invert mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
			)}
		</div>
	);
}
