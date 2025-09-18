"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		setLoading(false);
		if (res?.error) {
			setError("Email atau password salah");
			return;
		}
		// Check if user is admin and redirect accordingly
		const userRole = (res as any)?.user?.role;
		if (userRole === "admin") {
			router.replace("/admin");
		} else {
			router.replace("/");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Masuk ke Akun</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Silakan masuk untuk melanjutkan</p>
				</div>
				<div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
					<form onSubmit={onSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
									placeholder="nama@email.com"
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
									placeholder="Password Anda"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
								</button>
							</div>
						</div>
						{error && (
							<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
								<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
							</div>
						)}
						<button
							type="submit"
							disabled={loading}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? "Memproses..." : "Masuk"}
						</button>
					</form>
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Belum punya akun?{" "}
							<a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
								Daftar sekarang
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

