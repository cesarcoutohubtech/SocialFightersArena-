import React, { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  Trophy,
  Swords,
  Flame,
  Sparkles,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  Share2,
  RotateCcw,
  Home,
  User,
  Crown,
  Medal,
  Star,
  Download,
  Trash2,
  AlertTriangle,
  Plus,
  Unplug,
  Linkedin,
  Instagram,
  Facebook,
  Music2,
} from "lucide-react";

// =============================================================================
// FIGHTER DATA — 10 arquétipos (5/15 classes do PRD)
// =============================================================================

const FIGHTERS = {
  ceo: {
    id: "ceo",
    profile: {
      label: "Fundador(a) de startup",
      signal: "LinkedIn dominante · liderança, captação, métricas",
      network: "linkedin",
    },
    fighterName: "BARÃO DO BOARD",
    className: "CEO GLADIATOR",
    tagline: "Lento, pesado, controlador de arena.",
    lore:
      "Forjado em reuniões de 07h. Dorme abraçado com o P&L. Seu olhar derruba três slides por segundo.",
    colors: { primary: "#ff2e63", accent: "#fdc700", glow: "#ff2e63" },
    scenario: "Sala de reuniões panorâmica ao pôr do sol",
    weakness: "Creator Ninja, Influencer Rogue",
    attrs: { strength: 70, speed: 35, charisma: 65, strategy: 88, creativity: 42, resistance: 76, influence: 80, technique: 60, viralPower: 48, defense: 72 },
    powers: {
      common: [
        { name: "BOARD STRIKE", dmg: 16, desc: "Pauta em você." },
        { name: "ALINHAMENTO FORÇADO", dmg: 11, desc: "Reduz defesa inimiga." },
        { name: "REUNIÃO DE GUERRA", dmg: 0, heal: 14, desc: "Agenda aberta, HP recupera." },
      ],
      rare: { name: "FUNIL REVERSO", dmg: 26, desc: "Inverte o próximo golpe." },
      legendary: { name: "DECISÃO FINAL", dmg: 42, stun: true, desc: "Oponente paralisado 1 turno." },
    },
    intro: "A pauta de hoje é você.",
    victory: "Reunião encerrada. Próximo.",
  },
  fitness: {
    id: "fitness",
    profile: {
      label: "Influenciador(a) fitness",
      signal: "Instagram dominante · treino, nutrição, motivação",
      network: "instagram",
    },
    fighterName: "COMANDANTE CARDIO",
    className: "FITNESS BRAWLER",
    tagline: "Tanque explosivo. Só mais uma série.",
    lore:
      "Acorda antes do sol. Já fez jejum intermitente até do seu HP. Cada respiração vira repetição extra.",
    colors: { primary: "#fdc700", accent: "#00e5ff", glow: "#fdc700" },
    scenario: "Trilha de montanha ao nascer do sol",
    weakness: "Marketing Berserker, Teacher Master",
    attrs: { strength: 84, speed: 72, charisma: 70, strategy: 38, creativity: 50, resistance: 88, influence: 76, technique: 55, viralPower: 62, defense: 60 },
    powers: {
      common: [
        { name: "SUPINO BRUTAL", dmg: 20, desc: "Barra cheia, dano pesado." },
        { name: "CARDIO DASH", dmg: 9, desc: "Velocidade +25% 1 turno." },
        { name: "MODO MONSTRO", dmg: 15, desc: "Força +25% 1 turno." },
      ],
      rare: { name: "REPETIÇÃO MÁXIMA", dmg: 28, desc: "Bis do último golpe." },
      legendary: { name: "TREND SURGE", dmg: 38, desc: "Viraliza: dano escala com Poder Viral." },
    },
    intro: "Bora, bora, bora.",
    victory: "Só mais uma série.",
  },
  lawyer: {
    id: "lawyer",
    profile: {
      label: "Advogado(a)",
      signal: "LinkedIn + Facebook · jurisprudência, artigos, cases",
      network: "linkedin",
    },
    fighterName: "DR. CLÁUSULA OCULTA",
    className: "LEGAL WARRIOR",
    tagline: "Defensivo, com contra-ataques letais.",
    lore:
      "Argumenta em petit committé, vence em acórdão. Seu martelo cartoon desmonta teses como origami.",
    colors: { primary: "#7c3aed", accent: "#fdc700", glow: "#c084fc" },
    scenario: "Tribunal com bancada elevada e holofotes",
    weakness: "Sales Striker, Doctor Healer",
    attrs: { strength: 55, speed: 42, charisma: 68, strategy: 82, creativity: 58, resistance: 70, influence: 65, technique: 80, viralPower: 40, defense: 85 },
    powers: {
      common: [
        { name: "CONTRATO SUPREMO", dmg: 14, desc: "Cláusula vinculante, dano consistente." },
        { name: "OBJEÇÃO", dmg: 8, desc: "30% de cancelar golpe adversário." },
        { name: "CLÁUSULA OCULTA", dmg: 18, desc: "Dano com 1 turno de atraso." },
      ],
      rare: { name: "MARTELO DA JUSTIÇA", dmg: 24, desc: "Reverte o último dano recebido." },
      legendary: { name: "ASSINATURA NA HORA", dmg: 32, stun: true, desc: "Bloqueia especial inimigo." },
    },
    intro: "Protocolado.",
    victory: "Caso encerrado, com procedência.",
  },
  dev: {
    id: "dev",
    profile: {
      label: "Pessoa desenvolvedora",
      signal: "GitHub + Twitter/X + LinkedIn · código, sistemas, memes tech",
      network: "linkedin",
    },
    fighterName: "MAGO DO DEPLOY",
    className: "CODE MAGE",
    tagline: "Inteligente. Condicionais em cadeia.",
    lore:
      "Invoca compiladores antigos. Joga git reset na sua dignidade. Dorme com hoodie.",
    colors: { primary: "#00e5ff", accent: "#22c55e", glow: "#00e5ff" },
    scenario: "Sala escura com múltiplas telas piscando",
    weakness: "Influencer Rogue, Sales Striker",
    attrs: { strength: 52, speed: 68, charisma: 40, strategy: 80, creativity: 85, resistance: 62, influence: 55, technique: 86, viralPower: 58, defense: 58 },
    powers: {
      common: [
        { name: "BUG FANTASMA", dmg: 12, desc: "50% do próximo golpe falhar." },
        { name: "API STRIKE", dmg: 17, ignoreDef: true, desc: "Ignora defesa inimiga." },
        { name: "PATCH NOTURNO", dmg: 0, heal: 12, desc: "Cura em 3 turnos." },
      ],
      rare: { name: "FIREWALL SHIELD", dmg: 0, heal: 8, desc: "Imune a próximo especial." },
      legendary: { name: "PROTOCOLO ZERO", dmg: 34, desc: "Reseta cooldowns. Compila tudo." },
    },
    intro: "Compilando...",
    victory: "Mergeado na main.",
  },
  realestate: {
    id: "realestate",
    profile: {
      label: "Corretor(a) de imóveis",
      signal: "Instagram + Facebook · tours, lifestyle, chaves entregues",
      network: "instagram",
    },
    fighterName: "TITÃ DAS CHAVES",
    className: "REAL ESTATE TITAN",
    tagline: "Controlador de território. Negocia no ringue.",
    lore:
      "Conhece o preço do m² do seu coração. Fecha proposta no intervalo do turno. Mostra a planta no meio do soco.",
    colors: { primary: "#22c55e", accent: "#fdc700", glow: "#22c55e" },
    scenario: "Cobertura com borda infinita e skyline",
    weakness: "Creator Ninja, Teacher Master",
    attrs: { strength: 62, speed: 55, charisma: 82, strategy: 70, creativity: 60, resistance: 68, influence: 78, technique: 65, viralPower: 60, defense: 70 },
    powers: {
      common: [
        { name: "TOUR GUIADO", dmg: 13, desc: "Leva oponente pelo ringue." },
        { name: "VISITA SURPRESA", dmg: 16, desc: "Chegada inesperada." },
        { name: "PROPOSTA CHEIA", dmg: 11, desc: "Carisma +20%." },
      ],
      rare: { name: "COLAB COMBO", dmg: 22, desc: "Aliado simulado soca junto." },
      legendary: { name: "ASSINATURA NA HORA", dmg: 36, stun: true, desc: "Bloqueia especial inimigo." },
    },
    intro: "Esse imóvel é raro, igual você perder dessa.",
    victory: "Chaves na mão.",
  },
  sales: {
    id: "sales",
    profile: {
      label: "Vendedor(a) / Account Executive",
      signal: "LinkedIn dominante · pipeline, fechamentos, metas",
      network: "linkedin",
    },
    fighterName: "TUBARÃO DO PIPELINE",
    className: "SALES STRIKER",
    tagline: "Pressão constante. Provoca. Fecha.",
    lore:
      "Mete pitch no segurança da portaria. Tem follow-up marcado até no aniversário da sogra. Quota é religião.",
    colors: { primary: "#fb7185", accent: "#fde047", glow: "#fb7185" },
    scenario: "Sala de vidros com cidade ao fundo e CRM piscando",
    weakness: "Legal Warrior, Doctor Healer",
    attrs: { strength: 58, speed: 66, charisma: 86, strategy: 62, creativity: 55, resistance: 64, influence: 74, technique: 58, viralPower: 60, defense: 52 },
    powers: {
      common: [
        { name: "PITCH RELÂMPAGO", dmg: 13, desc: "Dano rápido, sem cooldown." },
        { name: "FOLLOW-UP INFINITO", dmg: 8, desc: "Golpes leves repetidos." },
        { name: "OBJEÇÃO QUEBRADA", dmg: 10, desc: "Reduz defesa inimiga." },
      ],
      rare: { name: "COMBO DE CONVERSÃO", dmg: 23, desc: "Dano cresce a cada acerto seguido." },
      legendary: { name: "FECHAMENTO MORTAL", dmg: 40, desc: "Crítico garantido contra inimigo fraco." },
    },
    intro: "Vamos fechar agora ou fechar agora?",
    victory: "Proposta aceita.",
  },
  creator: {
    id: "creator",
    profile: {
      label: "Criador(a) de conteúdo",
      signal: "TikTok dominante · vídeos curtos, trends, edição",
      network: "tiktok",
    },
    fighterName: "NINJA DO CORTE",
    className: "CREATOR NINJA",
    tagline: "Ágil. Combos rápidos. Imprevisível.",
    lore:
      "Vive em 9:16. Corta até a luz do quarto. Já editou uma briga enquanto ela acontecia.",
    colors: { primary: "#f472b6", accent: "#22d3ee", glow: "#f472b6" },
    scenario: "Studio de gravação com aro de luz e croma",
    weakness: "CEO Gladiator, Legal Warrior",
    attrs: { strength: 48, speed: 86, charisma: 72, strategy: 55, creativity: 88, resistance: 48, influence: 78, technique: 70, viralPower: 82, defense: 46 },
    powers: {
      common: [
        { name: "CUT RÁPIDO", dmg: 11, desc: "Corta o turno do oponente." },
        { name: "TREND JUMP", dmg: 14, desc: "Velocidade +20%." },
        { name: "MONTAGEM CAÓTICA", dmg: 12, desc: "Dano variável, sempre surpresa." },
      ],
      rare: { name: "HASHTAG SHARP", dmg: 21, desc: "Ataque de alta cobertura." },
      legendary: { name: "VIRAL BLAST", dmg: 44, desc: "Dano escala com Poder Viral." },
    },
    intro: "Gravando em 3, 2, 1...",
    victory: "E esse foi o replay, galera.",
  },
  doctor: {
    id: "doctor",
    profile: {
      label: "Médico(a) / profissional de saúde",
      signal: "LinkedIn · plantões, saúde pública, casos clínicos",
      network: "linkedin",
    },
    fighterName: "CÓDIGO AZUL",
    className: "DOCTOR HEALER",
    tagline: "Suporte. Dano moderado. Cura pesada.",
    lore:
      "36 horas acordado. Diagnosticou sua lesão cartoon no refeitório e assinou receita no guardanapo.",
    colors: { primary: "#06b6d4", accent: "#f5efdc", glow: "#06b6d4" },
    scenario: "Corredor de hospital com luz branca clínica",
    weakness: "Marketing Berserker, Sales Striker",
    attrs: { strength: 44, speed: 58, charisma: 66, strategy: 80, creativity: 55, resistance: 82, influence: 60, technique: 88, viralPower: 40, defense: 78 },
    powers: {
      common: [
        { name: "DIAGNÓSTICO RÁPIDO", dmg: 10, desc: "Revela e enfraquece o inimigo." },
        { name: "SUTURA CORTANTE", dmg: 14, desc: "Corte preciso." },
        { name: "PULSO ELÉTRICO", dmg: 16, desc: "Choque controlado." },
      ],
      rare: { name: "PATCH HOTFIX", dmg: 0, heal: 18, desc: "Cura sustentada." },
      legendary: { name: "CÓDIGO AZUL", dmg: 0, heal: 45, desc: "Ressuscita 45 HP, 1x por luta." },
    },
    intro: "Mantém a calma, eu conduzo.",
    victory: "Estável.",
  },
  marketing: {
    id: "marketing",
    profile: {
      label: "Marketing / growth",
      signal: "LinkedIn + Instagram · campanhas, growth, branding",
      network: "linkedin",
    },
    fighterName: "FÚRIA DO BRIEFING",
    className: "MARKETING BERSERKER",
    tagline: "Explosivo. Buffs curtos. Caos calculado.",
    lore:
      "Acorda com insight, dorme com roadmap. Três landing pages no ônibus. Post-it é mantra.",
    colors: { primary: "#a855f7", accent: "#fde047", glow: "#a855f7" },
    scenario: "Sala de brainstorming com post-its voando",
    weakness: "Finance Guardian, Doctor Healer",
    attrs: { strength: 60, speed: 70, charisma: 80, strategy: 65, creativity: 86, resistance: 58, influence: 74, technique: 60, viralPower: 72, defense: 48 },
    powers: {
      common: [
        { name: "CAMPANHA RELÂMPAGO", dmg: 14, desc: "Atinge em área." },
        { name: "CTR STRIKE", dmg: 16, desc: "Crítico em defesa baixa." },
        { name: "REBRAND SHOCK", dmg: 8, desc: "Reduz carisma inimigo." },
      ],
      rare: { name: "TREND ATTACK", dmg: 22, desc: "Dano extra se inimigo viralizou." },
      legendary: { name: "FUNIL REVERSO", dmg: 36, desc: "Confunde: inverte próximos golpes." },
    },
    intro: "Brief aprovado às 23h55.",
    victory: "Campanha no ar.",
  },
  teacher: {
    id: "teacher",
    profile: {
      label: "Professor(a) / formador(a)",
      signal: "LinkedIn + Facebook · aulas, cursos, pedagogia",
      network: "linkedin",
    },
    fighterName: "MESTRE DA CORREÇÃO",
    className: "TEACHER MASTER",
    tagline: "Debuff puro. Remove vantagens.",
    lore:
      "Corrige cartoon com caneta vermelha de três quilômetros. Faz prova oral até em primeiro encontro.",
    colors: { primary: "#dc2626", accent: "#f5efdc", glow: "#dc2626" },
    scenario: "Sala de aula com quadro negro gigante e mapas",
    weakness: "Creator Ninja, Influencer Rogue",
    attrs: { strength: 52, speed: 44, charisma: 70, strategy: 86, creativity: 62, resistance: 72, influence: 64, technique: 84, viralPower: 38, defense: 76 },
    powers: {
      common: [
        { name: "PROVA SURPRESA", dmg: 15, desc: "Dano baseado em timing." },
        { name: "CORREÇÃO VERMELHA", dmg: 10, desc: "Dano acumulativo." },
        { name: "REDAÇÃO CRÍTICA", dmg: 13, desc: "Reduz força inimiga." },
      ],
      rare: { name: "CHAMADA ORAL", dmg: 20, desc: "Inimigo perde turno se errar." },
      legendary: { name: "AULA DADA", dmg: 38, desc: "Zera buffs inimigos e aplica dano massivo." },
    },
    intro: "Abram o caderno.",
    victory: "Aula dada.",
  },
};

const FIGHTER_ORDER = [
  "ceo", "fitness", "lawyer", "dev", "realestate",
  "sales", "creator", "doctor", "marketing", "teacher",
];

// =============================================================================
// STORAGE (persistência de ranking, stats, fighter do jogador)
// =============================================================================

// =============================================================================
// STORAGE ADAPTER
// Prefere window.storage (artifact Claude). Cai em localStorage em qualquer
// outro ambiente (CodeSandbox, Vercel, dev local). Em SSR / sem window, vira
// in-memory apenas para não crashar.
// =============================================================================

const _memStore = {};

const hasWindowStorage = () => {
  try { return typeof window !== "undefined" && window.storage && typeof window.storage.get === "function"; }
  catch { return false; }
};

const hasLocalStorage = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const k = "__sfa_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch { return false; }
};

const storageGet = async (key) => {
  if (hasWindowStorage()) {
    try {
      const r = await window.storage.get(key);
      return r ? r.value : null;
    } catch { return null; }
  }
  if (hasLocalStorage()) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  }
  return _memStore[key] ?? null;
};

const storageSet = async (key, value) => {
  if (hasWindowStorage()) {
    try { await window.storage.set(key, value); return; } catch {}
  }
  if (hasLocalStorage()) {
    try { window.localStorage.setItem(key, value); return; } catch {}
  }
  _memStore[key] = value;
};

const storageDelete = async (key) => {
  if (hasWindowStorage()) {
    try { await window.storage.delete(key); return; } catch {}
  }
  if (hasLocalStorage()) {
    try { window.localStorage.removeItem(key); return; } catch {}
  }
  delete _memStore[key];
};

const Storage = {
  async getPlayer() {
    const raw = await storageGet("sfa:player");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },
  async setPlayer(data) {
    await storageSet("sfa:player", JSON.stringify(data));
  },
  async clearPlayer() {
    await storageDelete("sfa:player");
  },
  async getStats() {
    const defaults = { wins: 0, losses: 0, streak: 0, level: 1, xp: 0, matches: [] };
    const raw = await storageGet("sfa:stats");
    if (!raw) return defaults;
    try { return { ...defaults, ...JSON.parse(raw) }; } catch { return defaults; }
  },
  async setStats(data) {
    await storageSet("sfa:stats", JSON.stringify(data));
  },
  async clearStats() {
    await storageDelete("sfa:stats");
  },
  async getTrophies() {
    const defaults = { count: 0, tournaments: [] };
    const raw = await storageGet("sfa:trophies");
    if (!raw) return defaults;
    try { return { ...defaults, ...JSON.parse(raw) }; } catch { return defaults; }
  },
  async setTrophies(data) {
    await storageSet("sfa:trophies", JSON.stringify(data));
  },
  async clearTrophies() {
    await storageDelete("sfa:trophies");
  },
  // Para debug/reset em testes
  async clearAll() {
    await storageDelete("sfa:player");
    await storageDelete("sfa:stats");
    await storageDelete("sfa:trophies");
  },
  // Retorna qual backend está ativo (útil pra mostrar em tela de debug)
  backend() {
    if (hasWindowStorage()) return "window.storage";
    if (hasLocalStorage()) return "localStorage";
    return "memory";
  },
};

// =============================================================================
// STYLES
// =============================================================================

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=VT323&family=Outfit:wght@300;400;600;800&display=swap');
    .font-display { font-family: 'Bowlby One SC', cursive; letter-spacing: 0.02em; }
    .font-hud { font-family: 'VT323', monospace; letter-spacing: 0.04em; }
    .font-body { font-family: 'Outfit', sans-serif; }

    .sfa-root * { box-sizing: border-box; }
    .sfa-root { font-family: 'Outfit', sans-serif; color: #f5efdc; }

    .scanlines::before {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
      z-index: 3;
    }
    .halftone {
      background-image: radial-gradient(rgba(255,46,99,0.35) 1px, transparent 1.2px);
      background-size: 8px 8px;
    }

    @keyframes shake {
      0%,100% { transform: translate(0,0); }
      20% { transform: translate(-4px,2px); }
      40% { transform: translate(3px,-3px); }
      60% { transform: translate(-2px,3px); }
      80% { transform: translate(2px,-1px); }
    }
    .shake { animation: shake 0.35s ease-in-out; }

    @keyframes hit-flash {
      0% { filter: brightness(2.2) saturate(0.4); }
      100% { filter: brightness(1) saturate(1); }
    }
    .hit-flash { animation: hit-flash 0.3s ease-out; }

    @keyframes float-damage {
      0% { transform: translateY(0) scale(0.7); opacity: 0; }
      20% { transform: translateY(-10px) scale(1.3); opacity: 1; }
      100% { transform: translateY(-70px) scale(1); opacity: 0; }
    }
    .float-damage { animation: float-damage 1s ease-out forwards; }

    @keyframes pulse-glow {
      0%,100% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
      50% { box-shadow: 0 0 40px currentColor, 0 0 80px currentColor; }
    }
    .pulse-glow { animation: pulse-glow 1.2s ease-in-out infinite; }

    @keyframes stagger-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .stagger-in { animation: stagger-in 0.5s ease-out forwards; opacity: 0; }

    @keyframes spin-slow { to { transform: rotate(360deg); } }
    .spin-slow { animation: spin-slow 8s linear infinite; }

    @keyframes blink {
      0%,70%,100% { opacity: 1; }
      85% { opacity: 0.3; }
    }
    .blink { animation: blink 1.2s ease-in-out infinite; }

    .arcade-btn {
      position: relative;
      transition: transform 0.08s ease, box-shadow 0.08s ease;
      cursor: pointer;
    }
    .arcade-btn:active { transform: translate(2px,3px); }
    .arcade-btn:hover:not(:disabled) { transform: translate(-1px,-2px); }
    .arcade-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .power-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
    .power-card:hover:not(:disabled) { transform: translateY(-6px) rotate(-1deg); }
    .power-card:disabled { opacity: 0.35; cursor: not-allowed; }

    @keyframes crt-flicker {
      0%,100% { opacity: 1; }
      50% { opacity: 0.97; }
    }
    .crt { animation: crt-flicker 3s ease-in-out infinite; }

    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    .slide-in-left { animation: slide-in-left 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards; }
    .slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards; }

    @keyframes zoom-smash {
      0% { opacity: 0; transform: scale(3) rotate(-5deg); }
      20% { opacity: 1; transform: scale(1) rotate(-5deg); }
      80% { opacity: 1; transform: scale(1) rotate(-5deg); }
      100% { opacity: 0; transform: scale(0.5) rotate(-5deg); }
    }
    .zoom-smash { animation: zoom-smash 1.2s cubic-bezier(0.4,0,0.2,1) forwards; }

    @keyframes fight-pulse {
      0% { transform: scale(0.5); opacity: 0; }
      40% { transform: scale(1.3); opacity: 1; }
      60% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.1); opacity: 0; }
    }
    .fight-pulse { animation: fight-pulse 1.4s cubic-bezier(0.2,0.8,0.2,1) forwards; }
  `}</style>
);

// =============================================================================
// AVATARES SVG (10 chibis estilizados, nunca realistas)
// =============================================================================

const AvatarCEO = ({ color = "#ff2e63", accent = "#fdc700", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M55 150 L55 220 L145 220 L145 150 L130 135 L70 135 Z" fill="#1a1a2e" stroke="#000" strokeWidth="3" />
    <path d="M95 135 L105 135 L108 180 L100 200 L92 180 Z" fill={color} stroke="#000" strokeWidth="2" />
    <path d="M75 135 L95 135 L100 150 L105 135 L125 135 L115 155 L85 155 Z" fill="#f5efdc" stroke="#000" strokeWidth="2" />
    <rect x="140" y="150" width="18" height="45" rx="6" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <rect x="150" y="185" width="30" height="22" rx="3" fill={accent} stroke="#000" strokeWidth="2.5" />
    <rect x="160" y="182" width="10" height="5" rx="1" fill="#000" />
    <rect x="42" y="150" width="18" height="45" rx="6" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="42" ry="45" fill="#f0c9a4" stroke="#000" strokeWidth="3" />
    <path d="M60 75 Q80 45 100 50 Q130 45 140 75 L138 88 Q125 70 100 72 Q75 70 62 88 Z" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="85" cy="95" rx="4" ry="6" fill="#000" />
    <ellipse cx="115" cy="95" rx="4" ry="6" fill="#000" />
    <rect x="78" y="90" width="14" height="3" fill="#000" />
    <rect x="108" y="90" width="14" height="3" fill="#000" />
    <path d="M88 115 Q100 122 112 115" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const AvatarFitness = ({ color = "#fdc700", accent = "#00e5ff", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M62 140 L62 195 L138 195 L138 140 L125 130 L75 130 Z" fill={color} stroke="#000" strokeWidth="3" />
    <path d="M62 195 L62 220 L138 220 L138 195 Z" fill="#1a1a2e" stroke="#000" strokeWidth="3" />
    <rect x="140" y="140" width="16" height="40" rx="5" fill="#f0c9a4" stroke="#000" strokeWidth="2.5" />
    <rect x="135" y="175" width="26" height="8" fill="#2a2a3e" stroke="#000" strokeWidth="2" />
    <circle cx="132" cy="179" r="9" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <circle cx="164" cy="179" r="9" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <rect x="44" y="140" width="16" height="40" rx="5" fill="#f0c9a4" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="90" rx="40" ry="42" fill="#e8b48a" stroke="#000" strokeWidth="3" />
    <rect x="58" y="72" width="84" height="10" fill={accent} stroke="#000" strokeWidth="2.5" />
    <path d="M60 78 Q55 110 65 130 Q75 120 70 90 Z" fill="#4a2c1a" stroke="#000" strokeWidth="2.5" />
    <path d="M60 95 Q40 140 50 170 Q70 155 68 110 Z" fill="#4a2c1a" stroke="#000" strokeWidth="2.5" />
    <path d="M78 95 L90 92 L90 100 L78 97 Z" fill="#000" />
    <path d="M110 92 L122 95 L122 97 L110 100 Z" fill="#000" />
    <path d="M88 118 L112 118" stroke="#000" strokeWidth="3" strokeLinecap="round" />
    <path d="M92 118 L92 114 M100 118 L100 114 M108 118 L108 114" stroke="#000" strokeWidth="1.5" />
  </svg>
);

const AvatarLawyer = ({ color = "#7c3aed", accent = "#fdc700", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M50 145 L50 220 L150 220 L150 145 L125 130 L75 130 Z" fill="#0a0a15" stroke="#000" strokeWidth="3" />
    <path d="M50 145 L75 130 L125 130 L150 145" fill="none" stroke={color} strokeWidth="3" />
    <rect x="92" y="130" width="6" height="30" fill="#f5efdc" stroke="#000" strokeWidth="1.5" />
    <rect x="102" y="130" width="6" height="30" fill="#f5efdc" stroke="#000" strokeWidth="1.5" />
    <rect x="140" y="150" width="16" height="40" rx="5" fill="#f0c9a4" stroke="#000" strokeWidth="2.5" />
    <rect x="150" y="160" width="8" height="25" fill="#8b4513" stroke="#000" strokeWidth="2" />
    <rect x="144" y="150" width="20" height="16" fill={accent} stroke="#000" strokeWidth="2.5" />
    <rect x="144" y="154" width="20" height="4" fill="#8b4513" />
    <rect x="44" y="150" width="16" height="40" rx="5" fill="#f0c9a4" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="40" ry="43" fill="#e8b48a" stroke="#000" strokeWidth="3" />
    <path d="M62 85 Q65 55 100 55 Q135 55 138 85 L135 90 Q130 70 100 70 Q70 70 65 90 Z" fill="#2a2a3e" stroke="#000" strokeWidth="2.5" />
    <rect x="78" y="82" width="15" height="3" fill="#000" />
    <rect x="107" y="82" width="15" height="3" fill="#000" />
    <ellipse cx="85" cy="93" rx="3.5" ry="5" fill="#000" />
    <ellipse cx="115" cy="93" rx="3.5" ry="5" fill="#000" />
    <path d="M88 118 L112 118" stroke="#000" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AvatarDev = ({ color = "#00e5ff", accent = "#22c55e", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M55 145 L55 220 L145 220 L145 145 L125 128 L75 128 Z" fill="#1a1a2e" stroke="#000" strokeWidth="3" />
    <path d="M75 175 L125 175 L120 205 L80 205 Z" fill="#0a0a15" stroke="#000" strokeWidth="2" />
    <rect x="95" y="128" width="2" height="25" fill="#f5efdc" />
    <rect x="103" y="128" width="2" height="25" fill="#f5efdc" />
    <rect x="140" y="150" width="16" height="40" rx="5" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <rect x="134" y="170" width="32" height="20" rx="2" fill="#0a0a15" stroke={color} strokeWidth="2.5" />
    <rect x="137" y="173" width="26" height="14" fill={color} opacity="0.3" />
    <text x="150" y="184" fontSize="8" fill={accent} fontFamily="monospace" textAnchor="middle">&gt;_</text>
    <rect x="44" y="150" width="16" height="40" rx="5" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#f0c9a4" stroke="#000" strokeWidth="3" />
    <path d="M55 90 Q55 55 100 50 Q145 55 145 90 L140 95 Q140 65 100 62 Q60 65 60 95 Z" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <path d="M70 78 L76 72 L82 80 L88 70 L94 80 L100 72 L106 80 L112 70 L118 80 L124 72 L130 78" fill="none" stroke="#4a2c1a" strokeWidth="5" strokeLinecap="round" />
    <circle cx="85" cy="95" r="8" fill="none" stroke="#000" strokeWidth="2.5" />
    <circle cx="115" cy="95" r="8" fill="none" stroke="#000" strokeWidth="2.5" />
    <path d="M93 95 L107 95" stroke="#000" strokeWidth="2" />
    <circle cx="85" cy="95" r="2.5" fill="#000" />
    <circle cx="115" cy="95" r="2.5" fill="#000" />
    <path d="M90 118 Q100 123 110 118" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const AvatarRealEstate = ({ color = "#22c55e", accent = "#fdc700", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M58 145 L58 220 L142 220 L142 145 L125 130 L75 130 Z" fill={color} stroke="#000" strokeWidth="3" />
    <path d="M85 130 L100 150 L115 130 L115 175 L85 175 Z" fill="#f5efdc" stroke="#000" strokeWidth="2" />
    <path d="M125 155 L135 152 L133 165 L127 164 Z" fill={accent} stroke="#000" strokeWidth="1.5" />
    <rect x="140" y="148" width="16" height="45" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <circle cx="162" cy="190" r="8" fill="none" stroke={accent} strokeWidth="3" />
    <path d="M170 190 L185 185 L185 195 L178 195 L178 198 L183 198 L183 202 Z" fill={accent} stroke="#000" strokeWidth="1.5" />
    <path d="M168 192 L178 190" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    <rect x="44" y="148" width="16" height="45" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#d4a074" stroke="#000" strokeWidth="3" />
    <path d="M60 82 Q62 52 100 50 Q138 52 140 82 L137 88 Q133 68 100 66 Q67 68 63 88 Z" fill="#2a1810" stroke="#000" strokeWidth="2.5" />
    <ellipse cx="85" cy="95" rx="4" ry="5" fill="#000" />
    <ellipse cx="115" cy="95" rx="4" ry="5" fill="#000" />
    <path d="M82 115 Q100 128 118 115" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M87 116 L87 122 M93 119 L93 124 M100 120 L100 125 M107 119 L107 124 M113 116 L113 122" stroke="#000" strokeWidth="1.5" />
  </svg>
);

const AvatarSales = ({ color = "#fb7185", accent = "#fde047", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M58 145 L58 220 L142 220 L142 145 L125 132 L75 132 Z" fill={color} stroke="#000" strokeWidth="3" />
    <path d="M82 132 L100 155 L118 132 L115 175 L85 175 Z" fill="#f5efdc" stroke="#000" strokeWidth="2" />
    <path d="M75 132 L82 132 L92 158 Z" fill="#0a0412" opacity="0.4" />
    <path d="M125 132 L118 132 L108 158 Z" fill="#0a0412" opacity="0.4" />
    <rect x="140" y="150" width="16" height="45" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <rect x="148" y="180" width="26" height="32" rx="2" fill="#f5efdc" stroke="#000" strokeWidth="2.5" />
    <rect x="155" y="178" width="12" height="5" fill="#8b4513" stroke="#000" strokeWidth="1" />
    <path d="M152 190 L170 190 M152 196 L168 196 M152 202 L170 202" stroke="#000" strokeWidth="1" />
    <rect x="44" y="150" width="16" height="45" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#f0c9a4" stroke="#000" strokeWidth="3" />
    <path d="M62 80 Q64 50 100 48 Q138 50 140 80 L135 75 Q125 60 90 60 Q70 65 65 88 Z" fill="#2a1810" stroke="#000" strokeWidth="2.5" />
    <path d="M88 52 Q98 70 108 55" fill="none" stroke="#2a1810" strokeWidth="3" strokeLinecap="round" />
    <path d="M140 85 Q148 90 152 105 L148 108 Q146 98 140 92 Z" fill={accent} stroke="#000" strokeWidth="2" />
    <circle cx="150" cy="107" r="4" fill="#0a0412" />
    <ellipse cx="85" cy="95" rx="4" ry="5.5" fill="#000" />
    <ellipse cx="115" cy="95" rx="4" ry="5.5" fill="#000" />
    <circle cx="86" cy="93" r="1.3" fill="#fff" />
    <circle cx="116" cy="93" r="1.3" fill="#fff" />
    <path d="M82 115 Q100 128 118 115 L118 120 L82 120 Z" fill="#f5efdc" stroke="#000" strokeWidth="2.5" />
    <path d="M88 118 L88 125 M96 118 L96 125 M104 118 L104 125 M112 118 L112 125" stroke="#000" strokeWidth="1" />
  </svg>
);

const AvatarCreator = ({ color = "#f472b6", accent = "#22d3ee", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <circle cx="100" cy="90" r="60" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="4 2" opacity="0.85" />
    {[...Array(8)].map((_, i) => {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      return <circle key={i} cx={100 + Math.cos(a) * 60} cy={90 + Math.sin(a) * 60} r="3.5" fill={accent} />;
    })}
    <path d="M55 145 L55 220 L145 220 L145 145 L125 130 L75 130 Z" fill={color} stroke="#000" strokeWidth="3" />
    <path d="M100 130 L125 130 L145 145 L145 220 L100 220 Z" fill="#0a0412" opacity="0.15" />
    <rect x="140" y="150" width="16" height="40" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <rect x="134" y="175" width="34" height="22" rx="3" fill="#1a1a2e" stroke="#000" strokeWidth="2.5" />
    <circle cx="151" cy="186" r="7" fill="#0a0412" stroke={accent} strokeWidth="2" />
    <circle cx="151" cy="186" r="3" fill={accent} />
    <rect x="158" y="171" width="7" height="4" fill="#1a1a2e" stroke="#000" strokeWidth="1.5" />
    <rect x="44" y="150" width="16" height="40" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#e8b48a" stroke="#000" strokeWidth="3" />
    <path d="M60 85 Q58 50 100 48 Q142 50 140 85 L140 105 L135 100 Q135 75 100 70 Q65 75 65 100 L60 105 Z" fill={color} stroke="#000" strokeWidth="2.5" />
    <path d="M72 72 L82 62 L90 72 L100 60 L110 72 L118 62 L128 72 L128 82 L72 82 Z" fill={color} stroke="#000" strokeWidth="2" />
    <path d="M78 95 Q85 92 92 95" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="115" cy="95" rx="4" ry="5.5" fill="#000" />
    <path d="M113 91 L117 91 M115 89 L115 93" stroke="#fff" strokeWidth="1.2" />
    <path d="M90 115 Q100 125 112 118" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="105" cy="121" rx="4" ry="3" fill="#ec4899" stroke="#000" strokeWidth="1.5" />
  </svg>
);

const AvatarDoctor = ({ color = "#06b6d4", accent = "#f5efdc", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M65 150 L65 220 L135 220 L135 150 L125 132 L75 132 Z" fill={color} stroke="#000" strokeWidth="2.5" />
    <path d="M55 145 L58 220 L78 220 L80 150 Z" fill={accent} stroke="#000" strokeWidth="2.5" />
    <path d="M145 145 L142 220 L122 220 L120 150 Z" fill={accent} stroke="#000" strokeWidth="2.5" />
    <circle cx="80" cy="170" r="2" fill="#0a0412" />
    <circle cx="80" cy="185" r="2" fill="#0a0412" />
    <circle cx="80" cy="200" r="2" fill="#0a0412" />
    <circle cx="120" cy="170" r="2" fill="#0a0412" />
    <circle cx="120" cy="185" r="2" fill="#0a0412" />
    <circle cx="120" cy="200" r="2" fill="#0a0412" />
    <path d="M85 145 Q90 165 100 170 Q110 165 115 145" fill="none" stroke="#0a0412" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="172" r="6" fill="#2a1a3e" stroke="#0a0412" strokeWidth="2" />
    <circle cx="100" cy="172" r="2.5" fill={color} />
    <rect x="140" y="150" width="16" height="42" rx="5" fill={accent} stroke="#000" strokeWidth="2.5" />
    <rect x="148" y="178" width="24" height="30" rx="2" fill="#f5efdc" stroke="#000" strokeWidth="2.5" />
    <path d="M150 188 L168 188 M150 194 L166 194 M150 200 L168 200" stroke={color} strokeWidth="1.2" />
    <rect x="155" y="176" width="10" height="4" fill="#06b6d4" stroke="#000" strokeWidth="1" />
    <rect x="44" y="150" width="16" height="42" rx="5" fill={accent} stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#e8b48a" stroke="#000" strokeWidth="3" />
    <path d="M58 82 Q62 52 100 50 Q138 52 142 82 L135 68 Q100 62 65 68 Z" fill={color} stroke="#000" strokeWidth="2.5" />
    <path d="M62 74 L50 82 L55 92" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <rect x="95" y="64" width="10" height="3" fill={accent} />
    <rect x="98" y="61" width="4" height="9" fill={accent} />
    <ellipse cx="85" cy="95" rx="3.5" ry="4.5" fill="#000" />
    <ellipse cx="115" cy="95" rx="3.5" ry="4.5" fill="#000" />
    <path d="M88 117 Q100 122 112 117" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const AvatarMarketing = ({ color = "#a855f7", accent = "#fde047", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M58 145 L58 220 L142 220 L142 145 L125 132 L75 132 Z" fill={color} stroke="#000" strokeWidth="3" />
    <path d="M82 132 L100 155 L118 132 L118 175 L82 175 Z" fill={accent} stroke="#000" strokeWidth="2" />
    <path d="M92 148 L100 152 L108 148 L108 156 L100 152 L92 156 Z" fill="#ec4899" stroke="#000" strokeWidth="1.5" />
    <rect x="140" y="150" width="16" height="40" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <path d="M150 170 L184 155 L184 195 L150 180 Z" fill={accent} stroke="#000" strokeWidth="2.5" />
    <rect x="148" y="172" width="4" height="8" fill="#0a0412" />
    <path d="M188 165 L196 162 M188 175 L198 175 M188 185 L196 188" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <rect x="44" y="150" width="16" height="40" rx="5" fill={color} stroke="#000" strokeWidth="2.5" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#d4a074" stroke="#000" strokeWidth="3" />
    <path d="M60 85 L55 55 L68 65 L70 45 L82 60 L85 38 L95 55 L100 35 L108 55 L118 40 L120 58 L132 48 L130 65 L142 58 L140 85 L135 78 Q100 68 65 78 Z" fill="#7c3aed" stroke="#000" strokeWidth="2.5" />
    <rect x="72" y="88" width="56" height="14" rx="2" fill="#0a0412" stroke="#000" strokeWidth="2" />
    <rect x="75" y="91" width="22" height="8" fill="#ec4899" />
    <rect x="103" y="91" width="22" height="8" fill={accent} />
    <path d="M97 95 L103 95" stroke="#000" strokeWidth="2" />
    <path d="M80 115 Q100 130 120 115 L118 122 L82 122 Z" fill="#f5efdc" stroke="#000" strokeWidth="2.5" />
    <path d="M85 118 L85 125 M92 120 L92 127 M100 121 L100 128 M108 120 L108 127 M115 118 L115 125" stroke="#000" strokeWidth="1" />
  </svg>
);

const AvatarTeacher = ({ color = "#dc2626", accent = "#f5efdc", flip = false }) => (
  <svg viewBox="0 0 200 240" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="100" cy="230" rx="50" ry="7" fill="#000" opacity="0.5" />
    <path d="M58 145 L58 220 L142 220 L142 145 L125 132 L75 132 Z" fill="#4a2c1a" stroke="#000" strokeWidth="3" />
    <path d="M82 132 L100 150 L118 132 L118 175 L82 175 Z" fill={accent} stroke="#000" strokeWidth="2" />
    <path d="M96 138 L104 138 L108 180 L100 190 L92 180 Z" fill={color} stroke="#000" strokeWidth="1.5" />
    <circle cx="75" cy="170" r="2" fill={accent} />
    <circle cx="75" cy="185" r="2" fill={accent} />
    <circle cx="75" cy="200" r="2" fill={accent} />
    <circle cx="125" cy="170" r="2" fill={accent} />
    <circle cx="125" cy="185" r="2" fill={accent} />
    <circle cx="125" cy="200" r="2" fill={accent} />
    <rect x="140" y="150" width="16" height="42" rx="5" fill="#4a2c1a" stroke="#000" strokeWidth="2.5" />
    <g transform="rotate(-20 150 194)">
      <rect x="146" y="174" width="8" height="40" rx="2" fill={color} stroke="#000" strokeWidth="2.5" />
      <path d="M146 174 L154 174 L150 164 Z" fill="#0a0412" stroke="#000" strokeWidth="2" />
      <rect x="144" y="170" width="12" height="4" fill="#fde047" stroke="#000" strokeWidth="1.5" />
    </g>
    <rect x="44" y="150" width="16" height="42" rx="5" fill="#4a2c1a" stroke="#000" strokeWidth="2.5" />
    <rect x="28" y="180" width="24" height="28" fill="#8b4513" stroke="#000" strokeWidth="2" />
    <rect x="30" y="182" width="20" height="24" fill={accent} stroke="#000" strokeWidth="1" />
    <path d="M33 188 L47 188 M33 193 L47 193 M33 198 L47 198" stroke="#000" strokeWidth="1" />
    <ellipse cx="100" cy="92" rx="40" ry="42" fill="#e8b48a" stroke="#000" strokeWidth="3" />
    <path d="M60 82 Q65 55 100 54 Q135 55 140 82 L135 72 Q100 68 65 72 Z" fill="#2a1810" stroke="#000" strokeWidth="2.5" />
    <circle cx="100" cy="48" r="10" fill="#2a1810" stroke="#000" strokeWidth="2" />
    <circle cx="85" cy="95" r="10" fill="none" stroke="#000" strokeWidth="3" />
    <circle cx="115" cy="95" r="10" fill="none" stroke="#000" strokeWidth="3" />
    <path d="M95 95 L105 95" stroke="#000" strokeWidth="2.5" />
    <circle cx="85" cy="95" r="3" fill="#000" />
    <circle cx="115" cy="95" r="3" fill="#000" />
    <path d="M92 118 Q100 121 108 118" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const AVATARS = {
  ceo: AvatarCEO, fitness: AvatarFitness, lawyer: AvatarLawyer, dev: AvatarDev, realestate: AvatarRealEstate,
  sales: AvatarSales, creator: AvatarCreator, doctor: AvatarDoctor, marketing: AvatarMarketing, teacher: AvatarTeacher,
};

// =============================================================================
// COMPONENTES COMPARTILHADOS
// =============================================================================

const ArcadeButton = ({ children, onClick, color = "#ff2e63", disabled, className = "", small = false, full = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`arcade-btn font-display ${className}`}
    style={{
      background: color,
      color: "#0a0412",
      border: "3px solid #0a0412",
      boxShadow: `4px 5px 0 #0a0412, 0 0 0 2px ${color}`,
      padding: small ? "7px 14px" : "12px 24px",
      fontSize: small ? 12 : 16,
      borderRadius: 4,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      width: full ? "100%" : "auto",
    }}
  >
    {children}
  </button>
);

const StatBar = ({ label, value, color = "#ff2e63", max = 100 }) => (
  <div className="flex items-center gap-2">
    <div className="font-hud" style={{ fontSize: 15, width: 70, opacity: 0.85, textTransform: "uppercase" }}>{label}</div>
    <div style={{ flex: 1, height: 10, background: "#2a1a3e", border: "1px solid #0a0412", position: "relative", overflow: "hidden" }}>
      <div style={{
        width: `${(value / max) * 100}%`, height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        boxShadow: `0 0 10px ${color}`, transition: "width 0.4s ease",
      }} />
    </div>
    <div className="font-hud" style={{ fontSize: 15, width: 34, textAlign: "right" }}>{value}</div>
  </div>
);

const NETWORK_ICONS = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook, tiktok: Music2 };
const NETWORK_COLORS = { linkedin: "#0a66c2", instagram: "#e4405f", facebook: "#1877f2", tiktok: "#00e5ff" };
const NETWORK_LABELS = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };

// =============================================================================
// LANDING
// =============================================================================

const Landing = ({ onStart, returning, onSimulateChallenge }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center scanlines overflow-hidden crt">
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse at center, rgba(255,46,99,0.25) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(253,199,0,0.15) 0%, transparent 50%)",
    }} />
    <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: "linear-gradient(#ff2e6333 1px, transparent 1px), linear-gradient(90deg, #ff2e6333 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, transparent 100%)",
    }} />
    <Sparkles className="absolute spin-slow" style={{ top: 40, left: 30, color: "#fdc700", width: 28, height: 28, opacity: 0.6 }} />
    <Flame className="absolute" style={{ top: 60, right: 40, color: "#ff2e63", width: 32, height: 32, opacity: 0.5 }} />

    <div className="relative z-10" style={{ maxWidth: 420 }}>
      <div className="font-hud blink" style={{ color: "#fdc700", fontSize: 18, marginBottom: 12 }}>▸ INSERT COIN ◂</div>
      <div className="font-display stagger-in" style={{
        fontSize: 54, lineHeight: 0.9, color: "#f5efdc",
        textShadow: "4px 4px 0 #ff2e63, 8px 8px 0 #0a0412, 0 0 40px rgba(255,46,99,0.5)",
        animationDelay: "0.1s",
      }}>
        SOCIAL<br />
        <span style={{ color: "#fdc700", textShadow: "4px 4px 0 #ff2e63, 8px 8px 0 #0a0412" }}>FIGHTERS</span><br />
        ARENA
      </div>
      <div className="font-body stagger-in" style={{ marginTop: 24, fontSize: 15, opacity: 0.9, lineHeight: 1.5, animationDelay: "0.35s" }}>
        Seu perfil virou personagem.<br />
        <span style={{ color: "#fdc700", fontWeight: 600 }}>Entre na arena.</span>
      </div>
      <div className="stagger-in" style={{ marginTop: 36, animationDelay: "0.6s" }}>
        <ArcadeButton onClick={onStart}>
          {returning ? "continuar" : "começar"} <ArrowRight style={{ display: "inline", marginLeft: 6, width: 16, height: 16 }} />
        </ArcadeButton>
      </div>
      <div className="font-hud stagger-in" style={{ marginTop: 32, fontSize: 13, opacity: 0.55, animationDelay: "0.85s", lineHeight: 1.4 }}>
        v0.6 — MVP demo · dados simulados<br />
        persistência: <span style={{ color: "#00e5ff" }}>{Storage.backend()}</span>
      </div>
      {onSimulateChallenge && (
        <button
          onClick={onSimulateChallenge}
          className="font-hud stagger-in"
          style={{
            marginTop: 16, fontSize: 11, color: "#00e5ff",
            background: "transparent", border: "1px dashed #00e5ff66",
            padding: "6px 14px", letterSpacing: 1.5,
            animationDelay: "1.05s",
          }}
        >
          ⓘ DEMO: simular link de desafio recebido
        </button>
      )}
    </div>
  </div>
);

// =============================================================================
// PROFILE CHOICE
// =============================================================================

const ProfileChoice = ({ onPick, onBack }) => (
  <div className="relative w-full h-full flex flex-col p-6 scanlines overflow-y-auto">
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(124,58,237,0.2), transparent 60%)" }} />
    <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
      <ArrowLeft style={{ width: 16, height: 16 }} /> voltar
    </button>
    <div className="relative z-10 mt-4 mb-6">
      <div className="font-hud" style={{ color: "#fdc700", fontSize: 14 }}>▸ PASSO 01/03 · IMPORTAÇÃO SIMULADA</div>
      <div className="font-display" style={{ fontSize: 28, marginTop: 6, lineHeight: 1 }}>
        QUAL<br /><span style={{ color: "#ff2e63" }}>É O SEU</span> PERFIL?
      </div>
      <div className="font-body" style={{ marginTop: 10, fontSize: 13, opacity: 0.75, lineHeight: 1.4 }}>
        Num produto final isto é inferido do OAuth da rede conectada. Aqui, escolha o arquétipo mais próximo.
      </div>
    </div>
    <div className="relative z-10 flex flex-col gap-2.5 pb-4">
      {FIGHTER_ORDER.map((id, i) => {
        const f = FIGHTERS[id]; const Avatar = AVATARS[id]; const Icon = NETWORK_ICONS[f.profile.network];
        return (
          <button key={id} onClick={() => onPick(id)} className="arcade-btn stagger-in text-left" style={{
            animationDelay: `${0.05 * i}s`,
            background: "linear-gradient(100deg, #14081f, #0a0412)",
            border: `2px solid ${f.colors.primary}66`, borderRadius: 6, padding: 10,
            display: "flex", gap: 10, alignItems: "center",
            boxShadow: `3px 4px 0 #0a0412, inset 0 0 0 1px #2a1a3e`,
            color: "#f5efdc", cursor: "pointer",
          }}>
            <div style={{
              width: 58, height: 70, flexShrink: 0,
              background: `radial-gradient(ellipse at center, ${f.colors.primary}33, transparent 70%)`,
              borderRadius: 4,
            }}><Avatar color={f.colors.primary} accent={f.colors.accent} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="font-display" style={{ fontSize: 13, color: f.colors.accent, lineHeight: 1 }}>{f.profile.label}</div>
              <div className="font-body" style={{ fontSize: 11, opacity: 0.7, marginTop: 3, lineHeight: 1.3 }}>{f.profile.signal}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Icon style={{ width: 11, height: 11, color: NETWORK_COLORS[f.profile.network] }} />
                <span className="font-hud" style={{ fontSize: 12, opacity: 0.6, textTransform: "uppercase" }}>
                  → {f.className}
                </span>
              </div>
            </div>
            <ArrowRight style={{ width: 16, height: 16, color: f.colors.primary, flexShrink: 0 }} />
          </button>
        );
      })}
    </div>
  </div>
);

// =============================================================================
// CONSENT
// =============================================================================

const CONSENT_ITEMS = [
  { id: "profile", label: "Nome e foto de perfil", why: "Base para nome e aparência.", required: true },
  { id: "bio", label: "Bio / headline", why: "Personalidade e tom das frases." },
  { id: "posts", label: "Publicações recentes", why: "Geram os golpes comuns." },
  { id: "themes", label: "Temas recorrentes", why: "Definem raro e lendário." },
  { id: "engagement", label: "Nível de engajamento", why: "Vira Poder Viral e recarga do especial." },
];

const ConsentScreen = ({ onConfirm, onBack }) => {
  const [checked, setChecked] = useState(() => Object.fromEntries(CONSENT_ITEMS.map((i) => [i.id, true])));
  const toggle = (id) => {
    if (CONSENT_ITEMS.find((i) => i.id === id)?.required) return;
    setChecked((s) => ({ ...s, [id]: !s[id] }));
  };
  return (
    <div className="relative w-full h-full flex flex-col p-6 scanlines overflow-y-auto">
      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> voltar
      </button>
      <div className="relative z-10 mt-4 mb-5">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 14 }}>▸ PASSO 02/03 · CONSENTIMENTO</div>
        <div className="font-display" style={{ fontSize: 26, marginTop: 6, lineHeight: 1 }}>
          O QUE VIRA<br /><span style={{ color: "#00e5ff" }}>COMBUSTÍVEL</span>?
        </div>
        <div className="font-body" style={{ marginTop: 10, fontSize: 13, opacity: 0.75, lineHeight: 1.4 }}>
          Você pode recusar qualquer item. O motor se adapta ao que está disponível.
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-2 mb-5">
        {CONSENT_ITEMS.map((item, i) => {
          const on = checked[item.id];
          return (
            <button key={item.id} onClick={() => toggle(item.id)} disabled={item.required} className="stagger-in text-left" style={{
              animationDelay: `${0.06 * i}s`,
              background: on ? "linear-gradient(100deg, #1d0a2e, #0a0412)" : "#0a0412",
              border: `2px solid ${on ? "#00e5ff88" : "#2a1a3e"}`, borderRadius: 6, padding: 12,
              display: "flex", alignItems: "center", gap: 12,
              cursor: item.required ? "not-allowed" : "pointer",
              color: "#f5efdc", opacity: on ? 1 : 0.55,
            }}>
              <div style={{
                width: 22, height: 22, border: "2px solid #00e5ff",
                background: on ? "#00e5ff" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, borderRadius: 2,
              }}>{on && <Check style={{ width: 14, height: 14, color: "#0a0412" }} strokeWidth={3} />}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-display" style={{ fontSize: 13, lineHeight: 1 }}>
                  {item.label}
                  {item.required && <span className="font-hud" style={{ fontSize: 11, color: "#fdc700", marginLeft: 8 }}>· obrigatório</span>}
                </div>
                <div className="font-body" style={{ fontSize: 11.5, opacity: 0.7, marginTop: 3, lineHeight: 1.3 }}>{item.why}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="relative z-10 font-body" style={{
        background: "#0a0412", border: "1px dashed #2a1a3e", borderRadius: 4, padding: 12,
        fontSize: 11.5, opacity: 0.7, lineHeight: 1.5, marginBottom: 16,
      }}>
        <div className="flex items-start gap-2">
          <Lock style={{ width: 14, height: 14, color: "#00e5ff", flexShrink: 0, marginTop: 2 }} />
          <div>
            Cada escolha gera registro imutável em <span className="font-hud">consent_logs</span> com texto exato, IP e timestamp. Revogável no painel de privacidade.
          </div>
        </div>
      </div>
      <div className="relative z-10 flex justify-center pb-4">
        <ArcadeButton onClick={() => onConfirm(checked)} color="#00e5ff">autorizar e forjar</ArcadeButton>
      </div>
    </div>
  );
};

// =============================================================================
// FORGING
// =============================================================================

const FORGE_MSGS = [
  "analisando perfil autorizado...",
  "classificando profissão...",
  "mapeando temas recorrentes...",
  "calculando atributos...",
  "selecionando biblioteca de golpes...",
  "gerando frases de batalha...",
  "estilizando avatar cartoon...",
  "aprovando na moderação...",
];

const ForgingScreen = ({ onDone, fighter }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (step >= FORGE_MSGS.length) { const t = setTimeout(onDone, 600); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep((s) => s + 1), 450);
    return () => clearTimeout(t);
  }, [step, onDone]);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 2.8)), 100);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 scanlines overflow-hidden crt">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${fighter.colors.primary}22, transparent 60%)` }} />
      <div className="absolute inset-0 halftone opacity-20" />
      <div className="relative z-10" style={{ marginBottom: 30 }}>
        <div className="spin-slow" style={{
          width: 150, height: 150, borderRadius: "50%",
          border: `3px dashed ${fighter.colors.primary}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 110, height: 110, borderRadius: "50%",
            background: `radial-gradient(circle, ${fighter.colors.accent}, ${fighter.colors.primary})`,
            boxShadow: `0 0 40px ${fighter.colors.primary}, 0 0 80px ${fighter.colors.primary}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><Flame style={{ width: 50, height: 50, color: "#0a0412" }} /></div>
        </div>
      </div>
      <div className="relative z-10 font-display" style={{ fontSize: 22, letterSpacing: 2, color: fighter.colors.accent, textAlign: "center" }}>FORJANDO LUTADOR</div>
      <div className="relative z-10 font-hud blink" style={{ fontSize: 16, color: "#f5efdc", marginTop: 14, textAlign: "center", minHeight: 22 }}>
        ▸ {FORGE_MSGS[Math.min(step, FORGE_MSGS.length - 1)]}
      </div>
      <div className="relative z-10 mt-6" style={{ width: 260, height: 12, background: "#2a1a3e", border: "1px solid #0a0412", overflow: "hidden" }}>
        <div style={{
          width: `${progress}%`, height: "100%",
          background: `linear-gradient(90deg, ${fighter.colors.primary}, ${fighter.colors.accent})`,
          boxShadow: `0 0 12px ${fighter.colors.primary}`, transition: "width 0.1s linear",
        }} />
      </div>
    </div>
  );
};

// =============================================================================
// FIGHTER REVEAL
// =============================================================================

const ATTR_LABELS = {
  strength: "força", speed: "veloc.", charisma: "carisma", strategy: "estrat.", creativity: "criativ.",
  resistance: "resist.", influence: "influên.", technique: "técnica", viralPower: "p.viral", defense: "defesa",
};

const FighterReveal = ({ fighter, onContinue }) => {
  const Avatar = AVATARS[fighter.id];
  const topAttrs = Object.entries(fighter.attrs).sort((a, b) => b[1] - a[1]).slice(0, 4);
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at top, ${fighter.colors.primary}44, transparent 50%), radial-gradient(ellipse at bottom, ${fighter.colors.accent}22, transparent 50%)`,
      }} />
      <div className="relative z-10 font-hud stagger-in" style={{ color: "#fdc700", fontSize: 14, textAlign: "center" }}>
        ▸ FICHA DE LUTADOR · #{Math.floor(Math.random() * 9000) + 1000}
      </div>
      <div className="relative z-10 stagger-in" style={{ animationDelay: "0.1s", marginTop: 8 }}>
        <div className="relative mx-auto" style={{
          width: 200, height: 210,
          background: `linear-gradient(180deg, ${fighter.colors.primary}55, transparent)`,
          border: `3px solid ${fighter.colors.accent}`,
          boxShadow: `0 0 30px ${fighter.colors.glow}66, inset 0 0 0 2px #0a0412`,
          borderRadius: 6, overflow: "hidden",
        }}>
          <div className="absolute inset-0 halftone opacity-40" />
          <svg viewBox="0 0 220 230" className="absolute inset-0" style={{ opacity: 0.4 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={i}
                d={`M110 115 L${110 + Math.cos((i / 12) * Math.PI * 2) * 200} ${115 + Math.sin((i / 12) * Math.PI * 2) * 200}`}
                stroke={fighter.colors.accent} strokeWidth="2" opacity="0.3" />
            ))}
          </svg>
          <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
            <Avatar color={fighter.colors.primary} accent={fighter.colors.accent} />
          </div>
          <div className="font-hud" style={{
            position: "absolute", top: 6, right: 6,
            background: "#0a0412", color: fighter.colors.accent,
            padding: "2px 8px", fontSize: 13,
            border: `1px solid ${fighter.colors.accent}`, zIndex: 4,
          }}>LV 1</div>
        </div>
      </div>
      <div className="relative z-10 text-center stagger-in" style={{ marginTop: 12, animationDelay: "0.25s" }}>
        <div className="font-display" style={{
          fontSize: 24, lineHeight: 1, color: "#f5efdc",
          textShadow: `3px 3px 0 ${fighter.colors.primary}, 6px 6px 0 #0a0412`,
        }}>{fighter.fighterName}</div>
        <div className="font-hud" style={{ fontSize: 15, color: fighter.colors.accent, marginTop: 5, textTransform: "uppercase" }}>
          [{fighter.className}]
        </div>
        <div className="font-body" style={{ fontSize: 12, opacity: 0.75, marginTop: 6, padding: "0 12px", lineHeight: 1.4, fontStyle: "italic" }}>
          "{fighter.lore}"
        </div>
      </div>
      <div className="relative z-10 stagger-in" style={{ marginTop: 14, animationDelay: "0.4s" }}>
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, marginBottom: 6, textAlign: "center" }}>▸ ATRIBUTOS DESTAQUE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {topAttrs.map(([k, v]) => <StatBar key={k} label={ATTR_LABELS[k]} value={v} color={fighter.colors.primary} />)}
        </div>
      </div>
      <div className="relative z-10 stagger-in" style={{ marginTop: 14, animationDelay: "0.55s" }}>
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, marginBottom: 6, textAlign: "center" }}>▸ MOVESET</div>
        <div className="flex flex-col gap-1.5">
          {[...fighter.powers.common, fighter.powers.rare, fighter.powers.legendary].map((p, i) => {
            const rarity = i < 3 ? "comum" : i === 3 ? "raro" : "lendário";
            const rColor = i < 3 ? "#f5efdc" : i === 3 ? "#00e5ff" : "#fdc700";
            return (
              <div key={i} style={{
                background: "#0a0412", border: `1px solid ${rColor}44`,
                borderLeft: `4px solid ${rColor}`, padding: "6px 10px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div className="font-display" style={{ fontSize: 11, color: rColor, flex: 1 }}>{p.name}</div>
                <div className="font-hud" style={{ fontSize: 12, color: rColor, opacity: 0.7 }}>[{rarity}]</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative z-10 flex justify-center stagger-in mt-5 pb-4" style={{ animationDelay: "0.85s" }}>
        <ArcadeButton onClick={onContinue} color={fighter.colors.accent}>
          ir para o hub <ArrowRight style={{ display: "inline", marginLeft: 6, width: 16, height: 16 }} />
        </ArcadeButton>
      </div>
    </div>
  );
};

// =============================================================================
// FIGHT INTRO — ROUND 1, FIGHT!
// =============================================================================

const FightIntro = ({ player, opponent, onDone }) => {
  const [phase, setPhase] = useState(0);
  const PAvatar = AVATARS[player.id];
  const OAvatar = AVATARS[opponent.id];
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1900),
      setTimeout(onDone, 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);
  return (
    <div className="relative w-full h-full overflow-hidden scanlines crt" style={{
      background: `
        radial-gradient(ellipse at 20% 30%, ${opponent.colors.primary}44, transparent 50%),
        radial-gradient(ellipse at 80% 70%, ${player.colors.primary}44, transparent 50%),
        #080410
      `,
    }}>
      <div className="absolute inset-0 halftone opacity-30" />
      {/* player slide in left */}
      <div className="absolute slide-in-left" style={{
        left: 10, bottom: 70, width: 160, height: 200,
        filter: `drop-shadow(0 0 30px ${player.colors.primary})`,
      }}>
        <PAvatar color={player.colors.primary} accent={player.colors.accent} />
        <div className="font-display" style={{
          position: "absolute", bottom: -20, left: 0, fontSize: 14, color: player.colors.accent,
          textShadow: `2px 2px 0 ${player.colors.primary}, 4px 4px 0 #0a0412`, whiteSpace: "nowrap",
        }}>{player.fighterName}</div>
      </div>
      {/* vs marker */}
      <div className="absolute" style={{
        top: "40%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5,
      }}>
        <div className="font-display fight-pulse" style={{
          fontSize: 90, color: "#fdc700",
          textShadow: `4px 4px 0 #ff2e63, 8px 8px 0 #0a0412, 0 0 40px #fdc700`,
          letterSpacing: -4,
        }}>VS</div>
      </div>
      {/* opponent slide in right */}
      <div className="absolute slide-in-right" style={{
        right: 10, bottom: 70, width: 160, height: 200,
        filter: `drop-shadow(0 0 30px ${opponent.colors.primary})`,
      }}>
        <OAvatar color={opponent.colors.primary} accent={opponent.colors.accent} flip />
        <div className="font-display" style={{
          position: "absolute", bottom: -20, right: 0, fontSize: 14, color: opponent.colors.accent,
          textShadow: `2px 2px 0 ${opponent.colors.primary}, 4px 4px 0 #0a0412`, whiteSpace: "nowrap",
        }}>{opponent.fighterName}</div>
      </div>
      {/* round text bottom */}
      {phase >= 1 && (
        <div className="absolute zoom-smash" style={{
          bottom: 20, left: 0, right: 0, textAlign: "center", zIndex: 10,
        }}>
          <div className="font-display" style={{
            fontSize: phase >= 2 ? 72 : 42, color: phase >= 2 ? "#fdc700" : "#f5efdc",
            textShadow: phase >= 2
              ? "4px 4px 0 #ff2e63, 8px 8px 0 #0a0412, 0 0 50px #fdc700"
              : "3px 3px 0 #ff2e63, 6px 6px 0 #0a0412",
            lineHeight: 0.9, transition: "all 0.2s",
          }}>
            {phase >= 2 ? "FIGHT!" : "ROUND 01"}
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// TOURNAMENT SYSTEM
// =============================================================================

// Pool de upgrades táticos mostrados entre rounds
const UPGRADE_POOL = [
  { id: "hp_big", icon: "♥", name: "PRIMEIROS SOCORROS", desc: "+30 HP agora.", color: "#22c55e", apply: (s) => ({ ...s, hp: Math.min(100, s.hp + 30) }) },
  { id: "hp_full", icon: "✚", name: "RECARGA TOTAL", desc: "Enche HP até 100.", color: "#22c55e", rare: true, apply: (s) => ({ ...s, hp: 100 }) },
  { id: "atk_up", icon: "⚔", name: "ADRENALINA", desc: "Força +15% no próximo round.", color: "#ff2e63", apply: (s) => ({ ...s, atkBuff: 0.15 }) },
  { id: "atk_big", icon: "⚔", name: "MODO RAIVOSO", desc: "Força +30% no próximo round.", color: "#ff2e63", rare: true, apply: (s) => ({ ...s, atkBuff: 0.3 }) },
  { id: "def_up", icon: "◈", name: "ESCUDO TÁTICO", desc: "Defesa +20% no próximo round.", color: "#00e5ff", apply: (s) => ({ ...s, defBuff: 0.2 }) },
  { id: "special_start", icon: "✦", name: "PRÉ-CARGA", desc: "Começa com 50% de especial.", color: "#fdc700", apply: (s) => ({ ...s, specialStart: 50 }) },
  { id: "crit_up", icon: "☄", name: "OLHO DE FAUCÃO", desc: "+15% de chance de crítico.", color: "#fb7185", apply: (s) => ({ ...s, critBuff: 0.15 }) },
];

// Sorteia 3 upgrades únicos do pool
const rollUpgrades = () => {
  const shuffled = [...UPGRADE_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

// Gera o bracket do torneio: 3 oponentes, último é boss
const buildBracket = (playerId) => {
  const pool = FIGHTER_ORDER.filter((id) => id !== playerId);
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return [
    { ...FIGHTERS[shuffled[0]], isBoss: false, roundLabel: "QUARTAS" },
    { ...FIGHTERS[shuffled[1]], isBoss: false, roundLabel: "SEMI" },
    // Boss: atributos inflados, nome especial
    {
      ...FIGHTERS[shuffled[2]],
      isBoss: true,
      roundLabel: "FINAL",
      fighterName: `${FIGHTERS[shuffled[2]].fighterName} ※`,
      attrs: Object.fromEntries(
        Object.entries(FIGHTERS[shuffled[2]].attrs).map(([k, v]) => [k, Math.min(99, Math.round(v * 1.15))])
      ),
    },
  ];
};

// =============================================================================
// ARENA / COMBAT
// =============================================================================

const pickOpponent = (playerId) => {
  const others = FIGHTER_ORDER.filter((id) => id !== playerId);
  return FIGHTERS[others[Math.floor(Math.random() * others.length)]];
};

const calcDamage = (power, attacker, defender, rng = Math.random) => {
  if (power.dmg === 0 && power.heal) return { dmg: 0, heal: power.heal, crit: false };
  const base = power.dmg || 0;
  const strMod = 1 + (attacker.attrs.strength - 50) / 200;
  const techMod = 1 + (attacker.attrs.technique - 50) / 250;
  const defMod = power.ignoreDef ? 1 : 1 - (defender.attrs.defense - 50) / 300;
  const crit = rng() < 0.12;
  let dmg = Math.round(base * strMod * techMod * Math.max(0.6, defMod) * (crit ? 1.6 : 1));
  dmg = Math.max(1, dmg);
  return { dmg, heal: power.heal || 0, crit };
};

const aiPickMove = (ai, state) => {
  const moves = [...ai.powers.common, ai.powers.rare];
  if (state.aiSpecial >= 100) moves.push(ai.powers.legendary);
  const healMove = ai.powers.common.find((p) => p.heal);
  if (state.aiHP < 35 && healMove && Math.random() < 0.55) return healMove;
  if (state.aiSpecial >= 100 && Math.random() < 0.6) return ai.powers.legendary;
  const weighted = moves.map((m) => ({ m, w: (m.dmg || 0) + 3 }));
  const total = weighted.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const x of weighted) { r -= x.w; if (r <= 0) return x.m; }
  return moves[0];
};

// Matchup stats derivados de stats.matches
const getMatchup = (matches, opponentId) => {
  const relevant = (matches || []).filter((m) => m.opp === opponentId);
  const wins = relevant.filter((m) => m.r === "win").length;
  const losses = relevant.filter((m) => m.r === "lose").length;
  return { wins, losses, total: relevant.length, last: relevant[relevant.length - 1] };
};

// =============================================================================
// OPPONENT SELECT — escolher quem enfrentar com matchup stats
// =============================================================================

const OpponentSelect = ({ player, stats, onPick, onBack }) => {
  const candidates = FIGHTER_ORDER.filter((id) => id !== player.id);
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at top, rgba(255,46,99,0.18), transparent 60%)",
      }} />

      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> hub
      </button>

      <div className="relative z-10 mt-3 mb-3">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13 }}>▸ LUTA RÁPIDA</div>
        <div className="font-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1 }}>
          ESCOLHA SEU<br /><span style={{ color: "#ff2e63" }}>OPONENTE</span>
        </div>
      </div>

      {/* Aleatório destacado no topo */}
      <button onClick={() => onPick(null)} className="relative z-10 arcade-btn pulse-glow" style={{
        background: "linear-gradient(100deg, #2a1a3e, #0a0412)",
        border: "2px solid #fdc700", borderLeft: "5px solid #fdc700",
        borderRadius: 4, padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 12, color: "#fdc700",
        marginBottom: 14, boxShadow: "0 0 20px rgba(253,199,0,0.3), 3px 4px 0 #0a0412",
      }}>
        <Sparkles style={{ width: 22, height: 22, color: "#fdc700" }} />
        <div style={{ flex: 1, textAlign: "left" }}>
          <div className="font-display" style={{ fontSize: 14, lineHeight: 1 }}>ALEATÓRIO</div>
          <div className="font-body" style={{ fontSize: 11, opacity: 0.75, marginTop: 3 }}>
            Sorteia um dos 9 arquétipos restantes.
          </div>
        </div>
        <ArrowRight style={{ width: 16, height: 16, color: "#fdc700" }} />
      </button>

      <div className="relative z-10 font-hud" style={{ color: "#fdc700", fontSize: 12, marginBottom: 8, opacity: 0.8 }}>
        ▸ OU ESCOLHA DIRETO
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 pb-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {candidates.map((id) => {
          const f = FIGHTERS[id];
          const Avatar = AVATARS[id];
          const mu = getMatchup(stats.matches, id);
          const favored = mu.total > 0 && mu.wins > mu.losses;
          const bad = mu.total > 0 && mu.losses > mu.wins;
          return (
            <button key={id} onClick={() => onPick(id)} className="arcade-btn text-left" style={{
              background: "linear-gradient(135deg, #14081f, #0a0412)",
              border: `2px solid ${f.colors.primary}55`,
              borderLeft: `4px solid ${f.colors.primary}`,
              borderRadius: 4, padding: 8,
              color: "#f5efdc", cursor: "pointer",
              boxShadow: `2px 3px 0 #0a0412`,
              display: "flex", flexDirection: "column", gap: 4,
              position: "relative", overflow: "hidden",
            }}>
              {mu.total === 0 && (
                <div className="font-hud" style={{
                  position: "absolute", top: 4, right: 6,
                  fontSize: 10, color: "#fdc700", background: "#0a0412cc",
                  padding: "1px 5px", border: "1px solid #fdc70088", zIndex: 2,
                }}>NOVO</div>
              )}
              <div style={{
                width: "100%", height: 78,
                background: `radial-gradient(ellipse at center, ${f.colors.primary}33, transparent 70%)`,
                borderRadius: 3, overflow: "hidden",
              }}>
                <Avatar color={f.colors.primary} accent={f.colors.accent} />
              </div>
              <div className="font-display" style={{
                fontSize: 10.5, color: f.colors.accent, lineHeight: 1, marginTop: 2,
              }}>{f.fighterName}</div>
              <div className="font-hud" style={{ fontSize: 11, opacity: 0.6, lineHeight: 1 }}>
                {f.className}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {mu.total > 0 ? (
                  <>
                    <span className="font-hud" style={{ fontSize: 11, color: "#22c55e" }}>{mu.wins}W</span>
                    <span className="font-hud" style={{ fontSize: 11, color: "#ff2e63" }}>{mu.losses}L</span>
                    {favored && <span className="font-hud" style={{ fontSize: 10, color: "#22c55e" }}>✓ favorito</span>}
                    {bad && <span className="font-hud" style={{ fontSize: 10, color: "#ff2e63" }}>✗ revanche?</span>}
                  </>
                ) : (
                  <span className="font-hud" style={{ fontSize: 11, opacity: 0.5 }}>nunca enfrentou</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PowerCard = ({ power, rarity, color, disabled, onClick, legendary, glow }) => (
  <button disabled={disabled} onClick={onClick} className={`power-card ${glow ? "pulse-glow" : ""}`} style={{
    background: "#0a0412", border: `2px solid ${color}`, borderLeft: `5px solid ${color}`,
    padding: "8px 10px", textAlign: "left", color: "#f5efdc",
    position: "relative", cursor: disabled ? "not-allowed" : "pointer",
    minHeight: 60, boxShadow: glow ? `0 0 20px ${color}` : "2px 3px 0 #0a0412",
  }}>
    <div className="flex justify-between items-start">
      <div className="font-display" style={{ fontSize: 11, color, lineHeight: 1, paddingRight: 4 }}>{power.name}</div>
      {legendary && <Sparkles style={{ width: 12, height: 12, color }} />}
    </div>
    <div className="font-body" style={{ fontSize: 10.5, opacity: 0.75, marginTop: 4, lineHeight: 1.2 }}>{power.desc}</div>
    <div className="flex gap-2 mt-1.5 font-hud" style={{ fontSize: 11 }}>
      {power.dmg > 0 && <span style={{ color: "#ff2e63" }}>⚔ {power.dmg}</span>}
      {power.heal && <span style={{ color: "#22c55e" }}>+ {power.heal}</span>}
      {legendary && <span style={{ color, opacity: 0.8 }}>SP 100</span>}
    </div>
  </button>
);

const Arena = ({ player, opponent, onEnd, tournamentCtx = null }) => {
  const PAvatar = AVATARS[player.id];
  const OAvatar = AVATARS[opponent.id];
  const buffs = tournamentCtx?.buffs || {};
  const initialHP = tournamentCtx?.carryHP ?? 100;
  const initialSpecial = buffs.specialStart || 0;
  const [state, setState] = useState({
    playerHP: initialHP, aiHP: 100, playerSpecial: initialSpecial, aiSpecial: 0,
    turn: "player",
    log: [{ text: `${opponent.fighterName}: "${opponent.intro}"`, kind: "taunt" }],
    busy: false,
    playerShake: false, aiShake: false, playerFlash: false, aiFlash: false,
    playerDmgFloat: null, aiDmgFloat: null,
    aiStun: 0, ended: false, lastPlayerMove: null, comboStreak: 0,
  });

  useEffect(() => {
    if (state.turn !== "ai" || state.busy || state.ended) return;
    const t = setTimeout(() => {
      if (state.aiStun > 0) {
        setState((s) => ({
          ...s,
          log: [{ text: `${opponent.fighterName} está paralisado!`, kind: "info" }, ...s.log].slice(0, 5),
          turn: "player", aiStun: s.aiStun - 1,
        }));
        return;
      }
      const move = aiPickMove(opponent, state);
      performAttack("ai", move);
    }, 900);
    return () => clearTimeout(t);
  }, [state.turn, state.busy, state.ended]);

  const performAttack = (side, power) => {
    const attacker = side === "player" ? player : opponent;
    const defender = side === "player" ? opponent : player;
    let { dmg, heal, crit } = calcDamage(power, attacker, defender);
    // Apply tournament buffs to player
    if (side === "player") {
      if (buffs.atkBuff && dmg > 0) dmg = Math.round(dmg * (1 + buffs.atkBuff));
      if (buffs.critBuff && !crit && Math.random() < buffs.critBuff && dmg > 0) {
        crit = true;
        dmg = Math.round(dmg * 1.6);
      }
    } else {
      // Enemy hitting player — apply defense buff
      if (buffs.defBuff && dmg > 0) dmg = Math.round(dmg * (1 - buffs.defBuff));
    }
    let comboText = "";
    let newCombo = state.comboStreak;
    if (side === "player") {
      if (state.lastPlayerMove === power.name && power.dmg > 0) {
        newCombo = state.comboStreak + 1;
        const bonus = Math.round(dmg * 0.25 * newCombo);
        dmg += bonus;
        comboText = ` · COMBO x${newCombo + 1}!`;
      } else { newCombo = 0; }
    }

    setState((s) => {
      let ns = { ...s, busy: true, comboStreak: side === "player" ? newCombo : s.comboStreak };
      if (side === "player") { ns.lastPlayerMove = power.name; ns.aiShake = true; ns.aiFlash = true; }
      else { ns.playerShake = true; ns.playerFlash = true; }
      const gaugeDelta = power === attacker.powers.legendary ? -100 : 15;
      if (side === "player") ns.playerSpecial = Math.max(0, Math.min(100, s.playerSpecial + gaugeDelta));
      else ns.aiSpecial = Math.max(0, Math.min(100, s.aiSpecial + gaugeDelta));

      if (heal > 0) {
        if (side === "player") {
          ns.playerHP = Math.min(100, s.playerHP + heal);
          ns.playerDmgFloat = { val: `+${heal}`, color: "#22c55e", key: Date.now() };
        } else {
          ns.aiHP = Math.min(100, s.aiHP + heal);
          ns.aiDmgFloat = { val: `+${heal}`, color: "#22c55e", key: Date.now() };
        }
        ns.log = [{ text: `${attacker.fighterName} usa ${power.name}. +${heal} HP`, kind: "heal" }, ...s.log].slice(0, 5);
      } else {
        if (side === "player") {
          ns.aiHP = Math.max(0, s.aiHP - dmg);
          ns.aiDmgFloat = { val: `-${dmg}${crit ? "!" : ""}`, color: crit ? "#fdc700" : "#ff2e63", key: Date.now() };
        } else {
          ns.playerHP = Math.max(0, s.playerHP - dmg);
          ns.playerDmgFloat = { val: `-${dmg}${crit ? "!" : ""}`, color: crit ? "#fdc700" : "#ff2e63", key: Date.now() };
        }
        ns.log = [{
          text: `${attacker.fighterName} usa ${power.name}. ${dmg} de dano${crit ? " CRÍTICO!" : ""}${comboText}`,
          kind: crit ? "crit" : newCombo > 0 && side === "player" ? "combo" : "hit",
        }, ...s.log].slice(0, 5);
      }
      if (power.stun) { if (side === "player") ns.aiStun = 1; }
      return ns;
    });

    setTimeout(() => {
      setState((s) => ({
        ...s, playerShake: false, aiShake: false, playerFlash: false, aiFlash: false,
        busy: false, turn: side === "player" ? "ai" : "player",
        ended: s.playerHP <= 0 || s.aiHP <= 0,
      }));
    }, 600);
    setTimeout(() => {
      setState((s) => ({ ...s, playerDmgFloat: null, aiDmgFloat: null }));
    }, 1100);
  };

  useEffect(() => {
    if (state.ended) {
      const t = setTimeout(() => onEnd(state.playerHP > 0 ? "win" : "lose", state.playerHP), 1400);
      return () => clearTimeout(t);
    }
  }, [state.ended]);

  const hpBar = (hp, side) => (
    <div style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-1">
        <div className="font-hud" style={{ fontSize: 13, color: side === "player" ? player.colors.accent : opponent.colors.accent }}>
          {(side === "player" ? player : opponent).fighterName}
        </div>
        <div className="font-hud" style={{ fontSize: 12, opacity: 0.7 }}>HP {hp}/100</div>
      </div>
      <div style={{ height: 12, background: "#2a1a3e", border: "2px solid #0a0412", position: "relative", overflow: "hidden" }}>
        <div style={{
          width: `${hp}%`, height: "100%",
          background: hp > 50 ? "linear-gradient(90deg, #22c55e, #22c55ecc)"
            : hp > 25 ? "linear-gradient(90deg, #fdc700, #fdc700cc)"
            : "linear-gradient(90deg, #ff2e63, #ff2e63cc)",
          boxShadow: `0 0 10px ${hp > 50 ? "#22c55e" : hp > 25 ? "#fdc700" : "#ff2e63"}`,
          transition: "width 0.5s ease",
        }} />
      </div>
      <div style={{ height: 5, background: "#2a1a3e", border: "1px solid #0a0412", marginTop: 2, position: "relative", overflow: "hidden" }}>
        <div style={{
          width: `${side === "player" ? state.playerSpecial : state.aiSpecial}%`, height: "100%",
          background: "linear-gradient(90deg, #00e5ff, #fdc700)", boxShadow: "0 0 8px #00e5ff",
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );

  const canPlayLegendary = state.playerSpecial >= 100;

  return (
    <div className="relative w-full h-full flex flex-col scanlines overflow-hidden crt" style={{ background: "#080410" }}>
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 20% 30%, ${opponent.colors.primary}33, transparent 50%),
          radial-gradient(ellipse at 80% 70%, ${player.colors.primary}33, transparent 50%),
          linear-gradient(180deg, #1d0a2e 0%, #080410 50%, #14081f 100%)
        `,
      }} />
      <div className="absolute" style={{
        bottom: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(180deg, transparent, rgba(253,199,0,0.08) 30%, rgba(253,199,0,0.15) 100%)",
        backgroundImage: "linear-gradient(rgba(253,199,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(253,199,0,0.25) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        transform: "perspective(400px) rotateX(60deg)", transformOrigin: "bottom", opacity: 0.35,
      }} />
      {tournamentCtx && (
        <div className="relative z-10" style={{
          background: opponent.isBoss ? "linear-gradient(90deg, #ff2e6344, #0a0412, #ff2e6344)" : "#0a0412cc",
          borderBottom: `1px solid ${opponent.isBoss ? "#ff2e63" : "#2a1a3e"}`,
          padding: "4px 10px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div className="font-hud" style={{ fontSize: 12, color: "#fdc700", letterSpacing: 1 }}>
            ▸ TORNEIO · ROUND {tournamentCtx.round + 1}/3 · {opponent.roundLabel}
          </div>
          {opponent.isBoss && (
            <div className="font-display blink" style={{
              fontSize: 12, color: "#ff2e63",
              textShadow: "1px 1px 0 #0a0412", letterSpacing: 1,
            }}>★ BOSS ★</div>
          )}
        </div>
      )}
      <div className="relative z-10 p-3" style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>{hpBar(state.playerHP, "player")}</div>
        <div className="font-display" style={{ alignSelf: "center", fontSize: 20, color: "#fdc700", textShadow: "2px 2px 0 #0a0412" }}>VS</div>
        <div style={{ flex: 1 }}>{hpBar(state.aiHP, "ai")}</div>
      </div>
      <div className="relative z-10 flex-1 flex items-end justify-between px-4" style={{ paddingBottom: 10 }}>
        <div className={`relative ${state.playerShake ? "shake" : ""}`} style={{ width: 130, height: 170 }}>
          <div className={state.playerFlash ? "hit-flash" : ""} style={{ width: "100%", height: "100%" }}>
            <PAvatar color={player.colors.primary} accent={player.colors.accent} />
          </div>
          {state.playerDmgFloat && (
            <div key={state.playerDmgFloat.key} className="font-display float-damage" style={{
              position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
              fontSize: 28, color: state.playerDmgFloat.color, textShadow: "2px 2px 0 #0a0412", zIndex: 10,
            }}>{state.playerDmgFloat.val}</div>
          )}
          {state.comboStreak > 0 && !state.ended && (
            <div className="font-display" style={{
              position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
              fontSize: 14, color: "#fdc700", textShadow: "2px 2px 0 #ff2e63, 4px 4px 0 #0a0412",
              whiteSpace: "nowrap",
            }}>COMBO x{state.comboStreak + 1}</div>
          )}
        </div>
        <div className="font-hud blink" style={{
          alignSelf: "center", background: "#0a0412cc", padding: "3px 10px",
          border: `1px solid ${state.turn === "player" ? player.colors.accent : opponent.colors.accent}`,
          color: state.turn === "player" ? player.colors.accent : opponent.colors.accent,
          fontSize: 13,
        }}>
          {state.ended ? (state.playerHP > 0 ? "VITÓRIA!" : "DERROTA")
            : state.turn === "player" ? "SUA VEZ" : `VEZ DE ${opponent.fighterName.split(" ")[0]}`}
        </div>
        <div className={`relative ${state.aiShake ? "shake" : ""} ${opponent.isBoss ? "pulse-glow" : ""}`} style={{
          width: 130, height: 170,
          color: opponent.isBoss ? "#ff2e63" : undefined,
          borderRadius: opponent.isBoss ? "50%" : undefined,
        }}>
          <div className={state.aiFlash ? "hit-flash" : ""} style={{ width: "100%", height: "100%" }}>
            <OAvatar color={opponent.colors.primary} accent={opponent.colors.accent} flip />
          </div>
          {state.aiDmgFloat && (
            <div key={state.aiDmgFloat.key} className="font-display float-damage" style={{
              position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
              fontSize: 28, color: state.aiDmgFloat.color, textShadow: "2px 2px 0 #0a0412", zIndex: 10,
            }}>{state.aiDmgFloat.val}</div>
          )}
        </div>
      </div>
      <div className="relative z-10 px-3" style={{ marginBottom: 6 }}>
        <div style={{ background: "#0a0412cc", border: "1px solid #2a1a3e", borderRadius: 4, padding: "6px 10px", minHeight: 50, maxHeight: 70, overflow: "hidden" }}>
          {state.log.slice(0, 3).map((l, i) => (
            <div key={`${i}-${l.text}`} className="font-hud" style={{
              fontSize: 13,
              color: l.kind === "crit" ? "#fdc700" : l.kind === "heal" ? "#22c55e"
                : l.kind === "taunt" ? "#c084fc" : l.kind === "combo" ? "#fb7185" : "#f5efdc",
              opacity: 1 - i * 0.3, lineHeight: 1.3,
            }}>▸ {l.text}</div>
          ))}
        </div>
      </div>
      <div className="relative z-10 p-3 pt-1">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {player.powers.common.map((p, i) => (
            <PowerCard key={i} power={p} rarity="comum" color="#f5efdc"
              disabled={state.turn !== "player" || state.busy || state.ended}
              onClick={() => performAttack("player", p)} />
          ))}
          <PowerCard power={player.powers.rare} rarity="raro" color="#00e5ff"
            disabled={state.turn !== "player" || state.busy || state.ended}
            onClick={() => performAttack("player", player.powers.rare)} />
          <PowerCard power={player.powers.legendary} rarity="lendário" color="#fdc700"
            legendary glow={canPlayLegendary}
            disabled={state.turn !== "player" || state.busy || state.ended || !canPlayLegendary}
            onClick={() => performAttack("player", player.powers.legendary)} />
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// RESULT SCREEN
// =============================================================================

const ResultScreen = ({ result, player, opponent, stats, onRevanche, onShare, onHub }) => {
  const won = result === "win";
  const Avatar = AVATARS[player.id];
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: won
          ? `radial-gradient(circle at center, ${player.colors.accent}44, transparent 60%)`
          : "radial-gradient(circle at center, rgba(100,100,120,0.3), transparent 60%)",
      }} />
      <div className="relative z-10 font-display text-center stagger-in" style={{
        fontSize: 58, lineHeight: 0.9, marginTop: 8,
        color: won ? player.colors.accent : "#8a8aa0",
        textShadow: won
          ? `4px 4px 0 ${player.colors.primary}, 8px 8px 0 #0a0412`
          : "4px 4px 0 #3a3a4e, 8px 8px 0 #0a0412",
      }}>{won ? "VITÓRIA!" : "DERROTA"}</div>
      <div className="relative z-10 font-hud text-center stagger-in" style={{
        fontSize: 15, opacity: 0.85, marginTop: 8, fontStyle: "italic", animationDelay: "0.15s",
      }}>{won ? `"${player.victory}"` : `"${opponent.victory}"`}</div>

      {/* stats update */}
      <div className="relative z-10 stagger-in mx-auto mt-4" style={{
        animationDelay: "0.25s",
        background: "#0a0412", border: "1px solid #2a1a3e", padding: "8px 14px",
        display: "flex", gap: 16, fontSize: 13,
      }}>
        <div className="font-hud" style={{ color: "#22c55e" }}>W {stats.wins}</div>
        <div className="font-hud" style={{ color: "#ff2e63" }}>L {stats.losses}</div>
        <div className="font-hud" style={{ color: "#fdc700" }}>★ {stats.streak}</div>
      </div>

      {/* share card */}
      <div className="relative z-10 stagger-in mx-auto mt-5" style={{
        width: 260, animationDelay: "0.4s",
        background: `linear-gradient(135deg, ${player.colors.primary}, ${player.colors.accent})`,
        padding: 4, borderRadius: 6, boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}>
        <div style={{ background: "#0a0412", padding: 12, borderRadius: 4, position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 halftone opacity-20" />
          <div className="relative font-hud" style={{ fontSize: 12, color: player.colors.accent, marginBottom: 4 }}>
            ▸ SOCIAL FIGHTERS ARENA
          </div>
          <div className="relative font-display" style={{
            fontSize: 20, color: "#f5efdc", lineHeight: 0.95,
            textShadow: `2px 2px 0 ${player.colors.primary}`,
          }}>{player.fighterName}</div>
          <div className="relative font-hud" style={{
            fontSize: 12, color: player.colors.accent, opacity: 0.85, marginTop: 2,
          }}>[{player.className}]</div>
          <div className="relative mt-2" style={{ width: "100%", height: 140, position: "relative" }}>
            <Avatar color={player.colors.primary} accent={player.colors.accent} />
          </div>
          <div className="relative font-display text-center" style={{
            fontSize: 16, color: won ? "#22c55e" : "#ff2e63", marginTop: 4,
            textShadow: "2px 2px 0 #0a0412",
          }}>
            {won ? `★ DERROTEI ${opponent.fighterName}` : `☠ CAÍ PRA ${opponent.fighterName}`}
          </div>
          <div className="relative font-hud text-center" style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            crie o seu em 3 min · sfa.app
          </div>
        </div>
      </div>

      <div className="relative z-10 flex gap-3 justify-center stagger-in pb-4" style={{ marginTop: 18, animationDelay: "0.55s" }}>
        <ArcadeButton onClick={onRevanche} color={player.colors.primary} small>
          <RotateCcw style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> revanche
        </ArcadeButton>
        <ArcadeButton onClick={onShare} color="#00e5ff" small>
          <Share2 style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> share
        </ArcadeButton>
        <ArcadeButton onClick={onHub} color="#fdc700" small>
          <Home style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> hub
        </ArcadeButton>
      </div>
    </div>
  );
};

// =============================================================================
// SHARE SCREEN — card viral com link de desafio
// =============================================================================

const ShareScreen = ({ player, stats, lastResult, lastOpponent, onBack }) => {
  const Avatar = AVATARS[player.id];
  const [copied, setCopied] = useState(null);

  // Constrói "link" de share simulado (no MVP real seria URL única gerada no back)
  const shareCode = `${player.id}-${stats.wins}-${stats.streak}`;
  const challengeUrl = `sfa.app/duel/${shareCode}`;
  const profileUrl = `sfa.app/f/${shareCode}`;

  const fakeCopy = (label, text) => {
    try {
      navigator.clipboard?.writeText?.(text);
    } catch {}
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  const won = lastResult === "win";

  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at top, ${player.colors.primary}33, transparent 50%), radial-gradient(ellipse at bottom, ${player.colors.accent}22, transparent 50%)`,
      }} />

      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> voltar
      </button>

      <div className="relative z-10 mt-3 mb-3">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13 }}>▸ COMPARTILHAR</div>
        <div className="font-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1 }}>
          SEU CARD<br /><span style={{ color: "#00e5ff" }}>VIRAL</span>
        </div>
      </div>

      {/* Card grande */}
      <div className="relative z-10 stagger-in mx-auto" style={{
        width: 280,
        background: `linear-gradient(135deg, ${player.colors.primary}, ${player.colors.accent})`,
        padding: 4, borderRadius: 8, boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}>
        <div style={{ background: "#0a0412", padding: 14, borderRadius: 6, position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 halftone opacity-20" />

          {/* burst rays */}
          <svg viewBox="0 0 280 380" className="absolute inset-0" style={{ opacity: 0.25 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i}
                d={`M140 180 L${140 + Math.cos((i / 14) * Math.PI * 2) * 280} ${180 + Math.sin((i / 14) * Math.PI * 2) * 280}`}
                stroke={player.colors.accent} strokeWidth="2" opacity="0.4" />
            ))}
          </svg>

          <div className="relative font-hud" style={{ fontSize: 12, color: player.colors.accent, marginBottom: 4, letterSpacing: 2 }}>
            ▸ SOCIAL FIGHTERS ARENA
          </div>
          <div className="relative font-display" style={{
            fontSize: 24, color: "#f5efdc", lineHeight: 0.95,
            textShadow: `2px 2px 0 ${player.colors.primary}, 4px 4px 0 #0a0412`,
          }}>{player.fighterName}</div>
          <div className="relative font-hud" style={{
            fontSize: 13, color: player.colors.accent, opacity: 0.9, marginTop: 3,
          }}>[{player.className}] · LV {stats.level}</div>

          <div className="relative mt-3 mx-auto" style={{
            width: "100%", height: 180, position: "relative",
            background: `radial-gradient(ellipse at center, ${player.colors.primary}33, transparent 70%)`,
            border: `1px solid ${player.colors.accent}66`, borderRadius: 4,
          }}>
            <Avatar color={player.colors.primary} accent={player.colors.accent} />
          </div>

          {/* Stats grid */}
          <div className="relative mt-3 grid grid-cols-3 gap-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <StatBlock label="VITÓRIAS" value={stats.wins} color="#22c55e" />
            <StatBlock label="STREAK" value={stats.streak} color="#fdc700" />
            <StatBlock label="LV" value={stats.level} color="#00e5ff" />
          </div>

          {lastOpponent && lastResult && (
            <div className="relative font-display text-center" style={{
              fontSize: 13, color: won ? "#22c55e" : "#ff2e63", marginTop: 8,
              textShadow: "1px 1px 0 #0a0412",
              padding: "4px 8px", border: `1px dashed ${won ? "#22c55e" : "#ff2e63"}`,
            }}>
              {won ? `★ derrotei ${lastOpponent.fighterName}` : `☠ caí pra ${lastOpponent.fighterName}`}
            </div>
          )}

          <div className="relative font-hud text-center" style={{ fontSize: 11, opacity: 0.55, marginTop: 8 }}>
            crie o seu em 3 min · sfa.app
          </div>
        </div>
      </div>

      {/* Share actions */}
      <div className="relative z-10 mt-5 flex flex-col gap-2 pb-4">
        <ShareAction
          icon={Swords}
          color="#ff2e63"
          title="LINK DE DESAFIO"
          desc="Quem clicar luta contra você direto."
          value={challengeUrl}
          copied={copied === "challenge"}
          onClick={() => fakeCopy("challenge", challengeUrl)}
        />
        <ShareAction
          icon={User}
          color="#00e5ff"
          title="PERFIL PÚBLICO"
          desc="Página do seu lutador, sem login."
          value={profileUrl}
          copied={copied === "profile"}
          onClick={() => fakeCopy("profile", profileUrl)}
        />
        <ShareAction
          icon={Download}
          color="#fdc700"
          title="BAIXAR IMAGEM"
          desc="PNG transparente para post/story."
          value="card-1080x1350.png"
          copied={copied === "download"}
          onClick={() => fakeCopy("download", "download iniciado")}
          mock
        />

        {/* Network shares */}
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 12, marginTop: 8, marginBottom: 4 }}>
          ▸ POSTAR DIRETO
        </div>
        <div className="grid gap-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {["linkedin", "instagram", "facebook", "tiktok"].map((n) => {
            const I = NETWORK_ICONS[n];
            return (
              <button key={n} onClick={() => fakeCopy(n, `posted to ${n}`)} className="arcade-btn" style={{
                background: "#0a0412", border: `2px solid ${NETWORK_COLORS[n]}66`,
                borderRadius: 4, padding: "10px 4px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                color: NETWORK_COLORS[n],
              }}>
                <I style={{ width: 18, height: 18 }} />
                <div className="font-hud" style={{ fontSize: 10, opacity: 0.8 }}>{NETWORK_LABELS[n]}</div>
              </button>
            );
          })}
        </div>

        <div className="font-hud" style={{
          fontSize: 11, opacity: 0.55, marginTop: 10, padding: 8,
          background: "#0a0412", border: "1px dashed #2a1a3e",
          textAlign: "center", lineHeight: 1.5,
        }}>
          ⓘ no MVP real, "BAIXAR IMAGEM" gera PNG via canvas server-side<br />
          e o link de desafio cria entrada em <span className="font-hud" style={{ color: "#00e5ff" }}>share_links</span>
        </div>
      </div>
    </div>
  );
};

const StatBlock = ({ label, value, color }) => (
  <div style={{
    background: "#0a0412", border: `1px solid ${color}55`, padding: "6px 4px",
    textAlign: "center",
  }}>
    <div className="font-hud" style={{ fontSize: 9, opacity: 0.7, color: "#f5efdc" }}>{label}</div>
    <div className="font-display" style={{ fontSize: 18, color, lineHeight: 1, marginTop: 2 }}>{value}</div>
  </div>
);

const ShareAction = ({ icon: Icon, color, title, desc, value, copied, onClick, mock }) => (
  <button onClick={onClick} className="arcade-btn text-left" style={{
    background: copied
      ? `linear-gradient(100deg, ${color}33, #0a0412)`
      : "linear-gradient(100deg, #14081f, #0a0412)",
    border: `2px solid ${copied ? color : color + "55"}`,
    borderLeft: `5px solid ${color}`,
    borderRadius: 4, padding: "10px 12px",
    display: "flex", alignItems: "center", gap: 10, color: "#f5efdc",
    boxShadow: `2px 3px 0 #0a0412`,
    transition: "all 0.2s ease",
  }}>
    <Icon style={{ width: 22, height: 22, color, flexShrink: 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="font-display" style={{ fontSize: 13, color, lineHeight: 1 }}>
        {copied ? (mock ? "✓ SIMULADO" : "✓ COPIADO!") : title}
      </div>
      <div className="font-hud" style={{
        fontSize: 11, opacity: 0.7, marginTop: 3,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{copied ? value : desc}</div>
    </div>
    {!copied && <Share2 style={{ width: 14, height: 14, color: color + "aa", flexShrink: 0 }} />}
    {copied && <Check style={{ width: 16, height: 16, color, flexShrink: 0 }} strokeWidth={3} />}
  </button>
);

// =============================================================================
// MATCH HISTORY — últimas 20 lutas
// =============================================================================

const MatchHistory = ({ player, stats, onBack }) => {
  const matches = (stats.matches || []).slice().reverse();

  // Calcula matchups agregados
  const matchupAgg = {};
  (stats.matches || []).forEach((m) => {
    if (!matchupAgg[m.opp]) matchupAgg[m.opp] = { w: 0, l: 0 };
    if (m.r === "win") matchupAgg[m.opp].w++;
    else matchupAgg[m.opp].l++;
  });
  const sortedMatchups = Object.entries(matchupAgg)
    .sort((a, b) => b[1].w + b[1].l - (a[1].w + a[1].l))
    .slice(0, 5);

  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at top, rgba(124,58,237,0.18), transparent 60%)",
      }} />

      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> hub
      </button>

      <div className="relative z-10 mt-3 mb-3">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13 }}>▸ HISTÓRICO</div>
        <div className="font-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1 }}>
          ÚLTIMAS<br /><span style={{ color: "#c084fc" }}>BATALHAS</span>
        </div>
      </div>

      {/* aggregate */}
      <div className="relative z-10 grid grid-cols-3 gap-2 mb-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <div style={{ background: "#0a0412", border: "1px solid #22c55e55", padding: "8px 4px", textAlign: "center" }}>
          <div className="font-hud" style={{ fontSize: 10, opacity: 0.7 }}>TOTAL W</div>
          <div className="font-display" style={{ fontSize: 22, color: "#22c55e", lineHeight: 1 }}>{stats.wins}</div>
        </div>
        <div style={{ background: "#0a0412", border: "1px solid #ff2e6355", padding: "8px 4px", textAlign: "center" }}>
          <div className="font-hud" style={{ fontSize: 10, opacity: 0.7 }}>TOTAL L</div>
          <div className="font-display" style={{ fontSize: 22, color: "#ff2e63", lineHeight: 1 }}>{stats.losses}</div>
        </div>
        <div style={{ background: "#0a0412", border: "1px solid #fdc70055", padding: "8px 4px", textAlign: "center" }}>
          <div className="font-hud" style={{ fontSize: 10, opacity: 0.7 }}>STREAK</div>
          <div className="font-display" style={{ fontSize: 22, color: "#fdc700", lineHeight: 1 }}>★{stats.streak}</div>
        </div>
      </div>

      {/* top matchups */}
      {sortedMatchups.length > 0 && (
        <>
          <div className="relative z-10 font-hud" style={{ color: "#fdc700", fontSize: 12, marginBottom: 6 }}>
            ▸ MATCHUPS MAIS FREQUENTES
          </div>
          <div className="relative z-10 flex flex-col gap-1.5 mb-4">
            {sortedMatchups.map(([oppId, mu]) => {
              const opp = FIGHTERS[oppId];
              if (!opp) return null;
              const OAvatar = AVATARS[oppId];
              const total = mu.w + mu.l;
              const winRate = total > 0 ? Math.round((mu.w / total) * 100) : 0;
              return (
                <div key={oppId} style={{
                  background: "#0a0412", border: `1px solid ${opp.colors.primary}44`,
                  borderLeft: `4px solid ${opp.colors.primary}`,
                  padding: "6px 10px", display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{ width: 36, height: 42, flexShrink: 0 }}>
                    <OAvatar color={opp.colors.primary} accent={opp.colors.accent} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-display" style={{ fontSize: 11, color: opp.colors.accent, lineHeight: 1 }}>
                      {opp.fighterName}
                    </div>
                    <div className="font-hud" style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                      {total} {total === 1 ? "luta" : "lutas"} · {winRate}%
                    </div>
                  </div>
                  <div className="flex gap-2 font-hud" style={{ fontSize: 12 }}>
                    <span style={{ color: "#22c55e" }}>{mu.w}W</span>
                    <span style={{ color: "#ff2e63" }}>{mu.l}L</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* recent matches */}
      <div className="relative z-10 font-hud" style={{ color: "#fdc700", fontSize: 12, marginBottom: 6 }}>
        ▸ ÚLTIMAS LUTAS
      </div>
      {matches.length === 0 ? (
        <div className="relative z-10 font-body" style={{
          padding: 20, textAlign: "center", fontSize: 13, opacity: 0.6,
          background: "#0a0412", border: "1px dashed #2a1a3e", borderRadius: 4,
        }}>
          Você ainda não lutou. Volta pro hub e vai pra arena.
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-1 pb-4">
          {matches.slice(0, 20).map((m, i) => {
            const opp = FIGHTERS[m.opp];
            if (!opp) return null;
            const won = m.r === "win";
            const date = new Date(m.t);
            const time = date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
            return (
              <div key={i} style={{
                background: "#0a0412",
                border: `1px solid ${won ? "#22c55e44" : "#ff2e6344"}`,
                borderLeft: `4px solid ${won ? "#22c55e" : "#ff2e63"}`,
                padding: "5px 10px", display: "flex", alignItems: "center", gap: 8,
              }}>
                <div className="font-display" style={{
                  fontSize: 13, color: won ? "#22c55e" : "#ff2e63",
                  width: 22, textAlign: "center",
                }}>{won ? "W" : "L"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-body" style={{ fontSize: 12, lineHeight: 1.2 }}>
                    vs <span style={{ color: opp.colors.accent }}>{opp.fighterName}</span>
                  </div>
                  <div className="font-hud" style={{ fontSize: 10.5, opacity: 0.55, marginTop: 1 }}>
                    {time} {m.tournament && <span style={{ color: "#fdc700" }}>· torneio</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// PUBLIC PROFILE — perfil viral aberto via link de share
// =============================================================================

// Decodifica formato "fighterId-wins-streak" do ShareScreen
const decodeShareCode = (code) => {
  if (!code) return null;
  const parts = code.split("-");
  if (parts.length < 1) return null;
  const fighterId = parts[0];
  if (!FIGHTERS[fighterId]) return null;
  return {
    fighterId,
    wins: parseInt(parts[1], 10) || 0,
    streak: parseInt(parts[2], 10) || 0,
  };
};

// Gera nome de "challenger" simulado a partir do code (estável)
const challengerHandle = (code) => {
  const parts = (code || "").split("-");
  const handles = ["@arena_warrior", "@combo_master", "@no_mercy", "@critical_hit", "@boss_mode", "@dojo_legend"];
  const seed = (parts[0] || "x").charCodeAt(0) + (parseInt(parts[1], 10) || 0);
  return handles[seed % handles.length];
};

const PublicProfile = ({ challenge, hasOwnFighter, onAccept, onCreateOwn, onDismiss }) => {
  const decoded = decodeShareCode(challenge.code);
  if (!decoded) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="font-hud" style={{ color: "#ff2e63", fontSize: 14, textAlign: "center" }}>
          ▸ link inválido<br /><br />
          <button onClick={onDismiss} className="font-display" style={{
            background: "#fdc700", color: "#0a0412",
            border: "3px solid #0a0412", padding: "10px 20px", marginTop: 10,
            boxShadow: "4px 5px 0 #0a0412",
          }}>continuar para sfa</button>
        </div>
      </div>
    );
  }

  const challenger = FIGHTERS[decoded.fighterId];
  const Avatar = AVATARS[decoded.fighterId];
  const handle = challengerHandle(challenge.code);
  const isDuel = challenge.type === "duel";

  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto crt">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at top, ${challenger.colors.primary}44, transparent 55%), radial-gradient(ellipse at bottom, ${challenger.colors.accent}33, transparent 50%)`,
      }} />
      <div className="absolute inset-0 halftone opacity-25" />

      {/* incoming banner */}
      <div className="relative z-10 font-hud blink stagger-in" style={{
        textAlign: "center", color: "#fdc700", fontSize: 14, letterSpacing: 3,
      }}>
        ▸ {isDuel ? "DESAFIO RECEBIDO" : "PERFIL COMPARTILHADO"} ◂
      </div>

      <div className="relative z-10 font-body stagger-in" style={{
        textAlign: "center", fontSize: 12, opacity: 0.75, marginTop: 4,
        animationDelay: "0.1s",
      }}>
        <span style={{ color: challenger.colors.accent }}>{handle}</span> {isDuel ? "te chamou pra duelar" : "te enviou este card"}
      </div>

      {/* Big card */}
      <div className="relative z-10 stagger-in mx-auto mt-4" style={{
        width: 280, animationDelay: "0.25s",
        background: `linear-gradient(135deg, ${challenger.colors.primary}, ${challenger.colors.accent})`,
        padding: 4, borderRadius: 8, boxShadow: `0 20px 50px ${challenger.colors.primary}66, 0 0 60px ${challenger.colors.glow}aa`,
      }}>
        <div style={{ background: "#0a0412", padding: 14, borderRadius: 6, position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 halftone opacity-20" />

          {/* burst rays */}
          <svg viewBox="0 0 280 380" className="absolute inset-0" style={{ opacity: 0.3 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i}
                d={`M140 180 L${140 + Math.cos((i / 14) * Math.PI * 2) * 280} ${180 + Math.sin((i / 14) * Math.PI * 2) * 280}`}
                stroke={challenger.colors.accent} strokeWidth="2" opacity="0.5" />
            ))}
          </svg>

          <div className="relative font-hud" style={{
            fontSize: 11, color: challenger.colors.accent,
            marginBottom: 4, letterSpacing: 2,
          }}>
            ▸ DESAFIANTE · {handle}
          </div>
          <div className="relative font-display" style={{
            fontSize: 26, color: "#f5efdc", lineHeight: 0.95,
            textShadow: `2px 2px 0 ${challenger.colors.primary}, 4px 4px 0 #0a0412`,
          }}>{challenger.fighterName}</div>
          <div className="relative font-hud" style={{
            fontSize: 13, color: challenger.colors.accent, opacity: 0.9, marginTop: 3,
          }}>[{challenger.className}]</div>

          {/* Avatar */}
          <div className="relative mt-3 mx-auto" style={{
            width: "100%", height: 200, position: "relative",
            background: `radial-gradient(ellipse at center, ${challenger.colors.primary}33, transparent 70%)`,
            border: `1px solid ${challenger.colors.accent}55`, borderRadius: 4,
          }}>
            <Avatar color={challenger.colors.primary} accent={challenger.colors.accent} />
          </div>

          {/* Top 3 attrs */}
          <div className="relative mt-3" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {Object.entries(challenger.attrs)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([k, v]) => (
                <StatBar key={k} label={ATTR_LABELS[k]} value={v} color={challenger.colors.primary} />
              ))}
          </div>

          {/* Stats from share code */}
          {(decoded.wins > 0 || decoded.streak > 0) && (
            <div className="relative mt-3 grid gap-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ background: "#0a0412", border: "1px solid #22c55e55", padding: "6px", textAlign: "center" }}>
                <div className="font-hud" style={{ fontSize: 9, opacity: 0.7 }}>VITÓRIAS</div>
                <div className="font-display" style={{ fontSize: 18, color: "#22c55e", lineHeight: 1 }}>
                  {decoded.wins}
                </div>
              </div>
              <div style={{ background: "#0a0412", border: "1px solid #fdc70055", padding: "6px", textAlign: "center" }}>
                <div className="font-hud" style={{ fontSize: 9, opacity: 0.7 }}>STREAK</div>
                <div className="font-display" style={{ fontSize: 18, color: "#fdc700", lineHeight: 1 }}>
                  ★{decoded.streak}
                </div>
              </div>
            </div>
          )}

          {/* Taunt */}
          <div className="relative font-body" style={{
            fontSize: 12, fontStyle: "italic", textAlign: "center",
            marginTop: 10, padding: "6px 8px",
            background: `${challenger.colors.primary}22`,
            border: `1px dashed ${challenger.colors.primary}88`,
          }}>
            "{challenger.intro}"
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-5 flex flex-col gap-2 pb-4 stagger-in" style={{ animationDelay: "0.5s" }}>
        {isDuel ? (
          <ArcadeButton onClick={onAccept} color="#ff2e63" full>
            <Swords style={{ display: "inline", width: 16, height: 16, marginRight: 6 }} />
            {hasOwnFighter ? "ENFRENTAR AGORA" : "ENFRENTAR ESTE LUTADOR"}
          </ArcadeButton>
        ) : null}

        {!hasOwnFighter && (
          <ArcadeButton onClick={onCreateOwn} color="#fdc700" full>
            <Sparkles style={{ display: "inline", width: 16, height: 16, marginRight: 6 }} />
            CRIAR O MEU LUTADOR
          </ArcadeButton>
        )}

        {hasOwnFighter && !isDuel && (
          <ArcadeButton onClick={onDismiss} color="#fdc700" full>
            <Home style={{ display: "inline", width: 16, height: 16, marginRight: 6 }} />
            CONTINUAR PARA HUB
          </ArcadeButton>
        )}

        <button onClick={onDismiss} className="font-hud" style={{
          background: "transparent", color: "#f5efdc",
          border: "1px solid #2a1a3e", padding: "8px",
          fontSize: 12, opacity: 0.6, marginTop: 4,
        }}>
          {hasOwnFighter && isDuel ? "deixar pra depois · ir pro hub" : "fechar"}
        </button>
      </div>

      <div className="relative z-10 font-hud" style={{
        fontSize: 10, opacity: 0.4, textAlign: "center", marginTop: "auto",
        paddingTop: 10, lineHeight: 1.4,
      }}>
        ⓘ no MVP real, esta tela é o primeiro contato de quem<br />
        clica num link compartilhado e ainda não tem conta
      </div>
    </div>
  );
};

// =============================================================================
// HUB — central menu depois da criação
// =============================================================================

const Hub = ({ player, stats, trophies, onBattle, onTournament, onRanking, onConnections, onReforge, onHistory, onShareCard }) => {
  const Avatar = AVATARS[player.id];
  const winRate = stats.wins + stats.losses > 0
    ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
    : 0;
  const trophyCount = trophies?.count || 0;
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at top, ${player.colors.primary}33, transparent 50%), radial-gradient(ellipse at bottom, ${player.colors.accent}22, transparent 50%)`,
      }} />

      <div className="relative z-10 font-hud" style={{ color: "#fdc700", fontSize: 13, textAlign: "center" }}>
        ▸ SEU QUARTEL
      </div>

      {/* fighter card mini */}
      <div className="relative z-10 stagger-in mt-3" style={{
        background: "linear-gradient(135deg, #14081f, #0a0412)",
        border: `2px solid ${player.colors.primary}`,
        borderRadius: 6, padding: 12, display: "flex", gap: 12,
        boxShadow: `0 0 20px ${player.colors.primary}33`,
      }}>
        <div style={{
          width: 90, height: 105, flexShrink: 0,
          background: `radial-gradient(ellipse at center, ${player.colors.primary}44, transparent 70%)`,
          border: `1px solid ${player.colors.accent}`, borderRadius: 4, overflow: "hidden",
        }}>
          <Avatar color={player.colors.primary} accent={player.colors.accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="font-display" style={{
            fontSize: 16, color: "#f5efdc", lineHeight: 1,
            textShadow: `2px 2px 0 ${player.colors.primary}`,
          }}>{player.fighterName}</div>
          <div className="font-hud" style={{ fontSize: 13, color: player.colors.accent, marginTop: 3 }}>
            [{player.className}] · LV {stats.level}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div className="font-hud" style={{ fontSize: 13, color: "#22c55e" }}>W {stats.wins}</div>
            <div className="font-hud" style={{ fontSize: 13, color: "#ff2e63" }}>L {stats.losses}</div>
            <div className="font-hud" style={{ fontSize: 13, color: "#fdc700" }}>★ {stats.streak}</div>
            <div className="font-hud" style={{ fontSize: 13, opacity: 0.7 }}>{winRate}%</div>
          </div>
          {trophyCount > 0 && (
            <div style={{ marginTop: 6, display: "flex", gap: 3, alignItems: "center" }}>
              {Array.from({ length: Math.min(trophyCount, 5) }).map((_, i) => (
                <span key={i} style={{ fontSize: 14 }}>🏆</span>
              ))}
              {trophyCount > 5 && (
                <span className="font-hud" style={{ fontSize: 12, color: "#fdc700", marginLeft: 2 }}>
                  +{trophyCount - 5}
                </span>
              )}
            </div>
          )}
          <div className="font-body" style={{ fontSize: 10.5, opacity: 0.55, marginTop: 6, lineHeight: 1.3, fontStyle: "italic" }}>
            {player.tagline}
          </div>
        </div>
      </div>

      {/* menu */}
      <div className="relative z-10 flex flex-col gap-2.5 mt-5">
        <HubItem icon={Swords} color="#ff2e63" title="LUTA RÁPIDA" desc="Escolha o oponente. Combate turn-based." onClick={onBattle} />
        <HubItem icon={Crown} color="#fdc700" title="TORNEIO" desc="3 lutas em escada. HP carrega. Boss no final." onClick={onTournament} />
        <HubItem icon={Trophy} color="#c084fc" title="RANKING" desc="Sua posição no leaderboard da temporada." onClick={onRanking} />
        <HubItem icon={Share2} color="#00e5ff" title="COMPARTILHAR CARD" desc="Link viral, perfil público, post direto." onClick={onShareCard} small />
        <HubItem icon={Trophy} color="#22d3ee" title="HISTÓRICO" desc="Suas últimas 20 lutas e matchups." onClick={onHistory} small />
        <HubItem icon={Lock} color="#a855f7" title="MINHAS CONEXÕES" desc="Dados autorizados, revogação, LGPD." onClick={onConnections} small />
        <HubItem icon={User} color="#8aa0a8" title="REFAZER LUTADOR" desc="Gerar outro personagem do zero." onClick={onReforge} small />
      </div>

      <div className="relative z-10 font-hud" style={{
        marginTop: "auto", paddingTop: 20, paddingBottom: 10,
        fontSize: 11, opacity: 0.4, textAlign: "center",
      }}>
        SFA v0.6 MVP · {Storage.backend()}
      </div>
    </div>
  );
};

const HubItem = ({ icon: Icon, color, title, desc, onClick, small = false }) => (
  <button onClick={onClick} className="arcade-btn text-left" style={{
    background: "linear-gradient(100deg, #14081f, #0a0412)",
    border: `2px solid ${color}55`,
    borderLeft: `5px solid ${color}`,
    borderRadius: 4, padding: small ? "10px 12px" : "14px 14px",
    display: "flex", alignItems: "center", gap: 12,
    color: "#f5efdc",
    boxShadow: `3px 4px 0 #0a0412`,
  }}>
    <Icon style={{ width: small ? 20 : 26, height: small ? 20 : 26, color, flexShrink: 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="font-display" style={{ fontSize: small ? 13 : 15, color, lineHeight: 1 }}>{title}</div>
      <div className="font-body" style={{ fontSize: 11.5, opacity: 0.7, marginTop: 3, lineHeight: 1.3 }}>{desc}</div>
    </div>
    <ArrowRight style={{ width: 16, height: 16, color, flexShrink: 0 }} />
  </button>
);

// =============================================================================
// CONNECTIONS PANEL — LGPD / privacidade
// =============================================================================

const ConnectionsPanel = ({ player, consent, onBack, onRevoke }) => {
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const activeNetwork = player.profile.network;
  const Icon = NETWORK_ICONS[activeNetwork];
  const consentDate = consent?.timestamp
    ? new Date(consent.timestamp).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    : "há pouco";

  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> hub
      </button>

      <div className="relative z-10 mt-3 mb-4">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13 }}>▸ PRIVACIDADE · LGPD</div>
        <div className="font-display" style={{ fontSize: 24, marginTop: 4, lineHeight: 1 }}>
          MINHAS<br /><span style={{ color: "#00e5ff" }}>CONEXÕES</span>
        </div>
      </div>

      {/* active connection */}
      <div className="relative z-10" style={{
        background: "linear-gradient(100deg, #0a1a2e, #0a0412)",
        border: `2px solid ${NETWORK_COLORS[activeNetwork]}`,
        borderRadius: 6, padding: 14, marginBottom: 14,
      }}>
        <div className="flex items-center gap-3 mb-3">
          <div style={{
            width: 44, height: 44, background: NETWORK_COLORS[activeNetwork],
            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon style={{ width: 24, height: 24, color: "#fff" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontSize: 15, lineHeight: 1 }}>
              {NETWORK_LABELS[activeNetwork]}
            </div>
            <div className="font-hud" style={{ fontSize: 13, color: "#22c55e", marginTop: 2 }}>
              ● CONECTADO · OAuth oficial
            </div>
          </div>
        </div>

        <div className="font-hud" style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
          ▸ DADOS USADOS NO PERSONAGEM
        </div>
        <div className="flex flex-col gap-1">
          {CONSENT_ITEMS.map((item) => {
            const isOn = consent?.items?.[item.id] !== false;
            return (
              <div key={item.id} className="flex items-center gap-2 font-body" style={{ fontSize: 12 }}>
                {isOn ? (
                  <Check style={{ width: 13, height: 13, color: "#22c55e", flexShrink: 0 }} strokeWidth={3} />
                ) : (
                  <div style={{ width: 13, height: 1, background: "#555", flexShrink: 0 }} />
                )}
                <span style={{ opacity: isOn ? 1 : 0.45 }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="font-hud" style={{
          fontSize: 11, opacity: 0.55, marginTop: 10, paddingTop: 8,
          borderTop: "1px solid #2a1a3e",
        }}>
          último consentimento: {consentDate}<br />
          registrado em consent_logs com IP e texto exato
        </div>

        {!confirmRevoke ? (
          <button onClick={() => setConfirmRevoke(true)} className="arcade-btn font-display mt-3" style={{
            background: "transparent", color: "#ff2e63",
            border: "2px solid #ff2e63", padding: "8px 14px", fontSize: 12,
            borderRadius: 4, textTransform: "uppercase", width: "100%",
          }}>
            <Unplug style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} />
            revogar acesso
          </button>
        ) : (
          <div style={{
            marginTop: 10, padding: 10, background: "#ff2e6322",
            border: "1px solid #ff2e63", borderRadius: 4,
          }}>
            <div className="font-hud" style={{ fontSize: 13, color: "#ff2e63", marginBottom: 6 }}>
              <AlertTriangle style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} />
              REVOGAR?
            </div>
            <div className="font-body" style={{ fontSize: 11.5, opacity: 0.85, marginBottom: 10 }}>
              Seus dados deixam de alimentar o personagem. O lutador permanece no estado atual.
            </div>
            <div className="flex gap-2">
              <ArcadeButton onClick={() => { onRevoke(); setConfirmRevoke(false); }} color="#ff2e63" small>confirmar</ArcadeButton>
              <ArcadeButton onClick={() => setConfirmRevoke(false)} color="#2a1a3e" small>cancelar</ArcadeButton>
            </div>
          </div>
        )}
      </div>

      {/* other networks */}
      <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, marginBottom: 6 }}>
        ▸ OUTRAS REDES
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {["linkedin", "instagram", "facebook", "tiktok"].filter((n) => n !== activeNetwork).map((n) => {
          const I = NETWORK_ICONS[n];
          return (
            <div key={n} style={{
              background: "#0a0412", border: "1px solid #2a1a3e", borderRadius: 4,
              padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <I style={{ width: 18, height: 18, color: NETWORK_COLORS[n], opacity: 0.7 }} />
              <div className="font-body" style={{ flex: 1, fontSize: 13, opacity: 0.8 }}>{NETWORK_LABELS[n]}</div>
              <button className="font-hud" style={{
                fontSize: 12, color: "#00e5ff", border: "1px solid #00e5ff44",
                padding: "3px 10px", borderRadius: 3, background: "transparent",
              }}>
                <Plus style={{ display: "inline", width: 11, height: 11, marginRight: 3 }} />
                conectar
              </button>
            </div>
          );
        })}
      </div>

      {/* LGPD rights */}
      <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, marginBottom: 6 }}>
        ▸ MEUS DIREITOS
      </div>
      <div className="flex flex-col gap-2 pb-4">
        <LgpdAction icon={Download} color="#00e5ff" label="Exportar meus dados" desc="JSON com tudo que você autorizou." />
        <LgpdAction icon={RotateCcw} color="#c084fc" label="Corrigir informações" desc="Regera personagem com dados atuais." />
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="arcade-btn text-left" style={{
            background: "#0a0412", border: "2px solid #ff2e6388",
            borderLeft: "5px solid #ff2e63", borderRadius: 4, padding: "10px 12px",
            display: "flex", alignItems: "center", gap: 10, color: "#f5efdc",
          }}>
            <Trash2 style={{ width: 18, height: 18, color: "#ff2e63", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="font-display" style={{ fontSize: 13, color: "#ff2e63", lineHeight: 1 }}>
                EXCLUIR MINHA CONTA
              </div>
              <div className="font-body" style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                Apaga personagem, stats e tokens.
              </div>
            </div>
          </button>
        ) : (
          <div style={{ padding: 10, background: "#ff2e6322", border: "1px solid #ff2e63", borderRadius: 4 }}>
            <div className="font-hud" style={{ fontSize: 13, color: "#ff2e63", marginBottom: 6 }}>
              <AlertTriangle style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} />
              AÇÃO IRREVERSÍVEL
            </div>
            <div className="font-body" style={{ fontSize: 11.5, opacity: 0.85, marginBottom: 10 }}>
              Personagem, histórico de lutas e tokens OAuth serão permanentemente apagados em até 7 dias.
            </div>
            <div className="flex gap-2">
              <ArcadeButton onClick={async () => {
                await Storage.clearPlayer(); await Storage.clearStats(); await Storage.clearTrophies();
                window.location.reload();
              }} color="#ff2e63" small>excluir tudo</ArcadeButton>
              <ArcadeButton onClick={() => setConfirmDelete(false)} color="#2a1a3e" small>cancelar</ArcadeButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LgpdAction = ({ icon: Icon, color, label, desc }) => (
  <button className="arcade-btn text-left" style={{
    background: "#0a0412", border: `1px solid ${color}55`,
    borderRadius: 4, padding: "10px 12px",
    display: "flex", alignItems: "center", gap: 10, color: "#f5efdc",
  }}>
    <Icon style={{ width: 18, height: 18, color, flexShrink: 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="font-display" style={{ fontSize: 12, color, lineHeight: 1 }}>{label}</div>
      <div className="font-body" style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{desc}</div>
    </div>
  </button>
);

// =============================================================================
// RANKING SCREEN
// =============================================================================

// Gera ranking fake estável por semana
const getWeekSeed = () => {
  const d = new Date();
  return Math.floor(d / (1000 * 60 * 60 * 24 * 7));
};

const pseudoRand = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const RankingScreen = ({ player, stats, onBack }) => {
  const seed = getWeekSeed();
  // build leaderboard mixing fake scores with real player stats
  const entries = FIGHTER_ORDER.map((id, i) => {
    const f = FIGHTERS[id];
    const isPlayer = id === player.id;
    const baseWins = Math.floor(pseudoRand(seed + i * 7) * 28) + 4;
    const wins = isPlayer ? stats.wins + baseWins : baseWins;
    return {
      id, f, wins, isPlayer,
      handle: isPlayer ? "VOCÊ" : `@${f.className.toLowerCase().split(" ")[0]}_${Math.floor(pseudoRand(seed + i * 11) * 900 + 100)}`,
    };
  }).sort((a, b) => b.wins - a.wins);
  const playerRank = entries.findIndex((e) => e.isPlayer) + 1;

  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at top, rgba(253,199,0,0.15), transparent 60%)",
      }} />

      <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> hub
      </button>

      <div className="relative z-10 mt-3 mb-4">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13 }}>▸ TEMPORADA ATUAL</div>
        <div className="font-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1 }}>
          RANKING<br /><span style={{ color: "#fdc700" }}>SEMANAL</span>
        </div>
        <div className="font-body" style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
          Ranking fake com seed semanal. Suas vitórias reais entram na pontuação do seu lutador.
        </div>
      </div>

      {/* player rank highlight */}
      <div className="relative z-10 stagger-in" style={{
        background: `linear-gradient(100deg, ${player.colors.primary}33, #0a0412)`,
        border: `2px solid ${player.colors.accent}`, borderRadius: 6,
        padding: 12, marginBottom: 14,
      }}>
        <div className="flex items-center gap-3">
          <div className="font-display" style={{
            fontSize: 32, color: player.colors.accent, lineHeight: 1,
            textShadow: `2px 2px 0 ${player.colors.primary}, 4px 4px 0 #0a0412`,
          }}>#{playerRank}</div>
          <div style={{ flex: 1 }}>
            <div className="font-hud" style={{ fontSize: 12, color: "#fdc700" }}>SUA POSIÇÃO</div>
            <div className="font-display" style={{ fontSize: 14, lineHeight: 1, marginTop: 2 }}>
              {player.fighterName}
            </div>
            <div className="font-hud" style={{ fontSize: 12, opacity: 0.7, marginTop: 3 }}>
              {entries[playerRank - 1].wins} W · streak {stats.streak}
            </div>
          </div>
          {playerRank <= 3 && <Crown style={{ width: 32, height: 32, color: "#fdc700" }} />}
        </div>
      </div>

      {/* leaderboard */}
      <div className="relative z-10 flex flex-col gap-1.5 pb-4">
        {entries.map((e, i) => {
          const rank = i + 1;
          const MiniAvatar = AVATARS[e.id];
          const medalColor = rank === 1 ? "#fdc700" : rank === 2 ? "#c0c0c0" : rank === 3 ? "#cd7f32" : null;
          return (
            <div key={e.id} style={{
              background: e.isPlayer ? `${e.f.colors.primary}22` : "#0a0412",
              border: `1px solid ${e.isPlayer ? e.f.colors.accent : "#2a1a3e"}`,
              borderLeft: `5px solid ${e.f.colors.primary}`,
              borderRadius: 4, padding: "8px 12px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div className="font-display" style={{
                fontSize: 18, color: medalColor || (e.isPlayer ? e.f.colors.accent : "#f5efdc"),
                width: 34, textAlign: "center",
                textShadow: e.isPlayer ? `2px 2px 0 ${e.f.colors.primary}` : "none",
              }}>#{rank}</div>

              <div style={{
                width: 40, height: 46, flexShrink: 0,
                background: `radial-gradient(ellipse at center, ${e.f.colors.primary}33, transparent 70%)`,
              }}>
                <MiniAvatar color={e.f.colors.primary} accent={e.f.colors.accent} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-display" style={{ fontSize: 11, lineHeight: 1, color: e.isPlayer ? e.f.colors.accent : "#f5efdc" }}>
                  {e.f.fighterName}
                </div>
                <div className="font-hud" style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                  {e.handle} · {e.f.className}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="font-hud" style={{ fontSize: 14, color: "#22c55e" }}>{e.wins} W</div>
                {medalColor && <Medal style={{ width: 14, height: 14, color: medalColor, marginTop: 2 }} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =============================================================================
// TOURNAMENT SCREENS
// =============================================================================

const TournamentBracket = ({ player, bracket, currentRound, onStart, onBack }) => {
  const PAvatar = AVATARS[player.id];
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at top, rgba(253,199,0,0.2), transparent 50%), radial-gradient(ellipse at bottom, rgba(255,46,99,0.2), transparent 60%)",
      }} />
      <div className="absolute inset-0 halftone opacity-20" />

      {onBack && (
        <button onClick={onBack} className="relative z-10 font-hud flex items-center gap-1 self-start" style={{ fontSize: 16, opacity: 0.7 }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> hub
        </button>
      )}

      <div className="relative z-10 mt-3 mb-3 text-center">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, letterSpacing: 2 }}>
          ▸ ARCADE · MODO TORNEIO
        </div>
        <div className="font-display" style={{
          fontSize: 30, marginTop: 4, lineHeight: 1,
          textShadow: "3px 3px 0 #ff2e63, 6px 6px 0 #0a0412",
        }}>
          3 LUTAS.<br /><span style={{ color: "#fdc700" }}>1 TROFÉU.</span>
        </div>
        <div className="font-body" style={{ marginTop: 8, fontSize: 12, opacity: 0.75, lineHeight: 1.4, padding: "0 10px" }}>
          HP carrega entre rounds. Entre lutas você escolhe 1 upgrade. Perdeu uma — acabou.
        </div>
      </div>

      {/* Player tile */}
      <div className="relative z-10 stagger-in" style={{
        background: `linear-gradient(100deg, ${player.colors.primary}33, #0a0412)`,
        border: `2px solid ${player.colors.accent}`, borderRadius: 6,
        padding: 10, display: "flex", gap: 10, alignItems: "center", marginBottom: 10,
      }}>
        <div style={{ width: 54, height: 64, flexShrink: 0 }}>
          <PAvatar color={player.colors.primary} accent={player.colors.accent} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="font-hud" style={{ fontSize: 11, color: "#fdc700" }}>VOCÊ</div>
          <div className="font-display" style={{ fontSize: 13, lineHeight: 1, marginTop: 2 }}>
            {player.fighterName}
          </div>
        </div>
      </div>

      {/* Bracket rounds */}
      <div className="relative z-10 flex flex-col gap-2 pb-4">
        {bracket.map((opp, i) => {
          const Opp = AVATARS[opp.id];
          const state = i < currentRound ? "done" : i === currentRound ? "active" : "locked";
          const tint = state === "done" ? "#22c55e" : state === "active" ? opp.colors.primary : "#2a1a3e";
          const opacity = state === "locked" ? 0.4 : 1;
          return (
            <div key={i} className="stagger-in" style={{
              animationDelay: `${0.1 * i}s`,
              background: state === "active" ? `linear-gradient(100deg, ${opp.colors.primary}22, #0a0412)` : "#0a0412",
              border: `2px solid ${tint}${state === "active" ? "" : "77"}`,
              borderLeft: `5px solid ${tint}`,
              borderRadius: 4, padding: 10,
              display: "flex", gap: 10, alignItems: "center",
              opacity,
              boxShadow: state === "active" ? `0 0 20px ${opp.colors.primary}55` : "none",
            }}>
              <div className="font-display" style={{
                fontSize: 24, width: 44, textAlign: "center",
                color: tint, lineHeight: 1,
              }}>{i + 1}</div>
              <div style={{
                width: 48, height: 58, flexShrink: 0,
                filter: state === "locked" ? "grayscale(1)" : "none",
              }}>
                <Opp color={opp.colors.primary} accent={opp.colors.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-hud" style={{
                  fontSize: 11, color: opp.isBoss ? "#ff2e63" : "#fdc700",
                  letterSpacing: 1,
                }}>
                  {opp.roundLabel}{opp.isBoss && " · BOSS"}
                </div>
                <div className="font-display" style={{ fontSize: 12, lineHeight: 1, marginTop: 2 }}>
                  {state === "locked" ? "???" : opp.fighterName}
                </div>
                <div className="font-body" style={{ fontSize: 10.5, opacity: 0.65, marginTop: 3 }}>
                  {state === "locked" ? "trancado" : opp.className}
                </div>
              </div>
              {state === "done" && <Check style={{ width: 20, height: 20, color: "#22c55e" }} strokeWidth={3} />}
              {state === "active" && <ArrowRight style={{ width: 20, height: 20, color: opp.colors.primary }} />}
              {state === "locked" && <Lock style={{ width: 18, height: 18, opacity: 0.5 }} />}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex justify-center pb-6">
        <ArcadeButton onClick={onStart} color="#fdc700">
          {currentRound === 0 ? "iniciar torneio" : "próxima luta"}
          <ArrowRight style={{ display: "inline", marginLeft: 6, width: 16, height: 16 }} />
        </ArcadeButton>
      </div>
    </div>
  );
};

const TournamentUpgrade = ({ options, onPick, round, carryHP }) => {
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at center, rgba(0,229,255,0.2), transparent 60%)",
      }} />

      <div className="relative z-10 text-center mt-4 mb-2">
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 13, letterSpacing: 2 }}>
          ▸ ROUND {round} VENCIDO · ESCOLHA UM UPGRADE
        </div>
        <div className="font-display stagger-in" style={{
          fontSize: 28, marginTop: 6, lineHeight: 1,
          textShadow: "3px 3px 0 #00e5ff, 6px 6px 0 #0a0412",
        }}>
          PEGA OU<br /><span style={{ color: "#00e5ff" }}>LARGA</span>
        </div>
        <div className="font-hud stagger-in" style={{
          fontSize: 14, marginTop: 10, color: carryHP > 50 ? "#22c55e" : carryHP > 25 ? "#fdc700" : "#ff2e63",
          animationDelay: "0.15s",
        }}>
          ▸ HP RESTANTE: {carryHP}/100
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 mt-4 pb-4">
        {options.map((u, i) => (
          <button key={u.id} onClick={() => onPick(u)} className="arcade-btn text-left stagger-in" style={{
            animationDelay: `${0.25 + i * 0.1}s`,
            background: "linear-gradient(100deg, #14081f, #0a0412)",
            border: `2px solid ${u.color}${u.rare ? "" : "77"}`,
            borderLeft: `6px solid ${u.color}`,
            borderRadius: 4, padding: "14px 14px",
            display: "flex", alignItems: "center", gap: 14,
            color: "#f5efdc",
            boxShadow: u.rare ? `0 0 20px ${u.color}66, 3px 4px 0 #0a0412` : "3px 4px 0 #0a0412",
          }}>
            <div className="font-display" style={{
              fontSize: 32, color: u.color, width: 40, textAlign: "center", lineHeight: 1,
              textShadow: `2px 2px 0 #0a0412`,
            }}>{u.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center gap-2">
                <div className="font-display" style={{ fontSize: 14, color: u.color, lineHeight: 1 }}>
                  {u.name}
                </div>
                {u.rare && (
                  <span className="font-hud" style={{
                    fontSize: 10, background: u.color, color: "#0a0412",
                    padding: "1px 5px", borderRadius: 2, letterSpacing: 1,
                  }}>RARO</span>
                )}
              </div>
              <div className="font-body" style={{ fontSize: 12, opacity: 0.8, marginTop: 5, lineHeight: 1.3 }}>
                {u.desc}
              </div>
            </div>
            <ArrowRight style={{ width: 18, height: 18, color: u.color, flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

const TournamentVictory = ({ player, bracket, trophyCount, onHub, onShare }) => {
  const Avatar = AVATARS[player.id];
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at center, ${player.colors.accent}55, transparent 60%), radial-gradient(ellipse at bottom, #fdc70033, transparent 50%)`,
      }} />
      <div className="absolute inset-0 halftone opacity-30" />

      {/* confetti dots */}
      {Array.from({ length: 14 }).map((_, i) => {
        const colors = ["#fdc700", "#ff2e63", "#00e5ff", "#22c55e", "#c084fc"];
        return (
          <div key={i} className="absolute" style={{
            width: 8, height: 8, background: colors[i % colors.length],
            top: `${10 + (i * 7) % 60}%`, left: `${(i * 13) % 95}%`,
            animation: `float-damage 2s ease-out ${i * 0.1}s infinite`,
          }} />
        );
      })}

      <div className="relative z-10 text-center mt-6">
        <div className="font-hud blink" style={{ color: "#fdc700", fontSize: 14, letterSpacing: 3 }}>
          ▸ CAMPEÃO ◂
        </div>
        <div className="font-display stagger-in" style={{
          fontSize: 56, marginTop: 8, lineHeight: 0.9,
          color: "#fdc700",
          textShadow: "4px 4px 0 #ff2e63, 8px 8px 0 #0a0412, 0 0 60px #fdc700",
        }}>
          TORNEIO<br />VENCIDO
        </div>
      </div>

      {/* Trophy center */}
      <div className="relative z-10 flex justify-center mt-5 mb-4">
        <div className="relative" style={{
          width: 180, height: 180,
          background: `radial-gradient(circle, #fdc70044, transparent 70%)`,
        }}>
          <svg viewBox="0 0 180 180" className="spin-slow" style={{ position: "absolute", inset: 0 }}>
            <circle cx="90" cy="90" r="80" fill="none" stroke="#fdc700" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          </svg>
          {/* Trophy SVG */}
          <svg viewBox="0 0 120 120" style={{ position: "absolute", inset: 30 }}>
            <defs>
              <linearGradient id="tr" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffeb80" />
                <stop offset="0.6" stopColor="#fdc700" />
                <stop offset="1" stopColor="#c08a00" />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="105" rx="28" ry="5" fill="#000" opacity="0.4" />
            <rect x="48" y="85" width="24" height="14" fill="url(#tr)" stroke="#0a0412" strokeWidth="2.5" />
            <rect x="42" y="97" width="36" height="6" rx="2" fill="url(#tr)" stroke="#0a0412" strokeWidth="2.5" />
            <path d="M35 30 L85 30 L80 70 Q80 82 60 82 Q40 82 40 70 Z" fill="url(#tr)" stroke="#0a0412" strokeWidth="3" />
            <path d="M35 35 Q15 35 15 48 Q15 60 35 60 L35 52 Q25 52 25 45 Q25 42 35 42 Z" fill="url(#tr)" stroke="#0a0412" strokeWidth="2.5" />
            <path d="M85 35 Q105 35 105 48 Q105 60 85 60 L85 52 Q95 52 95 45 Q95 42 85 42 Z" fill="url(#tr)" stroke="#0a0412" strokeWidth="2.5" />
            <text x="60" y="60" fontSize="20" fill="#0a0412" textAnchor="middle" fontFamily="Bowlby One SC">★</text>
          </svg>
        </div>
      </div>

      {/* Summary */}
      <div className="relative z-10 stagger-in" style={{
        background: "linear-gradient(100deg, #14081f, #0a0412)",
        border: "2px solid #fdc700",
        borderRadius: 6, padding: 12, marginBottom: 14,
        animationDelay: "0.3s",
      }}>
        <div className="font-hud" style={{ fontSize: 12, color: "#fdc700", marginBottom: 6 }}>
          ▸ ROTA DO CAMPEÃO
        </div>
        {bracket.map((opp, i) => {
          const Mini = AVATARS[opp.id];
          return (
            <div key={i} className="flex items-center gap-2" style={{ marginTop: 4, fontSize: 12 }}>
              <Check style={{ width: 14, height: 14, color: "#22c55e", flexShrink: 0 }} strokeWidth={3} />
              <div style={{ width: 24, height: 30, flexShrink: 0 }}>
                <Mini color={opp.colors.primary} accent={opp.colors.accent} />
              </div>
              <div className="font-body" style={{ flex: 1, opacity: 0.85 }}>
                {opp.roundLabel}: derrotou {opp.fighterName}
                {opp.isBoss && <span className="font-hud" style={{ color: "#ff2e63", marginLeft: 4 }}>(BOSS)</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 text-center font-hud stagger-in" style={{
        fontSize: 14, color: "#fdc700", animationDelay: "0.45s",
      }}>
        ▸ TROFÉUS TOTAIS: <span style={{ fontSize: 18 }}>{trophyCount}</span> ▸
      </div>

      <div className="relative z-10 flex gap-3 justify-center stagger-in mt-5 pb-4" style={{ animationDelay: "0.6s" }}>
        <ArcadeButton onClick={onShare} color="#00e5ff" small>
          <Share2 style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> share
        </ArcadeButton>
        <ArcadeButton onClick={onHub} color="#fdc700">
          <Home style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> voltar ao hub
        </ArcadeButton>
      </div>
    </div>
  );
};

// =============================================================================
// TOURNAMENT DEFEAT — tela específica para derrota no torneio
// =============================================================================

const TournamentDefeat = ({ player, bracket, roundLost, eliminator, onHub, onRetry }) => {
  const Avatar = AVATARS[player.id];
  const EAvatar = AVATARS[eliminator.id];
  return (
    <div className="relative w-full h-full flex flex-col p-5 scanlines overflow-y-auto">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at center, rgba(255,46,99,0.2), transparent 60%), radial-gradient(ellipse at bottom, rgba(100,100,120,0.15), transparent 50%)",
      }} />
      <div className="absolute inset-0 halftone opacity-20" />

      <div className="relative z-10 text-center mt-8 stagger-in">
        <div className="font-hud" style={{ color: "#ff2e63", fontSize: 14, letterSpacing: 3 }}>
          ▸ ELIMINADO ◂
        </div>
        <div className="font-display level-up-pop" style={{
          fontSize: 54, lineHeight: 0.9, marginTop: 8,
          color: "#8a8aa0",
          textShadow: "4px 4px 0 #ff2e63, 8px 8px 0 #0a0412",
        }}>
          FIM DA<br />CORRIDA
        </div>
        <div className="font-hud" style={{ fontSize: 14, opacity: 0.8, marginTop: 10 }}>
          derrotado no <span style={{ color: "#fdc700" }}>ROUND {roundLost}/{bracket.length}</span>
        </div>
      </div>

      {/* confronto visual */}
      <div className="relative z-10 mt-6 stagger-in" style={{ animationDelay: "0.2s" }}>
        <div style={{
          background: "#0a0412", border: "1px solid #2a1a3e", borderRadius: 6,
          padding: 14, display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ textAlign: "center", opacity: 0.6, filter: "grayscale(40%)" }}>
            <div style={{
              width: 70, height: 82,
              background: `radial-gradient(ellipse at center, ${player.colors.primary}33, transparent 70%)`,
            }}>
              <Avatar color={player.colors.primary} accent={player.colors.accent} />
            </div>
            <div className="font-hud" style={{ fontSize: 10, color: player.colors.accent, marginTop: 2 }}>VOCÊ</div>
          </div>
          <div className="font-display" style={{ flex: 1, textAlign: "center", fontSize: 24, color: "#ff2e63", textShadow: "2px 2px 0 #0a0412" }}>
            KO
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 70, height: 82,
              background: `radial-gradient(ellipse at center, ${eliminator.colors.primary}55, transparent 70%)`,
              boxShadow: `0 0 20px ${eliminator.colors.primary}`,
            }}>
              <EAvatar color={eliminator.colors.primary} accent={eliminator.colors.accent} flip />
            </div>
            <div className="font-hud" style={{ fontSize: 10, color: eliminator.colors.accent, marginTop: 2 }}>ALGOZ</div>
          </div>
        </div>
        <div className="font-body" style={{
          marginTop: 10, padding: 10, fontSize: 12, fontStyle: "italic",
          background: `${eliminator.colors.primary}22`, border: `1px solid ${eliminator.colors.primary}55`,
          textAlign: "center", lineHeight: 1.4,
        }}>
          <span style={{ color: eliminator.colors.accent }}>{eliminator.fighterName}</span>: "{eliminator.victory}"
        </div>
      </div>

      {/* bracket status */}
      <div className="relative z-10 mt-5 stagger-in" style={{ animationDelay: "0.4s" }}>
        <div className="font-hud" style={{ color: "#fdc700", fontSize: 12, marginBottom: 6 }}>▸ CHAVEAMENTO</div>
        <div className="flex gap-2">
          {bracket.map((b, i) => {
            const BA = AVATARS[b.id];
            const isWon = i + 1 < roundLost;
            const isLost = i + 1 === roundLost;
            const isSkipped = i + 1 > roundLost;
            return (
              <div key={i} style={{
                flex: 1, padding: 6, textAlign: "center",
                background: "#0a0412",
                border: `2px solid ${isWon ? "#22c55e" : isLost ? "#ff2e63" : "#2a1a3e"}`,
                opacity: isSkipped ? 0.3 : 1,
              }}>
                <div style={{ width: "100%", height: 50, filter: isSkipped ? "grayscale(80%)" : "none" }}>
                  <BA color={FIGHTERS[b.id].colors.primary} accent={FIGHTERS[b.id].colors.accent} />
                </div>
                <div className="font-hud" style={{
                  fontSize: 10, marginTop: 3,
                  color: isWon ? "#22c55e" : isLost ? "#ff2e63" : "#8a8aa0",
                }}>
                  {isWon ? "✓ VENCI" : isLost ? "✗ CAÍ" : "PRÓX."}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex gap-3 justify-center stagger-in mt-6 pb-4" style={{ animationDelay: "0.6s" }}>
        <ArcadeButton onClick={onRetry} color="#ff2e63" small>
          <RotateCcw style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> tentar de novo
        </ArcadeButton>
        <ArcadeButton onClick={onHub} color="#fdc700" small>
          <Home style={{ display: "inline", width: 14, height: 14, marginRight: 4 }} /> hub
        </ArcadeButton>
      </div>
    </div>
  );
};

// =============================================================================
// LEVEL UP TOAST — overlay quando sobe de nível
// =============================================================================

const LevelUpToast = ({ newLevel, color = "#fdc700", onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, pointerEvents: "none",
    }} className="slide-down">
      <div style={{
        background: "linear-gradient(135deg, #0a0412, #14081f)",
        border: `3px solid ${color}`, borderRadius: 6,
        padding: "12px 20px", boxShadow: `0 0 30px ${color}aa`,
        textAlign: "center", minWidth: 220,
      }} className="pulse-glow">
        <div className="font-hud" style={{ fontSize: 12, color, letterSpacing: 3 }}>▸ LEVEL UP ◂</div>
        <div className="font-display level-up-pop" style={{
          fontSize: 32, color, lineHeight: 1,
          textShadow: `2px 2px 0 #0a0412, 0 0 20px ${color}`,
          marginTop: 2,
        }}>
          LV {newLevel}
        </div>
        <div className="font-body" style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
          {newLevel >= 5 ? "lutador veterano" : newLevel >= 3 ? "experiência crescendo" : "continue lutando"}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================

export default function SocialFightersArena() {
  const [screen, setScreen] = useState("loading");
  const [fighterId, setFighterId] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, streak: 0, level: 1, xp: 0, matches: [] });
  const [trophies, setTrophies] = useState({ count: 0, tournaments: [] });
  const [consent, setConsent] = useState(null);
  // Tournament state
  const [tournament, setTournament] = useState(null); // { bracket, round, carryHP, buffs, upgradeOptions }
  // Level up toast state
  const [levelUpShown, setLevelUpShown] = useState(null); // { level, color } | null
  // Eliminator for tournament defeat screen
  const [eliminator, setEliminator] = useState(null);
  // Incoming challenge from share link (simulado)
  const [incomingChallenge, setIncomingChallenge] = useState(null); // { code, type } | null

  const fighter = fighterId ? FIGHTERS[fighterId] : null;

  // On mount: check storage + URL params for share challenge
  useEffect(() => {
    (async () => {
      const player = await Storage.getPlayer();
      const s = await Storage.getStats();
      const t = await Storage.getTrophies();
      setStats(s);
      setTrophies(t);

      // Detecta URL com share ou duel param (sandbox-safe: try/catch)
      let challengeFromUrl = null;
      try {
        const params = new URLSearchParams(window.location?.search || "");
        const duelCode = params.get("duel");
        const shareCode = params.get("share");
        if (duelCode) challengeFromUrl = { code: duelCode, type: "duel" };
        else if (shareCode) challengeFromUrl = { code: shareCode, type: "profile" };
      } catch {}

      if (player?.fighterId && FIGHTERS[player.fighterId]) {
        setFighterId(player.fighterId);
        setConsent(player.consent);
      }

      if (challengeFromUrl && decodeShareCode(challengeFromUrl.code)) {
        setIncomingChallenge(challengeFromUrl);
        setScreen("publicProfile");
      } else {
        setScreen("landing");
      }
    })();
  }, []);

  const startFromLanding = () => {
    if (fighterId) setScreen("hub");
    else setScreen("profile");
  };

  // Simular link recebido (botão de demo no Landing)
  const simulateChallenge = () => {
    // Sorteia um lutador diferente do atual (se houver) com stats fictícios
    const pool = FIGHTER_ORDER.filter((id) => id !== fighterId);
    const randomId = pool[Math.floor(Math.random() * pool.length)];
    const fakeWins = 3 + Math.floor(Math.random() * 18);
    const fakeStreak = Math.floor(Math.random() * 6);
    const code = `${randomId}-${fakeWins}-${fakeStreak}`;
    setIncomingChallenge({ code, type: "duel" });
    setScreen("publicProfile");
  };

  // Aceitar duelo: se já tem fighter, vai pra arena contra o desafiante
  const acceptChallenge = () => {
    if (!incomingChallenge) return;
    const decoded = decodeShareCode(incomingChallenge.code);
    if (!decoded) return;
    if (fighterId) {
      // Já tem fighter: enfrenta direto
      setOpponent(FIGHTERS[decoded.fighterId]);
      setIncomingChallenge(null);
      setScreen("fightIntro");
    } else {
      // Não tem fighter: precisa criar primeiro, mas guardamos o desafio pra depois
      setScreen("profile");
    }
  };

  const dismissChallenge = () => {
    setIncomingChallenge(null);
    if (fighterId) setScreen("hub");
    else setScreen("landing");
  };

  const pick = (id) => {
    setFighterId(id);
    setScreen("consent");
  };

  const onConsentConfirm = async (checked) => {
    const consentData = { items: checked, timestamp: Date.now() };
    setConsent(consentData);
    setScreen("forging");
  };

  const onForgeDone = async () => {
    await Storage.setPlayer({ fighterId, consent, createdAt: Date.now() });
    setScreen("reveal");
  };

  // Após revelar o lutador, checa se há desafio pendente
  const onRevealContinue = () => {
    if (incomingChallenge?.type === "duel") {
      const decoded = decodeShareCode(incomingChallenge.code);
      if (decoded && decoded.fighterId !== fighterId) {
        setOpponent(FIGHTERS[decoded.fighterId]);
        setIncomingChallenge(null);
        setScreen("fightIntro");
        return;
      }
    }
    setIncomingChallenge(null);
    setScreen("hub");
  };

  const goToHub = () => {
    setTournament(null);
    setScreen("hub");
  };

  // Quick battle — agora passa pela tela de seleção
  const startBattle = () => {
    setScreen("opponentSelect");
  };

  // Chamado quando usuário escolhe um oponente específico (id) ou null (aleatório)
  const pickOpponentFromSelect = (opponentId) => {
    const selected = opponentId ? FIGHTERS[opponentId] : pickOpponent(fighterId);
    setOpponent(selected);
    setScreen("fightIntro");
  };

  const onFightIntroDone = () => setScreen("arena");

  const onBattleEnd = async (r, finalHP) => {
    const prevLevel = stats.level;

    // If in tournament, different flow
    if (tournament) {
      if (r === "lose") {
        // Tournament lost
        const newStats = {
          ...stats,
          losses: stats.losses + 1, streak: 0,
          matches: [...(stats.matches || []), { opp: opponent.id, r: "lose", t: Date.now(), tournament: true }].slice(-20),
        };
        setStats(newStats);
        await Storage.setStats(newStats);
        setEliminator(opponent);
        setScreen("tournamentDefeat");
        return;
      }
      // Won this round, advance tournament
      const newStats = {
        ...stats,
        wins: stats.wins + 1, streak: stats.streak + 1,
        matches: [...(stats.matches || []), { opp: opponent.id, r: "win", t: Date.now(), tournament: true }].slice(-20),
      };
      newStats.xp = newStats.wins * 100;
      newStats.level = Math.max(1, Math.floor(newStats.xp / 300) + 1);
      setStats(newStats);
      await Storage.setStats(newStats);

      // Level up check
      if (newStats.level > prevLevel) {
        setLevelUpShown({ level: newStats.level, color: fighter?.colors?.accent || "#fdc700" });
      }

      const nextRound = tournament.round + 1;
      if (nextRound >= tournament.bracket.length) {
        // Tournament won!
        const newTrophies = {
          count: trophies.count + 1,
          tournaments: [...(trophies.tournaments || []), {
            t: Date.now(),
            bracket: tournament.bracket.map((b) => b.id),
          }].slice(-50),
        };
        setTrophies(newTrophies);
        await Storage.setTrophies(newTrophies);
        setTournament({ ...tournament, round: nextRound });
        setScreen("tournamentVictory");
      } else {
        // Show upgrade screen
        setTournament({
          ...tournament,
          round: nextRound,
          carryHP: Math.max(20, finalHP), // min 20 so it's not instant death
          upgradeOptions: rollUpgrades(),
        });
        setScreen("tournamentUpgrade");
      }
      return;
    }

    // Normal quick battle
    setResult(r);
    const newStats = {
      ...stats,
      wins: stats.wins + (r === "win" ? 1 : 0),
      losses: stats.losses + (r === "lose" ? 1 : 0),
      streak: r === "win" ? stats.streak + 1 : 0,
      matches: [...(stats.matches || []), { opp: opponent.id, r, t: Date.now() }].slice(-20),
    };
    newStats.xp = newStats.wins * 100;
    newStats.level = Math.max(1, Math.floor(newStats.xp / 300) + 1);
    setStats(newStats);
    await Storage.setStats(newStats);

    // Level up check
    if (newStats.level > prevLevel) {
      setLevelUpShown({ level: newStats.level, color: fighter?.colors?.accent || "#fdc700" });
    }

    setScreen("result");
  };

  const revanche = () => {
    setOpponent(pickOpponent(fighterId));
    setScreen("fightIntro");
  };

  const retryTournament = () => {
    const bracket = buildBracket(fighterId);
    setTournament({
      bracket, round: 0, carryHP: 100, buffs: {}, upgradeOptions: null,
    });
    setEliminator(null);
    setScreen("tournamentBracket");
  };

  const reforge = async () => {
    await Storage.clearPlayer();
    setFighterId(null);
    setConsent(null);
    setScreen("profile");
  };

  // Tournament flow
  const startTournament = () => {
    const bracket = buildBracket(fighterId);
    setTournament({
      bracket, round: 0, carryHP: 100, buffs: {}, upgradeOptions: null,
    });
    setScreen("tournamentBracket");
  };

  const onBracketStart = () => {
    const opp = tournament.bracket[tournament.round];
    setOpponent(opp);
    setScreen("fightIntro");
  };

  const onUpgradePick = (upgrade) => {
    const newBuffsState = upgrade.apply({ hp: tournament.carryHP });
    setTournament({
      ...tournament,
      carryHP: newBuffsState.hp !== undefined ? newBuffsState.hp : tournament.carryHP,
      buffs: {
        atkBuff: newBuffsState.atkBuff,
        defBuff: newBuffsState.defBuff,
        specialStart: newBuffsState.specialStart,
        critBuff: newBuffsState.critBuff,
      },
    });
    setScreen("tournamentBracket");
  };

  return (
    <div className="sfa-root" style={{
      width: "100%", minHeight: "100vh", background: "#05020b",
      display: "flex", justifyContent: "center", alignItems: "stretch", padding: 0,
    }}>
      <GlobalStyles />
      <div style={{
        width: "100%", maxWidth: 440, minHeight: "100vh",
        background: "linear-gradient(180deg, #14081f, #05020b)",
        position: "relative",
        borderLeft: "1px solid #2a1a3e", borderRight: "1px solid #2a1a3e",
        boxShadow: "0 0 80px rgba(255,46,99,0.15)",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {screen === "loading" && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="font-hud blink" style={{ color: "#fdc700", fontSize: 16 }}>▸ BOOT...</div>
            </div>
          )}
          {screen === "landing" && (
            <Landing
              onStart={startFromLanding}
              returning={!!fighterId}
              onSimulateChallenge={simulateChallenge}
            />
          )}
          {screen === "publicProfile" && incomingChallenge && (
            <PublicProfile
              challenge={incomingChallenge}
              hasOwnFighter={!!fighterId}
              onAccept={acceptChallenge}
              onCreateOwn={() => setScreen("profile")}
              onDismiss={dismissChallenge}
            />
          )}
          {screen === "profile" && <ProfileChoice onPick={pick} onBack={() => setScreen("landing")} />}
          {screen === "consent" && fighter && (
            <ConsentScreen onConfirm={onConsentConfirm} onBack={() => setScreen("profile")} />
          )}
          {screen === "forging" && fighter && <ForgingScreen fighter={fighter} onDone={onForgeDone} />}
          {screen === "reveal" && fighter && <FighterReveal fighter={fighter} onContinue={onRevealContinue} />}
          {screen === "hub" && fighter && (
            <Hub
              player={fighter} stats={stats} trophies={trophies}
              onBattle={startBattle}
              onTournament={startTournament}
              onRanking={() => setScreen("ranking")}
              onConnections={() => setScreen("connections")}
              onReforge={reforge}
              onHistory={() => setScreen("history")}
              onShareCard={() => setScreen("share")}
            />
          )}
          {screen === "opponentSelect" && fighter && (
            <OpponentSelect
              player={fighter} stats={stats}
              onPick={pickOpponentFromSelect}
              onBack={goToHub}
            />
          )}
          {screen === "tournamentBracket" && fighter && tournament && (
            <TournamentBracket
              player={fighter}
              bracket={tournament.bracket}
              currentRound={tournament.round}
              onStart={onBracketStart}
              onBack={tournament.round === 0 ? goToHub : null}
            />
          )}
          {screen === "tournamentUpgrade" && tournament && tournament.upgradeOptions && (
            <TournamentUpgrade
              options={tournament.upgradeOptions}
              round={tournament.round}
              carryHP={tournament.carryHP}
              onPick={onUpgradePick}
            />
          )}
          {screen === "tournamentVictory" && fighter && tournament && (
            <TournamentVictory
              player={fighter}
              bracket={tournament.bracket}
              trophyCount={trophies.count}
              onHub={goToHub}
              onShare={() => setScreen("share")}
            />
          )}
          {screen === "tournamentDefeat" && fighter && tournament && eliminator && (
            <TournamentDefeat
              player={fighter}
              bracket={tournament.bracket}
              roundLost={tournament.round + 1}
              eliminator={eliminator}
              onHub={goToHub}
              onRetry={retryTournament}
            />
          )}
          {screen === "fightIntro" && fighter && opponent && (
            <FightIntro player={fighter} opponent={opponent} onDone={onFightIntroDone} />
          )}
          {screen === "arena" && fighter && opponent && (
            <Arena
              player={fighter} opponent={opponent} onEnd={onBattleEnd}
              tournamentCtx={tournament}
            />
          )}
          {screen === "result" && fighter && opponent && (
            <ResultScreen
              result={result} player={fighter} opponent={opponent} stats={stats}
              onRevanche={revanche} onHub={goToHub}
              onShare={() => setScreen("share")}
            />
          )}
          {screen === "share" && fighter && (
            <ShareScreen
              player={fighter} stats={stats}
              lastResult={result}
              lastOpponent={opponent}
              onBack={goToHub}
            />
          )}
          {screen === "history" && fighter && (
            <MatchHistory player={fighter} stats={stats} onBack={goToHub} />
          )}
          {screen === "ranking" && fighter && (
            <RankingScreen player={fighter} stats={stats} onBack={goToHub} />
          )}
          {screen === "connections" && fighter && (
            <ConnectionsPanel
              player={fighter} consent={consent}
              onBack={goToHub}
              onRevoke={async () => {
                await Storage.clearPlayer();
                setConsent(null);
                goToHub();
              }}
            />
          )}
        </div>
        {levelUpShown && (
          <LevelUpToast
            newLevel={levelUpShown.level}
            color={levelUpShown.color}
            onClose={() => setLevelUpShown(null)}
          />
        )}
      </div>
    </div>
  );
}
