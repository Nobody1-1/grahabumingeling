"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Save, X, Eye, EyeOff } from "lucide-react";

export default function NewPostPage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isPublished, setIsPublished] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPreview, setShowPreview] = useState(false);

	// Auto-generate slug from title
	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		if (!slug || slug === generateSlug(title)) {
			setSlug(generateSlug(newTitle));
		}
	};

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await fetch("/api/admin/blog", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ 
			title, 
			slug, 
			content, 
			cover_image_url: imageUrl, 
			published: isPublished 
		}),
		});
		setLoading(false);
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data?.message || "Gagal menyimpan");
			return;
		}
		router.push("/admin/blog");
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
							<Link href="/admin/blog" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-4">
								<ArrowLeft className="w-5 h-5 mr-2" />
								Kembali
							</Link>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tulis Artikel Baru</h1>
						<p className="text-gray-600 dark:text-gray-400">Buat artikel blog baru untuk website</p>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
						<form onSubmit={onSubmit} className="p-8 space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Judul Artikel
										</label>
										<input 
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="Masukkan judul artikel" 
											value={title} 
											onChange={handleTitleChange} 
											required 
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Slug URL
										</label>
										<input 
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="judul-artikel" 
											value={slug} 
											onChange={(e) => setSlug(e.target.value)} 
											required 
										/>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											URL: /blog/{slug || 'judul-artikel'}
										</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											URL Gambar Cover
										</label>
										<input 
											type="url"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="https://example.com/gambar.jpg" 
											value={imageUrl} 
											onChange={(e) => setImageUrl(e.target.value)} 
										/>
									</div>

									<div className="flex items-center">
										<input 
											type="checkbox" 
											id="published"
											checked={isPublished} 
											onChange={(e) => setIsPublished(e.target.checked)} 
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
											Publikasikan artikel
										</label>
									</div>
								</div>

								<div className="space-y-6">
									<div>
										<div className="flex items-center justify-between mb-2">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Konten Artikel
											</label>
											<button 
												type="button"
												onClick={() => setShowPreview(!showPreview)}
												className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
											>
												{showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
												{showPreview ? 'Edit' : 'Preview'}
											</button>
										</div>
										{showPreview ? (
											<div className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-y-auto">
												<div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-500">Tidak ada konten untuk dipreview</p>' }} />
											</div>
										) : (
											<textarea 
												rows={12}
												className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" 
												placeholder="Tulis konten artikel di sini... (HTML)" 
												value={content} 
												onChange={(e) => setContent(e.target.value)} 
												required 
											/>
										)}
									</div>

									{imageUrl && (
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Preview Gambar
											</label>
											<div className="relative w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
												<img 
													src={imageUrl} 
													alt="Preview" 
													className="w-full h-full object-cover"
													onError={(e) => {
														e.currentTarget.style.display = 'none';
													}}
												/>
											</div>
										</div>
									)}
								</div>
							</div>

							{error && (
								<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
									<p className="text-red-600 dark:text-red-400">{error}</p>
								</div>
							)}

							<div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
								<Link href="/admin/blog" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
									<X className="w-5 h-5 mr-2" />
									Batal
								</Link>
								<button 
									type="submit"
									disabled={loading} 
									className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									{loading ? (
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
									) : (
										<Save className="w-5 h-5 mr-2" />
									)}
									{loading ? "Menyimpan..." : "Simpan Artikel"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
