export type Team = {
  id: string;
  name: string;
  sport: string;
  country: string;
  city: string;
  tagline: string;
};

export const teams: Team[] = [
  {
    id: "fc-barcelona",
    name: "FC Barcelona",
    sport: "Calcio",
    country: "Spagna",
    city: "Barcellona",
    tagline: "Més que un club, onchain.",
  },
  {
    id: "juventus",
    name: "Juventus",
    sport: "Calcio",
    country: "Italia",
    city: "Torino",
    tagline: "Storia bianconera, futuro digitale.",
  },
  {
    id: "ac-milan",
    name: "AC Milan",
    sport: "Calcio",
    country: "Italia",
    city: "Milano",
    tagline: "Rossoneri in ogni dimensione.",
  },
  {
    id: "inter-milan",
    name: "Inter",
    sport: "Calcio",
    country: "Italia",
    city: "Milano",
    tagline: "Nerazzurri tra curva e metaverso.",
  },
  {
    id: "psg",
    name: "Paris Saint-Germain",
    sport: "Calcio",
    country: "Francia",
    city: "Parigi",
    tagline: "Luxe, lights, and ledger.",
  },
  {
    id: "man-city",
    name: "Manchester City",
    sport: "Calcio",
    country: "Inghilterra",
    city: "Manchester",
    tagline: "Football reinvented in sky blue.",
  },
  {
    id: "arsenal",
    name: "Arsenal",
    sport: "Calcio",
    country: "Inghilterra",
    city: "Londra",
    tagline: "North London, now onchain.",
  },
  {
    id: "atletico-madrid",
    name: "Atlético de Madrid",
    sport: "Calcio",
    country: "Spagna",
    city: "Madrid",
    tagline: "Coraje, corazón e infrastruttura crypto.",
  },
  {
    id: "roma",
    name: "AS Roma",
    sport: "Calcio",
    country: "Italia",
    city: "Roma",
    tagline: "Capitale eterna, fandom infinito.",
  },
  {
    id: "galatasaray",
    name: "Galatasaray",
    sport: "Calcio",
    country: "Turchia",
    city: "Istanbul",
    tagline: "La bolgia di Istanbul, tokenizzata.",
  },
  {
    id: "sauber",
    name: "Stake F1 Team Kick Sauber",
    sport: "Motori",
    country: "Svizzera",
    city: "Hinwil",
    tagline: "Velocità e dati in tempo reale.",
  },
  {
    id: "ufc",
    name: "UFC",
    sport: "Lotta",
    country: "USA",
    city: "Las Vegas",
    tagline: "Octagon energy, on every chain.",
  },
  {
    id: "team-alliance",
    name: "Alliance",
    sport: "Gaming",
    country: "Svezia",
    city: "Stoccolma",
    tagline: "Esports nel layer successivo.",
  },
  {
    id: "psg-handball",
    name: "PSG Handball",
    sport: "Sport",
    country: "Francia",
    city: "Parigi",
    tagline: "Handball ad alta fedeltà digitale.",
  },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find(function (team) {
    return team.id === id;
  });
}


