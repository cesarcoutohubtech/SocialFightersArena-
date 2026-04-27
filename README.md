# Social Fighters Arena

MVP do jogo casual onde seu perfil profissional vira lutador cartoon.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Deploy

Pronto para Vercel — basta importar o repo. Não requer variáveis de ambiente.

## Tecnologias

- React 18 + Vite 5
- lucide-react (ícones)
- Persistência via localStorage (sem backend ainda)

## Estrutura

```
.
├── index.html        # Entrada HTML com meta tags Open Graph
├── src/
│   ├── main.jsx      # Bootstrap React
│   └── App.jsx       # Jogo completo (3.6k linhas, arquivo único)
├── public/
│   └── favicon.svg   # Ícone
├── package.json
└── vite.config.js
```

## Versão

v0.6 — protótipo de validação de mercado.
Sem OAuth real, sem backend, sem IA generativa real (tudo mockado).

## URLs de teste do fluxo viral

Depois de fazer deploy:

- `/` → Landing normal
- `/?duel=ceo-12-3` → Recebe desafio de CEO Gladiator
- `/?share=fitness-8-2` → Vê perfil de Fitness Brawler
- `/?duel=creator-15-4` → Recebe desafio de Creator Ninja

IDs válidos: `ceo`, `fitness`, `lawyer`, `dev`, `realestate`, `sales`, `creator`, `doctor`, `marketing`, `teacher`.

Formato: `{fighterId}-{wins}-{streak}`
