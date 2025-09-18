import Image from "next/image";
import Link from "next/link";
import { query } from "@/lib/db";
import HouseGallery from "@/components/HouseGallery";

interface HouseType {
  id: number;
  name: string;
  deskripsi: string | null;
  price: number;
  image_url: string | null;
  images_json?: string | null;
  spec_bedrooms: number;
  spec_bathrooms: number;
  spec_parking: number;
  spec_plafon_pvc?: number;
  akses_cor_beton?: number;
  created_at: string;
  updated_at: string;
}

async function getHouseType(id: string): Promise<HouseType | null> {
  const rows = await query<HouseType>(
    "SELECT id, name, price,deskripsi, image_url, images_json, spec_bedrooms, spec_bathrooms, spec_parking, spec_plafon_pvc, akses_cor_beton, created_at, updated_at FROM house_types WHERE id = ? LIMIT 1",
    [Number(id)]
  );
  if (Array.isArray(rows) && rows.length > 0) return rows[0];
  return null;
}

export default async function HouseTypeDetailPage({ params }: { params: { id: string } }) {
  // Await params sesuai dengan peringatan Next.js 15
  const { id } = await params;
  const house = await getHouseType(id);
  if (!house) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Tipe Rumah tidak ditemukan</h1>
        <p className="mt-2 text-black/70 dark:text-white/80">Data tidak tersedia atau sudah dihapus.</p>
        <div className="mt-6">
          <Link href="/" className="inline-flex items-center rounded-full bg-blue-600 text-white px-5 py-3 hover:bg-blue-700">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  function cleanUrl(u: string | null | undefined): string | null {
    if (!u) return null;
    const s = String(u).trim().replace(/^@+/, "").replace(/^hhttps:\/\//i, "https://");
    return /^https?:\/\//i.test(s) ? s : null;
  }

  // Prepare hero image (single image at the top)
  const heroImage = cleanUrl(house.image_url) || "/foto-rumah1.png";
  
  // Prepare gallery images (multiple images at the bottom)
  let galleryImages: string[] = [];
  try {
    if (house.images_json) {
      console.log("Raw images_json:", house.images_json);
      
      // Periksa apakah images_json sudah berupa array
      if (Array.isArray(house.images_json)) {
        // Jika sudah berupa array, gunakan langsung
        galleryImages = house.images_json
          .map(url => typeof url === 'string' ? cleanUrl(url) : null)
          .filter(Boolean) as string[];
      } else if (typeof house.images_json === 'string') {
        // Jika images_json adalah string kosong, gunakan array kosong
        if (house.images_json.trim() === '') {
          galleryImages = [];
        } else {
          // Coba parse sebagai JSON
          try {
            const parsed = JSON.parse(house.images_json);
            if (Array.isArray(parsed)) {
              // Jika hasil parse adalah array, gunakan langsung
              galleryImages = parsed.map(url => cleanUrl(url)).filter(Boolean) as string[];
            } else if (typeof parsed === 'string') {
              // Jika hasil parse adalah string tunggal
              const cleanedUrl = cleanUrl(parsed);
              if (cleanedUrl) galleryImages = [cleanedUrl];
            }
          } catch (e) {
            // Jika JSON parsing gagal, coba sebagai string dengan pemisah koma
            galleryImages = house.images_json
              .split(',')
              .map(url => cleanUrl(url))
              .filter(Boolean) as string[];
          }
        }
      }
    }
    
    console.log("Final gallery images:", galleryImages);
  } catch (error) {
    console.error("Error processing images_json:", error);
    galleryImages = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Image */}
      <div className="mb-8">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
          <Image src={heroImage} alt={house.name || "Foto rumah"} fill priority className="object-cover" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{house.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-blue-600">Rp {Number(house.price).toLocaleString("id-ID")}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Spesifikasi</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">{house.spec_bedrooms} Kamar Tidur</li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">{house.spec_bathrooms} Kamar Mandi</li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">{house.spec_parking} Parkir</li>
              {typeof house.spec_plafon_pvc !== 'undefined' && (
                <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">Plafon PVC: {house.spec_plafon_pvc ? 'Ya' : 'Tidak'}</li>
              )}
              {typeof house.akses_cor_beton !== 'undefined' && (
                <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">Akses Cor Beton: {house.akses_cor_beton ? 'Ya' : 'Tidak'}</li>
              )}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/6285325085188" target="_blank" className="inline-flex items-center rounded-full bg-blue-600 text-white px-5 py-3 hover:bg-blue-700">Tanya Harga</a>
            <a href="https://wa.me/6285325085188?text=Halo%20Admin,%20saya%20ingin%20jadwalkan%20kunjungan%20untuk%20{house.name}" target="_blank" className="inline-flex items-center rounded-full border border-blue-600 text-blue-600 px-5 py-3 hover:bg-blue-50">Jadwalkan Kunjungan</a>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Deskripsi</h2>
            <p className="mt-3 text-black/70 dark:text-white/80">{house.deskripsi}</p>
          </div>
        </div>
        
        {/* House Gallery Section */}
        <div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Galeri Foto</h2>
            {galleryImages.length > 0 ? (
              <HouseGallery images={galleryImages} />
            ) : (
              <p className="text-gray-500">Tidak ada foto tambahan tersedia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


