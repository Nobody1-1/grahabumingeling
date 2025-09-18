"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, FileText, ArrowLeft, Eye } from "lucide-react";

interface BlogPost {
	id: number;
	title: string;
	slug: string;
	content: string;
	cover_image_url: string;
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

export default function AdminBlogListPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/admin/blog");
			if (!res.ok) throw new Error("Failed to fetch blog posts");
			const data = await res.json();
			setPosts(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
		
		try {
			const res = await fetch(`/api/admin/blog/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete blog post");
			setPosts(posts.filter(post => post.id !== id));
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	const togglePublish = async (id: number, currentStatus: boolean) => {
		try {
			const res = await fetch(`/api/admin/blog/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ published: !currentStatus }),
			});
			if (!res.ok) throw new Error("Failed to update blog post");
			setPosts(posts.map(post => 
				post.id === id 
					? { ...post, published_at: !currentStatus ? new Date().toISOString() : null }
					: post
			));
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
					{/* Sidebar placeholder */}
				</div>
				<div className="ml-64 p-8">
					<div className="flex items-center justify-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Sidebar */}
			<div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
				<div className="flex flex-col h-full">
					<div className="p-6 border-b border-gray-200 dark:border-gray-700">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">Graha Bumi Ngeling</p>
					</div>
					<nav className="flex-1 p-4 space-y-2">
						<Link href="/admin" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<FileText className="w-5 h-5 mr-3" />
							Dashboard
						</Link>
						<Link href="/admin/house-types" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<FileText className="w-5 h-5 mr-3" />
							Tipe Rumah
						</Link>
						<Link href="/admin/blog" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-r-2 border-blue-500">
							<FileText className="w-5 h-5 mr-3" />
							Blog
						</Link>
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="ml-64">
				<div className="p-8">
					<div className="mb-8">
						<div className="flex items-center mb-4">
							<Link href="/admin" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-4">
								<ArrowLeft className="w-5 h-5 mr-2" />
								Kembali
							</Link>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kelola Blog</h1>
								<p className="text-gray-600 dark:text-gray-400">Kelola semua artikel blog</p>
							</div>
							<Link href="/admin/blog/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								<Plus className="w-5 h-5 mr-2" />
								Tulis Artikel
							</Link>
						</div>
					</div>

					{error && (
						<div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
							<p className="text-red-600 dark:text-red-400">{error}</p>
						</div>
					)}

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
						{posts.length === 0 ? (
							<div className="text-center py-12">
								<FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada artikel</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">Mulai dengan menulis artikel pertama</p>
								<Link href="/admin/blog/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
									<Plus className="w-5 h-5 mr-2" />
									Tulis Artikel
								</Link>
							</div>
						) : (
							<div className="divide-y divide-gray-200 dark:divide-gray-700">
								{posts.map((post) => (
									<div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
													{post.cover_image_url ? (
														<img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover rounded-lg" />
													) : (
														<FileText className="w-8 h-8 text-gray-400" />
													)}
												</div>
												<div className="flex-1">
													<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
													<p className="text-sm text-gray-600 dark:text-gray-400">/{post.slug}</p>
													<div className="flex items-center space-x-4 mt-2">
														<span className={`px-2 py-1 rounded-full text-xs font-medium ${
															post.published_at 
																? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
																: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
														}`}>
															{post.published_at ? "Dipublikasi" : "Draft"}
														</span>
														{post.published_at && (
															<span className="text-xs text-gray-500 dark:text-gray-400">
																{new Date(post.published_at).toLocaleDateString("id-ID")}
															</span>
														)}
													</div>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<Link href={`/blog/${post.slug}`} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Lihat">
													<Eye className="w-5 h-5" />
												</Link>
												<Link href={`/admin/blog/edit/${post.id}`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
													<Edit className="w-5 h-5" />
												</Link>
												<button 
													onClick={() => togglePublish(post.id, !!post.published_at)} 
													className={`p-2 rounded-lg transition-colors ${
														post.published_at 
															? "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20" 
															: "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
													}`}
													title={post.published_at ? "Unpublish" : "Publish"}
												>
													{post.published_at ? "⏸️" : "▶️"}
												</button>
												<button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Hapus">
													<Trash2 className="w-5 h-5" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
