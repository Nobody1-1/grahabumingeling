"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building, Save, X } from "lucide-react";

export default function EditHouseTypePage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const itemId = params?.id as string;
	const [name, setName] = useState("");
	const [price, setPrice] = useState<number | string>("");
const [imageUrl, setImageUrl] = useState("");
const [imagesText, setImagesText] = useState("");
const [bed, setBed] = useState(0);
const [bath, setBath] = useState(0);
const [park, setPark] = useState(0);
const [plafonPVC, setPlafonPVC] = useState(false);
const [aksesCorBeton, setAksesCorBeton] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		async function load() {
			try {
				setLoadingData(true);
				const res = await fetch(`/api/admin/house-types`);
				
				interface HouseType {
					id: number;
					name: string;
					price: number;
					image_url: string | null;
					images_json: string | null;
					spec_bedrooms: number;
					spec_bathrooms: number;
					spec_parking: number;
					spec_plafon_pvc: number;
					akses_cor_beton: number;
				}
				
				const all = await res.json() as HouseType[];
				const found = all.find((x: HouseType) => String(x.id) === String(itemId));
				if (found) {
                    setName(found.name || "");
					setPrice(found.price || "");
					setImageUrl(found.image_url || "");
                    try { if (found.images_json) setImagesText(JSON.parse(found.images_json).join('\n')); } catch {}
                    setBed(found.spec_bedrooms || 0);
                    setBath(found.spec_bathrooms || 0);
                    setPark(found.spec_parking || 0);
                    setPlafonPVC(!!found.spec_plafon_pvc);
                    setAksesCorBeton(!!found.akses_cor_beton);
				}
			} catch (e) {
				setError("Gagal memuat data");
			} finally {
				setLoadingData(false);
			}
		}
		if (itemId) load();
	}, [itemId]);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await fetch(`/api/admin/house-types/${itemId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
                name: name, 
                price: Number(price), 
                image_url: imageUrl, 
                images: imagesText,
                spec_bedrooms: bed,
                spec_bathrooms: bath,
                spec_parking: park,
                spec_plafon_pvc: plafonPVC,
                akses_cor_beton: aksesCorBeton
            }),
		});
		setLoading(false);
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data?.message || "Gagal menyimpan");
			return;
		}
		router.push("/admin/house-types");
	}

	if (loadingData) {
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
							<Building className="w-5 h-5 mr-3" />
							Dashboard
						</Link>
						<Link href="/admin/house-types" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-r-2 border-blue-500">
							<Building className="w-5 h-5 mr-3" />
							Tipe Rumah
						</Link>
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="ml-64">
				<div className="p-8">
					<div className="mb-8">
						<div className="flex items-center mb-4">
							<Link href="/admin/house-types" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-4">
								<ArrowLeft className="w-5 h-5 mr-2" />
								Kembali
							</Link>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Tipe Rumah</h1>
						<p className="text-gray-600 dark:text-gray-400">Ubah informasi tipe rumah</p>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
						<form onSubmit={onSubmit} className="p-8 space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Nama Tipe Rumah
										</label>
										<input 
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="Contoh: Tipe 45, Tipe 60, dll" 
											value={name} 
											onChange={(e) => setName(e.target.value)} 
											required 
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Harga (Rupiah)
										</label>
										<input 
											type="number"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="500000000" 
											value={price} 
											onChange={(e) => setPrice(e.target.value)} 
											required 
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											URL Gambar
										</label>
										<input 
											type="url"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
											placeholder="https://example.com/gambar-rumah.jpg" 
											value={imageUrl} 
											onChange={(e) => setImageUrl(e.target.value)} 
										/>
									</div>
								</div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kamar Tidur</label>
                                            <input type="number" min={0} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" value={bed} onChange={(e) => setBed(Number(e.target.value))} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kamar Mandi</label>
                                            <input type="number" min={0} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" value={bath} onChange={(e) => setBath(Number(e.target.value))} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parkir</label>
                                            <input type="number" min={0} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" value={park} onChange={(e) => setPark(Number(e.target.value))} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Galeri Gambar (satu URL per baris)</label>
                                        <textarea rows={6} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 resize-none" placeholder={`https://example.com/a.jpg\nhttps://example.com/b.jpg`} value={imagesText} onChange={(e) => setImagesText(e.target.value)} />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pisahkan dengan baris baru atau koma.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={plafonPVC} onChange={(e) => setPlafonPVC(e.target.checked)} /> Plafon PVC</label>
                                        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={aksesCorBeton} onChange={(e) => setAksesCorBeton(e.target.checked)} /> Akses Cor Beton</label>
                                    </div>

                                    {imageUrl && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview Gambar Utama</label>
                                            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
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
								<Link href="/admin/house-types" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
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
									{loading ? "Menyimpan..." : "Update Tipe Rumah"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
