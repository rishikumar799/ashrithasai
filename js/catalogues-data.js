// Default catalogues data to seed localStorage if empty
const DEFAULT_CATALOGUES = [
  {
    id: "cat_1",
    title: "Hindware Bau Catalogue (Revised Pricing 2025)",
    brand: "hindware",
    logo: "images/hindware.png",
    status: "Active",
    pdfs: [
      { id: "pdf_1", name: "Bau Catalogue - Revised pricing 2025.pdf", path: "pdf/Bau Catalogue - Revised pricing 2025.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_2",
    title: "Alive High Gloss Tiles",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_2", name: "ALIVE_HIGH GLOSSY.pdf", path: "pdf/ALIVE_HIGH GLOSSY.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_3",
    title: "Alive Matt Tiles 600x1200",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_3", name: "Alive_Matt 600x1200mm.pdf", path: "pdf/Alive_Matt 600x1200mm.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_4",
    title: "Alive Glory Collection",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_4", name: "ALIVE_GLORY CATALOGUE-1.pdf", path: "pdf/ALIVE_GLORY CATALOGUE-1.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_5",
    title: "Alive Carving Tiles 600x1200",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_5", name: "Alive_Carving 600x1200mm.pdf", path: "pdf/Alive_Carving 600x1200mm.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_6",
    title: "Alive 16x16 Plain Series",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_6", name: "Alive_16X16 PLAIN SERIES.pdf", path: "pdf/Alive_16X16 PLAIN SERIES.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_7",
    title: "Endless Wooden Series",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_7", name: "ENDLESS WOODEN.pdf", path: "pdf/ENDLESS WOODEN.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_8",
    title: "Alive 16x16 Punch Series",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_8", name: "Alive_16X16 PUNCH SERIES.pdf", path: "pdf/Alive_16X16 PUNCH SERIES.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_9",
    title: "Alive 16x16 New Design Series",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_9", name: "Alive_16X16 NEW DESIGN.pdf", path: "pdf/Alive_16X16 NEW DESIGN.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_10",
    title: "Alive 16x16 Dani Punch Series",
    brand: "alive",
    logo: "images/alive.png",
    status: "Active",
    pdfs: [
      { id: "pdf_10", name: "Alive_16X16 DANI PUNCH SERIES.pdf", path: "pdf/Alive_16X16 DANI PUNCH SERIES.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_11",
    title: "Grohe Colours – New MRP (June 2025)",
    brand: "grohe",
    logo: "images/grohe.png",
    status: "Active",
    pdfs: [
      { id: "pdf_11", name: "GROHE -COLORS- NEW MRP PPT-JUNE-25.pdf", path: "pdf/GROHE -COLORS- NEW MRP PPT-JUNE-25.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_12",
    title: "Grohe New MRP PPT (June 2025)",
    brand: "grohe",
    logo: "images/grohe.png",
    status: "Active",
    pdfs: [
      { id: "pdf_12", name: "GROHE - NEW MRP PPT JUNE-25.pdf", path: "pdf/GROHE - NEW MRP PPT JUNE-25.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_13",
    title: "Grohe Smart Control Catalogue",
    brand: "grohe",
    logo: "images/grohe.png",
    status: "Active",
    pdfs: [
      { id: "pdf_13", name: "GROHE_SPA_SMARTCONTROL.pdf", path: "pdf/GROHE_SPA_SMARTCONTROL.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_14",
    title: "Varmora Cover9ine Collection",
    brand: "varmora",
    logo: "images/varmora.png",
    status: "Active",
    pdfs: [
      { id: "pdf_14", name: "Cover9ine-Collection.pdf", path: "pdf/Cover9ine-Collection.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_15",
    title: "Somany Complete Catalogue",
    brand: "somany",
    logo: "images/somany.png",
    status: "Active",
    pdfs: [
      { id: "pdf_15", name: "somany.pdf", path: "pdf/somany.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_16",
    title: "Somany GVT Italica 600x600",
    brand: "somany",
    logo: "images/somany.png",
    status: "Active",
    pdfs: [
      { id: "pdf_16", name: "600x600_GVT_ITALICA.pdf", path: "pdf/600x600_GVT_ITALICA.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_17",
    title: "Somany GVT Italica 600x1200",
    brand: "somany",
    logo: "images/somany.png",
    status: "Active",
    pdfs: [
      { id: "pdf_17", name: "600x1200_GVT_ITALICA.pdf", path: "pdf/600x1200_GVT_ITALICA.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_18",
    title: "Kerovit Bathroom Furniture Catalogue",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_18", name: "Kerovit Bathroom Furniture Catalogue .pdf", path: "pdf/Kerovit Bathroom Furniture Catalogue .pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_19",
    title: "Kerovit Price List 2025",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_19", name: "Kerovit Price List (AI) 2025 .pdf", path: "pdf/Kerovit Price List (AI) 2025 .pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_20",
    title: "Kerovit Price List 2026",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_20", name: "Kerovit Price List (AI) 2026 .pdf", path: "pdf/Kerovit Price List (AI) 2026 .pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_21",
    title: "Kerovit Price List May 2026 (AIEK)",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_21", name: "Kerovit Price List- May 2026- AIEK.pdf", path: "pdf/Kerovit Price List- May 2026- AIEK.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_22",
    title: "Kerovit Price List May 2026 (AIEK) - Copy",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_22", name: "Kerovit Price List- May 2026- AIEK (1).pdf", path: "pdf/Kerovit Price List- May 2026- AIEK (1).pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  },
  {
    id: "cat_23",
    title: "Aurum Price List May 2026 (AIEK)",
    brand: "kerovit",
    logo: "images/kerovit.png",
    status: "Active",
    pdfs: [
      { id: "pdf_23", name: "Aurum Price List May 2026- AIEK.pdf", path: "pdf/Aurum Price List May 2026- AIEK.pdf", size: "Unknown", date: new Date().toISOString() }
    ]
  }
];

// Helper to get catalogues
function getCatalogues() {
  const saved = localStorage.getItem('ashritha_catalogues');
  if (saved) {
    return JSON.parse(saved);
  } else {
    localStorage.setItem('ashritha_catalogues', JSON.stringify(DEFAULT_CATALOGUES));
    return DEFAULT_CATALOGUES;
  }
}

// Helper to save catalogues
function saveCatalogues(cataloguesArray) {
  localStorage.setItem('ashritha_catalogues', JSON.stringify(cataloguesArray));
}
