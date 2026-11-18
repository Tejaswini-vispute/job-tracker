/**
 * Company Branding & Logo Directory
 * Provides pristine offline-first vector SVG logos and brand styling
 * for all tech companies, enterprise employers, and startup opportunities.
 */

function svgToUri(svg) {
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg.trim());
}

// Crisp Vector SVG Logos for Major Tech Leaders
const BRAND_LOGOS = {
  google: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  `),

  microsoft: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <rect x="3" y="3" width="19" height="19" rx="2" fill="#F25022"/>
      <rect x="26" y="3" width="19" height="19" rx="2" fill="#7FBA00"/>
      <rect x="3" y="26" width="19" height="19" rx="2" fill="#00A4EF"/>
      <rect x="26" y="26" width="19" height="19" rx="2" fill="#FFB900"/>
    </svg>
  `),

  tcs: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 56">
      <text x="50%" y="40" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" fill="#0067B1" letter-spacing="-1.5">tcs</text>
      <path d="M22 47 Q 80 54 138 47" stroke="#007CC3" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </svg>
  `),

  zoho: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 54">
      <rect x="12" y="8" width="31" height="31" rx="8" fill="#E42527"/>
      <rect x="47" y="8" width="31" height="31" rx="8" fill="#2BA743"/>
      <rect x="82" y="8" width="31" height="31" rx="8" fill="#1C69D4"/>
      <rect x="117" y="8" width="31" height="31" rx="8" fill="#FFBA00"/>
      <text x="27.5" y="31.5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">Z</text>
      <text x="62.5" y="31.5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">O</text>
      <text x="97.5" y="31.5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">H</text>
      <text x="132.5" y="31.5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff">O</text>
      <text x="50%" y="49" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#555" letter-spacing="1.5">CORPORATION</text>
    </svg>
  `),

  infosys: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
      <text x="50%" y="35" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="34" font-weight="800" fill="#007CC3" letter-spacing="-0.5">Infosys</text>
      <circle cx="140" cy="18" r="3.5" fill="#007CC3"/>
    </svg>
  `),

  amazon: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 52">
      <text x="50%" y="30" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="32" font-weight="900" fill="#232F3E" letter-spacing="-1">amazon</text>
      <path d="M38 39 Q 80 50 122 39" stroke="#FF9900" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M116 36 L124 38 L119 45 Z" fill="#FF9900"/>
    </svg>
  `),

  accenture: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 48">
      <text x="12" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="29" font-weight="700" fill="#111827" letter-spacing="-0.5">accenture</text>
      <path d="M128 14 L142 24 L128 34" stroke="#A100FF" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),

  wipro: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 54">
      <g transform="translate(14, 8)">
        <circle cx="18" cy="19" r="6" fill="#341C53"/>
        <circle cx="18" cy="6" r="4" fill="#E42527"/>
        <circle cx="29" cy="10" r="4" fill="#FF9900"/>
        <circle cx="31" cy="23" r="4" fill="#2BA743"/>
        <circle cx="22" cy="32" r="4" fill="#00A4EF"/>
        <circle cx="9" cy="30" r="4" fill="#7161A8"/>
        <circle cx="6" cy="17" r="4" fill="#D2693F"/>
      </g>
      <text x="68" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="30" font-weight="800" fill="#341C53" letter-spacing="-0.5">wipro</text>
    </svg>
  `),

  ibm: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 56">
      <defs>
        <pattern id="ibm-stripes" width="100%" height="7" patternUnits="userSpaceOnUse">
          <rect width="100%" height="4" fill="#052FAD"/>
          <rect y="4" width="100%" height="3" fill="#ffffff"/>
        </pattern>
        <mask id="ibm-mask">
          <text x="50%" y="44" text-anchor="middle" font-family="'Arial Black', Impact, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="4">IBM</text>
        </mask>
      </defs>
      <rect width="150" height="56" fill="url(#ibm-stripes)" mask="url(#ibm-mask)"/>
    </svg>
  `),

  deloitte: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
      <text x="12" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="31" font-weight="800" fill="#111827" letter-spacing="-0.5">Deloitte</text>
      <circle cx="140" cy="31" r="5" fill="#86BC25"/>
    </svg>
  `),

  hcl: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
      <text x="50%" y="35" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="32" font-weight="900" fill="#0070AD" letter-spacing="1">HCLTech</text>
      <path d="M30 42 L130 42" stroke="#0070AD" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `),

  apple: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#111827" d="M32.8 25.1c0-6 4.9-8.9 5.1-9.1-2.8-4.1-7.2-4.6-8.7-4.7-3.7-.4-7.3 2.2-9.2 2.2-1.9 0-4.8-2.1-7.9-2.1-4 0-7.8 2.3-9.9 5.9-4.2 7.2-1.1 17.8 3 23.7 2 2.9 4.4 6.1 7.5 6 3-.1 4.2-2 7.8-2s4.7 2 7.8 1.9c3.2-.1 5.2-2.9 7.2-5.8 2.3-3.3 3.2-6.5 3.3-6.7-.1-.1-6-2.3-6-9.3zM28.1 7.6c1.6-2 2.8-4.8 2.5-7.6-2.4.1-5.3 1.6-7 3.6-1.5 1.7-2.8 4.6-2.5 7.3 2.7.2 5.4-1.3 7-3.3z"/>
    </svg>
  `),

  meta: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 52">
      <path fill="#0668E1" d="M32 15c-7 0-13 5-15 11-2 5-4 9-7 9-3 0-5-2-5-5 0-6 5-11 11-11 3 0 6 1 8 3-2 3-3 6-3 9 0 6 4 10 10 10 7 0 12-5 15-11 2-5 4-9 7-9 3 0 5 2 5 5 0 6-5 11-11 11-3 0-6-1-8-3 2-3 3-6 3-9 0-6-4-10-10-10z"/>
      <text x="62" y="34" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="28" font-weight="800" fill="#0668E1">Meta</text>
    </svg>
  `),

  netflix: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50">
      <text x="50%" y="36" text-anchor="middle" font-family="'Arial Black', Impact, sans-serif" font-size="34" font-weight="900" fill="#E50914" letter-spacing="1">NETFLIX</text>
    </svg>
  `)
};

// Specialized Vector Badges for Ecosystem & Startup Companies
const STARTUP_LOGOS = {
  northstar: {
    symbol: `<path d="M24 4 L28 18 L42 22 L28 26 L24 40 L20 26 L6 22 L20 18 Z" fill="#F4B942"/><circle cx="24" cy="22" r="3" fill="#ffffff"/>`,
    bg: "linear-gradient(135deg, #0D1E3A, #18335D)",
    text: "NORTHSTAR",
    accent: "#F4B942"
  },
  cedarwave: {
    symbol: `<path d="M8 24 Q 16 12 24 24 T 40 24" stroke="#25B387" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M8 30 Q 16 18 24 30 T 40 30" stroke="#77E2B6" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    bg: "linear-gradient(135deg, #0A2E22, #165641)",
    text: "CEDARWAVE",
    accent: "#25B387"
  },
  bluepeak: {
    symbol: `<polygon points="12,34 24,14 36,34" fill="#00A4EF"/><polygon points="20,34 28,18 36,34" fill="#4285F4" opacity=".85"/><polygon points="24,14 27,19 21,19" fill="#ffffff"/>`,
    bg: "linear-gradient(135deg, #091F38, #163B66)",
    text: "BLUEPEAK",
    accent: "#00A4EF"
  },
  orbitbridge: {
    symbol: `<ellipse cx="24" cy="22" rx="18" ry="8" stroke="#00D2FF" stroke-width="3" fill="none" transform="rotate(-20 24 22)"/><path d="M10 32 Q 24 20 38 32" stroke="#FF577F" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    bg: "linear-gradient(135deg, #121026, #291C56)",
    text: "ORBITBRIDGE",
    accent: "#00D2FF"
  },
  silverline: {
    symbol: `<line x1="8" y1="16" x2="38" y2="16" stroke="#93A5B8" stroke-width="4" stroke-linecap="round"/><line x1="12" y1="24" x2="42" y2="24" stroke="#D3E0EA" stroke-width="4" stroke-linecap="round"/><line x1="6" y1="32" x2="36" y2="32" stroke="#526E86" stroke-width="4" stroke-linecap="round"/>`,
    bg: "linear-gradient(135deg, #1C232B, #303B47)",
    text: "SILVERLINE",
    accent: "#D3E0EA"
  },
  pixelroute: {
    symbol: `<rect x="10" y="12" width="8" height="8" rx="2" fill="#FF5E36"/><rect x="20" y="12" width="8" height="8" rx="2" fill="#FFA136"/><rect x="20" y="22" width="8" height="8" rx="2" fill="#FF3366"/><rect x="30" y="22" width="8" height="8" rx="2" fill="#7928CA"/><rect x="30" y="32" width="8" height="8" rx="2" fill="#0070F3"/>`,
    bg: "linear-gradient(135deg, #1C1224, #361942)",
    text: "PIXELROUTE",
    accent: "#FF5E36"
  },
  vertex: {
    symbol: `<polygon points="24,10 38,20 38,36 24,44 10,36 10,20" stroke="#8A42FF" stroke-width="3" fill="none"/><line x1="24" y1="10" x2="24" y2="44" stroke="#8A42FF" stroke-width="2"/><line x1="10" y1="20" x2="38" y2="36" stroke="#8A42FF" stroke-width="2"/><circle cx="24" cy="27" r="4" fill="#00F0FF"/>`,
    bg: "linear-gradient(135deg, #190F2E, #31165A)",
    text: "VERTEX",
    accent: "#8A42FF"
  },
  securenest: {
    symbol: `<path d="M24 10 L36 15 V 26 C 36 33 24 38 24 38 C 24 38 12 33 12 26 V 15 Z" fill="#0EA5E9" opacity=".25" stroke="#0EA5E9" stroke-width="3"/><path d="M20 23 H 28 V 29 H 20 Z" fill="#10B981"/><path d="M22 23 V 19 C 22 17.5 26 17.5 26 19 V 23" stroke="#10B981" stroke-width="2.5" fill="none"/>`,
    bg: "linear-gradient(135deg, #09212E, #12435E)",
    text: "SECURENEST",
    accent: "#0EA5E9"
  },
  datavista: {
    symbol: `<rect x="10" y="28" width="6" height="12" rx="2" fill="#3B82F6"/><rect x="18" y="22" width="6" height="18" rx="2" fill="#60A5FA"/><rect x="26" y="16" width="6" height="24" rx="2" fill="#93C5FD"/><path d="M10 24 L 20 18 L 30 12 L 38 8" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    bg: "linear-gradient(135deg, #0F1F3D, #1E3B70)",
    text: "DATAVISTA",
    accent: "#3B82F6"
  },
  technova: {
    symbol: `<circle cx="24" cy="24" r="8" fill="#F43F5E"/><path d="M24 6 V 12 M24 36 V 42 M6 24 H 12 M36 24 H 42" stroke="#FDA4AF" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="24" rx="18" ry="6" stroke="#06B6D4" stroke-width="2.5" fill="none" transform="rotate(35 24 24)"/>`,
    bg: "linear-gradient(135deg, #2B0B17, #5C1933)",
    text: "TECHNOVA",
    accent: "#F43F5E"
  },
  nextgen: {
    symbol: `<path d="M14 14 Q 24 24 14 34" stroke="#A855F7" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M34 14 Q 24 24 34 34" stroke="#3B82F6" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="24" cy="24" r="4" fill="#22C55E"/>`,
    bg: "linear-gradient(135deg, #1D1030, #391B60)",
    text: "NEXTGEN AI",
    accent: "#A855F7"
  },
  cognitivefrontier: {
    symbol: `<circle cx="24" cy="24" r="16" stroke="#D97706" stroke-width="2.5" fill="none"/><polygon points="24,12 28,24 24,21 20,24" fill="#F59E0B"/><polygon points="24,36 28,24 24,27 20,24" fill="#78350F"/>`,
    bg: "linear-gradient(135deg, #2A1A08, #5A3611)",
    text: "COGNITIVE",
    accent: "#F59E0B"
  },
  launchcode: {
    symbol: `<path d="M24 10 C 20 18 16 26 16 34 H 32 C 32 26 28 18 24 10 Z" fill="#EF4444"/><circle cx="24" cy="22" r="3" fill="#ffffff"/><path d="M20 34 L 24 40 L 28 34" fill="#F59E0B"/>`,
    bg: "linear-gradient(135deg, #2E0B0B, #5C1818)",
    text: "LAUNCHCODE",
    accent: "#EF4444"
  },
  summit: {
    symbol: `<polygon points="12,36 24,16 34,36" fill="#64748B"/><polygon points="22,36 32,20 42,36" fill="#94A3B8"/><polygon points="24,16 27,21 21,21" fill="#F8FAFC"/><polygon points="32,20 34.5,24 29.5,24" fill="#F8FAFC"/>`,
    bg: "linear-gradient(135deg, #151C26, #2C3848)",
    text: "SUMMIT CORP",
    accent: "#94A3B8"
  }
};

function generateStartupSvg(cfg, companyName) {
  return svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 56">
      <defs>
        <linearGradient id="g_${cfg.text}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="44" height="44" rx="12" fill="${cfg.accent}" fill-opacity="0.14" stroke="${cfg.accent}" stroke-width="1.5"/>
      <g transform="translate(6, 4)">
        ${cfg.symbol}
      </g>
      <text x="58" y="32" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#1E293B" letter-spacing="-0.3">
        ${cfg.text}
      </text>
      <text x="58" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="${cfg.accent}" letter-spacing="1.2">
        ${(companyName || "TECHNOLOGIES").toUpperCase().slice(0, 16)}
      </text>
    </svg>
  `);
}

/**
 * Procedural Dynamic Modern Tech Emblem Generator
 * Guarantees every single company gets a vibrant, crisp vector logo badge.
 */
function makeDemoLogo(name = "Company") {
  const clean = String(name).trim();
  const initials = clean
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase() || "C";

  const PALETTES = [
    { bg1: "#0F766E", bg2: "#14B8A6", accent: "#5EEAD4", name: "teal" },
    { bg1: "#1E40AF", bg2: "#3B82F6", accent: "#93C5FD", name: "blue" },
    { bg1: "#6B21A8", bg2: "#A855F7", accent: "#E9D5FF", name: "purple" },
    { bg1: "#9A3412", bg2: "#EA580C", accent: "#FDBA74", name: "terracotta" },
    { bg1: "#15803D", bg2: "#22C55E", accent: "#86EFAC", name: "emerald" },
    { bg1: "#BE123C", bg2: "#F43F5E", accent: "#FDA4AF", name: "rose" },
    { bg1: "#0369A1", bg2: "#0284C7", accent: "#7DD3FC", name: "sky" },
    { bg1: "#854D0E", bg2: "#CA8A04", accent: "#FDE047", name: "amber" }
  ];

  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const pal = PALETTES[Math.abs(hash) % PALETTES.length];

  // Distinct procedural glyph patterns
  const patternType = Math.abs(hash >> 3) % 4;
  let glyph = "";
  if (patternType === 0) {
    // Hexagonal node
    glyph = `<polygon points="28,14 42,22 42,38 28,46 14,38 14,22" stroke="${pal.accent}" stroke-width="2.5" fill="none" opacity=".85"/><circle cx="28" cy="30" r="4" fill="${pal.accent}"/>`;
  } else if (patternType === 1) {
    // Overlapping orbitals
    glyph = `<circle cx="28" cy="30" r="14" stroke="${pal.accent}" stroke-width="2.5" fill="none" opacity=".7"/><ellipse cx="28" cy="30" rx="16" ry="7" stroke="${pal.accent}" stroke-width="2" fill="none" transform="rotate(45 28 30)"/>`;
  } else if (patternType === 2) {
    // Tech diamond
    glyph = `<polygon points="28,15 43,30 28,45 13,30" stroke="${pal.accent}" stroke-width="2.5" fill="none" opacity=".8"/><rect x="23" y="25" width="10" height="10" rx="2" fill="${pal.accent}" opacity=".9"/>`;
  } else {
    // Cyber bracket
    glyph = `<path d="M20 18 L14 24 L14 36 L20 42" stroke="${pal.accent}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M36 18 L42 24 L42 36 L36 42" stroke="${pal.accent}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 58">
      <defs>
        <linearGradient id="g_${Math.abs(hash)}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${pal.bg1}"/>
          <stop offset="100%" stop-color="${pal.bg2}"/>
        </linearGradient>
      </defs>
      <!-- Logo Tile Emblem -->
      <rect x="6" y="6" width="46" height="46" rx="14" fill="url(#g_${Math.abs(hash)})"/>
      <rect x="7" y="7" width="44" height="44" rx="13" stroke="${pal.accent}" stroke-width="1.2" fill="none" opacity=".4"/>
      <g transform="translate(1, -1)">
        ${glyph}
        <text x="28" y="36" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="0.5">${initials}</text>
      </g>
      <!-- Company Title -->
      <text x="60" y="31" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="15.5" font-weight="800" fill="#1E293B" letter-spacing="-0.3">
        ${clean.length > 12 ? clean.slice(0, 11) + "…" : clean}
      </text>
      <text x="60" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="${pal.bg2}" letter-spacing="1.2">
        VERIFIED EMPLOYER
      </text>
    </svg>
  `;

  return svgToUri(svg);
}

/**
 * Main Logo Resolver
 * Resolves company logo with 100% vector SVG coverage.
 */
export function getCompanyLogo(companyName = "") {
  if (!companyName) return makeDemoLogo("Career");
  const name = String(companyName).toLowerCase().trim();

  // 1. Check Top Brands
  const brandAliases = {
    google: ["google", "alphabet"],
    microsoft: ["microsoft", "msft"],
    tcs: ["tcs", "tata consultancy"],
    zoho: ["zoho"],
    infosys: ["infosys"],
    amazon: ["amazon", "aws", "amazon web services"],
    accenture: ["accenture"],
    wipro: ["wipro"],
    ibm: ["ibm"],
    deloitte: ["deloitte"],
    hcl: ["hcl", "hcltech"],
    apple: ["apple"],
    meta: ["meta", "facebook"],
    netflix: ["netflix"]
  };

  for (const [key, aliases] of Object.entries(brandAliases)) {
    if (aliases.some(alias => name.includes(alias))) {
      return BRAND_LOGOS[key];
    }
  }

  // 2. Check Startup Catalog
  const startupKeys = Object.keys(STARTUP_LOGOS);
  for (const key of startupKeys) {
    if (name.includes(key)) {
      return generateStartupSvg(STARTUP_LOGOS[key], companyName);
    }
  }

  // 3. Fallback to procedural dynamic vector logo
  return makeDemoLogo(companyName);
}

/**
 * Rich Company Theme & Metadata Provider
 * Provides accents, background photos, and company overviews
 * for carousel cards and modal details.
 */
export function getCompanyTheme(companyName = "", category = "") {
  const name = String(companyName).toLowerCase().trim();

  const THEMES = {
    google: {
      accent: "#4285F4",
      photo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=85",
      industry: "Technology & Cloud Computing",
      description: "Google organizes the world's information and makes it universally accessible and useful. Operating cutting-edge products across AI, Search, Cloud, and Web."
    },
    microsoft: {
      accent: "#00A4EF",
      photo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
      industry: "Enterprise Software & Cloud",
      description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge, empowering every person and organization to achieve more."
    },
    tcs: {
      accent: "#0067B1",
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      industry: "IT Services & Consulting",
      description: "Tata Consultancy Services is a global leader in IT services, consulting & business solutions partnering with the world's largest businesses."
    },
    zoho: {
      accent: "#E42527",
      photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
      industry: "Cloud Software & SaaS",
      description: "Zoho offers beautifully smart software to help you grow your business. With 100+ million users worldwide, Zoho is a privacy-first software leader."
    },
    infosys: {
      accent: "#007CC3",
      photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      industry: "Digital Services & Consulting",
      description: "Infosys is a global leader in next-generation digital services and consulting, enabling clients in 50+ countries to navigate their digital journey."
    },
    wipro: {
      accent: "#341C53",
      photo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      industry: "Technology Consulting",
      description: "Wipro delivers innovative technology-led solutions that help clients thrive in the digital economy through cloud, AI, and engineering."
    },
    accenture: {
      accent: "#A100FF",
      photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      industry: "Management & Tech Consulting",
      description: "Accenture is a leading global professional services company providing strategy, consulting, digital, technology and operations services."
    },
    amazon: {
      accent: "#FF9900",
      photo: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
      industry: "E-Commerce & Cloud Infrastructure",
      description: "Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking."
    },
    deloitte: {
      accent: "#86BC25",
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      industry: "Audit, Consulting & Advisory",
      description: "Deloitte drives progress through deep industry knowledge and innovative technology solutions across business advisory and technology."
    },
    hcl: {
      accent: "#0070AD",
      photo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
      industry: "Digital & Engineering Services",
      description: "HCLTech supercharges progress for enterprises with technology services built around digital, engineering, and cloud."
    }
  };

  for (const [key, th] of Object.entries(THEMES)) {
    if (name.includes(key)) return th;
  }

  // Category defaults
  const cat = String(category).toLowerCase();
  if (cat.includes("data")) {
    return {
      accent: "#3B82F6",
      photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      industry: "Data Science & Analytics",
      description: `${companyName} empowers organizations with advanced data intelligence, predictive analytics, and enterprise data reporting solutions.`
    };
  }
  if (cat.includes("corporate") || cat.includes("management")) {
    return {
      accent: "#0D9488",
      photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      industry: "Corporate & Business Operations",
      description: `${companyName} delivers high-impact management operations, business strategy, and client service excellence.`
    };
  }
  if (cat.includes("emerging") || cat.includes("ai")) {
    return {
      accent: "#9333EA",
      photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
      industry: "Emerging Technologies & AI",
      description: `${companyName} pioneers breakthrough innovations in artificial intelligence, spatial computing, and next-generation software systems.`
    };
  }
  if (cat.includes("fresher") || cat.includes("internship")) {
    return {
      accent: "#F97316",
      photo: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
      industry: "Technology Incubator & Talent",
      description: `${companyName} provides accelerated career launchpads, world-class mentorship, and real-world hands-on project experience.`
    };
  }

  // General tech default
  return {
    accent: "#B87558",
    photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    industry: "Technology & Software Development",
    description: `${companyName} is an active employer delivering modern digital platforms and high-performance engineering solutions.`
  };
}

export const companyLogos = BRAND_LOGOS;
