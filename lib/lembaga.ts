import type { Lembaga } from "@/types/lembaga";

// Import all lembaga data
import passData from "@/data/lembaga/pass.json";
import ppssData from "@/data/lembaga/ppss.json";
import smpPutraData from "@/data/lembaga/smp-putra.json";
import smaPutraData from "@/data/lembaga/sma-putra.json";
import ppAzzahroData from "@/data/lembaga/pp-azzahro.json";
import ppNurusData from "@/data/lembaga/pp-nurus.json";
import smpPutriData from "@/data/lembaga/smp-putri.json";
import smkPutriData from "@/data/lembaga/smk-putri.json";
import pqRanggehData from "@/data/lembaga/pq-ranggeh.json";
import ptBesukiData from "@/data/lembaga/pt-besuki.json";
import mdPutraData from "@/data/lembaga/md-putra.json";
import stitData from "@/data/lembaga/stit.json";
import paAutismData from "@/data/lembaga/pa-autism.json";

// Create a map of all lembaga
const lembagaMap: Record<string, Lembaga> = {
  pass: passData as Lembaga,
  ppss: ppssData as Lembaga,
  "smp-putra": smpPutraData as Lembaga,
  "sma-putra": smaPutraData as Lembaga,
  "pp-azzahro": ppAzzahroData as Lembaga,
  "pp-nurus": ppNurusData as Lembaga,
  "smp-putri": smpPutriData as Lembaga,
  "smk-putri": smkPutriData as Lembaga,
  "pq-ranggeh": pqRanggehData as Lembaga,
  "pt-besuki": ptBesukiData as Lembaga,
  "md-putra": mdPutraData as Lembaga,
  stit: stitData as Lembaga,
  "pa-autism": paAutismData as Lembaga,
};

/**
 * Get a specific lembaga by ID
 */
export function getLembagaById(id: string): Lembaga | undefined {
  return lembagaMap[id];
}

/**
 * Get all lembaga as an array
 */
export function getAllLembaga(): Lembaga[] {
  return Object.values(lembagaMap);
}

/**
 * Search lembaga by name or description
 */
export function searchLembaga(query: string): Lembaga[] {
  if (!query.trim()) return getAllLembaga();

  const q = query.toLowerCase();
  return getAllLembaga().filter(
    (lembaga) =>
      lembaga.name.toLowerCase().includes(q) ||
      lembaga.desc.toLowerCase().includes(q) ||
      lembaga.profil.deskripsi.toLowerCase().includes(q)
  );
}

/**
 * Group lembaga by type for navigation
 */
export function groupLembagaByType() {
  const grouped: Record<string, Lembaga[]> = {};

  getAllLembaga().forEach((lembaga) => {
    if (!grouped[lembaga.type]) {
      grouped[lembaga.type] = [];
    }
    grouped[lembaga.type].push(lembaga);
  });

  return grouped;
}

/**
 * Get lembaga for profile sections
 */
export function getProfilSections() {
  return [
    {
      title: "Pondok Pesantren",
      items: getAllLembaga().filter((l) => l.type === "ponpes"),
    },
    {
      title: "Sekolah Menengah Pertama",
      items: getAllLembaga().filter((l) => l.type === "smp"),
    },
    {
      title: "Sekolah Menengah Atas",
      items: getAllLembaga().filter((l) => l.type === "sma"),
    },
    {
      title: "Sekolah Menengah Kejuruan",
      items: getAllLembaga().filter((l) => l.type === "smk"),
    },
    {
      title: "Perguruan Tinggi & Madrasah",
      items: getAllLembaga().filter(
        (l) => l.type === "stit" || l.type === "madrasah"
      ),
    },
  ].filter((section) => section.items.length > 0);
}

/**
 * Format currency to IDR
 */
export function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}
