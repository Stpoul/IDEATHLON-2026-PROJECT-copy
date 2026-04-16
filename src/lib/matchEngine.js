export const PATHWAYS = [
  {
    id: 'tul-engineering',
    type: 'university',
    emoji: '⚙️',
    name: { en: 'TU Liberec – Engineering', cz: 'TUL – Strojní inženýrství' },
    location: 'Liberec, CZ',
    weights: { Technical: 0.4, Science: 0.3, Logic: 0.3 },
    pros: {
      en: ['Strong industry partnerships', 'Local campus – no relocation needed', 'High employment rate (92%)'],
      cz: ['Silné průmyslové partnerství', 'Místní kampus – bez stěhování', 'Vysoká zaměstnanost (92%)'],
    },
    cons: {
      en: ['Competitive entrance exam', 'Maths-heavy curriculum'],
      cz: ['Náročná přijímací zkouška', 'Matematicky náročné osnovy'],
    },
  },
  {
    id: 'palacky-science',
    type: 'university',
    emoji: '🔬',
    name: { en: 'Palacký Uni – Natural Sciences', cz: 'UP Olomouc – Přírodní vědy' },
    location: 'Olomouc, CZ',
    weights: { Science: 0.5, Logic: 0.3, Outdoors: 0.2 },
    pros: {
      en: ['Top research facilities', 'International exchange programs', 'Diverse campus life'],
      cz: ['Špičkové výzkumné vybavení', 'Mezinárodní výměnné programy', 'Pestrý kampusový život'],
    },
    cons: {
      en: ['Requires relocation (200 km)', 'Competitive admissions'],
      cz: ['Vyžaduje stěhování (200 km)', 'Náročné přijímací řízení'],
    },
  },
  {
    id: 'creative-arts',
    type: 'university',
    emoji: '🎨',
    name: { en: 'VŠPJ – Creative Design', cz: 'VŠPJ – Kreativní design' },
    location: 'Jihlava, CZ',
    weights: { Creative: 0.6, Social: 0.4 },
    pros: {
      en: ['Portfolio-based admissions', 'Small class sizes', 'Strong alumni network'],
      cz: ['Přijímání na základě portfolia', 'Malé třídy', 'Silná síť absolventů'],
    },
    cons: {
      en: ['Limited STEM crossover', 'Competitive creative job market'],
      cz: ['Omezený průnik se STEM', 'Konkurenční kreativní trh'],
    },
  },
  {
    id: 'mechanical-apprenticeship',
    type: 'vocational',
    emoji: '🔩',
    name: { en: 'Mechanical Apprenticeship', cz: 'Strojní učňovský obor' },
    location: 'Liberec Region',
    weights: { Technical: 0.5, Outdoors: 0.3, Logic: 0.2 },
    pros: {
      en: ['Earn while you learn', 'Direct industry placement', '2-year fast track'],
      cz: ['Výdělek při učení', 'Přímé umístění v průmyslu', 'Rychlá 2letá dráha'],
    },
    cons: {
      en: ['Lower academic ceiling', 'Physically demanding work'],
      cz: ['Nižší akademický strop', 'Fyzicky náročné'],
    },
  },
  {
    id: 'healthcare-assistant',
    type: 'vocational',
    emoji: '🏥',
    name: { en: 'Healthcare Assistant Program', cz: 'Program zdravotního asistenta' },
    location: 'Regional hospitals',
    weights: { Social: 0.5, Healthcare: 0.5 },
    pros: {
      en: ['High job security', 'Community impact', 'Shorter training (18 months)'],
      cz: ['Vysoká jistota zaměstnání', 'Dopad na komunitu', 'Kratší příprava (18 měsíců)'],
    },
    cons: {
      en: ['Emotionally demanding', 'Shift work required'],
      cz: ['Emocionálně náročné', 'Nutná práce na směny'],
    },
  },
  {
    id: 'digital-design',
    type: 'vocational',
    emoji: '💻',
    name: { en: 'Digital Design Program', cz: 'Program digitálního designu' },
    location: 'Online + Liberec Hub',
    weights: { Creative: 0.5, Technical: 0.3, Business: 0.2 },
    pros: {
      en: ['Fully remote-capable', 'Fast-growing job market', 'Freelance-friendly'],
      cz: ['Plně na dálku', 'Rychle rostoucí trh práce', 'Vhodné pro freelancing'],
    },
    cons: {
      en: ['Requires strong self-discipline', 'Saturated entry level'],
      cz: ['Vyžaduje sebedisciplínu', 'Saturovaná vstupní úroveň'],
    },
  },
];

export function calcMatch(pathway, swipeResults) {
  let score = 0;
  let totalWeight = 0;
  for (const [cat, weight] of Object.entries(pathway.weights)) {
    const result = swipeResults[cat];
    if (result && result.total > 0) {
      score += (result.liked / result.total) * weight;
      totalWeight += weight;
    }
  }
  if (totalWeight === 0) return 50;
  return Math.round((score / totalWeight) * 100);
}
