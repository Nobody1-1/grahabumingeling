import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, FileText, Building, Users, Settings, LogOut } from "lucide-react";

export default async function AdminPage() {
	const session = await getServerSession(authOptions);
	if (!session || (session.user as any)?.role !== "admin") {
		redirect("/login");
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
						<Link href="/admin" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-r-2 border-blue-500">
							<Home className="w-5 h-5 mr-3" />
							Dashboard
						</Link>
						<Link href="/admin/house-types" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<Building className="w-5 h-5 mr-3" />
							Tipe Rumah
						</Link>
						<Link href="/admin/blog" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<FileText className="w-5 h-5 mr-3" />
							Blog
						</Link>
						<Link href="/admin/users" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<Users className="w-5 h-5 mr-3" />
							Pengguna
						</Link>
						<Link href="/admin/settings" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
							<Settings className="w-5 h-5 mr-3" />
							Pengaturan
						</Link>
					</nav>
					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<form action="/api/auth/signout" method="post">
							<button type="submit" className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
								<LogOut className="w-5 h-5 mr-3" />
								Logout
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="ml-64">
				<div className="p-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
						<p className="text-gray-600 dark:text-gray-400">Selamat datang kembali, {session.user?.name}</p>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<div className="flex items-center">
								<Building className="w-8 h-8 text-blue-500" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipe Rumah</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<div className="flex items-center">
								<FileText className="w-8 h-8 text-green-500" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Artikel Blog</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<div className="flex items-center">
								<Users className="w-8 h-8 text-purple-500" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pengguna</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<div className="flex items-center">
								<Settings className="w-8 h-8 text-orange-500" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pengaturan</p>
									<p className="text-2xl font-bold text-gray-900 dark:text-white">Aktif</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
							<div className="space-y-3">
								<Link href="/admin/house-types/new" className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
									<Building className="w-5 h-5 text-blue-500 mr-3" />
									<span className="text-blue-700 dark:text-blue-300">Tambah Tipe Rumah Baru</span>
								</Link>
								<Link href="/admin/blog/new" className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
									<FileText className="w-5 h-5 text-green-500 mr-3" />
									<span className="text-green-700 dark:text-green-300">Tulis Artikel Blog Baru</span>
								</Link>
								<Link href="/" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
									<Home className="w-5 h-5 text-gray-500 mr-3" />
									<span className="text-gray-700 dark:text-gray-300">Lihat Website</span>
								</Link>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Sistem</h3>
							<div className="space-y-3 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Status:</span>
									<span className="text-green-600 dark:text-green-400">Online</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Role:</span>
									<span className="text-blue-600 dark:text-blue-400">Administrator</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Terakhir Login:</span>
									<span className="text-gray-900 dark:text-white">Sekarang</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

