"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Building, ArrowLeft } from "lucide-react";

interface HouseType {
	id: number;
	name: string;
	price: number;
	image_url: string;
	spec_bedrooms: number;
	spec_bathrooms: number;
	spec_parking: number;
	created_at: string;
	updated_at: string;
}

export default function AdminHouseTypesPage() {
	const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchHouseTypes();
	}, []);

	const fetchHouseTypes = async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/admin/house-types");
			if (!res.ok) throw new Error("Failed to fetch house types");
			const data = await res.json();
			setHouseTypes(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Apakah Anda yakin ingin menghapus tipe rumah ini?")) return;
		
		try {
			const res = await fetch(`/api/admin/house-types/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete house type");
			setHouseTypes(houseTypes.filter(item => item.id !== id));
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
							<Building className="w-5 h-5 mr-3" />
							Dashboard
						</Link>
						<Link href="/admin/house-types" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-r-2 border-blue-500">
							<Building className="w-5 h-5 mr-3" />
							Tipe Rumah
						</Link>
						<Link href="/admin/blog" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<Building className="w-5 h-5 mr-3" />
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
								<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kelola Tipe Rumah</h1>
								<p className="text-gray-600 dark:text-gray-400">Kelola semua tipe rumah yang tersedia</p>
							</div>
							<Link href="/admin/house-types/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								<Plus className="w-5 h-5 mr-2" />
								Tambah Tipe
							</Link>
						</div>
					</div>

					{error && (
						<div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
							<p className="text-red-600 dark:text-red-400">{error}</p>
						</div>
					)}

					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
						{houseTypes.length === 0 ? (
							<div className="text-center py-12">
								<Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada tipe rumah</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">Mulai dengan menambahkan tipe rumah pertama</p>
								<Link href="/admin/house-types/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
									<Plus className="w-5 h-5 mr-2" />
									Tambah Tipe Rumah
								</Link>
							</div>
						) : (
							<div className="divide-y divide-gray-200 dark:divide-gray-700">
								{houseTypes.map((houseType) => (
									<div key={houseType.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
													{houseType.image_url ? (
														<img src={houseType.image_url} alt={houseType.name} className="w-full h-full object-cover rounded-lg" />
													) : (
														<Building className="w-8 h-8 text-gray-400" />
													)}
												</div>
												<div>
													<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{houseType.name}</h3>
													<p className="text-blue-600 dark:text-blue-400 font-medium">Rp {Number(houseType.price).toLocaleString("id-ID")}</p>
													<div className="flex gap-4 mt-1">
														<span className="text-sm text-gray-600 dark:text-gray-400">{houseType.spec_bedrooms} KT</span>
														<span className="text-sm text-gray-600 dark:text-gray-400">{houseType.spec_bathrooms} KM</span>
														<span className="text-sm text-gray-600 dark:text-gray-400">{houseType.spec_parking} Parkir</span>
													</div>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<Link href={`/admin/house-types/edit/${houseType.id}`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
													<Edit className="w-5 h-5" />
												</Link>
												<button onClick={() => handleDelete(houseType.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
