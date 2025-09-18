import { Instagram, Facebook, Music2 } from "lucide-react";

const items = [
	{ href: "https://www.tiktok.com/@youraccount", label: "TikTok", Icon: Music2, color: "bg-black" },
	{ href: "https://www.instagram.com/youraccount", label: "Instagram", Icon: Instagram, color: "bg-gradient-to-r from-pink-500 to-yellow-500" },
	{ href: "https://www.facebook.com/yourpage", label: "Facebook", Icon: Facebook, color: "bg-blue-600" },
];

export default function SocialBar() {
	return (
		<div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
			{items.map(({ href, label, Icon, color }) => (
				<a
					key={label}
					href={href}
					target="_blank"
					rel="noreferrer"
					className={`group ${color} text-white shadow-lg w-12 hover:w-40 transition-all duration-300 rounded-full overflow-hidden flex items-center h-12 px-3`}
				>
					<Icon size={20} className="shrink-0" />
					<span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						{label}
					</span>
				</a>
			))}
		</div>
	);
}
