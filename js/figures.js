// 簡易示意圖（SVG），對應題目中「附圖」的甲～丁過程
const FIGURES = {
  geneticEngineering1: `
    <svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="遺傳工程示意圖一">
      <circle cx="60" cy="70" r="40" fill="none" stroke="#4a7fb5" stroke-width="3"/>
      <text x="60" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="16" fill="#345a82">甲（質體）</text>

      <text x="125" y="65" font-family="Klee One, cursive" font-size="18" fill="#e0915a">乙</text>
      <path d="M105 70 L150 70" stroke="#999" stroke-width="2" marker-end="url(#arrow1)"/>

      <path d="M195 40 A40 40 0 1 0 195 100" fill="none" stroke="#4a7fb5" stroke-width="3" stroke-dasharray="6 4"/>
      <text x="195" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="14" fill="#345a82">切開的質體</text>

      <rect x="250" y="60" width="55" height="18" rx="4" fill="#c9f0d6" stroke="#4caf50" stroke-width="2"/>
      <text x="277" y="50" text-anchor="middle" font-family="Klee One, cursive" font-size="16" fill="#4caf50">丙（目標基因）</text>

      <text x="335" y="65" font-family="Klee One, cursive" font-size="18" fill="#e0915a">丁</text>
      <path d="M320 70 L360 70" stroke="#999" stroke-width="2" marker-end="url(#arrow1)"/>

      <circle cx="420" cy="70" r="40" fill="none" stroke="#4a7fb5" stroke-width="3"/>
      <rect x="405" y="60" width="30" height="14" rx="3" fill="#c9f0d6" stroke="#4caf50" stroke-width="2"/>
      <text x="420" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="14" fill="#345a82">重組 DNA</text>

      <text x="470" y="65" font-family="Klee One, cursive" font-size="16" fill="#999">E</text>
      <path d="M460 70 L490 70" stroke="#999" stroke-width="2" marker-end="url(#arrow1)"/>
      <circle cx="500" cy="55" r="14" fill="#cbe3ff" stroke="#4a7fb5" stroke-width="2"/>
      <circle cx="500" cy="90" r="14" fill="#fff" stroke="#999" stroke-width="2"/>

      <defs>
        <marker id="arrow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#999"/>
        </marker>
      </defs>
    </svg>
  `,
  geneticEngineering2: `
    <svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="遺傳工程示意圖二">
      <circle cx="60" cy="70" r="40" fill="none" stroke="#4a7fb5" stroke-width="3"/>
      <text x="60" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="16" fill="#345a82">甲（質體）</text>

      <text x="125" y="65" font-family="Klee One, cursive" font-size="18" fill="#e0915a">乙</text>
      <path d="M105 70 L150 70" stroke="#999" stroke-width="2" marker-end="url(#arrow2)"/>

      <path d="M195 40 A40 40 0 1 0 195 100" fill="none" stroke="#4a7fb5" stroke-width="3" stroke-dasharray="6 4"/>
      <text x="195" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="14" fill="#345a82">切開的質體</text>

      <text x="250" y="50" text-anchor="middle" font-family="Klee One, cursive" font-size="16" fill="#999">＋</text>
      <path d="M250 60 L280 80" stroke="#777" stroke-width="3"/>
      <text x="290" y="95" text-anchor="middle" font-family="Klee One, cursive" font-size="16" fill="#4caf50">丙</text>

      <text x="345" y="65" font-family="Klee One, cursive" font-size="18" fill="#e0915a">丁</text>
      <path d="M330 70 L370 70" stroke="#999" stroke-width="2" marker-end="url(#arrow2)"/>

      <circle cx="430" cy="70" r="40" fill="none" stroke="#4a7fb5" stroke-width="3"/>
      <rect x="415" y="60" width="30" height="14" rx="3" fill="#c9f0d6" stroke="#4caf50" stroke-width="2"/>
      <text x="430" y="130" text-anchor="middle" font-family="Klee One, cursive" font-size="14" fill="#345a82">重組 DNA</text>

      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#999"/>
        </marker>
      </defs>
    </svg>
  `
};
