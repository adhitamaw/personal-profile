/** Local copies of assets from adhitamawtelyu.github.io */
export const ASSETS = {
  profile: "/assets/profile.jpg",
  cv: "/assets/CV_Adhitama Wichaksono ATS.pdf",
  thumbs: {
    fleet: "/assets/fleet-thumb.jpg",
    car: "/assets/car-thumb.jpg",
    bakery: "/assets/bakery-thumb.jpg",
    conf: "/assets/conf-thumb.jpg",
  },
  docs: {
    fleet:
      "/assets/Adhitama - Portofolio_Project_Power_BI_Fleet_Sales_Dashboard copy.pdf",
    car: "/assets/Data Analyst Car Sales Portofolio_compressed.pdf",
    bakery: "/assets/Adhitama Wichaksono_Analisis Tren Penjualan Bakery.pdf",
    ieee: "/assets/Conference Adhit icsecs 2025 (4)_compressed.pdf",
  },
} as const;

/** Encode path segments for URLs with spaces/special chars */
export function assetUrl(path: string): string {
  return path
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
}
