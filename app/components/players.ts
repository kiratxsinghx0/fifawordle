export type PlayerHint = {
  age: number;
  club: string;
  country: string;
  position: string;
  trivia: string;
};

export type PlayerRow = {
  name: string;
  meta: { shortened: boolean; fullName?: string };
  hint: PlayerHint;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchPlayersFromAPI(): Promise<PlayerRow[]> {
  const res = await fetch(`${API_URL}/api/players`);
  if (!res.ok) throw new Error(`Failed to fetch players: ${res.status}`);
  const json = await res.json();
  const rows: unknown[] = json.data ?? [];
  return rows.map((r: any) => ({
    name: r.name,
    meta: {
      shortened: Boolean(r.is_shortened),
      ...(r.full_name ? { fullName: r.full_name } : {}),
    },
    hint: {
      age: r.age,
      club: r.club,
      country: r.country,
      position: r.position,
      trivia: r.trivia,
    },
  }));
}

export const players: PlayerRow[] = [
  // ==================== LEGENDS (Retired or near-retired) ====================
  { name:"MESSI", meta:{shortened:false}, hint:{age:36,club:"Inter Miami",country:"Argentina",position:"FW",trivia:"World Cup 2022 winner"} },
  { name:"RONAL", meta:{shortened:true,fullName:"Cristiano Ronaldo"}, hint:{age:39,club:"Al Nassr",country:"Portugal",position:"FW",trivia:"All-time top scorer"} },
  { name:"RAMOS", meta:{shortened:false}, hint:{age:38,club:"Sevilla",country:"Spain",position:"CB",trivia:"Clutch goals"} },
  { name:"ROBEN", meta:{shortened:false}, hint:{age:40,club:"Retired",country:"Netherlands",position:"RW",trivia:"Cut inside legend"} },
  { name:"NEUER", meta:{shortened:false}, hint:{age:38,club:"Bayern Munich",country:"Germany",position:"GK",trivia:"Sweeper keeper"} },
  { name:"PIQUE", meta:{shortened:false}, hint:{age:37,club:"Retired",country:"Spain",position:"CB",trivia:"Barcelona legend"} },
  { name:"SUARE", meta:{shortened:true,fullName:"Suarez"}, hint:{age:37,club:"Inter Miami",country:"Uruguay",position:"ST",trivia:"Elite striker"} },
  { name:"MODRI", meta:{shortened:true,fullName:"Modric"}, hint:{age:38,club:"Real Madrid",country:"Croatia",position:"CM",trivia:"Ballon d'Or winner"} },
  { name:"BENZE", meta:{shortened:true,fullName:"Benzema"}, hint:{age:36,club:"Al Ittihad",country:"France",position:"ST",trivia:"Ballon d'Or 2022"} },
  { name:"LEWAN", meta:{shortened:true,fullName:"Lewandowski"}, hint:{age:35,club:"Barcelona",country:"Poland",position:"ST",trivia:"5 goals in 9 minutes"} },
  { name:"CAVAN", meta:{shortened:true,fullName:"Cavani"}, hint:{age:37,club:"Boca Juniors",country:"Uruguay",position:"ST",trivia:"El Matador"} },
  { name:"AGUER", meta:{shortened:true,fullName:"Aguero"}, hint:{age:35,club:"Retired",country:"Argentina",position:"ST",trivia:"93:20"} },
  { name:"SILVA", meta:{shortened:false}, hint:{age:38,club:"Real Sociedad",country:"Spain",position:"CM",trivia:"Playmaker"} },
  { name:"INIES", meta:{shortened:true,fullName:"Iniesta"}, hint:{age:39,club:"Retired",country:"Spain",position:"CM",trivia:"World Cup hero"} },
  { name:"XAVI", meta:{shortened:false}, hint:{age:44,club:"Retired",country:"Spain",position:"CM",trivia:"Barcelona legend"} },
  { name:"CHIEL", meta:{shortened:true,fullName:"Chiellini"}, hint:{age:39,club:"Retired",country:"Italy",position:"CB",trivia:"Italian wall"} },
  { name:"BONUC", meta:{shortened:true,fullName:"Bonucci"}, hint:{age:36,club:"Fenerbahçe",country:"Italy",position:"CB",trivia:"Euro 2020 winner"} },
  { name:"ALVES", meta:{shortened:false}, hint:{age:40,club:"Retired",country:"Brazil",position:"RB",trivia:"Most titles"} },
  { name:"LAHM", meta:{shortened:false}, hint:{age:40,club:"Retired",country:"Germany",position:"RB",trivia:"WC captain"} },
  { name:"KEVIN", meta:{shortened:false,fullName:"Kevin De Bruyne"}, hint:{age:32,club:"Man City",country:"Belgium",position:"CM",trivia:"Assist king"} },

  // ==================== CURRENT SUPERSTARS ====================
  { name:"SALAH", meta:{shortened:false}, hint:{age:31,club:"Liverpool",country:"Egypt",position:"RW",trivia:"Egyptian King"} },
  { name:"MBAPP", meta:{shortened:true,fullName:"Mbappe"}, hint:{age:25,club:"PSG",country:"France",position:"FW",trivia:"World Cup winner at 19"} },
  { name:"HAALA", meta:{shortened:true,fullName:"Haaland"}, hint:{age:23,club:"Man City",country:"Norway",position:"ST",trivia:"Premier League record scorer"} },
  { name:"KANE", meta:{shortened:false}, hint:{age:30,club:"Bayern Munich",country:"England",position:"ST",trivia:"England all-time top scorer"} },
  { name:"DEBRU", meta:{shortened:true,fullName:"De Bruyne"}, hint:{age:32,club:"Man City",country:"Belgium",position:"CM",trivia:"Assist king"} },
  { name:"VINIJ", meta:{shortened:true,fullName:"Vinicius Jr"}, hint:{age:23,club:"Real Madrid",country:"Brazil",position:"LW",trivia:"UCL final goalscorer"} },
  { name:"BELLI", meta:{shortened:true,fullName:"Bellingham"}, hint:{age:20,club:"Real Madrid",country:"England",position:"CM",trivia:"Golden Boy 2023"} },
  { name:"PEDRI", meta:{shortened:false}, hint:{age:21,club:"Barcelona",country:"Spain",position:"CM",trivia:"Golden Boy 2021"} },
  { name:"GAVI", meta:{shortened:false}, hint:{age:19,club:"Barcelona",country:"Spain",position:"CM",trivia:"Golden Boy 2022"} },
  { name:"FODEN", meta:{shortened:false}, hint:{age:23,club:"Man City",country:"England",position:"CM",trivia:"Man City academy"} },
  { name:"RODRI", meta:{shortened:false}, hint:{age:27,club:"Man City",country:"Spain",position:"CDM",trivia:"UCL final hero"} },
  { name:"RICE", meta:{shortened:false}, hint:{age:25,club:"Arsenal",country:"England",position:"CDM",trivia:"British record transfer"} },
  { name:"OSIMH", meta:{shortened:true,fullName:"Osimhen"}, hint:{age:25,club:"Napoli",country:"Nigeria",position:"ST",trivia:"Serie A top scorer"} },
  { name:"LAUTA", meta:{shortened:true,fullName:"Lautaro"}, hint:{age:26,club:"Inter",country:"Argentina",position:"ST",trivia:"World Cup winner"} },
  { name:"ALVAR", meta:{shortened:true,fullName:"Alvarez"}, hint:{age:24,club:"Man City",country:"Argentina",position:"FW",trivia:"World Cup winner"} },
  { name:"MUSIA", meta:{shortened:true,fullName:"Musiala"}, hint:{age:21,club:"Bayern",country:"Germany",position:"AM",trivia:"Dribbling wizard"} },
  { name:"WIRTZ", meta:{shortened:false}, hint:{age:20,club:"Leverkusen",country:"Germany",position:"AM",trivia:"Bundesliga breakout"} },
  { name:"SAKA", meta:{shortened:false}, hint:{age:22,club:"Arsenal",country:"England",position:"RW",trivia:"Academy star"} },
  { name:"RASHF", meta:{shortened:true,fullName:"Rashford"}, hint:{age:26,club:"Man United",country:"England",position:"LW",trivia:"Academy graduate"} },
  { name:"OEDEG", meta:{shortened:true,fullName:"Odegaard"}, hint:{age:25,club:"Arsenal",country:"Norway",position:"CM",trivia:"Youngest debut"} },
  { name:"FELIX", meta:{shortened:false}, hint:{age:24,club:"Barcelona",country:"Portugal",position:"FW",trivia:"Golden Boy 2019"} },
  { name:"LEAO", meta:{shortened:false}, hint:{age:24,club:"AC Milan",country:"Portugal",position:"LW",trivia:"Scudetto winner"} },
  { name:"KVARA", meta:{shortened:true,fullName:"Kvaratskhelia"}, hint:{age:23,club:"Napoli",country:"Georgia",position:"LW",trivia:"Georgian sensation"} },
  { name:"ENZO", meta:{shortened:false}, hint:{age:23,club:"Chelsea",country:"Argentina",position:"CM",trivia:"World Cup Young POTY"} },
  { name:"CAICE", meta:{shortened:true,fullName:"Caicedo"}, hint:{age:22,club:"Chelsea",country:"Ecuador",position:"CDM",trivia:"British record"} },
  { name:"MACAL", meta:{shortened:true,fullName:"Mac Allister"}, hint:{age:25,club:"Liverpool",country:"Argentina",position:"CM",trivia:"World Cup winner"} },
  { name:"SZOBOS", meta:{shortened:true,fullName:"Szoboszlai"}, hint:{age:23,club:"Liverpool",country:"Hungary",position:"CM",trivia:"Hungarian captain"} },
  { name:"GRIEZ", meta:{shortened:true,fullName:"Griezmann"}, hint:{age:33,club:"Atletico",country:"France",position:"CF",trivia:"World Cup winner"} },
  { name:"DEMBE", meta:{shortened:true,fullName:"Dembele"}, hint:{age:26,club:"PSG",country:"France",position:"RW",trivia:"Dribble king"} },
  { name:"COMAN", meta:{shortened:false}, hint:{age:27,club:"Bayern",country:"France",position:"LW",trivia:"UCL final winner"} },

  // ==================== DEFENDERS ====================
  { name:"VVD", meta:{shortened:false}, hint:{age:32,club:"Liverpool",country:"Netherlands",position:"CB",trivia:"Ballon d'Or runner-up"} },
  { name:"RUDIG", meta:{shortened:true,fullName:"Rudiger"}, hint:{age:31,club:"Real Madrid",country:"Germany",position:"CB",trivia:"Intense defender"} },
  { name:"MILIT", meta:{shortened:true,fullName:"Militão"}, hint:{age:26,club:"Real Madrid",country:"Brazil",position:"CB",trivia:"Brazil starter"} },
  { name:"ARAUJ", meta:{shortened:true,fullName:"Araujo"}, hint:{age:25,club:"Barcelona",country:"Uruguay",position:"CB",trivia:"Physical beast"} },
  { name:"KOUND", meta:{shortened:true,fullName:"Kounde"}, hint:{age:25,club:"Barcelona",country:"France",position:"CB",trivia:"Versatile defender"} },
  { name:"SALIB", meta:{shortened:true,fullName:"Saliba"}, hint:{age:23,club:"Arsenal",country:"France",position:"CB",trivia:"Young wall"} },
  { name:"GABRI", meta:{shortened:true,fullName:"Gabriel"}, hint:{age:26,club:"Arsenal",country:"Brazil",position:"CB",trivia:"Set piece threat"} },
  { name:"DIAS", meta:{shortened:false}, hint:{age:26,club:"Man City",country:"Portugal",position:"CB",trivia:"PL Player of the Season"} },
  { name:"STONE", meta:{shortened:true,fullName:"Stones"}, hint:{age:29,club:"Man City",country:"England",position:"CB",trivia:"Ball-playing CB"} },
  { name:"AKANJ", meta:{shortened:true,fullName:"Akanji"}, hint:{age:28,club:"Man City",country:"Switzerland",position:"CB",trivia:"Versatile"} },
  { name:"KIM", meta:{shortened:false}, hint:{age:27,club:"Bayern",country:"Korea",position:"CB",trivia:"Serie A Best Defender"} },
  { name:"UPAME", meta:{shortened:true,fullName:"Upamecano"}, hint:{age:25,club:"Bayern",country:"France",position:"CB",trivia:"Strong tackler"} },
  { name:"THEO", meta:{shortened:false}, hint:{age:26,club:"AC Milan",country:"France",position:"LB",trivia:"Fastest fullback"} },
  { name:"DAVIS", meta:{shortened:false}, hint:{age:23,club:"Bayern",country:"Canada",position:"LB",trivia:"Speed demon"} },
  { name:"CANCE", meta:{shortened:true,fullName:"Cancelo"}, hint:{age:29,club:"Barcelona",country:"Portugal",position:"RB",trivia:"Attacking fullback"} },
  { name:"WALKR", meta:{shortened:true,fullName:"Walker"}, hint:{age:33,club:"Man City",country:"England",position:"RB",trivia:"Speedster"} },
  { name:"TRENT", meta:{shortened:false}, hint:{age:25,club:"Liverpool",country:"England",position:"RB",trivia:"Assist record"} },
  { name:"ROBER", meta:{shortened:true,fullName:"Robertson"}, hint:{age:30,club:"Liverpool",country:"Scotland",position:"LB",trivia:"Scottish captain"} },
  { name:"HAKIM", meta:{shortened:true,fullName:"Hakimi"}, hint:{age:25,club:"PSG",country:"Morocco",position:"RB",trivia:"Fastest player"} },
  { name:"MENDY", meta:{shortened:false}, hint:{age:28,club:"Real Madrid",country:"France",position:"LB",trivia:"UCL winner"} },

  // ==================== GOALKEEPERS ====================
  { name:"COURT", meta:{shortened:true,fullName:"Courtois"}, hint:{age:31,club:"Real Madrid",country:"Belgium",position:"GK",trivia:"UCL final MVP"} },
  { name:"ALISS", meta:{shortened:true,fullName:"Alisson"}, hint:{age:31,club:"Liverpool",country:"Brazil",position:"GK",trivia:"Scoring GK"} },
  { name:"EDERS", meta:{shortened:true,fullName:"Ederson"}, hint:{age:30,club:"Man City",country:"Brazil",position:"GK",trivia:"Ball-playing GK"} },
  { name:"DONNA", meta:{shortened:true,fullName:"Donnarumma"}, hint:{age:25,club:"PSG",country:"Italy",position:"GK",trivia:"Euro 2020 hero"} },
  { name:"OBLAK", meta:{shortened:false}, hint:{age:31,club:"Atletico",country:"Slovenia",position:"GK",trivia:"Top GK"} },
  { name:"MAIGN", meta:{shortened:true,fullName:"Maignan"}, hint:{age:28,club:"AC Milan",country:"France",position:"GK",trivia:"Serie A champion"} },
  { name:"TERST", meta:{shortened:true,fullName:"Ter Stegen"}, hint:{age:31,club:"Barcelona",country:"Germany",position:"GK",trivia:"Sweeper keeper"} },
  { name:"ONANA", meta:{shortened:false}, hint:{age:27,club:"Man United",country:"Cameroon",position:"GK",trivia:"Ball-playing GK"} },
  { name:"RAMSD", meta:{shortened:true,fullName:"Ramsdale"}, hint:{age:25,club:"Arsenal",country:"England",position:"GK",trivia:"Reactions"} },
  { name:"POPEI", meta:{shortened:true,fullName:"Pope"}, hint:{age:31,club:"Newcastle",country:"England",position:"GK",trivia:"Clean sheets"} },
  { name:"MARTI", meta:{shortened:true,fullName:"Martinez"}, hint:{age:31,club:"Aston Villa",country:"Argentina",position:"GK",trivia:"World Cup hero"} },
  { name:"NAVAS", meta:{shortened:false}, hint:{age:37,club:"PSG",country:"Costa Rica",position:"GK",trivia:"UCL winner"} },
  { name:"SOMME", meta:{shortened:true,fullName:"Sommer"}, hint:{age:35,club:"Inter",country:"Switzerland",position:"GK",trivia:"Reliable"} },

  // ==================== MIDFIELDERS ====================
  { name:"KROOS", meta:{shortened:false}, hint:{age:34,club:"Real Madrid",country:"Germany",position:"CM",trivia:"Passing master"} },
  { name:"POGBA", meta:{shortened:false}, hint:{age:31,club:"Juventus",country:"France",position:"CM",trivia:"World Cup winner"} },
  { name:"KANTE", meta:{shortened:false}, hint:{age:33,club:"Al Ittihad",country:"France",position:"CDM",trivia:"Leicester miracle"} },
  { name:"CASEM", meta:{shortened:true,fullName:"Casemiro"}, hint:{age:32,club:"Man United",country:"Brazil",position:"CDM",trivia:"UCL winner"} },
  { name:"FABIN", meta:{shortened:true,fullName:"Fabinho"}, hint:{age:30,club:"Al Ittihad",country:"Brazil",position:"CDM",trivia:"Tackle machine"} },
  { name:"FERNA", meta:{shortened:true,fullName:"Fernandinho"}, hint:{age:38,club:"Retired",country:"Brazil",position:"CDM",trivia:"Man City legend"} },
  { name:"VERRA", meta:{shortened:true,fullName:"Verratti"}, hint:{age:31,club:"Al Arabi",country:"Italy",position:"CM",trivia:"Mini Pirlo"} },
  { name:"BRUNO", meta:{shortened:false}, hint:{age:29,club:"Man United",country:"Portugal",position:"CM",trivia:"Penalty king"} },
  { name:"BERNA", meta:{shortened:true,fullName:"Bernardo"}, hint:{age:29,club:"Man City",country:"Portugal",position:"CM",trivia:"Workhorse"} },
  { name:"KOVAC", meta:{shortened:true,fullName:"Kovacic"}, hint:{age:29,club:"Man City",country:"Croatia",position:"CM",trivia:"Dribbler"} },
  { name:"GUNDO", meta:{shortened:true,fullName:"Gundogan"}, hint:{age:33,club:"Barcelona",country:"Germany",position:"CM",trivia:"UCL final goals"} },
  { name:"THIAG", meta:{shortened:true,fullName:"Thiago"}, hint:{age:33,club:"Liverpool",country:"Spain",position:"CM",trivia:"Technical genius"} },
  { name:"XHAKA", meta:{shortened:false}, hint:{age:31,club:"Leverkusen",country:"Switzerland",position:"CM",trivia:"Swiss captain"} },
  { name:"MOUNT", meta:{shortened:false}, hint:{age:25,club:"Man United",country:"England",position:"CM",trivia:"Chelsea academy"} },
  { name:"GALLI", meta:{shortened:true,fullName:"Gallagher"}, hint:{age:24,club:"Chelsea",country:"England",position:"CM",trivia:"Work rate"} },
  { name:"MADDI", meta:{shortened:true,fullName:"Maddison"}, hint:{age:27,club:"Tottenham",country:"England",position:"AM",trivia:"Set piece specialist"} },
  { name:"EZE", meta:{shortened:false}, hint:{age:25,club:"Crystal Palace",country:"England",position:"AM",trivia:"Dribbling"} },
  { name:"OLMO", meta:{shortened:false}, hint:{age:25,club:"RB Leipzig",country:"Spain",position:"AM",trivia:"Euro 2024 star"} },

  // ==================== FORWARDS & WINGERS ====================
  { name:"NUNEZ", meta:{shortened:false}, hint:{age:24,club:"Liverpool",country:"Uruguay",position:"ST",trivia:"Chaos factor"} },
  { name:"JULIA", meta:{shortened:true,fullName:"Julian"}, hint:{age:24,club:"Man City",country:"Argentina",position:"FW",trivia:"World Cup winner"} },
  { name:"MARTI", meta:{shortened:true,fullName:"Martinez"}, hint:{age:26,club:"Inter",country:"Argentina",position:"ST",trivia:"World Cup winner"} },
  { name:"DAVID", meta:{shortened:false}, hint:{age:24,club:"Lille",country:"Canada",position:"ST",trivia:"Canadian star"} },
  { name:"OPEND", meta:{shortened:true,fullName:"Openda"}, hint:{age:24,club:"RB Leipzig",country:"Belgium",position:"ST",trivia:"Pace"} },
  { name:"SESKO", meta:{shortened:false}, hint:{age:20,club:"RB Leipzig",country:"Slovenia",position:"ST",trivia:"Young talent"} },
  { name:"HOJLU", meta:{shortened:true,fullName:"Hojlund"}, hint:{age:21,club:"Man United",country:"Denmark",position:"ST",trivia:"Big signing"} },
  { name:"JACKS", meta:{shortened:true,fullName:"Jackson"}, hint:{age:22,club:"Chelsea",country:"Senegal",position:"ST",trivia:"Inconsistent"} },
  { name:"WATKI", meta:{shortened:true,fullName:"Watkins"}, hint:{age:28,club:"Aston Villa",country:"England",position:"ST",trivia:"Goal scorer"} },
  { name:"SOLAN", meta:{shortened:true,fullName:"Solanke"}, hint:{age:26,club:"Bournemouth",country:"England",position:"ST",trivia:"Chelsea academy"} },
  { name:"STERL", meta:{shortened:true,fullName:"Sterling"}, hint:{age:29,club:"Chelsea",country:"England",position:"LW",trivia:"Pep's winger"} },
  { name:"SANCH", meta:{shortened:true,fullName:"Sancho"}, hint:{age:24,club:"Man United",country:"England",position:"RW",trivia:"Dortmund star"} },
  { name:"GREAL", meta:{shortened:true,fullName:"Grealish"}, hint:{age:28,club:"Man City",country:"England",position:"LW",trivia:"British record"} },
  { name:"DOKU", meta:{shortened:false}, hint:{age:21,club:"Man City",country:"Belgium",position:"RW",trivia:"Dribbling king"} },
  { name:"MITOM", meta:{shortened:true,fullName:"Mitoma"}, hint:{age:26,club:"Brighton",country:"Japan",position:"LW",trivia:"Dribbling master"} },
  { name:"KUBO", meta:{shortened:false}, hint:{age:22,club:"Real Sociedad",country:"Japan",position:"RW",trivia:"Japanese Messi"} },
  { name:"CHIES", meta:{shortened:true,fullName:"Chiesa"}, hint:{age:26,club:"Juventus",country:"Italy",position:"LW",trivia:"Euro 2020 hero"} },
  { name:"BOWEN", meta:{shortened:false}, hint:{age:27,club:"West Ham",country:"England",position:"RW",trivia:"Europa hero"} },
  { name:"GORDON", meta:{shortened:false}, hint:{age:23,club:"Newcastle",country:"England",position:"LW",trivia:"Pace"} },
  { name:"ISAK", meta:{shortened:false}, hint:{age:24,club:"Newcastle",country:"Sweden",position:"ST",trivia:"Tall striker"} },

  // ==================== RISING STARS ====================
  { name:"ENDRK", meta:{shortened:true,fullName:"Endrick"}, hint:{age:17,club:"Real Madrid",country:"Brazil",position:"ST",trivia:"Future star"} },
  { name:"YAMAL", meta:{shortened:false}, hint:{age:16,club:"Barcelona",country:"Spain",position:"RW",trivia:"Youngest debut"} },
  { name:"MAINO", meta:{shortened:true,fullName:"Mainoo"}, hint:{age:19,club:"Man United",country:"England",position:"CM",trivia:"Academy breakout"} },
  { name:"COLWI", meta:{shortened:true,fullName:"Colwill"}, hint:{age:21,club:"Chelsea",country:"England",position:"CB",trivia:"Brighton loan"} },
  { name:"LEWIS", meta:{shortened:false}, hint:{age:19,club:"Man City",country:"England",position:"RB",trivia:"Pep's trust"} },
  { name:"BALDE", meta:{shortened:false}, hint:{age:20,club:"Barcelona",country:"Spain",position:"LB",trivia:"La Masia"} },
  { name:"GARNACHO", meta:{shortened:false}, hint:{age:19,club:"Man United",country:"Argentina",position:"LW",trivia:"Bicycle kick"} },
  { name:"ELLIO", meta:{shortened:true,fullName:"Elliott"}, hint:{age:21,club:"Liverpool",country:"England",position:"RW",trivia:"Young debut"} },
  { name:"BAYIN", meta:{shortened:true,fullName:"Bellingham"}, hint:{age:20,club:"Real Madrid",country:"England",position:"CM",trivia:"Galactico"} },
  { name:"WERTZ", meta:{shortened:true,fullName:"Wirtz"}, hint:{age:20,club:"Leverkusen",country:"Germany",position:"AM",trivia:"Bundesliga star"} },
  { name:"SIMON", meta:{shortened:false}, hint:{age:22,club:"Athletic",country:"Spain",position:"LW",trivia:"Dribbling"} },
  { name:"VERMA", meta:{shortened:true,fullName:"Vermeeren"}, hint:{age:19,club:"Atletico",country:"Belgium",position:"CM",trivia:"Young talent"} },
];