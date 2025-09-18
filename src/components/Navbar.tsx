"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();
	const isAdmin = (session?.user as any)?.role === "admin";
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur border-b border-black/5 dark:bg-black/40 dark:border-white/10">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg tracking-tight">Graha Bumi <span className="text-blue-600">Ngeling</span></Link>
				<nav className="hidden md:flex items-center gap-6 text-sm">
					<Link href="/" className="hover:text-blue-600">Home</Link>
					<Link href="/tentang" className="hover:text-blue-600">Tentang</Link>
					<Link href="/kontak" className="hover:text-blue-600">Kontak</Link>
                    <Link href="/blog" className="hover:text-blue-600">Blog</Link>
                    <Link href="/simulasi-kpr" className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Simulasi KPR</Link>
					{session ? (
						<div className="flex items-center gap-3">
							{isAdmin && <Link href="/admin" className="hover:text-blue-600">Dashboard</Link>}
							<button onClick={() => signOut()} className="text-sm hover:text-blue-600">Logout</button>
						</div>
					) : (
						<div className="flex items-center gap-3">
							<Link href="/login" className="hover:text-blue-600">Login</Link>
							<Link href="/signup" className="hover:text-blue-600">Sign Up</Link>
						</div>
					)}
				</nav>
				<button aria-label="Toggle menu" className="md:hidden p-2" onClick={() => setOpen(!open)}>
					<span className="block w-6 h-0.5 bg-current mb-1" />
					<span className="block w-6 h-0.5 bg-current mb-1" />
					<span className="block w-6 h-0.5 bg-current" />
				</button>
			</div>
			{open && (
				<div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-black">
					<div className="px-4 py-4 flex flex-col gap-3 text-sm">
						<Link href="/" onClick={() => setOpen(false)}>Home</Link>
						<Link href="/tentang" onClick={() => setOpen(false)}>Tentang</Link>
						<Link href="/kontak" onClick={() => setOpen(false)}>Kontak</Link>
                        <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
                        <Link href="/simulasi-kpr" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-4 py-2 mt-2">Simulasi KPR</Link>
						{session ? (
							<div className="flex items-center gap-3 pt-2">
								{isAdmin && <Link href="/admin" onClick={() => setOpen(false)} className="hover:text-blue-600">Dashboard</Link>}
								<button onClick={() => { setOpen(false); signOut(); }} className="text-left hover:text-blue-600">Logout</button>
							</div>
						) : (
							<div className="flex items-center gap-3 pt-2">
								<Link href="/login" onClick={() => setOpen(false)} className="hover:text-blue-600">Login</Link>
								<Link href="/signup" onClick={() => setOpen(false)} className="hover:text-blue-600">Sign Up</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
} 