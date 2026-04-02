import { fetchPlayers } from "../services/ipl-api";

export type IplHintEntry = Record<string, unknown>;

export type IplPlayerRow = {
  name: string;
  meta: { shortened: boolean; fullName?: string };
  hints: IplHintEntry[];
};

/** Extract a single-key hint value from the hints array. */
function findHint<T = string>(hints: IplHintEntry[], key: string): T | undefined {
  const entry = hints.find((h) => h[key] !== undefined);
  return entry ? (entry[key] as T) : undefined;
}

/** Collect all trivia entries from hints (supports { trivia: string[] } format). */
export function collectTrivias(hints: IplHintEntry[]): string[] {
  const entry = hints.find((h) => h.trivia !== undefined);
  if (!entry) return [];
  const val = entry.trivia;
  return Array.isArray(val) ? (val as string[]) : [val as string];
}

/** Rebuild the hints array from flat DB columns (used by fetchIplPlayersFromAPI). */
function dbRowToHints(r: any): IplHintEntry[] {
  const teams = typeof r.teams === "string" ? JSON.parse(r.teams) : (r.teams ?? []);
  const rawTrivias = typeof r.trivias === "string" ? JSON.parse(r.trivias) : (r.trivias ?? []);
  const trivias = (rawTrivias as unknown[]).flat() as string[];
  return [
    { age: r.age },
    { country: r.country },
    { iplTeam: r.ipl_team },
    { role: r.role },
    { teams },
    { batting: r.batting ?? "N/A" },
    { bowling: r.bowling ?? "N/A" },
    { jersey: r.jersey ?? null },
    { nickname: r.nickname ?? null },
    { era: r.era ?? "current" },
    { popularity: r.popularity ?? "regular" },
    { openingHint: r.opening_hint ?? "" },
    { trivia: trivias },
  ];
}

export async function fetchIplPlayersFromAPI(): Promise<IplPlayerRow[]> {
  const res = await fetchPlayers();
  if (!res.ok) throw new Error(`Failed to fetch IPL players: ${res.status}`);
  const json = await res.json();
  const rows: unknown[] = json.data ?? [];
  return rows.map((r: any) => ({
    name: r.name,
    meta: {
      shortened: Boolean(r.is_shortened),
      ...(r.full_name ? { fullName: r.full_name } : {}),
    },
    hints: dbRowToHints(r),
  }));
}

export { findHint };

export const iplPlayers: IplPlayerRow[] = [
  {
    "name": "MS",
    "meta": {
      "shortened": false,
      "fullName": "MS Dhoni"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Captain Cool"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Still plays IPL at 43 and fans go crazy every time he bats"
      },
      {
        "trivia": [
          "Loves bikes more than cricket sometimes",
          "Has a massive farm in his hometown",
          "Retired from international cricket without any announcement",
          "Finished the World Cup final with a six",
          "Never shows emotions on the field ever",
          "Captain Cool who won every trophy possible"
        ]
      }
    ]
  },
  {
    "name": "DHONI",
    "meta": {
      "shortened": false,
      "fullName": "MS Dhoni"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Captain Cool"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Still plays IPL at 43 and fans go crazy every time he bats"
      },
      {
        "trivia": [
          "Loves bikes more than cricket sometimes",
          "Has a massive farm in his hometown",
          "Retired from international cricket without any announcement",
          "Finished the World Cup final with a six",
          "Never shows emotions on the field ever",
          "Captain Cool who won every trophy possible"
        ]
      }
    ]
  },
  {
    "name": "SACHI",
    "meta": {
      "shortened": true,
      "fullName": "Sachin Tendulkar"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Little Master"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Played international cricket for 24 years starting as a teenager"
      },
      {
        "trivia": [
          "The whole country stops when he gets out",
          "Has a Bharat Ratna which even most politicians don't get",
          "Cried after winning the World Cup in 2011",
          "Scored 100 international centuries which nobody else has done",
          "Called God of Cricket by billions of fans",
          "Little Master who dominated world cricket for 24 years"
        ]
      }
    ]
  },
  {
    "name": "TENDU",
    "meta": {
      "shortened": true,
      "fullName": "Sachin Tendulkar"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Little Master"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Played international cricket for 24 years starting as a teenager"
      },
      {
        "trivia": [
          "The whole country stops when he gets out",
          "Has a Bharat Ratna which even most politicians don't get",
          "Cried after winning the World Cup in 2011",
          "Scored 100 international centuries which nobody else has done",
          "Called God of Cricket by billions of fans",
          "Little Master who dominated world cricket for 24 years"
        ]
      }
    ]
  },
  {
    "name": "SOURA",
    "meta": {
      "shortened": true,
      "fullName": "Sourav Ganguly"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Dada"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Took off his shirt and waved it at a famous cricket ground"
      },
      {
        "trivia": [
          "Took shirt off at Lord's balcony after winning a final",
          "Became BCCI president after retiring from cricket",
          "Was dropped from team and fought back to become captain",
          "Had a famous rivalry with a top Australian captain",
          "Made India fearless in overseas cricket",
          "Prince of Kolkata loved by all of Bengal"
        ]
      }
    ]
  },
  {
    "name": "GANGU",
    "meta": {
      "shortened": true,
      "fullName": "Sourav Ganguly"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Dada"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Took off his shirt and waved it at a famous cricket ground"
      },
      {
        "trivia": [
          "Took shirt off at Lord's balcony after winning a final",
          "Became BCCI president after retiring from cricket",
          "Was dropped from team and fought back to become captain",
          "Had a famous rivalry with a top Australian captain",
          "Made India fearless in overseas cricket",
          "Prince of Kolkata loved by all of Bengal"
        ]
      }
    ]
  },
  {
    "name": "RAHUL",
    "meta": {
      "shortened": false,
      "fullName": "Rahul Dravid"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "The Wall"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Coached India to a World Cup win after being a legendary batter"
      },
      {
        "trivia": [
          "Nicknamed The Wall because he never gets out easily",
          "Known for being the nicest guy in cricket",
          "Coached India to T20 World Cup 2024 victory",
          "Stood at the crease longer than almost anyone ever",
          "Second highest Test run scorer for India",
          "Mr Dependable who never let India down"
        ]
      }
    ]
  },
  {
    "name": "DRAVI",
    "meta": {
      "shortened": true,
      "fullName": "Rahul Dravid"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "The Wall"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Coached India to a World Cup win after being a legendary batter"
      },
      {
        "trivia": [
          "Nicknamed The Wall because he never gets out easily",
          "Known for being the nicest guy in cricket",
          "Coached India to T20 World Cup 2024 victory",
          "Stood at the crease longer than almost anyone ever",
          "Second highest Test run scorer for India",
          "Mr Dependable who never let India down"
        ]
      }
    ]
  },
  {
    "name": "JASPR",
    "meta": {
      "shortened": true,
      "fullName": "Jasprit Bumrah"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 93
      },
      {
        "nickname": "Bumrah"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most unusual bowling action you will ever see"
      },
      {
        "trivia": [
          "Grew up without a father and cricket was his escape",
          "His action looks wrong but nobody can hit him",
          "Yorker at full speed is almost impossible to play",
          "Best death bowler in the world right now",
          "Took a hat trick in Test cricket",
          "India's most important bowler in big matches"
        ]
      }
    ]
  },
  {
    "name": "BUMRA",
    "meta": {
      "shortened": true,
      "fullName": "Jasprit Bumrah"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 93
      },
      {
        "nickname": "Bumrah"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most unusual bowling action you will ever see"
      },
      {
        "trivia": [
          "Grew up without a father and cricket was his escape",
          "His action looks wrong but nobody can hit him",
          "Yorker at full speed is almost impossible to play",
          "Best death bowler in the world right now",
          "Took a hat trick in Test cricket",
          "India's most important bowler in big matches"
        ]
      }
    ]
  },
  {
    "name": "RAVIN",
    "meta": {
      "shortened": true,
      "fullName": "Ravindra Jadeja"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rajasthan Royals",
          "Gujarat Lions"
        ]
      },
      {
        "jersey": 8
      },
      {
        "nickname": "Sir Jadeja"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Does a sword celebration every time he scores a century"
      },
      {
        "trivia": [
          "Called himself Sir Jadeja on social media and it stuck",
          "Has horses at home and loves riding them",
          "Can bat bowl and field better than most specialists",
          "Fans made memes about him being underrated for years",
          "One of the best fielders cricket has ever seen",
          "CSK's most trusted all-rounder alongside their captain"
        ]
      }
    ]
  },
  {
    "name": "JADEJ",
    "meta": {
      "shortened": true,
      "fullName": "Ravindra Jadeja"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rajasthan Royals",
          "Gujarat Lions"
        ]
      },
      {
        "jersey": 8
      },
      {
        "nickname": "Sir Jadeja"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Does a sword celebration every time he scores a century"
      },
      {
        "trivia": [
          "Called himself Sir Jadeja on social media and it stuck",
          "Has horses at home and loves riding them",
          "Can bat bowl and field better than most specialists",
          "Fans made memes about him being underrated for years",
          "One of the best fielders cricket has ever seen",
          "CSK's most trusted all-rounder alongside their captain"
        ]
      }
    ]
  },
  {
    "name": "YUZVE",
    "meta": {
      "shortened": true,
      "fullName": "Yuzvendra Chahal"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Rajasthan Royals",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Chahal"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Went viral for wearing a very funny shirt at a very serious place"
      },
      {
        "trivia": [
          "Wore be your own sugar daddy shirt to divorce hearing",
          "Made funny reels with wife before things went wrong",
          "Recently got divorced and became internet famous for it",
          "Was left out of World Cup squad despite being best T20 spinner",
          "Gets wickets with leg spin and googly combination",
          "India's most loved T20 leg spinner"
        ]
      }
    ]
  },
  {
    "name": "CHAHA",
    "meta": {
      "shortened": true,
      "fullName": "Yuzvendra Chahal"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Rajasthan Royals",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Chahal"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Went viral for wearing a very funny shirt at a very serious place"
      },
      {
        "trivia": [
          "Wore be your own sugar daddy shirt to divorce hearing",
          "Made funny reels with wife before things went wrong",
          "Recently got divorced and became internet famous for it",
          "Was left out of World Cup squad despite being best T20 spinner",
          "Gets wickets with leg spin and googly combination",
          "India's most loved T20 leg spinner"
        ]
      }
    ]
  },
  {
    "name": "RISHA",
    "meta": {
      "shortened": true,
      "fullName": "Rishabh Pant"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "RP17"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Survived a terrible car crash and came back to play cricket"
      },
      {
        "trivia": [
          "Car crashed on a highway at night and nearly died",
          "Came back to cricket after major surgeries on his body",
          "Hits reverse sweeps off fast bowlers for fun",
          "Scored a winning fifty at a ground India never won before",
          "Called Baby Dhoni early in his career",
          "Left-hand keeper who plays by his own rules"
        ]
      }
    ]
  },
  {
    "name": "PANT",
    "meta": {
      "shortened": false,
      "fullName": "Rishabh Pant"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "RP17"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Survived a terrible car crash and came back to play cricket"
      },
      {
        "trivia": [
          "Car crashed on a highway at night and nearly died",
          "Came back to cricket after major surgeries on his body",
          "Hits reverse sweeps off fast bowlers for fun",
          "Scored a winning fifty at a ground India never won before",
          "Called Baby Dhoni early in his career",
          "Left-hand keeper who plays by his own rules"
        ]
      }
    ]
  },
  {
    "name": "ROHIT",
    "meta": {
      "shortened": false,
      "fullName": "Rohit Sharma"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 45
      },
      {
        "nickname": "Hitman"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Won the World Cup as captain and immediately retired from that format"
      },
      {
        "trivia": [
          "Retired from T20 cricket right after winning the World Cup",
          "Has a daughter he posts about more than cricket",
          "Loves fishing in his free time",
          "Won five IPL trophies as captain",
          "Hit 264 in one match which nobody has beaten",
          "Most destructive opener in white ball cricket"
        ]
      }
    ]
  },
  {
    "name": "SHARM",
    "meta": {
      "shortened": true,
      "fullName": "Rohit Sharma"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 45
      },
      {
        "nickname": "Hitman"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Won the World Cup as captain and immediately retired from that format"
      },
      {
        "trivia": [
          "Retired from T20 cricket right after winning the World Cup",
          "Has a daughter he posts about more than cricket",
          "Loves fishing in his free time",
          "Won five IPL trophies as captain",
          "Hit 264 in one match which nobody has beaten",
          "Most destructive opener in white ball cricket"
        ]
      }
    ]
  },
  {
    "name": "VIREN",
    "meta": {
      "shortened": true,
      "fullName": "Virender Sehwag"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 44
      },
      {
        "nickname": "Viru"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Known for funny and savage tweets more than his cricket now"
      },
      {
        "trivia": [
          "Posts the most savage tweets about cricket and life",
          "Never thought about bowlers just hit every ball hard",
          "Scored triple century in Tests twice which only he has done",
          "Called Nawab of Najafgarh from his small hometown",
          "Made batting look so simple it was almost boring",
          "Opened with Sachin and destroyed every bowling attack"
        ]
      }
    ]
  },
  {
    "name": "SEHWA",
    "meta": {
      "shortened": true,
      "fullName": "Virender Sehwag"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 44
      },
      {
        "nickname": "Viru"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Known for funny and savage tweets more than his cricket now"
      },
      {
        "trivia": [
          "Posts the most savage tweets about cricket and life",
          "Never thought about bowlers just hit every ball hard",
          "Scored triple century in Tests twice which only he has done",
          "Called Nawab of Najafgarh from his small hometown",
          "Made batting look so simple it was almost boring",
          "Opened with Sachin and destroyed every bowling attack"
        ]
      }
    ]
  },
  {
    "name": "YUVRA",
    "meta": {
      "shortened": true,
      "fullName": "Yuvraj Singh"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kings XI Punjab"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Pune Warriors"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Yuvi"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Beat cancer and came back to play international cricket"
      },
      {
        "trivia": [
          "Fought cancer and came back to play for India",
          "Hit six sixes in one over in a World Cup match",
          "Won Man of Tournament in the 2011 World Cup",
          "Had relationships with several Bollywood actresses",
          "One of the best fielders India ever produced",
          "Left-hand all-rounder who won India two World Cups"
        ]
      }
    ]
  },
  {
    "name": "SINGH",
    "meta": {
      "shortened": false,
      "fullName": "Yuvraj Singh"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kings XI Punjab"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Pune Warriors"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Yuvi"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Beat cancer and came back to play international cricket"
      },
      {
        "trivia": [
          "Fought cancer and came back to play for India",
          "Hit six sixes in one over in a World Cup match",
          "Won Man of Tournament in the 2011 World Cup",
          "Had relationships with several Bollywood actresses",
          "One of the best fielders India ever produced",
          "Left-hand all-rounder who won India two World Cups"
        ]
      }
    ]
  },
  {
    "name": "SURES",
    "meta": {
      "shortened": true,
      "fullName": "Suresh Raina"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Gujarat Lions"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Mr IPL"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Retired from cricket on the exact same day as his captain"
      },
      {
        "trivia": [
          "Retired same day as Dhoni in a surprise announcement",
          "Cannot play short balls outside off stump his whole career",
          "Loves CSK more than any other team in the world",
          "Called Mr IPL for being the most consistent IPL batter",
          "First Indian to score centuries in all three formats",
          "Chennai's most loyal player for over a decade"
        ]
      }
    ]
  },
  {
    "name": "RAINA",
    "meta": {
      "shortened": false,
      "fullName": "Suresh Raina"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Gujarat Lions"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Mr IPL"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Retired from cricket on the exact same day as his captain"
      },
      {
        "trivia": [
          "Retired same day as Dhoni in a surprise announcement",
          "Cannot play short balls outside off stump his whole career",
          "Loves CSK more than any other team in the world",
          "Called Mr IPL for being the most consistent IPL batter",
          "First Indian to score centuries in all three formats",
          "Chennai's most loyal player for over a decade"
        ]
      }
    ]
  },
  {
    "name": "GAUTA",
    "meta": {
      "shortened": true,
      "fullName": "Gautam Gambhir"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Gambler"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Now coaches India after being an aggressive opening batter"
      },
      {
        "trivia": [
          "Known for getting into fights and arguments on the field",
          "Scored 97 in World Cup final but Dhoni got all the credit",
          "Became India head coach and won the World Cup 2024",
          "Won two IPL titles as captain of KKR",
          "Became a politician after retiring from cricket",
          "Most underrated batter in India's World Cup winning teams"
        ]
      }
    ]
  },
  {
    "name": "GAMBH",
    "meta": {
      "shortened": true,
      "fullName": "Gautam Gambhir"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Gambler"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Now coaches India after being an aggressive opening batter"
      },
      {
        "trivia": [
          "Known for getting into fights and arguments on the field",
          "Scored 97 in World Cup final but Dhoni got all the credit",
          "Became India head coach and won the World Cup 2024",
          "Won two IPL titles as captain of KKR",
          "Became a politician after retiring from cricket",
          "Most underrated batter in India's World Cup winning teams"
        ]
      }
    ]
  },
  {
    "name": "SHIKH",
    "meta": {
      "shortened": true,
      "fullName": "Shikhar Dhawan"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 25
      },
      {
        "nickname": "Gabbar"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Known for his thick moustache that became his identity"
      },
      {
        "trivia": [
          "Has the most famous moustache in Indian cricket history",
          "Got divorced and it was all over the news",
          "His son lives with his ex-wife in Australia",
          "Best Indian batter at ICC tournaments for years",
          "Called Gabbar after a famous Bollywood villain",
          "Left-hand opener who loved big tournaments most"
        ]
      }
    ]
  },
  {
    "name": "DHAWA",
    "meta": {
      "shortened": true,
      "fullName": "Shikhar Dhawan"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 25
      },
      {
        "nickname": "Gabbar"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Known for his thick moustache that became his identity"
      },
      {
        "trivia": [
          "Has the most famous moustache in Indian cricket history",
          "Got divorced and it was all over the news",
          "His son lives with his ex-wife in Australia",
          "Best Indian batter at ICC tournaments for years",
          "Called Gabbar after a famous Bollywood villain",
          "Left-hand opener who loved big tournaments most"
        ]
      }
    ]
  },
  {
    "name": "KL",
    "meta": {
      "shortened": false,
      "fullName": "KL Rahul"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Lucknow Super Giants",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "KL"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Dating a very famous Bollywood actress and often in the news for it"
      },
      {
        "trivia": [
          "Dating a top Bollywood actress everyone knows",
          "Got suspended once for making a joke on a TV show",
          "Changed his batting style completely to fit team needs",
          "Scored a century on T20I debut for India",
          "One of the most consistent IPL run scorers ever",
          "Elegant right-hand batter who fits any position"
        ]
      }
    ]
  },
  {
    "name": "RAHUL",
    "meta": {
      "shortened": false,
      "fullName": "KL Rahul"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Lucknow Super Giants",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "KL"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Dating a very famous Bollywood actress and often in the news for it"
      },
      {
        "trivia": [
          "Dating a top Bollywood actress everyone knows",
          "Got suspended once for making a joke on a TV show",
          "Changed his batting style completely to fit team needs",
          "Scored a century on T20I debut for India",
          "One of the most consistent IPL run scorers ever",
          "Elegant right-hand batter who fits any position"
        ]
      }
    ]
  },
  {
    "name": "AJINK",
    "meta": {
      "shortened": true,
      "fullName": "Ajinkya Rahane"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Capitals",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 27
      },
      {
        "nickname": "Jinx"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Captained India to a win at a ground they had never won before"
      },
      {
        "trivia": [
          "Won a Test at Gabba where Australia had not lost for 32 years",
          "Very quiet and calm person off the field",
          "Got dropped from India team despite winning that famous series",
          "Scored a hundred as stand-in captain to save the team",
          "Known for excellent slip catching in the field",
          "Elegant right-hand batter especially good overseas"
        ]
      }
    ]
  },
  {
    "name": "RAHAN",
    "meta": {
      "shortened": true,
      "fullName": "Ajinkya Rahane"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Capitals",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 27
      },
      {
        "nickname": "Jinx"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Captained India to a win at a ground they had never won before"
      },
      {
        "trivia": [
          "Won a Test at Gabba where Australia had not lost for 32 years",
          "Very quiet and calm person off the field",
          "Got dropped from India team despite winning that famous series",
          "Scored a hundred as stand-in captain to save the team",
          "Known for excellent slip catching in the field",
          "Elegant right-hand batter especially good overseas"
        ]
      }
    ]
  },
  {
    "name": "CHETE",
    "meta": {
      "shortened": true,
      "fullName": "Cheteshwar Pujara"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 21
      },
      {
        "nickname": "Pujara"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Famous for blocking balls for hours to tire out bowlers"
      },
      {
        "trivia": [
          "Faced nearly 1000 balls in one Australia series alone",
          "Got hit many times by fast bowlers and never flinched",
          "IPL teams never wanted him because he bats too slow",
          "Played county cricket to stay fit and get back to India team",
          "The most boring batter to watch but most valuable in Tests",
          "India's wall in Test cricket after Dravid retired"
        ]
      }
    ]
  },
  {
    "name": "PUJAR",
    "meta": {
      "shortened": true,
      "fullName": "Cheteshwar Pujara"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 21
      },
      {
        "nickname": "Pujara"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Famous for blocking balls for hours to tire out bowlers"
      },
      {
        "trivia": [
          "Faced nearly 1000 balls in one Australia series alone",
          "Got hit many times by fast bowlers and never flinched",
          "IPL teams never wanted him because he bats too slow",
          "Played county cricket to stay fit and get back to India team",
          "The most boring batter to watch but most valuable in Tests",
          "India's wall in Test cricket after Dravid retired"
        ]
      }
    ]
  },
  {
    "name": "HARDI",
    "meta": {
      "shortened": true,
      "fullName": "Hardik Pandya"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "jersey": 228
      },
      {
        "nickname": "Hardik"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Brother plays for India too and they both play IPL"
      },
      {
        "trivia": [
          "His younger brother also plays for India",
          "Has a son from his marriage to a Serbian actress",
          "Got booed by Mumbai fans after coming back to MI",
          "Captained Gujarat to IPL title in their very first season",
          "Bowled last over in World Cup final and defended it",
          "Power hitter and fast bowler for Mumbai Indians"
        ]
      }
    ]
  },
  {
    "name": "PANDY",
    "meta": {
      "shortened": true,
      "fullName": "Hardik Pandya"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "jersey": 228
      },
      {
        "nickname": "Hardik"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Brother plays for India too and they both play IPL"
      },
      {
        "trivia": [
          "His younger brother also plays for India",
          "Has a son from his marriage to a Serbian actress",
          "Got booed by Mumbai fans after coming back to MI",
          "Captained Gujarat to IPL title in their very first season",
          "Bowled last over in World Cup final and defended it",
          "Power hitter and fast bowler for Mumbai Indians"
        ]
      }
    ]
  },
  {
    "name": "SURYA",
    "meta": {
      "shortened": true,
      "fullName": "Suryakumar Yadav"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 63
      },
      {
        "nickname": "SKY"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Hits sixes in directions that seem physically impossible"
      },
      {
        "trivia": [
          "Hits behind the wicket for six which nobody else does",
          "Was ignored by selectors for years despite IPL form",
          "Best T20 batter in the world for two years straight",
          "Took a catch on the boundary that India will never forget",
          "Scores at over 180 strike rate regularly",
          "Mumbai Indians batter who bats like he plays a video game"
        ]
      }
    ]
  },
  {
    "name": "YADAV",
    "meta": {
      "shortened": false,
      "fullName": "Suryakumar Yadav"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 63
      },
      {
        "nickname": "SKY"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Hits sixes in directions that seem physically impossible"
      },
      {
        "trivia": [
          "Hits behind the wicket for six which nobody else does",
          "Was ignored by selectors for years despite IPL form",
          "Best T20 batter in the world for two years straight",
          "Took a catch on the boundary that India will never forget",
          "Scores at over 180 strike rate regularly",
          "Mumbai Indians batter who bats like he plays a video game"
        ]
      }
    ]
  },
  {
    "name": "MOHAM",
    "meta": {
      "shortened": true,
      "fullName": "Mohammed Shami"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Shami"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "His wife filed police case against him which was huge news"
      },
      {
        "trivia": [
          "Wife filed a police case against him and it was everywhere",
          "Took most wickets in the 2023 World Cup tournament",
          "Came back from injury and immediately took a hat trick",
          "Swings the ball both ways at high speed",
          "Always takes big wickets in important matches",
          "India's most dangerous seam bowler in World Cups"
        ]
      }
    ]
  },
  {
    "name": "SHAMI",
    "meta": {
      "shortened": false,
      "fullName": "Mohammed Shami"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Shami"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "His wife filed police case against him which was huge news"
      },
      {
        "trivia": [
          "Wife filed a police case against him and it was everywhere",
          "Took most wickets in the 2023 World Cup tournament",
          "Came back from injury and immediately took a hat trick",
          "Swings the ball both ways at high speed",
          "Always takes big wickets in important matches",
          "India's most dangerous seam bowler in World Cups"
        ]
      }
    ]
  },
  {
    "name": "RAVIC",
    "meta": {
      "shortened": true,
      "fullName": "Ravichandran Ashwin"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Kings XI Punjab",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 99
      },
      {
        "nickname": "Ash"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Retired from cricket suddenly in the middle of an overseas tour"
      },
      {
        "trivia": [
          "Announced retirement during Australia tour shocking everyone",
          "Made the Mankad dismissal famous and caused huge debate",
          "Plays chess and is considered one of cricket's smartest minds",
          "Has taken 700 plus international wickets total",
          "Spins the ball both ways and batters cannot read him",
          "India's best spinner in Test cricket for ten years"
        ]
      }
    ]
  },
  {
    "name": "ASHWI",
    "meta": {
      "shortened": true,
      "fullName": "Ravichandran Ashwin"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Kings XI Punjab",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 99
      },
      {
        "nickname": "Ash"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Retired from cricket suddenly in the middle of an overseas tour"
      },
      {
        "trivia": [
          "Announced retirement during Australia tour shocking everyone",
          "Made the Mankad dismissal famous and caused huge debate",
          "Plays chess and is considered one of cricket's smartest minds",
          "Has taken 700 plus international wickets total",
          "Spins the ball both ways and batters cannot read him",
          "India's best spinner in Test cricket for ten years"
        ]
      }
    ]
  },
  {
    "name": "ISHAN",
    "meta": {
      "shortened": false,
      "fullName": "Ishan Kishan"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 32
      },
      {
        "nickname": "IK"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Took a break from cricket for mental health reasons"
      },
      {
        "trivia": [
          "Took a long break from cricket saying he needed rest",
          "BCCI got angry at him for skipping domestic cricket",
          "Scored the second fastest double century in ODI history",
          "Explosive left-hand opener who hits sixes from ball one",
          "Often compared to Dhoni for his keeping and hitting",
          "Mumbai Indians keeper who can win matches alone"
        ]
      }
    ]
  },
  {
    "name": "KISHA",
    "meta": {
      "shortened": true,
      "fullName": "Ishan Kishan"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 32
      },
      {
        "nickname": "IK"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Took a break from cricket for mental health reasons"
      },
      {
        "trivia": [
          "Took a long break from cricket saying he needed rest",
          "BCCI got angry at him for skipping domestic cricket",
          "Scored the second fastest double century in ODI history",
          "Explosive left-hand opener who hits sixes from ball one",
          "Often compared to Dhoni for his keeping and hitting",
          "Mumbai Indians keeper who can win matches alone"
        ]
      }
    ]
  },
  {
    "name": "SANJU",
    "meta": {
      "shortened": false,
      "fullName": "Sanju Samson"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Sanju"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Waited years for India chance despite huge IPL scores"
      },
      {
        "trivia": [
          "Kept getting dropped from India despite scoring tons in IPL",
          "Scored a century on T20I debut for India",
          "Rajasthan captain who bats with a beautiful style",
          "From Kerala which is not a traditional cricket state",
          "Elegant right-hand batter who plays proper cricket shots",
          "Most underrated keeper-batter in India for years"
        ]
      }
    ]
  },
  {
    "name": "SAMSO",
    "meta": {
      "shortened": true,
      "fullName": "Sanju Samson"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Sanju"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Waited years for India chance despite huge IPL scores"
      },
      {
        "trivia": [
          "Kept getting dropped from India despite scoring tons in IPL",
          "Scored a century on T20I debut for India",
          "Rajasthan captain who bats with a beautiful style",
          "From Kerala which is not a traditional cricket state",
          "Elegant right-hand batter who plays proper cricket shots",
          "Most underrated keeper-batter in India for years"
        ]
      }
    ]
  },
  {
    "name": "RINKU",
    "meta": {
      "shortened": false,
      "fullName": "Rinku Singh"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Rinku"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit five sixes off five balls to win a match nobody thought was possible"
      },
      {
        "trivia": [
          "Family was very poor and cricket changed his life completely",
          "Hit five sixes in a row to win a match from nowhere",
          "Went viral all over the world after that finishing innings",
          "Cried after getting his India cap which moved everyone",
          "KKR's most dangerous finisher in death overs",
          "Left-hand batter who never gives up in any situation"
        ]
      }
    ]
  },
  {
    "name": "SINGH",
    "meta": {
      "shortened": false,
      "fullName": "Rinku Singh"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Rinku"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit five sixes off five balls to win a match nobody thought was possible"
      },
      {
        "trivia": [
          "Family was very poor and cricket changed his life completely",
          "Hit five sixes in a row to win a match from nowhere",
          "Went viral all over the world after that finishing innings",
          "Cried after getting his India cap which moved everyone",
          "KKR's most dangerous finisher in death overs",
          "Left-hand batter who never gives up in any situation"
        ]
      }
    ]
  },
  {
    "name": "TILAK",
    "meta": {
      "shortened": false,
      "fullName": "Tilak Varma"
    },
    "hints": [
      {
        "age": 22
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Tilak"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Youngest player to score two centuries in a row for India"
      },
      {
        "trivia": [
          "Scored two T20 centuries back to back which no young player has done",
          "From Hyderabad and supported by MI academy from a young age",
          "Very calm and mature for someone who is only 22 years old",
          "Plays spin bowling better than most senior India players",
          "Mumbai Indians most exciting young talent right now",
          "Left-hand middle order batter India is building around"
        ]
      }
    ]
  },
  {
    "name": "VARMA",
    "meta": {
      "shortened": false,
      "fullName": "Tilak Varma"
    },
    "hints": [
      {
        "age": 22
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Tilak"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Youngest player to score two centuries in a row for India"
      },
      {
        "trivia": [
          "Scored two T20 centuries back to back which no young player has done",
          "From Hyderabad and supported by MI academy from a young age",
          "Very calm and mature for someone who is only 22 years old",
          "Plays spin bowling better than most senior India players",
          "Mumbai Indians most exciting young talent right now",
          "Left-hand middle order batter India is building around"
        ]
      }
    ]
  },
  {
    "name": "YASHA",
    "meta": {
      "shortened": true,
      "fullName": "Yashasvi Jaiswal"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 24
      },
      {
        "nickname": "YJ"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Used to sell fruits on the streets of Mumbai to survive"
      },
      {
        "trivia": [
          "Slept in a tent at a cricket ground as a child with no home",
          "Sold pani puri on the streets to pay for cricket",
          "Scored most runs in a single Test series in England",
          "Hits sixes off the first ball like he has nothing to lose",
          "Rajasthan Royals opener who became India's Test opener",
          "One of the best young batters in the world right now"
        ]
      }
    ]
  },
  {
    "name": "JAISW",
    "meta": {
      "shortened": true,
      "fullName": "Yashasvi Jaiswal"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 24
      },
      {
        "nickname": "YJ"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Used to sell fruits on the streets of Mumbai to survive"
      },
      {
        "trivia": [
          "Slept in a tent at a cricket ground as a child with no home",
          "Sold pani puri on the streets to pay for cricket",
          "Scored most runs in a single Test series in England",
          "Hits sixes off the first ball like he has nothing to lose",
          "Rajasthan Royals opener who became India's Test opener",
          "One of the best young batters in the world right now"
        ]
      }
    ]
  },
  {
    "name": "SHUBM",
    "meta": {
      "shortened": true,
      "fullName": "Shubman Gill"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 77
      },
      {
        "nickname": "Shubman"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Rumoured to be dating a very famous Indian actress"
      },
      {
        "trivia": [
          "Rumoured to be in a relationship with a top Bollywood star",
          "Father trained him since childhood on a farm in Punjab",
          "Scored a double century in ODI cricket",
          "Won ICC ODI Cricketer of the Year at very young age",
          "Gujarat Titans captain and India's future batting star",
          "Most elegant young right-hand batter in India today"
        ]
      }
    ]
  },
  {
    "name": "GILL",
    "meta": {
      "shortened": false,
      "fullName": "Shubman Gill"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 77
      },
      {
        "nickname": "Shubman"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Rumoured to be dating a very famous Indian actress"
      },
      {
        "trivia": [
          "Rumoured to be in a relationship with a top Bollywood star",
          "Father trained him since childhood on a farm in Punjab",
          "Scored a double century in ODI cricket",
          "Won ICC ODI Cricketer of the Year at very young age",
          "Gujarat Titans captain and India's future batting star",
          "Most elegant young right-hand batter in India today"
        ]
      }
    ]
  },
  {
    "name": "DEEPA",
    "meta": {
      "shortened": true,
      "fullName": "Deepak Chahar"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 90
      },
      {
        "nickname": "Deepak"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Sister also plays cricket for India women's team"
      },
      {
        "trivia": [
          "His sister plays cricket for India women's team",
          "Proposed to his girlfriend on the field after a match",
          "Got injured just before big tournaments multiple times",
          "Swings the ball in the powerplay like nobody else",
          "Took a hat trick in T20 International cricket",
          "CSK's go-to powerplay bowler who also bats usefully"
        ]
      }
    ]
  },
  {
    "name": "CHAHA",
    "meta": {
      "shortened": true,
      "fullName": "Deepak Chahar"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 90
      },
      {
        "nickname": "Deepak"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Sister also plays cricket for India women's team"
      },
      {
        "trivia": [
          "His sister plays cricket for India women's team",
          "Proposed to his girlfriend on the field after a match",
          "Got injured just before big tournaments multiple times",
          "Swings the ball in the powerplay like nobody else",
          "Took a hat trick in T20 International cricket",
          "CSK's go-to powerplay bowler who also bats usefully"
        ]
      }
    ]
  },
  {
    "name": "KULDE",
    "meta": {
      "shortened": true,
      "fullName": "Kuldeep Yadav"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 23
      },
      {
        "nickname": "Kuldeep"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got ignored for years then came back to become India's best spinner"
      },
      {
        "trivia": [
          "Was dropped for two years and felt very low mentally",
          "Nobody can tell which way the ball will turn from his hand",
          "Left-arm spinner which is very rare in world cricket",
          "Took a hat trick vs Australia which went viral",
          "Best spinner in ODI cricket for India right now",
          "Delhi Capitals bowler who is very hard to read"
        ]
      }
    ]
  },
  {
    "name": "YADAV",
    "meta": {
      "shortened": false,
      "fullName": "Kuldeep Yadav"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 23
      },
      {
        "nickname": "Kuldeep"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got ignored for years then came back to become India's best spinner"
      },
      {
        "trivia": [
          "Was dropped for two years and felt very low mentally",
          "Nobody can tell which way the ball will turn from his hand",
          "Left-arm spinner which is very rare in world cricket",
          "Took a hat trick vs Australia which went viral",
          "Best spinner in ODI cricket for India right now",
          "Delhi Capitals bowler who is very hard to read"
        ]
      }
    ]
  },
  {
    "name": "ARSHD",
    "meta": {
      "shortened": true,
      "fullName": "Arshdeep Singh"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 2
      },
      {
        "nickname": "Arshdeep"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got brutally trolled online after dropping a catch in a big match"
      },
      {
        "trivia": [
          "Got massively trolled on social media for one dropped catch",
          "Wikipedia page was edited to say he is from Pakistan after the drop",
          "Handled the pressure and became India's best T20 bowler",
          "Takes the most wickets for India in T20 cricket now",
          "Swings ball in powerplay and bowls yorkers at the death",
          "Punjab Kings left-arm pacer and India's T20 attack leader"
        ]
      }
    ]
  },
  {
    "name": "SINGH",
    "meta": {
      "shortened": false,
      "fullName": "Arshdeep Singh"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 2
      },
      {
        "nickname": "Arshdeep"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got brutally trolled online after dropping a catch in a big match"
      },
      {
        "trivia": [
          "Got massively trolled on social media for one dropped catch",
          "Wikipedia page was edited to say he is from Pakistan after the drop",
          "Handled the pressure and became India's best T20 bowler",
          "Takes the most wickets for India in T20 cricket now",
          "Swings ball in powerplay and bowls yorkers at the death",
          "Punjab Kings left-arm pacer and India's T20 attack leader"
        ]
      }
    ]
  },
  {
    "name": "MOHAM",
    "meta": {
      "shortened": true,
      "fullName": "Mohammed Siraj"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Siraj"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Father passed away while he was on tour and he stayed for the team"
      },
      {
        "trivia": [
          "Father died during Australia tour but he stayed and did not go home",
          "Cried on the field and took five wickets on Test debut",
          "Most emotional cricket debut story in recent India history",
          "Gets very aggressive and pumped up after taking wickets",
          "Took most wickets for India in the 2023 World Cup",
          "RCB's best bowler who loves a fight with top batters"
        ]
      }
    ]
  },
  {
    "name": "SIRAJ",
    "meta": {
      "shortened": false,
      "fullName": "Mohammed Siraj"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Siraj"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Father passed away while he was on tour and he stayed for the team"
      },
      {
        "trivia": [
          "Father died during Australia tour but he stayed and did not go home",
          "Cried on the field and took five wickets on Test debut",
          "Most emotional cricket debut story in recent India history",
          "Gets very aggressive and pumped up after taking wickets",
          "Took most wickets for India in the 2023 World Cup",
          "RCB's best bowler who loves a fight with top batters"
        ]
      }
    ]
  },
  {
    "name": "AXAR",
    "meta": {
      "shortened": false,
      "fullName": "Axar Patel"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 20
      },
      {
        "nickname": "Axar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Takes wickets on pitches that spin so much it looks unfair"
      },
      {
        "trivia": [
          "Took 27 wickets in just three home Test matches",
          "Batsmen simply cannot read him on turning pitches",
          "Also hits useful runs when team is in trouble",
          "Very underrated and rarely gets the credit he deserves",
          "Delhi Capitals all-rounder who does everything quietly",
          "Left-arm spinner who makes batting look impossible at home"
        ]
      }
    ]
  },
  {
    "name": "PATEL",
    "meta": {
      "shortened": false,
      "fullName": "Axar Patel"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 20
      },
      {
        "nickname": "Axar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Takes wickets on pitches that spin so much it looks unfair"
      },
      {
        "trivia": [
          "Took 27 wickets in just three home Test matches",
          "Batsmen simply cannot read him on turning pitches",
          "Also hits useful runs when team is in trouble",
          "Very underrated and rarely gets the credit he deserves",
          "Delhi Capitals all-rounder who does everything quietly",
          "Left-arm spinner who makes batting look impossible at home"
        ]
      }
    ]
  },
  {
    "name": "RUTUR",
    "meta": {
      "shortened": true,
      "fullName": "Ruturaj Gaikwad"
    },
    "hints": [
      {
        "age": 28
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 31
      },
      {
        "nickname": "Rutu"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got COVID during IPL but came back and won the Orange Cap"
      },
      {
        "trivia": [
          "Got COVID and missed start of IPL then dominated anyway",
          "Scored most runs in an IPL season as Orange Cap winner",
          "CSK captain now after taking over from the legend",
          "Hit seven sixes in one over in a domestic match",
          "Elegant opener from Pune who plays textbook cricket",
          "Chennai's next captain after their greatest ever leader"
        ]
      }
    ]
  },
  {
    "name": "GAIKW",
    "meta": {
      "shortened": true,
      "fullName": "Ruturaj Gaikwad"
    },
    "hints": [
      {
        "age": 28
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 31
      },
      {
        "nickname": "Rutu"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got COVID during IPL but came back and won the Orange Cap"
      },
      {
        "trivia": [
          "Got COVID and missed start of IPL then dominated anyway",
          "Scored most runs in an IPL season as Orange Cap winner",
          "CSK captain now after taking over from the legend",
          "Hit seven sixes in one over in a domestic match",
          "Elegant opener from Pune who plays textbook cricket",
          "Chennai's next captain after their greatest ever leader"
        ]
      }
    ]
  },
  {
    "name": "DINES",
    "meta": {
      "shortened": true,
      "fullName": "Dinesh Karthik"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 19
      },
      {
        "nickname": "DK"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit a six off the last ball to win a final when nobody expected him to"
      },
      {
        "trivia": [
          "Got divorced and later married a professional squash player",
          "Reinvented himself as a finisher at age 37 and made India team",
          "Hit six off last ball to win a final that shocked everyone",
          "Now one of the best cricket commentators on TV",
          "Played international cricket across 17 years with big gaps",
          "Most reliable finisher in IPL history in death overs"
        ]
      }
    ]
  },
  {
    "name": "KARTH",
    "meta": {
      "shortened": true,
      "fullName": "Dinesh Karthik"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 19
      },
      {
        "nickname": "DK"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit a six off the last ball to win a final when nobody expected him to"
      },
      {
        "trivia": [
          "Got divorced and later married a professional squash player",
          "Reinvented himself as a finisher at age 37 and made India team",
          "Hit six off last ball to win a final that shocked everyone",
          "Now one of the best cricket commentators on TV",
          "Played international cricket across 17 years with big gaps",
          "Most reliable finisher in IPL history in death overs"
        ]
      }
    ]
  },
  {
    "name": "IRFAN",
    "meta": {
      "shortened": false,
      "fullName": "Irfan Pathan"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 21
      },
      {
        "nickname": "Irfan"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Him and his brother both played for India at the same time"
      },
      {
        "trivia": [
          "He and his brother both played for India together",
          "Married a Saudi model which was big news in India",
          "Took a hat trick in the first over of a Test match",
          "Was India's best swing bowler before injuries ruined it",
          "Brother Yusuf also played for India and IPL",
          "Left-arm swing bowler who was unstoppable early in career"
        ]
      }
    ]
  },
  {
    "name": "PATHA",
    "meta": {
      "shortened": true,
      "fullName": "Irfan Pathan"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 21
      },
      {
        "nickname": "Irfan"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Him and his brother both played for India at the same time"
      },
      {
        "trivia": [
          "He and his brother both played for India together",
          "Married a Saudi model which was big news in India",
          "Took a hat trick in the first over of a Test match",
          "Was India's best swing bowler before injuries ruined it",
          "Brother Yusuf also played for India and IPL",
          "Left-arm swing bowler who was unstoppable early in career"
        ]
      }
    ]
  },
  {
    "name": "VIRAT",
    "meta": {
      "shortened": false,
      "fullName": "Virat Kohli"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 18
      },
      {
        "nickname": "King"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Gets into verbal fights on the field and fans love him for it"
      },
      {
        "trivia": [
          "Has a tattoo on his arm that he rarely explains",
          "Obsessed with fitness and goes to gym even on rest days",
          "Became vegan and completely changed his diet",
          "Gets very aggressive with bowlers and fielders on the pitch",
          "Married Bollywood actress and had a daughter",
          "Most centuries in ODI cricket in the world"
        ]
      }
    ]
  },
  {
    "name": "KOHLI",
    "meta": {
      "shortened": false,
      "fullName": "Virat Kohli"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 18
      },
      {
        "nickname": "King"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Gets into verbal fights on the field and fans love him for it"
      },
      {
        "trivia": [
          "Has a tattoo on his arm that he rarely explains",
          "Obsessed with fitness and goes to gym even on rest days",
          "Became vegan and completely changed his diet",
          "Gets very aggressive with bowlers and fielders on the pitch",
          "Married Bollywood actress and had a daughter",
          "Most centuries in ODI cricket in the world"
        ]
      }
    ]
  },
  {
    "name": "ANIL",
    "meta": {
      "shortened": false,
      "fullName": "Anil Kumble"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Jumbo"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Bowled with his jaw broken and bandaged in a Test match"
      },
      {
        "trivia": [
          "Played with jaw completely broken just to help India win",
          "Took all ten wickets in one innings which almost never happens",
          "Called Jumbo because of his big personality and high bounce",
          "India's highest wicket taker in Test cricket ever",
          "Later became India head coach and had a fallout with players",
          "Leg spinner who was more accurate than any finger spinner"
        ]
      }
    ]
  },
  {
    "name": "KUMBL",
    "meta": {
      "shortened": true,
      "fullName": "Anil Kumble"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Jumbo"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Bowled with his jaw broken and bandaged in a Test match"
      },
      {
        "trivia": [
          "Played with jaw completely broken just to help India win",
          "Took all ten wickets in one innings which almost never happens",
          "Called Jumbo because of his big personality and high bounce",
          "India's highest wicket taker in Test cricket ever",
          "Later became India head coach and had a fallout with players",
          "Leg spinner who was more accurate than any finger spinner"
        ]
      }
    ]
  },
  {
    "name": "ZAHEE",
    "meta": {
      "shortened": true,
      "fullName": "Zaheer Khan"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Zak"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Left jelly beans on the cricket pitch to annoy England players"
      },
      {
        "trivia": [
          "Left jelly beans on the pitch to get into England's heads",
          "Married a Bollywood actress after retiring",
          "Was India's best swing bowler for over a decade",
          "Reverse swing at speed was his biggest weapon",
          "Played key role in India winning the 2011 World Cup",
          "Left-arm pacer who was brilliant in all conditions"
        ]
      }
    ]
  },
  {
    "name": "KHAN",
    "meta": {
      "shortened": false,
      "fullName": "Zaheer Khan"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Zak"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Left jelly beans on the cricket pitch to annoy England players"
      },
      {
        "trivia": [
          "Left jelly beans on the pitch to get into England's heads",
          "Married a Bollywood actress after retiring",
          "Was India's best swing bowler for over a decade",
          "Reverse swing at speed was his biggest weapon",
          "Played key role in India winning the 2011 World Cup",
          "Left-arm pacer who was brilliant in all conditions"
        ]
      }
    ]
  },
  {
    "name": "HARBH",
    "meta": {
      "shortened": true,
      "fullName": "Harbhajan Singh"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Chennai Super Kings",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Bhajji"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Slapped a teammate on the field during an IPL match and it was huge news"
      },
      {
        "trivia": [
          "Slapped a fellow Indian player during an IPL match on the field",
          "Was accused of racist abuse in Australia which caused big controversy",
          "Married a Punjabi actress in a lavish wedding",
          "Took the first hat trick by an Indian in Test cricket",
          "Spun India to victory in a famous series against Australia",
          "Off spinner called Turbanator who loved big occasions"
        ]
      }
    ]
  },
  {
    "name": "SINGH",
    "meta": {
      "shortened": false,
      "fullName": "Harbhajan Singh"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Chennai Super Kings",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 3
      },
      {
        "nickname": "Bhajji"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Slapped a teammate on the field during an IPL match and it was huge news"
      },
      {
        "trivia": [
          "Slapped a fellow Indian player during an IPL match on the field",
          "Was accused of racist abuse in Australia which caused big controversy",
          "Married a Punjabi actress in a lavish wedding",
          "Took the first hat trick by an Indian in Test cricket",
          "Spun India to victory in a famous series against Australia",
          "Off spinner called Turbanator who loved big occasions"
        ]
      }
    ]
  },
  {
    "name": "KAPIL",
    "meta": {
      "shortened": false,
      "fullName": "Kapil Dev"
    },
    "hints": [
      {
        "age": 65
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Haryana Hurricane"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored a massive hundred to save India when they were about to be knocked out of a World Cup"
      },
      {
        "trivia": [
          "Scored 175 with no TV cameras recording it to save India in 1983",
          "Cried on national TV during a match fixing scandal",
          "Led India to win their first ever World Cup as captain",
          "Was the best fast bowling all-rounder India ever produced",
          "Has a chain of chicken restaurants which is very popular",
          "India's greatest all-rounder who changed cricket forever"
        ]
      }
    ]
  },
  {
    "name": "DEV",
    "meta": {
      "shortened": false,
      "fullName": "Kapil Dev"
    },
    "hints": [
      {
        "age": 65
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Haryana Hurricane"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored a massive hundred to save India when they were about to be knocked out of a World Cup"
      },
      {
        "trivia": [
          "Scored 175 with no TV cameras recording it to save India in 1983",
          "Cried on national TV during a match fixing scandal",
          "Led India to win their first ever World Cup as captain",
          "Was the best fast bowling all-rounder India ever produced",
          "Has a chain of chicken restaurants which is very popular",
          "India's greatest all-rounder who changed cricket forever"
        ]
      }
    ]
  },
  {
    "name": "SUNIL",
    "meta": {
      "shortened": false,
      "fullName": "Sunil Gavaskar"
    },
    "hints": [
      {
        "age": 75
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Sunny"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "First batter in history to score 10000 Test runs"
      },
      {
        "trivia": [
          "Once walked out with his teammate instead of walking off when given out",
          "Wore a basic sponge as helmet against the fastest bowlers ever",
          "First man to score 10000 Test runs in history",
          "One of the best commentators on TV for 30 years after retiring",
          "Scored 34 Test centuries which was a world record at the time",
          "Little Master who dominated before cricket had helmets"
        ]
      }
    ]
  },
  {
    "name": "GAVAS",
    "meta": {
      "shortened": true,
      "fullName": "Sunil Gavaskar"
    },
    "hints": [
      {
        "age": 75
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Sunny"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "First batter in history to score 10000 Test runs"
      },
      {
        "trivia": [
          "Once walked out with his teammate instead of walking off when given out",
          "Wore a basic sponge as helmet against the fastest bowlers ever",
          "First man to score 10000 Test runs in history",
          "One of the best commentators on TV for 30 years after retiring",
          "Scored 34 Test centuries which was a world record at the time",
          "Little Master who dominated before cricket had helmets"
        ]
      }
    ]
  },
  {
    "name": "VVS",
    "meta": {
      "shortened": false,
      "fullName": "VVS Laxman"
    },
    "hints": [
      {
        "age": 50
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Deccan Chargers"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Very Very Special"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored one of the greatest innings in cricket history when India were almost out"
      },
      {
        "trivia": [
          "His initials VVS stand for Very Very Special and it fits perfectly",
          "Scored 281 when India were supposed to lose and changed the match",
          "Most elegant batsman to watch from India in his generation",
          "Partnership with Dravid in Kolkata 2001 is cricket legend",
          "Could play any bowler on any surface with ease",
          "The classiest Indian batsman alongside Dravid in the 2000s"
        ]
      }
    ]
  },
  {
    "name": "LAXMA",
    "meta": {
      "shortened": true,
      "fullName": "VVS Laxman"
    },
    "hints": [
      {
        "age": 50
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Deccan Chargers"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "India",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Very Very Special"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored one of the greatest innings in cricket history when India were almost out"
      },
      {
        "trivia": [
          "His initials VVS stand for Very Very Special and it fits perfectly",
          "Scored 281 when India were supposed to lose and changed the match",
          "Most elegant batsman to watch from India in his generation",
          "Partnership with Dravid in Kolkata 2001 is cricket legend",
          "Could play any bowler on any surface with ease",
          "The classiest Indian batsman alongside Dravid in the 2000s"
        ]
      }
    ]
  },
  {
    "name": "STEVE",
    "meta": {
      "shortened": false,
      "fullName": "Steve Smith"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals",
          "Rising Pune Supergiant"
        ]
      },
      {
        "jersey": 49
      },
      {
        "nickname": "Smudge"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got banned from cricket for one year for cheating with sandpaper"
      },
      {
        "trivia": [
          "Was caught in a sandpaper ball tampering scandal in South Africa",
          "Cried in a press conference after the ban and people felt for him",
          "Came back and scored runs like nothing happened",
          "Has the most unusual fidgety batting technique you will ever see",
          "Averaged over 60 in Tests which only the greatest manage",
          "Best Test batter in the world after Kohli retired from Tests"
        ]
      }
    ]
  },
  {
    "name": "SMITH",
    "meta": {
      "shortened": false,
      "fullName": "Steve Smith"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals",
          "Rising Pune Supergiant"
        ]
      },
      {
        "jersey": 49
      },
      {
        "nickname": "Smudge"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got banned from cricket for one year for cheating with sandpaper"
      },
      {
        "trivia": [
          "Was caught in a sandpaper ball tampering scandal in South Africa",
          "Cried in a press conference after the ban and people felt for him",
          "Came back and scored runs like nothing happened",
          "Has the most unusual fidgety batting technique you will ever see",
          "Averaged over 60 in Tests which only the greatest manage",
          "Best Test batter in the world after Kohli retired from Tests"
        ]
      }
    ]
  },
  {
    "name": "DAVID",
    "meta": {
      "shortened": false,
      "fullName": "David Warner"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 31
      },
      {
        "nickname": "Bull"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got banned for a year and came back to score runs like before"
      },
      {
        "trivia": [
          "Was banned from cricket for carrying sandpaper onto the field",
          "Wife is a famous Australian actress and ironwoman",
          "Did a TikTok dance in a saree that went globally viral",
          "Very aggressive opener who fights with anyone on the field",
          "Scored over 5000 Test runs and 22 ODI centuries",
          "Explosive left-hand opener who feared no one on earth"
        ]
      }
    ]
  },
  {
    "name": "WARNE",
    "meta": {
      "shortened": true,
      "fullName": "David Warner"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 31
      },
      {
        "nickname": "Bull"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got banned for a year and came back to score runs like before"
      },
      {
        "trivia": [
          "Was banned from cricket for carrying sandpaper onto the field",
          "Wife is a famous Australian actress and ironwoman",
          "Did a TikTok dance in a saree that went globally viral",
          "Very aggressive opener who fights with anyone on the field",
          "Scored over 5000 Test runs and 22 ODI centuries",
          "Explosive left-hand opener who feared no one on earth"
        ]
      }
    ]
  },
  {
    "name": "PAT",
    "meta": {
      "shortened": false,
      "fullName": "Pat Cummins"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 30
      },
      {
        "nickname": "Patty"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Became Australia's captain and the most expensive overseas IPL player at the same time"
      },
      {
        "trivia": [
          "Captain of Australia and bought for record price in IPL",
          "Was injured for four years early in career and came back stronger",
          "Writes a column and is one of cricket's most articulate players",
          "Led Australia to ODI World Cup win in India of all places",
          "Consistently bowls over 145kmh in long spells",
          "Best fast bowler and captain in the world right now"
        ]
      }
    ]
  },
  {
    "name": "CUMMI",
    "meta": {
      "shortened": true,
      "fullName": "Pat Cummins"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 30
      },
      {
        "nickname": "Patty"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Became Australia's captain and the most expensive overseas IPL player at the same time"
      },
      {
        "trivia": [
          "Captain of Australia and bought for record price in IPL",
          "Was injured for four years early in career and came back stronger",
          "Writes a column and is one of cricket's most articulate players",
          "Led Australia to ODI World Cup win in India of all places",
          "Consistently bowls over 145kmh in long spells",
          "Best fast bowler and captain in the world right now"
        ]
      }
    ]
  },
  {
    "name": "RICKY",
    "meta": {
      "shortened": false,
      "fullName": "Ricky Ponting"
    },
    "hints": [
      {
        "age": 50
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 14
      },
      {
        "nickname": "Punter"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Won three consecutive World Cups which no other captain has done"
      },
      {
        "trivia": [
          "Nicknamed Punter because he loved gambling as a young man",
          "Got into a fight at a nightclub early in his career",
          "Won three World Cups as player and captain",
          "Was the most feared batter in the world for ten years",
          "Scored 13000 plus Test runs and 28 centuries",
          "Greatest Australian captain and batter of modern cricket"
        ]
      }
    ]
  },
  {
    "name": "PONTI",
    "meta": {
      "shortened": true,
      "fullName": "Ricky Ponting"
    },
    "hints": [
      {
        "age": 50
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 14
      },
      {
        "nickname": "Punter"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Won three consecutive World Cups which no other captain has done"
      },
      {
        "trivia": [
          "Nicknamed Punter because he loved gambling as a young man",
          "Got into a fight at a nightclub early in his career",
          "Won three World Cups as player and captain",
          "Was the most feared batter in the world for ten years",
          "Scored 13000 plus Test runs and 28 centuries",
          "Greatest Australian captain and batter of modern cricket"
        ]
      }
    ]
  },
  {
    "name": "SHANE",
    "meta": {
      "shortened": false,
      "fullName": "Shane Warne"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 23
      },
      {
        "nickname": "Warnie"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Had more celebrity scandals off the field than wickets on it"
      },
      {
        "trivia": [
          "Had multiple affairs and scandals throughout his career",
          "Ate only baked beans and pizza during one Ashes tour",
          "Took 708 Test wickets which may never be beaten",
          "First ball in Ashes spun impossibly and batsman had no idea",
          "Led Rajasthan Royals to IPL title in the first ever IPL",
          "Died suddenly in 2022 and cricket was in shock for weeks"
        ]
      }
    ]
  },
  {
    "name": "WARNE",
    "meta": {
      "shortened": false,
      "fullName": "Shane Warne"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 23
      },
      {
        "nickname": "Warnie"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Had more celebrity scandals off the field than wickets on it"
      },
      {
        "trivia": [
          "Had multiple affairs and scandals throughout his career",
          "Ate only baked beans and pizza during one Ashes tour",
          "Took 708 Test wickets which may never be beaten",
          "First ball in Ashes spun impossibly and batsman had no idea",
          "Led Rajasthan Royals to IPL title in the first ever IPL",
          "Died suddenly in 2022 and cricket was in shock for weeks"
        ]
      }
    ]
  },
  {
    "name": "ADAM",
    "meta": {
      "shortened": false,
      "fullName": "Adam Gilchrist"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Australia",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Gilly"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Walked off the field without waiting for umpire's decision when he knew he was out"
      },
      {
        "trivia": [
          "Walked without waiting for umpire when he edged it which shocked everyone",
          "Scored the fastest World Cup Final century ever in 57 balls",
          "Changed how wicket keepers bat forever across all formats",
          "Won three World Cups with Australia as their keeper",
          "Destroyed bowlers from ball one with brutal left-hand hitting",
          "Greatest wicket keeper batter cricket has ever seen"
        ]
      }
    ]
  },
  {
    "name": "GILCH",
    "meta": {
      "shortened": true,
      "fullName": "Adam Gilchrist"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Australia",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Gilly"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Walked off the field without waiting for umpire's decision when he knew he was out"
      },
      {
        "trivia": [
          "Walked without waiting for umpire when he edged it which shocked everyone",
          "Scored the fastest World Cup Final century ever in 57 balls",
          "Changed how wicket keepers bat forever across all formats",
          "Won three World Cups with Australia as their keeper",
          "Destroyed bowlers from ball one with brutal left-hand hitting",
          "Greatest wicket keeper batter cricket has ever seen"
        ]
      }
    ]
  },
  {
    "name": "MITCH",
    "meta": {
      "shortened": true,
      "fullName": "Mitchell Starc"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "jersey": 56
      },
      {
        "nickname": "Starc"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bought for the highest price ever in IPL history and then barely played"
      },
      {
        "trivia": [
          "Bought for massive IPL price and then played very few matches",
          "Married Australian women's cricket captain",
          "Best bowler in two different World Cups both of which Australia won",
          "Yorkers at 150kmh in death overs are almost unplayable",
          "Left-arm fast bowler who is most dangerous in big matches",
          "Australia's most important bowler in World Cup cricket"
        ]
      }
    ]
  },
  {
    "name": "STARC",
    "meta": {
      "shortened": false,
      "fullName": "Mitchell Starc"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "jersey": 56
      },
      {
        "nickname": "Starc"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bought for the highest price ever in IPL history and then barely played"
      },
      {
        "trivia": [
          "Bought for massive IPL price and then played very few matches",
          "Married Australian women's cricket captain",
          "Best bowler in two different World Cups both of which Australia won",
          "Yorkers at 150kmh in death overs are almost unplayable",
          "Left-arm fast bowler who is most dangerous in big matches",
          "Australia's most important bowler in World Cup cricket"
        ]
      }
    ]
  },
  {
    "name": "TRAVI",
    "meta": {
      "shortened": true,
      "fullName": "Travis Head"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 35
      },
      {
        "nickname": "Heady"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Won two ICC finals in the same year and was Man of Match in both"
      },
      {
        "trivia": [
          "Was Man of the Match in both the WTC Final and World Cup Final same year",
          "India had no answer for him in big matches at all",
          "Left-hand opener who loves performing in the biggest games",
          "Sunrisers Hyderabad batter who dominated IPL 2024",
          "Very aggressive style that takes the game away quickly",
          "Australia's most dangerous batter in ICC tournaments now"
        ]
      }
    ]
  },
  {
    "name": "HEAD",
    "meta": {
      "shortened": false,
      "fullName": "Travis Head"
    },
    "hints": [
      {
        "age": 31
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 35
      },
      {
        "nickname": "Heady"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Won two ICC finals in the same year and was Man of Match in both"
      },
      {
        "trivia": [
          "Was Man of the Match in both the WTC Final and World Cup Final same year",
          "India had no answer for him in big matches at all",
          "Left-hand opener who loves performing in the biggest games",
          "Sunrisers Hyderabad batter who dominated IPL 2024",
          "Very aggressive style that takes the game away quickly",
          "Australia's most dangerous batter in ICC tournaments now"
        ]
      }
    ]
  },
  {
    "name": "MATTH",
    "meta": {
      "shortened": true,
      "fullName": "Matthew Hayden"
    },
    "hints": [
      {
        "age": 53
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Haydos"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Broke the world Test record score and loved fishing and cooking as much as batting"
      },
      {
        "trivia": [
          "Scored 380 in a Test match which was the world record at the time",
          "Deeply religious and very passionate about his faith",
          "Loves cooking and fishing and has a cookbook",
          "Opened batting with another opener who smashed everything",
          "Massive left-hand opener who hit the ball as hard as anyone",
          "Part of the greatest Australian batting lineup ever"
        ]
      }
    ]
  },
  {
    "name": "HAYDE",
    "meta": {
      "shortened": true,
      "fullName": "Matthew Hayden"
    },
    "hints": [
      {
        "age": 53
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Australia",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Haydos"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Broke the world Test record score and loved fishing and cooking as much as batting"
      },
      {
        "trivia": [
          "Scored 380 in a Test match which was the world record at the time",
          "Deeply religious and very passionate about his faith",
          "Loves cooking and fishing and has a cookbook",
          "Opened batting with another opener who smashed everything",
          "Massive left-hand opener who hit the ball as hard as anyone",
          "Part of the greatest Australian batting lineup ever"
        ]
      }
    ]
  },
  {
    "name": "MITCH",
    "meta": {
      "shortened": true,
      "fullName": "Mitchell Johnson"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "jersey": 44
      },
      {
        "nickname": "Mitch"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Grew a moustache that became more famous than his bowling action"
      },
      {
        "trivia": [
          "His moustache became the most famous thing about him globally",
          "Destroyed England in one Ashes series taking 37 wickets",
          "England batters were genuinely scared of facing him",
          "Won ICC Cricketer of Year twice for his performances",
          "Retired very suddenly while still bowling well",
          "Left-arm fast bowler who was terrifying when on form"
        ]
      }
    ]
  },
  {
    "name": "JOHNS",
    "meta": {
      "shortened": true,
      "fullName": "Mitchell Johnson"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "jersey": 44
      },
      {
        "nickname": "Mitch"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Grew a moustache that became more famous than his bowling action"
      },
      {
        "trivia": [
          "His moustache became the most famous thing about him globally",
          "Destroyed England in one Ashes series taking 37 wickets",
          "England batters were genuinely scared of facing him",
          "Won ICC Cricketer of Year twice for his performances",
          "Retired very suddenly while still bowling well",
          "Left-arm fast bowler who was terrifying when on form"
        ]
      }
    ]
  },
  {
    "name": "GLENN",
    "meta": {
      "shortened": false,
      "fullName": "Glenn McGrath"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Pigeon"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Would predict exactly how many wickets he would take before each series and he was right"
      },
      {
        "trivia": [
          "Nicknamed Pigeon because his legs were very thin and skinny",
          "Predicted his wicket tallies before series and was always right",
          "Wife passed away from cancer and he raised awareness for it",
          "Dismissed one batter eight times in Test cricket alone",
          "Never bowled a bad ball it seemed for his entire career",
          "Took 563 Test wickets at the best average of any fast bowler"
        ]
      }
    ]
  },
  {
    "name": "MCGRA",
    "meta": {
      "shortened": true,
      "fullName": "Glenn McGrath"
    },
    "hints": [
      {
        "age": 54
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Pigeon"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Would predict exactly how many wickets he would take before each series and he was right"
      },
      {
        "trivia": [
          "Nicknamed Pigeon because his legs were very thin and skinny",
          "Predicted his wicket tallies before series and was always right",
          "Wife passed away from cancer and he raised awareness for it",
          "Dismissed one batter eight times in Test cricket alone",
          "Never bowled a bad ball it seemed for his entire career",
          "Took 563 Test wickets at the best average of any fast bowler"
        ]
      }
    ]
  },
  {
    "name": "JOSH",
    "meta": {
      "shortened": false,
      "fullName": "Josh Hazlewood"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 38
      },
      {
        "nickname": "Hazy"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hits the same spot on the pitch every single ball without fail"
      },
      {
        "trivia": [
          "So accurate that batsmen say he hits same spot every ball",
          "Very quiet and calm person who lets his bowling do the talking",
          "Part of the most feared fast bowling trio in world cricket",
          "Brilliant in English conditions which is hard for Australians",
          "Won World Cup and WTC Final as part of Australia's pace attack",
          "Right-arm pacer who is the most consistent in Australia's team"
        ]
      }
    ]
  },
  {
    "name": "HAZLE",
    "meta": {
      "shortened": true,
      "fullName": "Josh Hazlewood"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Australia",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 38
      },
      {
        "nickname": "Hazy"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hits the same spot on the pitch every single ball without fail"
      },
      {
        "trivia": [
          "So accurate that batsmen say he hits same spot every ball",
          "Very quiet and calm person who lets his bowling do the talking",
          "Part of the most feared fast bowling trio in world cricket",
          "Brilliant in English conditions which is hard for Australians",
          "Won World Cup and WTC Final as part of Australia's pace attack",
          "Right-arm pacer who is the most consistent in Australia's team"
        ]
      }
    ]
  },
  {
    "name": "CAMER",
    "meta": {
      "shortened": true,
      "fullName": "Cameron Green"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Greeny"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bought for a massive IPL price to open batting as a batter who was never an opener"
      },
      {
        "trivia": [
          "MI bought him to open the batting which he had never done before",
          "Has very long arms and unusual build which generates natural pace",
          "Tall right-hand all-rounder who hits massive sixes",
          "Test hundreds showed he is class at the highest level",
          "One of Australia's brightest young all-round talents",
          "Fast bowler who bats explosively at the top of the order"
        ]
      }
    ]
  },
  {
    "name": "GREEN",
    "meta": {
      "shortened": false,
      "fullName": "Cameron Green"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "Australia"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Greeny"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bought for a massive IPL price to open batting as a batter who was never an opener"
      },
      {
        "trivia": [
          "MI bought him to open the batting which he had never done before",
          "Has very long arms and unusual build which generates natural pace",
          "Tall right-hand all-rounder who hits massive sixes",
          "Test hundreds showed he is class at the highest level",
          "One of Australia's brightest young all-round talents",
          "Fast bowler who bats explosively at the top of the order"
        ]
      }
    ]
  },
  {
    "name": "JOE",
    "meta": {
      "shortened": false,
      "fullName": "Joe Root"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 66
      },
      {
        "nickname": "Rooty"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "England's best ever Test batter who keeps breaking records quietly"
      },
      {
        "trivia": [
          "Very quiet and boring personality off the field",
          "Eats anything and everything which teammates find funny",
          "Has scored more Test runs than any other England batter ever",
          "Scored a hundred in his 100th Test match which was perfect",
          "One of only four batters in the world considered truly elite",
          "England right-hand batter who makes batting look very simple"
        ]
      }
    ]
  },
  {
    "name": "ROOT",
    "meta": {
      "shortened": false,
      "fullName": "Joe Root"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 66
      },
      {
        "nickname": "Rooty"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "England's best ever Test batter who keeps breaking records quietly"
      },
      {
        "trivia": [
          "Very quiet and boring personality off the field",
          "Eats anything and everything which teammates find funny",
          "Has scored more Test runs than any other England batter ever",
          "Scored a hundred in his 100th Test match which was perfect",
          "One of only four batters in the world considered truly elite",
          "England right-hand batter who makes batting look very simple"
        ]
      }
    ]
  },
  {
    "name": "BEN",
    "meta": {
      "shortened": false,
      "fullName": "Ben Stokes"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 55
      },
      {
        "nickname": "Stokesy"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Was arrested outside a nightclub and then came back to win a World Cup"
      },
      {
        "trivia": [
          "Got arrested outside a Bristol nightclub and faced a court case",
          "Won the court case and came back to win the World Cup",
          "Hit 84 not out in a World Cup Final Super Over situation",
          "Scored 135 not out when England needed 73 with two wickets left",
          "Retired from ODIs to save his body for Tests",
          "Best all-rounder in the world and England's greatest modern player"
        ]
      }
    ]
  },
  {
    "name": "STOKE",
    "meta": {
      "shortened": true,
      "fullName": "Ben Stokes"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 55
      },
      {
        "nickname": "Stokesy"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Was arrested outside a nightclub and then came back to win a World Cup"
      },
      {
        "trivia": [
          "Got arrested outside a Bristol nightclub and faced a court case",
          "Won the court case and came back to win the World Cup",
          "Hit 84 not out in a World Cup Final Super Over situation",
          "Scored 135 not out when England needed 73 with two wickets left",
          "Retired from ODIs to save his body for Tests",
          "Best all-rounder in the world and England's greatest modern player"
        ]
      }
    ]
  },
  {
    "name": "JAMES",
    "meta": {
      "shortened": false,
      "fullName": "James Anderson"
    },
    "hints": [
      {
        "age": 42
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Jimmy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Kept taking wickets for England well into his 40s when others retire at 35"
      },
      {
        "trivia": [
          "Took more Test wickets than any fast bowler in history",
          "Still played Test cricket in his early 40s which is incredible",
          "His swing in English conditions makes batters look like beginners",
          "Very funny and sarcastic on social media regularly",
          "Best bowling partnership with another England pacer for 15 years",
          "The greatest swing bowler cricket has ever produced"
        ]
      }
    ]
  },
  {
    "name": "ANDER",
    "meta": {
      "shortened": true,
      "fullName": "James Anderson"
    },
    "hints": [
      {
        "age": 42
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 9
      },
      {
        "nickname": "Jimmy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Kept taking wickets for England well into his 40s when others retire at 35"
      },
      {
        "trivia": [
          "Took more Test wickets than any fast bowler in history",
          "Still played Test cricket in his early 40s which is incredible",
          "His swing in English conditions makes batters look like beginners",
          "Very funny and sarcastic on social media regularly",
          "Best bowling partnership with another England pacer for 15 years",
          "The greatest swing bowler cricket has ever produced"
        ]
      }
    ]
  },
  {
    "name": "STUAR",
    "meta": {
      "shortened": true,
      "fullName": "Stuart Broad"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 8
      },
      {
        "nickname": "Broady"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got hit for six sixes in one over early in career and became better because of it"
      },
      {
        "trivia": [
          "Got hit for six sixes in one over and it haunted him for years",
          "Came back from that to take 600 plus Test wickets for England",
          "Father was also an England cricket player",
          "Retired on the highest possible note winning an Ashes Test",
          "Dismissed one famous batter the same way over and over again",
          "Right-arm pacer who was best with James Anderson for England"
        ]
      }
    ]
  },
  {
    "name": "BROAD",
    "meta": {
      "shortened": false,
      "fullName": "Stuart Broad"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 8
      },
      {
        "nickname": "Broady"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got hit for six sixes in one over early in career and became better because of it"
      },
      {
        "trivia": [
          "Got hit for six sixes in one over and it haunted him for years",
          "Came back from that to take 600 plus Test wickets for England",
          "Father was also an England cricket player",
          "Retired on the highest possible note winning an Ashes Test",
          "Dismissed one famous batter the same way over and over again",
          "Right-arm pacer who was best with James Anderson for England"
        ]
      }
    ]
  },
  {
    "name": "KEVIN",
    "meta": {
      "shortened": false,
      "fullName": "Kevin Pietersen"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 24
      },
      {
        "nickname": "KP"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got sacked by England after it came out he was texting the opposition"
      },
      {
        "trivia": [
          "Was sacked by England for texting the South Africa team secrets",
          "Born in South Africa but played for England after qualifying",
          "Had a massive ego which teammates found very difficult",
          "Invented a shot called the switch hit that nobody had seen before",
          "Was one of the most entertaining batters on the planet",
          "Best England batter in big matches for almost a decade"
        ]
      }
    ]
  },
  {
    "name": "PIETE",
    "meta": {
      "shortened": true,
      "fullName": "Kevin Pietersen"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 24
      },
      {
        "nickname": "KP"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Got sacked by England after it came out he was texting the opposition"
      },
      {
        "trivia": [
          "Was sacked by England for texting the South Africa team secrets",
          "Born in South Africa but played for England after qualifying",
          "Had a massive ego which teammates found very difficult",
          "Invented a shot called the switch hit that nobody had seen before",
          "Was one of the most entertaining batters on the planet",
          "Best England batter in big matches for almost a decade"
        ]
      }
    ]
  },
  {
    "name": "JOFRA",
    "meta": {
      "shortened": false,
      "fullName": "Jofra Archer"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "England",
          "Rajasthan Royals",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Jofra"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bowled the most important over in a World Cup Final Super Over"
      },
      {
        "trivia": [
          "Born in Barbados and qualified for England through his dad",
          "Injured himself so many times fans started to expect it",
          "Bowled the Super Over that won England the World Cup",
          "Hit Steve Smith on the head with a 157kmh bouncer",
          "Pure pace that very few in the world can generate naturally",
          "England's most exciting bowler when he is fit and playing"
        ]
      }
    ]
  },
  {
    "name": "ARCHE",
    "meta": {
      "shortened": true,
      "fullName": "Jofra Archer"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "England",
          "Rajasthan Royals",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Jofra"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Bowled the most important over in a World Cup Final Super Over"
      },
      {
        "trivia": [
          "Born in Barbados and qualified for England through his dad",
          "Injured himself so many times fans started to expect it",
          "Bowled the Super Over that won England the World Cup",
          "Hit Steve Smith on the head with a 157kmh bouncer",
          "Pure pace that very few in the world can generate naturally",
          "England's most exciting bowler when he is fit and playing"
        ]
      }
    ]
  },
  {
    "name": "ANDRE",
    "meta": {
      "shortened": true,
      "fullName": "Andrew Flintoff"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Freddie"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Went to console the opposing bowler after England won a Test by just two runs"
      },
      {
        "trivia": [
          "Consoled the crying opponent after England barely won the match",
          "Had serious problems with alcohol during his playing days",
          "Won the 2005 Ashes which is the most famous England cricket moment",
          "Had a very serious crash filming a TV show after retirement",
          "Became cricket coach for England after his accident recovery",
          "Best all-rounder England produced in the modern era"
        ]
      }
    ]
  },
  {
    "name": "FLINT",
    "meta": {
      "shortened": true,
      "fullName": "Andrew Flintoff"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Freddie"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Went to console the opposing bowler after England won a Test by just two runs"
      },
      {
        "trivia": [
          "Consoled the crying opponent after England barely won the match",
          "Had serious problems with alcohol during his playing days",
          "Won the 2005 Ashes which is the most famous England cricket moment",
          "Had a very serious crash filming a TV show after retirement",
          "Became cricket coach for England after his accident recovery",
          "Best all-rounder England produced in the modern era"
        ]
      }
    ]
  },
  {
    "name": "JONNY",
    "meta": {
      "shortened": false,
      "fullName": "Jonny Bairstow"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "England",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 51
      },
      {
        "nickname": "Bluey"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got out in a very unusual way walking between overs which caused massive controversy"
      },
      {
        "trivia": [
          "Got stumped while walking casually between deliveries and caused huge row",
          "Father was also England cricketer who took his own life",
          "Carries his dad's memory as motivation every single match",
          "Smashed 150 off 100 balls multiple times in Test cricket",
          "Transformed from keeper to pure batsman in Test cricket",
          "England right-hand batter who hits the ball extremely hard"
        ]
      }
    ]
  },
  {
    "name": "BAIRS",
    "meta": {
      "shortened": true,
      "fullName": "Jonny Bairstow"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "England",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 51
      },
      {
        "nickname": "Bluey"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Got out in a very unusual way walking between overs which caused massive controversy"
      },
      {
        "trivia": [
          "Got stumped while walking casually between deliveries and caused huge row",
          "Father was also England cricketer who took his own life",
          "Carries his dad's memory as motivation every single match",
          "Smashed 150 off 100 balls multiple times in Test cricket",
          "Transformed from keeper to pure batsman in Test cricket",
          "England right-hand batter who hits the ball extremely hard"
        ]
      }
    ]
  },
  {
    "name": "HARRY",
    "meta": {
      "shortened": false,
      "fullName": "Harry Brook"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 99
      },
      {
        "nickname": "Brooky"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Scored over 300 runs in a single Test innings at just 24 years old"
      },
      {
        "trivia": [
          "Scored 317 in one Test innings at an age when most are still learning",
          "Very confident and sometimes seen as overconfident by critics",
          "Plays short balls better than any England batter in recent times",
          "Part of England's fearless and aggressive Test cricket style",
          "Yorkshire batter seen as future England captain",
          "Right-hand batter who hits the ball with great power and timing"
        ]
      }
    ]
  },
  {
    "name": "BROOK",
    "meta": {
      "shortened": false,
      "fullName": "Harry Brook"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "England"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "jersey": 99
      },
      {
        "nickname": "Brooky"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Scored over 300 runs in a single Test innings at just 24 years old"
      },
      {
        "trivia": [
          "Scored 317 in one Test innings at an age when most are still learning",
          "Very confident and sometimes seen as overconfident by critics",
          "Plays short balls better than any England batter in recent times",
          "Part of England's fearless and aggressive Test cricket style",
          "Yorkshire batter seen as future England captain",
          "Right-hand batter who hits the ball with great power and timing"
        ]
      }
    ]
  },
  {
    "name": "CHRIS",
    "meta": {
      "shortened": false,
      "fullName": "Chris Gayle"
    },
    "hints": [
      {
        "age": 45
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "West Indies",
          "Royal Challengers Bengaluru",
          "Kings XI Punjab",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 333
      },
      {
        "nickname": "Universe Boss"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Calls himself Universe Boss and nobody argues with him about it"
      },
      {
        "trivia": [
          "Called himself Universe Boss and made it his actual brand",
          "Proposed to a presenter on live TV during an interview",
          "Scored 175 off 66 balls in IPL which is the highest score ever",
          "Only man to score triple century in Tests and T20 century",
          "Wore the biggest smile while destroying bowling attacks",
          "Left-hand opener who hit more T20 sixes than anyone alive"
        ]
      }
    ]
  },
  {
    "name": "GAYLE",
    "meta": {
      "shortened": false,
      "fullName": "Chris Gayle"
    },
    "hints": [
      {
        "age": 45
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "West Indies",
          "Royal Challengers Bengaluru",
          "Kings XI Punjab",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 333
      },
      {
        "nickname": "Universe Boss"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Calls himself Universe Boss and nobody argues with him about it"
      },
      {
        "trivia": [
          "Called himself Universe Boss and made it his actual brand",
          "Proposed to a presenter on live TV during an interview",
          "Scored 175 off 66 balls in IPL which is the highest score ever",
          "Only man to score triple century in Tests and T20 century",
          "Wore the biggest smile while destroying bowling attacks",
          "Left-hand opener who hit more T20 sixes than anyone alive"
        ]
      }
    ]
  },
  {
    "name": "BRIAN",
    "meta": {
      "shortened": false,
      "fullName": "Brian Lara"
    },
    "hints": [
      {
        "age": 55
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Prince of Trinidad"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Holds the highest score in both Test cricket and first class cricket"
      },
      {
        "trivia": [
          "Scored 400 not out in a Test which is the highest ever",
          "Also scored 501 not out in county cricket which is also highest ever",
          "Had the record taken away and then took it back again",
          "Carried West Indies cricket almost alone for many years",
          "Prince of Trinidad who was worshipped in the Caribbean",
          "Greatest left-hand batter cricket has ever produced"
        ]
      }
    ]
  },
  {
    "name": "LARA",
    "meta": {
      "shortened": false,
      "fullName": "Brian Lara"
    },
    "hints": [
      {
        "age": 55
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Prince of Trinidad"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Holds the highest score in both Test cricket and first class cricket"
      },
      {
        "trivia": [
          "Scored 400 not out in a Test which is the highest ever",
          "Also scored 501 not out in county cricket which is also highest ever",
          "Had the record taken away and then took it back again",
          "Carried West Indies cricket almost alone for many years",
          "Prince of Trinidad who was worshipped in the Caribbean",
          "Greatest left-hand batter cricket has ever produced"
        ]
      }
    ]
  },
  {
    "name": "KIERO",
    "meta": {
      "shortened": true,
      "fullName": "Kieron Pollard"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Mumbai Indians",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 55
      },
      {
        "nickname": "Polly"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit six sixes in one over in T20 international cricket"
      },
      {
        "trivia": [
          "Very large and powerful man who hits ball enormous distances",
          "Hit six sixes in a row in T20 International cricket",
          "Mumbai Indians trusted him in every big match for years",
          "One of the best fielders at slip for such a big man",
          "Won multiple IPL titles as a key player for Mumbai",
          "West Indies all-rounder who was the best T20 finisher for years"
        ]
      }
    ]
  },
  {
    "name": "POLLA",
    "meta": {
      "shortened": true,
      "fullName": "Kieron Pollard"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Mumbai Indians",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 55
      },
      {
        "nickname": "Polly"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Hit six sixes in one over in T20 international cricket"
      },
      {
        "trivia": [
          "Very large and powerful man who hits ball enormous distances",
          "Hit six sixes in a row in T20 International cricket",
          "Mumbai Indians trusted him in every big match for years",
          "One of the best fielders at slip for such a big man",
          "Won multiple IPL titles as a key player for Mumbai",
          "West Indies all-rounder who was the best T20 finisher for years"
        ]
      }
    ]
  },
  {
    "name": "ANDRE",
    "meta": {
      "shortened": false,
      "fullName": "Andre Russell"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Dre Russ"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Built his body to look like a superhero and hits sixes to match"
      },
      {
        "trivia": [
          "Has the most muscular body in cricket history by far",
          "Was banned from cricket for missing doping tests",
          "Came back from ban and became IPL's most feared hitter",
          "Scored 88 off 36 balls including 13 sixes in one IPL match",
          "Hits sixes from any ball in any direction effortlessly",
          "KKR all-rounder who can win any match single-handedly"
        ]
      }
    ]
  },
  {
    "name": "RUSSE",
    "meta": {
      "shortened": true,
      "fullName": "Andre Russell"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Dre Russ"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Built his body to look like a superhero and hits sixes to match"
      },
      {
        "trivia": [
          "Has the most muscular body in cricket history by far",
          "Was banned from cricket for missing doping tests",
          "Came back from ban and became IPL's most feared hitter",
          "Scored 88 off 36 balls including 13 sixes in one IPL match",
          "Hits sixes from any ball in any direction effortlessly",
          "KKR all-rounder who can win any match single-handedly"
        ]
      }
    ]
  },
  {
    "name": "DWAYN",
    "meta": {
      "shortened": true,
      "fullName": "Dwayne Bravo"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Chennai Super Kings",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 47
      },
      {
        "nickname": "DJ Bravo"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Released a song called Champion that became a cricket anthem worldwide"
      },
      {
        "trivia": [
          "Released a song called Champion that went viral at every cricket ground",
          "The Champion song played every time West Indies won a match",
          "Best entertainer on the cricket field and off it too",
          "Won two World Cups with West Indies as key team member",
          "CSK's most popular overseas player and Dhoni's trusted man",
          "Death bowler and lower-order hitter who wins close matches"
        ]
      }
    ]
  },
  {
    "name": "BRAVO",
    "meta": {
      "shortened": false,
      "fullName": "Dwayne Bravo"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Chennai Super Kings",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 47
      },
      {
        "nickname": "DJ Bravo"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Released a song called Champion that became a cricket anthem worldwide"
      },
      {
        "trivia": [
          "Released a song called Champion that went viral at every cricket ground",
          "The Champion song played every time West Indies won a match",
          "Best entertainer on the cricket field and off it too",
          "Won two World Cups with West Indies as key team member",
          "CSK's most popular overseas player and Dhoni's trusted man",
          "Death bowler and lower-order hitter who wins close matches"
        ]
      }
    ]
  },
  {
    "name": "SUNIL",
    "meta": {
      "shortened": false,
      "fullName": "Sunil Narine"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 74
      },
      {
        "nickname": "Mystery Man"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was banned for bowling illegally then fixed his action and became even better"
      },
      {
        "trivia": [
          "Was reported for illegal action and had to completely remodel bowling",
          "Came back and was more dangerous than before after the changes",
          "Nobody could pick which way ball was turning for years",
          "Started opening batting in IPL at age 35 and it worked amazingly",
          "KKR's most important player in their title winning seasons",
          "Mystery spinner who batters still cannot figure out"
        ]
      }
    ]
  },
  {
    "name": "NARIN",
    "meta": {
      "shortened": true,
      "fullName": "Sunil Narine"
    },
    "hints": [
      {
        "age": 36
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 74
      },
      {
        "nickname": "Mystery Man"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was banned for bowling illegally then fixed his action and became even better"
      },
      {
        "trivia": [
          "Was reported for illegal action and had to completely remodel bowling",
          "Came back and was more dangerous than before after the changes",
          "Nobody could pick which way ball was turning for years",
          "Started opening batting in IPL at age 35 and it worked amazingly",
          "KKR's most important player in their title winning seasons",
          "Mystery spinner who batters still cannot figure out"
        ]
      }
    ]
  },
  {
    "name": "VIVIA",
    "meta": {
      "shortened": true,
      "fullName": "Vivian Richards"
    },
    "hints": [
      {
        "age": 72
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Viv"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored the fastest ODI century in history without a helmet on his head"
      },
      {
        "trivia": [
          "Never wore a helmet and said he was not scared of any bowler",
          "Chewed gum while hitting sixes which was his signature look",
          "Scored the fastest ODI hundred in history in 56 balls",
          "Led West Indies when they were the most dominant team ever",
          "Most intimidating batting presence the sport has ever seen",
          "Greatest West Indian cricketer of the 20th century by vote"
        ]
      }
    ]
  },
  {
    "name": "RICHA",
    "meta": {
      "shortened": true,
      "fullName": "Vivian Richards"
    },
    "hints": [
      {
        "age": 72
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Viv"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored the fastest ODI century in history without a helmet on his head"
      },
      {
        "trivia": [
          "Never wore a helmet and said he was not scared of any bowler",
          "Chewed gum while hitting sixes which was his signature look",
          "Scored the fastest ODI hundred in history in 56 balls",
          "Led West Indies when they were the most dominant team ever",
          "Most intimidating batting presence the sport has ever seen",
          "Greatest West Indian cricketer of the 20th century by vote"
        ]
      }
    ]
  },
  {
    "name": "NICHO",
    "meta": {
      "shortened": true,
      "fullName": "Nicholas Pooran"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "West Indies",
          "Lucknow Super Giants",
          "Kings XI Punjab",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Nick"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Smashes sixes in ways that make it look like he is angry at the ball"
      },
      {
        "trivia": [
          "Has the cleanest hitting in West Indies cricket right now",
          "West Indies captain in white ball cricket at young age",
          "IPL teams fight over him every season in the auction",
          "Reverse sweeps and scoops bowlers over the keeper regularly",
          "Explosive left-hand keeper who wins matches in 5 overs",
          "Lucknow's most dangerous batter in death overs"
        ]
      }
    ]
  },
  {
    "name": "POORA",
    "meta": {
      "shortened": true,
      "fullName": "Nicholas Pooran"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "West Indies",
          "Lucknow Super Giants",
          "Kings XI Punjab",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Nick"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Smashes sixes in ways that make it look like he is angry at the ball"
      },
      {
        "trivia": [
          "Has the cleanest hitting in West Indies cricket right now",
          "West Indies captain in white ball cricket at young age",
          "IPL teams fight over him every season in the auction",
          "Reverse sweeps and scoops bowlers over the keeper regularly",
          "Explosive left-hand keeper who wins matches in 5 overs",
          "Lucknow's most dangerous batter in death overs"
        ]
      }
    ]
  },
  {
    "name": "DALE",
    "meta": {
      "shortened": false,
      "fullName": "Dale Steyn"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Steyny"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best fast bowler of his generation who was constantly injured in later career"
      },
      {
        "trivia": [
          "Looked like a rockstar and bowled like one too",
          "Injuries stopped him from breaking all world records with wickets",
          "Best bowling average of any fast bowler in Test history",
          "Swing and pace together at 150kmh which very few can do",
          "South Africa's most lethal weapon for over a decade",
          "439 Test wickets and considered greatest fast bowler of his era"
        ]
      }
    ]
  },
  {
    "name": "STEYN",
    "meta": {
      "shortened": false,
      "fullName": "Dale Steyn"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Steyny"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best fast bowler of his generation who was constantly injured in later career"
      },
      {
        "trivia": [
          "Looked like a rockstar and bowled like one too",
          "Injuries stopped him from breaking all world records with wickets",
          "Best bowling average of any fast bowler in Test history",
          "Swing and pace together at 150kmh which very few can do",
          "South Africa's most lethal weapon for over a decade",
          "439 Test wickets and considered greatest fast bowler of his era"
        ]
      }
    ]
  },
  {
    "name": "JACQU",
    "meta": {
      "shortened": true,
      "fullName": "Jacques Kallis"
    },
    "hints": [
      {
        "age": 49
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Jacques"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored over 10000 Test runs AND took over 250 Test wickets which nobody else has done"
      },
      {
        "trivia": [
          "Could bat like a top batter and bowl like a top bowler both",
          "Most complete cricketer ever by statistics and numbers",
          "South Africa never won a World Cup despite having him",
          "Very boring to watch but impossible to dismiss or hit",
          "Scored 13000 Test runs and 292 Test wickets combined",
          "Greatest all-rounder in cricket history by almost every measure"
        ]
      }
    ]
  },
  {
    "name": "KALLI",
    "meta": {
      "shortened": true,
      "fullName": "Jacques Kallis"
    },
    "hints": [
      {
        "age": 49
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Jacques"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Scored over 10000 Test runs AND took over 250 Test wickets which nobody else has done"
      },
      {
        "trivia": [
          "Could bat like a top batter and bowl like a top bowler both",
          "Most complete cricketer ever by statistics and numbers",
          "South Africa never won a World Cup despite having him",
          "Very boring to watch but impossible to dismiss or hit",
          "Scored 13000 Test runs and 292 Test wickets combined",
          "Greatest all-rounder in cricket history by almost every measure"
        ]
      }
    ]
  },
  {
    "name": "KAGIS",
    "meta": {
      "shortened": true,
      "fullName": "Kagiso Rabada"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Delhi Capitals",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 25
      },
      {
        "nickname": "KG"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Youngest fast bowler to reach 200 Test wickets in history"
      },
      {
        "trivia": [
          "Very emotional bowler who celebrates every wicket loudly",
          "Got suspended once for celebrating too aggressively after wicket",
          "Youngest fast bowler to take 200 Test wickets ever",
          "South Africa's attack leader for the next decade",
          "IPL's most consistent overseas fast bowler for years",
          "Right-arm fast bowler who bowls 150kmh with natural swing"
        ]
      }
    ]
  },
  {
    "name": "RABAD",
    "meta": {
      "shortened": true,
      "fullName": "Kagiso Rabada"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Delhi Capitals"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Delhi Capitals",
          "Punjab Kings"
        ]
      },
      {
        "jersey": 25
      },
      {
        "nickname": "KG"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Youngest fast bowler to reach 200 Test wickets in history"
      },
      {
        "trivia": [
          "Very emotional bowler who celebrates every wicket loudly",
          "Got suspended once for celebrating too aggressively after wicket",
          "Youngest fast bowler to take 200 Test wickets ever",
          "South Africa's attack leader for the next decade",
          "IPL's most consistent overseas fast bowler for years",
          "Right-arm fast bowler who bowls 150kmh with natural swing"
        ]
      }
    ]
  },
  {
    "name": "AB",
    "meta": {
      "shortened": false,
      "fullName": "AB de Villiers"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "Mr 360"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best friend is Kohli and they dominated together at RCB for years"
      },
      {
        "trivia": [
          "Very close friends with Kohli and they speak regularly",
          "Played rugby hockey cricket and golf at high level as a kid",
          "Was the best in the world at almost every sport he tried",
          "Shocked everyone when he retired saying he was mentally tired",
          "Fastest ODI century ever will probably never be beaten",
          "South Africa's greatest batter who retired too soon for everyone"
        ]
      }
    ]
  },
  {
    "name": "DEVIL",
    "meta": {
      "shortened": true,
      "fullName": "AB de Villiers"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "Mr 360"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best friend is Kohli and they dominated together at RCB for years"
      },
      {
        "trivia": [
          "Very close friends with Kohli and they speak regularly",
          "Played rugby hockey cricket and golf at high level as a kid",
          "Was the best in the world at almost every sport he tried",
          "Shocked everyone when he retired saying he was mentally tired",
          "Fastest ODI century ever will probably never be beaten",
          "South Africa's greatest batter who retired too soon for everyone"
        ]
      }
    ]
  },
  {
    "name": "QUINT",
    "meta": {
      "shortened": true,
      "fullName": "Quinton de Kock"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "South Africa",
          "Lucknow Super Giants",
          "Royal Challengers Bengaluru",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Q"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Refused to take a knee before a match and caused an international controversy"
      },
      {
        "trivia": [
          "Refused to take a knee during World Cup causing huge controversy",
          "Apologised the next day and took the knee showing he can grow",
          "Has a baby face but plays with an aggressive grown man style",
          "Best South African keeper batter since the 1990s",
          "Very consistent scorer in ODI and T20 cricket",
          "Left-hand opener who sets up innings for South Africa and his IPL team"
        ]
      }
    ]
  },
  {
    "name": "DE KO",
    "meta": {
      "shortened": true,
      "fullName": "Quinton de Kock"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Lucknow Super Giants"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "South Africa",
          "Lucknow Super Giants",
          "Royal Challengers Bengaluru",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Q"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Refused to take a knee before a match and caused an international controversy"
      },
      {
        "trivia": [
          "Refused to take a knee during World Cup causing huge controversy",
          "Apologised the next day and took the knee showing he can grow",
          "Has a baby face but plays with an aggressive grown man style",
          "Best South African keeper batter since the 1990s",
          "Very consistent scorer in ODI and T20 cricket",
          "Left-hand opener who sets up innings for South Africa and his IPL team"
        ]
      }
    ]
  },
  {
    "name": "DAVID",
    "meta": {
      "shortened": false,
      "fullName": "David Miller"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Gujarat Titans",
          "Kings XI Punjab",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Killer Miller"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Nicknamed Killer Miller for his ability to destroy any bowling attack in the last overs"
      },
      {
        "trivia": [
          "Called Killer Miller because he finishes off teams single-handedly",
          "Very calm and quiet person who explodes only on the field",
          "Won IPL title with Gujarat Titans in their first season",
          "Hit four sixes off four balls to win a match once",
          "South Africa's most reliable batsman in crunch moments",
          "Left-hand finisher who is the best in the world in death overs"
        ]
      }
    ]
  },
  {
    "name": "MILLE",
    "meta": {
      "shortened": true,
      "fullName": "David Miller"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Gujarat Titans",
          "Kings XI Punjab",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Killer Miller"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Nicknamed Killer Miller for his ability to destroy any bowling attack in the last overs"
      },
      {
        "trivia": [
          "Called Killer Miller because he finishes off teams single-handedly",
          "Very calm and quiet person who explodes only on the field",
          "Won IPL title with Gujarat Titans in their first season",
          "Hit four sixes off four balls to win a match once",
          "South Africa's most reliable batsman in crunch moments",
          "Left-hand finisher who is the best in the world in death overs"
        ]
      }
    ]
  },
  {
    "name": "TEMBA",
    "meta": {
      "shortened": false,
      "fullName": "Temba Bavuma"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "South Africa"
        ]
      },
      {
        "jersey": 28
      },
      {
        "nickname": "Temba"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "First Black African captain of South Africa cricket which was a historic moment"
      },
      {
        "trivia": [
          "First Black African to captain South Africa in cricket ever",
          "Faced racism in cricket systems and fought through it",
          "Short in height but never lets anyone look down on him",
          "Led South Africa to their first World Cup Final in 2024",
          "Very composed and respected leader in the dressing room",
          "Right-hand batter who leads South Africa with quiet dignity"
        ]
      }
    ]
  },
  {
    "name": "BAVUM",
    "meta": {
      "shortened": true,
      "fullName": "Temba Bavuma"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "South Africa"
        ]
      },
      {
        "jersey": 28
      },
      {
        "nickname": "Temba"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "First Black African captain of South Africa cricket which was a historic moment"
      },
      {
        "trivia": [
          "First Black African to captain South Africa in cricket ever",
          "Faced racism in cricket systems and fought through it",
          "Short in height but never lets anyone look down on him",
          "Led South Africa to their first World Cup Final in 2024",
          "Very composed and respected leader in the dressing room",
          "Right-hand batter who leads South Africa with quiet dignity"
        ]
      }
    ]
  },
  {
    "name": "FAF",
    "meta": {
      "shortened": false,
      "fullName": "Faf du Plessis"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Faf"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was caught on CCTV licking the ball which led to a big fine and ban"
      },
      {
        "trivia": [
          "CCTV caught him licking the ball and he was fined heavily for it",
          "Was a loyal and passionate servant to CSK for many years",
          "Left international cricket to become an IPL franchise player",
          "Became RCB captain and led them to consistent performances",
          "One of the best catchers in the slip cordon in world cricket",
          "South Africa's most loved captain in white ball cricket"
        ]
      }
    ]
  },
  {
    "name": "DU PL",
    "meta": {
      "shortened": true,
      "fullName": "Faf du Plessis"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Faf"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was caught on CCTV licking the ball which led to a big fine and ban"
      },
      {
        "trivia": [
          "CCTV caught him licking the ball and he was fined heavily for it",
          "Was a loyal and passionate servant to CSK for many years",
          "Left international cricket to become an IPL franchise player",
          "Became RCB captain and led them to consistent performances",
          "One of the best catchers in the slip cordon in world cricket",
          "South Africa's most loved captain in white ball cricket"
        ]
      }
    ]
  },
  {
    "name": "KANE",
    "meta": {
      "shortened": false,
      "fullName": "Kane Williamson"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Gujarat Titans",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Kane"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Lost a World Cup Final on boundary count which is one of cricket's cruelest moments"
      },
      {
        "trivia": [
          "Lost World Cup Final despite tying the match on boundary count rule",
          "Considered nicest and most humble superstar in cricket",
          "Never complains never argues always gracious in defeat",
          "Led New Zealand to World Test Championship in 2021",
          "One of only four batters considered elite in the world today",
          "Right-hand batter and captain who makes New Zealand punch above their weight"
        ]
      }
    ]
  },
  {
    "name": "WILLI",
    "meta": {
      "shortened": true,
      "fullName": "Kane Williamson"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Gujarat Titans"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Gujarat Titans",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Kane"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Lost a World Cup Final on boundary count which is one of cricket's cruelest moments"
      },
      {
        "trivia": [
          "Lost World Cup Final despite tying the match on boundary count rule",
          "Considered nicest and most humble superstar in cricket",
          "Never complains never argues always gracious in defeat",
          "Led New Zealand to World Test Championship in 2021",
          "One of only four batters considered elite in the world today",
          "Right-hand batter and captain who makes New Zealand punch above their weight"
        ]
      }
    ]
  },
  {
    "name": "BREND",
    "meta": {
      "shortened": true,
      "fullName": "Brendon McCullum"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "New Zealand",
          "Kolkata Knight Riders",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Baz"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Named in a match fixing scandal early in career and then became one of the greatest captains"
      },
      {
        "trivia": [
          "Was named in a match fixing scandal early in his career",
          "Came clean about being approached and helped clean up cricket",
          "Scored the fastest Test century ever in 54 balls",
          "Changed England cricket as coach with his aggressive philosophy",
          "Bazball style named after his nickname changed Test cricket",
          "Led KKR to IPL title and New Zealand to new heights"
        ]
      }
    ]
  },
  {
    "name": "MCCUL",
    "meta": {
      "shortened": true,
      "fullName": "Brendon McCullum"
    },
    "hints": [
      {
        "age": 43
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "New Zealand",
          "Kolkata Knight Riders",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Baz"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Named in a match fixing scandal early in career and then became one of the greatest captains"
      },
      {
        "trivia": [
          "Was named in a match fixing scandal early in his career",
          "Came clean about being approached and helped clean up cricket",
          "Scored the fastest Test century ever in 54 balls",
          "Changed England cricket as coach with his aggressive philosophy",
          "Bazball style named after his nickname changed Test cricket",
          "Led KKR to IPL title and New Zealand to new heights"
        ]
      }
    ]
  },
  {
    "name": "TRENT",
    "meta": {
      "shortened": false,
      "fullName": "Trent Boult"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "New Zealand",
          "Mumbai Indians",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Trent"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Stepped on the boundary rope while taking a World Cup catch and it cost his team the title"
      },
      {
        "trivia": [
          "Caught a ball on the boundary but stepped on the rope and it cost NZ the World Cup",
          "Left NZ central contract to play franchise cricket worldwide",
          "Married a New Zealand media personality",
          "Best left-arm swing bowler in the world in his prime",
          "Took a hat trick in Test cricket against Australia",
          "New Zealand's most dangerous bowler in all conditions"
        ]
      }
    ]
  },
  {
    "name": "BOULT",
    "meta": {
      "shortened": false,
      "fullName": "Trent Boult"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "New Zealand",
          "Mumbai Indians",
          "Rajasthan Royals"
        ]
      },
      {
        "jersey": 22
      },
      {
        "nickname": "Trent"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Stepped on the boundary rope while taking a World Cup catch and it cost his team the title"
      },
      {
        "trivia": [
          "Caught a ball on the boundary but stepped on the rope and it cost NZ the World Cup",
          "Left NZ central contract to play franchise cricket worldwide",
          "Married a New Zealand media personality",
          "Best left-arm swing bowler in the world in his prime",
          "Took a hat trick in Test cricket against Australia",
          "New Zealand's most dangerous bowler in all conditions"
        ]
      }
    ]
  },
  {
    "name": "MARTI",
    "meta": {
      "shortened": true,
      "fullName": "Martin Guptill"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Sunrisers Hyderabad",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 85
      },
      {
        "nickname": "Guppy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Run out in a World Cup Final Super Over which ended his country's dream"
      },
      {
        "trivia": [
          "Run out in the most heartbreaking moment in World Cup history",
          "Scored 237 not out in a World Cup match which is the highest ever",
          "His run out in 2019 WC Final Super Over still hurts NZ fans",
          "Explosive right-hand opener who could destroy any attack",
          "Best T20 batter New Zealand has produced in modern era",
          "Right-hand opener who played with power and aggression always"
        ]
      }
    ]
  },
  {
    "name": "GUPTI",
    "meta": {
      "shortened": true,
      "fullName": "Martin Guptill"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Sunrisers Hyderabad",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 85
      },
      {
        "nickname": "Guppy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Run out in a World Cup Final Super Over which ended his country's dream"
      },
      {
        "trivia": [
          "Run out in the most heartbreaking moment in World Cup history",
          "Scored 237 not out in a World Cup match which is the highest ever",
          "His run out in 2019 WC Final Super Over still hurts NZ fans",
          "Explosive right-hand opener who could destroy any attack",
          "Best T20 batter New Zealand has produced in modern era",
          "Right-hand opener who played with power and aggression always"
        ]
      }
    ]
  },
  {
    "name": "DEVON",
    "meta": {
      "shortened": false,
      "fullName": "Devon Conway"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 5
      },
      {
        "nickname": "Devs"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Scored 200 on Test debut which is one of the rarest things in cricket"
      },
      {
        "trivia": [
          "Born in South Africa and moved to New Zealand to play for them",
          "Scored a double century on his very first Test appearance",
          "Punched his bat after getting out which injured his own hand",
          "Missed a World Cup semi-final after injuring himself celebrating",
          "Very steady and reliable opener for both NZ and CSK",
          "Left-hand opener who builds innings carefully and scores big"
        ]
      }
    ]
  },
  {
    "name": "CONWA",
    "meta": {
      "shortened": true,
      "fullName": "Devon Conway"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "Chennai Super Kings"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Chennai Super Kings"
        ]
      },
      {
        "jersey": 5
      },
      {
        "nickname": "Devs"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Scored 200 on Test debut which is one of the rarest things in cricket"
      },
      {
        "trivia": [
          "Born in South Africa and moved to New Zealand to play for them",
          "Scored a double century on his very first Test appearance",
          "Punched his bat after getting out which injured his own hand",
          "Missed a World Cup semi-final after injuring himself celebrating",
          "Very steady and reliable opener for both NZ and CSK",
          "Left-hand opener who builds innings carefully and scores big"
        ]
      }
    ]
  },
  {
    "name": "KUMAR",
    "meta": {
      "shortened": false,
      "fullName": "Kumar Sangakkara"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Sri Lanka",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Sanga"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "First non-British president of the most famous cricket club in the world"
      },
      {
        "trivia": [
          "Became President of MCC which no non-British person had done before",
          "Gave one of the most famous speeches in cricket at Lords",
          "Scored four centuries in a row in a single World Cup",
          "Most elegant left-hand batter Sri Lanka ever produced",
          "Over 12000 Test runs which is among the highest ever",
          "Greatest Sri Lankan cricketer alongside his longtime batting partner"
        ]
      }
    ]
  },
  {
    "name": "SANGA",
    "meta": {
      "shortened": true,
      "fullName": "Kumar Sangakkara"
    },
    "hints": [
      {
        "age": 46
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Sri Lanka",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Sanga"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "First non-British president of the most famous cricket club in the world"
      },
      {
        "trivia": [
          "Became President of MCC which no non-British person had done before",
          "Gave one of the most famous speeches in cricket at Lords",
          "Scored four centuries in a row in a single World Cup",
          "Most elegant left-hand batter Sri Lanka ever produced",
          "Over 12000 Test runs which is among the highest ever",
          "Greatest Sri Lankan cricketer alongside his longtime batting partner"
        ]
      }
    ]
  },
  {
    "name": "MAHEL",
    "meta": {
      "shortened": true,
      "fullName": "Mahela Jayawardena"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Mahela"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Him and his batting partner scored a record partnership together in the same Test match"
      },
      {
        "trivia": [
          "Him and his partner scored the highest partnership in Sri Lanka Test history",
          "Led Sri Lanka to their T20 World Cup title as captain",
          "Now coaches and mentors T20 franchise teams globally",
          "Most beloved Sri Lankan captain in recent cricket history",
          "Very silky and elegant right-hand batter to watch",
          "Greatest Sri Lanka captain who led them to major titles"
        ]
      }
    ]
  },
  {
    "name": "JAYAW",
    "meta": {
      "shortened": true,
      "fullName": "Mahela Jayawardena"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 6
      },
      {
        "nickname": "Mahela"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Him and his batting partner scored a record partnership together in the same Test match"
      },
      {
        "trivia": [
          "Him and his partner scored the highest partnership in Sri Lanka Test history",
          "Led Sri Lanka to their T20 World Cup title as captain",
          "Now coaches and mentors T20 franchise teams globally",
          "Most beloved Sri Lankan captain in recent cricket history",
          "Very silky and elegant right-hand batter to watch",
          "Greatest Sri Lanka captain who led them to major titles"
        ]
      }
    ]
  },
  {
    "name": "MUTTI",
    "meta": {
      "shortened": true,
      "fullName": "Muttiah Muralitharan"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Kochi Tuskers Kerala"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 800
      },
      {
        "nickname": "Murali"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most Test wickets ever which will probably never be beaten"
      },
      {
        "trivia": [
          "Bowling action was called illegal multiple times but was always cleared",
          "His jersey number 800 is the number of Test wickets he took",
          "Batters say they genuinely could not tell which way ball turned",
          "Played for Sri Lanka during civil war and was a symbol of hope",
          "66 five wicket hauls in Tests which is also a world record",
          "Greatest spinner in history with 800 Test wickets"
        ]
      }
    ]
  },
  {
    "name": "MURAL",
    "meta": {
      "shortened": true,
      "fullName": "Muttiah Muralitharan"
    },
    "hints": [
      {
        "age": 52
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Kochi Tuskers Kerala"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 800
      },
      {
        "nickname": "Murali"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most Test wickets ever which will probably never be beaten"
      },
      {
        "trivia": [
          "Bowling action was called illegal multiple times but was always cleared",
          "His jersey number 800 is the number of Test wickets he took",
          "Batters say they genuinely could not tell which way ball turned",
          "Played for Sri Lanka during civil war and was a symbol of hope",
          "66 five wicket hauls in Tests which is also a world record",
          "Greatest spinner in history with 800 Test wickets"
        ]
      }
    ]
  },
  {
    "name": "LASIT",
    "meta": {
      "shortened": true,
      "fullName": "Lasith Malinga"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Slinga"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most unusual bowling action in cricket history with a slingy round arm style"
      },
      {
        "trivia": [
          "Bowling action looks completely wrong but is impossible to hit",
          "Took four wickets in four balls in World Cup cricket twice",
          "Best death bowler in T20 history and MI loved him for years",
          "Has a very distinctive hairstyle with dyed blonde curls",
          "Won a T20 World Cup with Sri Lanka as their key bowler",
          "Mumbai Indians most iconic overseas player in IPL history"
        ]
      }
    ]
  },
  {
    "name": "MALIN",
    "meta": {
      "shortened": true,
      "fullName": "Lasith Malinga"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Mumbai Indians"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Mumbai Indians"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Slinga"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Has the most unusual bowling action in cricket history with a slingy round arm style"
      },
      {
        "trivia": [
          "Bowling action looks completely wrong but is impossible to hit",
          "Took four wickets in four balls in World Cup cricket twice",
          "Best death bowler in T20 history and MI loved him for years",
          "Has a very distinctive hairstyle with dyed blonde curls",
          "Won a T20 World Cup with Sri Lanka as their key bowler",
          "Mumbai Indians most iconic overseas player in IPL history"
        ]
      }
    ]
  },
  {
    "name": "WANIN",
    "meta": {
      "shortened": true,
      "fullName": "Wanindu Hasaranga"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 4
      },
      {
        "nickname": "Wanidu"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Best T20 leg spinner in the world right now who nobody can pick"
      },
      {
        "trivia": [
          "Batters cannot tell googly from leg spin from his hand at all",
          "Took a hat trick in T20 International cricket",
          "Most wickets in a T20 World Cup tournament single edition",
          "Also hits useful runs for his team in lower order",
          "RCB's key bowler and very popular with Indian fans",
          "Sri Lanka's best current player and T20 leg spin expert"
        ]
      }
    ]
  },
  {
    "name": "HASAR",
    "meta": {
      "shortened": true,
      "fullName": "Wanindu Hasaranga"
    },
    "hints": [
      {
        "age": 27
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Royal Challengers Bengaluru"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "jersey": 4
      },
      {
        "nickname": "Wanidu"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Best T20 leg spinner in the world right now who nobody can pick"
      },
      {
        "trivia": [
          "Batters cannot tell googly from leg spin from his hand at all",
          "Took a hat trick in T20 International cricket",
          "Most wickets in a T20 World Cup tournament single edition",
          "Also hits useful runs for his team in lower order",
          "RCB's key bowler and very popular with Indian fans",
          "Sri Lanka's best current player and T20 leg spin expert"
        ]
      }
    ]
  },
  {
    "name": "TILLA",
    "meta": {
      "shortened": true,
      "fullName": "Tillakaratne Dilshan"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Dilscoop"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Invented a brand new cricket shot that nobody had ever tried before"
      },
      {
        "trivia": [
          "Invented the Dilscoop shot where you ramp ball over keeper for six",
          "Shot named after him and is now copied by batters worldwide",
          "Also bowled off spin and took important wickets in big games",
          "Led Sri Lanka in multiple ICC events after captains stepped down",
          "Scored over 9000 ODI runs for Sri Lanka",
          "Most innovative batter Sri Lanka produced in modern cricket"
        ]
      }
    ]
  },
  {
    "name": "DILSH",
    "meta": {
      "shortened": true,
      "fullName": "Tillakaratne Dilshan"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "Delhi Daredevils"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Delhi Daredevils"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Dilscoop"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Invented a brand new cricket shot that nobody had ever tried before"
      },
      {
        "trivia": [
          "Invented the Dilscoop shot where you ramp ball over keeper for six",
          "Shot named after him and is now copied by batters worldwide",
          "Also bowled off spin and took important wickets in big games",
          "Led Sri Lanka in multiple ICC events after captains stepped down",
          "Scored over 9000 ODI runs for Sri Lanka",
          "Most innovative batter Sri Lanka produced in modern cricket"
        ]
      }
    ]
  },
  {
    "name": "SHAKI",
    "meta": {
      "shortened": true,
      "fullName": "Shakib Al Hasan"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "Bangladesh",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 75
      },
      {
        "nickname": "Shakib"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best player from his country by a huge margin and also got into politics"
      },
      {
        "trivia": [
          "Became a politician while still playing international cricket",
          "Got banned from cricket for not reporting a corrupt approach",
          "Was number one in all three formats at the same time once",
          "Bangladesh simply cannot win without him in the team",
          "Left-arm spin and lower order hitting makes him elite",
          "Greatest cricketer Bangladesh has ever produced by far"
        ]
      }
    ]
  },
  {
    "name": "AL HA",
    "meta": {
      "shortened": true,
      "fullName": "Shakib Al Hasan"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "Bangladesh",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 75
      },
      {
        "nickname": "Shakib"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Best player from his country by a huge margin and also got into politics"
      },
      {
        "trivia": [
          "Became a politician while still playing international cricket",
          "Got banned from cricket for not reporting a corrupt approach",
          "Was number one in all three formats at the same time once",
          "Bangladesh simply cannot win without him in the team",
          "Left-arm spin and lower order hitting makes him elite",
          "Greatest cricketer Bangladesh has ever produced by far"
        ]
      }
    ]
  },
  {
    "name": "TAMIM",
    "meta": {
      "shortened": false,
      "fullName": "Tamim Iqbal"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "jersey": 28
      },
      {
        "nickname": "Tamim"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Batted with a broken wrist in a Champions Trophy match just to help his team"
      },
      {
        "trivia": [
          "Batted with broken wrist in Champions Trophy after getting hit",
          "Retired from cricket then came back multiple times",
          "Bangladesh's highest run scorer in both Tests and ODIs",
          "Always attacked from the first ball as a left-hand opener",
          "Had public arguments with cricket board multiple times",
          "Most important batter Bangladesh ever produced after Shakib"
        ]
      }
    ]
  },
  {
    "name": "IQBAL",
    "meta": {
      "shortened": false,
      "fullName": "Tamim Iqbal"
    },
    "hints": [
      {
        "age": 35
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "jersey": 28
      },
      {
        "nickname": "Tamim"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Batted with a broken wrist in a Champions Trophy match just to help his team"
      },
      {
        "trivia": [
          "Batted with broken wrist in Champions Trophy after getting hit",
          "Retired from cricket then came back multiple times",
          "Bangladesh's highest run scorer in both Tests and ODIs",
          "Always attacked from the first ball as a left-hand opener",
          "Had public arguments with cricket board multiple times",
          "Most important batter Bangladesh ever produced after Shakib"
        ]
      }
    ]
  },
  {
    "name": "MUSHF",
    "meta": {
      "shortened": true,
      "fullName": "Mushfiqur Rahim"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "jersey": 15
      },
      {
        "nickname": "Mushfiq"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Most experienced Bangladesh cricketer who has played the most matches for his country"
      },
      {
        "trivia": [
          "Cries after wins and losses because he loves Bangladesh cricket so much",
          "First Bangladesh player to score a Test double century",
          "Very emotional and wears his heart completely on his sleeve",
          "Has played more Bangladesh Test matches than anyone ever",
          "Best wicket keeper Bangladesh has produced",
          "Right-hand keeper batter who is the backbone of Bangladesh batting"
        ]
      }
    ]
  },
  {
    "name": "RAHIM",
    "meta": {
      "shortened": false,
      "fullName": "Mushfiqur Rahim"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "jersey": 15
      },
      {
        "nickname": "Mushfiq"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Most experienced Bangladesh cricketer who has played the most matches for his country"
      },
      {
        "trivia": [
          "Cries after wins and losses because he loves Bangladesh cricket so much",
          "First Bangladesh player to score a Test double century",
          "Very emotional and wears his heart completely on his sleeve",
          "Has played more Bangladesh Test matches than anyone ever",
          "Best wicket keeper Bangladesh has produced",
          "Right-hand keeper batter who is the backbone of Bangladesh batting"
        ]
      }
    ]
  },
  {
    "name": "MUSTA",
    "meta": {
      "shortened": true,
      "fullName": "Mustafizur Rahman"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Bangladesh",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 90
      },
      {
        "nickname": "Fizz"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Took six wickets on his very first ODI debut against India"
      },
      {
        "trivia": [
          "Took six wickets on debut against India which shocked everyone",
          "Has cutters and slower balls that confuse even the best batters",
          "Called The Fizz which suits his fizzing deliveries perfectly",
          "IPL teams kept buying him because he was so effective",
          "Best Bangladesh bowler in white ball cricket currently",
          "Left-arm pacer who takes wickets with variations not pace"
        ]
      }
    ]
  },
  {
    "name": "RAHMA",
    "meta": {
      "shortened": true,
      "fullName": "Mustafizur Rahman"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "Bangladesh"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Bangladesh",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Delhi Capitals"
        ]
      },
      {
        "jersey": 90
      },
      {
        "nickname": "Fizz"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Took six wickets on his very first ODI debut against India"
      },
      {
        "trivia": [
          "Took six wickets on debut against India which shocked everyone",
          "Has cutters and slower balls that confuse even the best batters",
          "Called The Fizz which suits his fizzing deliveries perfectly",
          "IPL teams kept buying him because he was so effective",
          "Best Bangladesh bowler in white ball cricket currently",
          "Left-arm pacer who takes wickets with variations not pace"
        ]
      }
    ]
  },
  {
    "name": "BABAR",
    "meta": {
      "shortened": false,
      "fullName": "Babar Azam"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "jersey": 56
      },
      {
        "nickname": "Babar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Was number one in all three white ball formats at the same time"
      },
      {
        "trivia": [
          "Held number one ranking in ODI T20 and other formats together",
          "Cover drive is considered the most beautiful shot in cricket now",
          "Lost captaincy then got it back which was very dramatic",
          "Team loses more when he scores big which fans joke about",
          "Most technically perfect batter Pakistan has produced",
          "Right-hand batter compared to Kohli every single day"
        ]
      }
    ]
  },
  {
    "name": "AZAM",
    "meta": {
      "shortened": false,
      "fullName": "Babar Azam"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "jersey": 56
      },
      {
        "nickname": "Babar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Was number one in all three white ball formats at the same time"
      },
      {
        "trivia": [
          "Held number one ranking in ODI T20 and other formats together",
          "Cover drive is considered the most beautiful shot in cricket now",
          "Lost captaincy then got it back which was very dramatic",
          "Team loses more when he scores big which fans joke about",
          "Most technically perfect batter Pakistan has produced",
          "Right-hand batter compared to Kohli every single day"
        ]
      }
    ]
  },
  {
    "name": "MOHAM",
    "meta": {
      "shortened": true,
      "fullName": "Mohammad Rizwan"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Pakistan",
          "Multan Sultans"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Rizwan"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Prays on the cricket field between every over during matches"
      },
      {
        "trivia": [
          "Prays namaz on the field between overs in every match he plays",
          "Was in hospital seriously ill and played World Cup days later",
          "Scored most T20I runs in a single year which is a world record",
          "Reads the Quran every morning before going to bat",
          "Very religious and open about his faith in public",
          "Best T20 keeper batter in the world right now"
        ]
      }
    ]
  },
  {
    "name": "RIZWA",
    "meta": {
      "shortened": true,
      "fullName": "Mohammad Rizwan"
    },
    "hints": [
      {
        "age": 32
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Pakistan",
          "Multan Sultans"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Rizwan"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Prays on the cricket field between every over during matches"
      },
      {
        "trivia": [
          "Prays namaz on the field between overs in every match he plays",
          "Was in hospital seriously ill and played World Cup days later",
          "Scored most T20I runs in a single year which is a world record",
          "Reads the Quran every morning before going to bat",
          "Very religious and open about his faith in public",
          "Best T20 keeper batter in the world right now"
        ]
      }
    ]
  },
  {
    "name": "SHAHE",
    "meta": {
      "shortened": true,
      "fullName": "Shaheen Afridi"
    },
    "hints": [
      {
        "age": 24
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Shaheen"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Married the daughter of one of Pakistan cricket's biggest legends"
      },
      {
        "trivia": [
          "Married the daughter of Pakistan's most beloved cricketer",
          "Very tall which gives him natural steep bounce and swing",
          "Destroyed India's top order in a famous World Cup match",
          "Left-arm pace at 150kmh that moves late is very dangerous",
          "Pakistan's most important bowler in big matches now",
          "Youngest fast bowler to take 100 T20I wickets for Pakistan"
        ]
      }
    ]
  },
  {
    "name": "AFRID",
    "meta": {
      "shortened": true,
      "fullName": "Shaheen Afridi"
    },
    "hints": [
      {
        "age": 24
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Shaheen"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Married the daughter of one of Pakistan cricket's biggest legends"
      },
      {
        "trivia": [
          "Married the daughter of Pakistan's most beloved cricketer",
          "Very tall which gives him natural steep bounce and swing",
          "Destroyed India's top order in a famous World Cup match",
          "Left-arm pace at 150kmh that moves late is very dangerous",
          "Pakistan's most important bowler in big matches now",
          "Youngest fast bowler to take 100 T20I wickets for Pakistan"
        ]
      }
    ]
  },
  {
    "name": "SHAHI",
    "meta": {
      "shortened": true,
      "fullName": "Shahid Afridi"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Boom Boom"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "His real age was a mystery for years because he gave different answers every time"
      },
      {
        "trivia": [
          "Nobody knows his real age because he kept changing it himself",
          "Scored fastest ODI century ever on his debut in 37 balls",
          "Called Boom Boom Afridi for his explosive hitting style",
          "Won Pakistan a T20 World Cup as a key player",
          "Most loved cricket player in Pakistan by a huge margin",
          "Right-hand all-rounder who could destroy any match alone"
        ]
      }
    ]
  },
  {
    "name": "AFRID",
    "meta": {
      "shortened": true,
      "fullName": "Shahid Afridi"
    },
    "hints": [
      {
        "age": 44
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Deccan Chargers"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Boom Boom"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "His real age was a mystery for years because he gave different answers every time"
      },
      {
        "trivia": [
          "Nobody knows his real age because he kept changing it himself",
          "Scored fastest ODI century ever on his debut in 37 balls",
          "Called Boom Boom Afridi for his explosive hitting style",
          "Won Pakistan a T20 World Cup as a key player",
          "Most loved cricket player in Pakistan by a huge margin",
          "Right-hand all-rounder who could destroy any match alone"
        ]
      }
    ]
  },
  {
    "name": "SHOAI",
    "meta": {
      "shortened": true,
      "fullName": "Shoaib Akhtar"
    },
    "hints": [
      {
        "age": 49
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Rawalpindi Express"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Bowled the fastest ball ever recorded in cricket history"
      },
      {
        "trivia": [
          "Officially bowled the fastest ball ever at 161.3 kilometres per hour",
          "Very controversial character who fought with teammates and officials",
          "Wrote a book where he exposed many cricket secrets and scandals",
          "Batters were genuinely scared to face him at his peak",
          "Called Rawalpindi Express which perfectly describes his bowling",
          "Most talked about fast bowler Pakistan ever produced"
        ]
      }
    ]
  },
  {
    "name": "AKHTA",
    "meta": {
      "shortened": true,
      "fullName": "Shoaib Akhtar"
    },
    "hints": [
      {
        "age": 49
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Rawalpindi Express"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Bowled the fastest ball ever recorded in cricket history"
      },
      {
        "trivia": [
          "Officially bowled the fastest ball ever at 161.3 kilometres per hour",
          "Very controversial character who fought with teammates and officials",
          "Wrote a book where he exposed many cricket secrets and scandals",
          "Batters were genuinely scared to face him at his peak",
          "Called Rawalpindi Express which perfectly describes his bowling",
          "Most talked about fast bowler Pakistan ever produced"
        ]
      }
    ]
  },
  {
    "name": "WASIM",
    "meta": {
      "shortened": false,
      "fullName": "Wasim Akram"
    },
    "hints": [
      {
        "age": 58
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Sultan of Swing"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Greatest left-arm fast bowler cricket has ever seen"
      },
      {
        "trivia": [
          "Was involved in match fixing allegations which was very controversial",
          "Could swing ball both ways at very high speed which was unplayable",
          "Won Man of Match in 1992 World Cup Final against England",
          "Left-arm pace at 150kmh with reverse swing made him unstoppable",
          "Had 916 international wickets which is a combined record",
          "Pakistan's greatest fast bowler and one of the all time greats"
        ]
      }
    ]
  },
  {
    "name": "AKRAM",
    "meta": {
      "shortened": false,
      "fullName": "Wasim Akram"
    },
    "hints": [
      {
        "age": 58
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand All-Rounder"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 12
      },
      {
        "nickname": "Sultan of Swing"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Greatest left-arm fast bowler cricket has ever seen"
      },
      {
        "trivia": [
          "Was involved in match fixing allegations which was very controversial",
          "Could swing ball both ways at very high speed which was unplayable",
          "Won Man of Match in 1992 World Cup Final against England",
          "Left-arm pace at 150kmh with reverse swing made him unstoppable",
          "Had 916 international wickets which is a combined record",
          "Pakistan's greatest fast bowler and one of the all time greats"
        ]
      }
    ]
  },
  {
    "name": "WAQAR",
    "meta": {
      "shortened": false,
      "fullName": "Waqar Younis"
    },
    "hints": [
      {
        "age": 53
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Waqar"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Partnership with his bowling partner was the most feared in world cricket"
      },
      {
        "trivia": [
          "Formed the most deadly bowling pair in cricket history with his partner",
          "Reverse swing yorker that hit the stumps was virtually unstoppable",
          "Won the 1992 World Cup with Pakistan as a young fast bowler",
          "Had many public disagreements with Pakistan cricket board",
          "Destroyed lower order stumps with his in-swinging yorker",
          "Right-arm fast bowler who was Wasim's perfect partner"
        ]
      }
    ]
  },
  {
    "name": "YOUNI",
    "meta": {
      "shortened": true,
      "fullName": "Waqar Younis"
    },
    "hints": [
      {
        "age": 53
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 11
      },
      {
        "nickname": "Waqar"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Partnership with his bowling partner was the most feared in world cricket"
      },
      {
        "trivia": [
          "Formed the most deadly bowling pair in cricket history with his partner",
          "Reverse swing yorker that hit the stumps was virtually unstoppable",
          "Won the 1992 World Cup with Pakistan as a young fast bowler",
          "Had many public disagreements with Pakistan cricket board",
          "Destroyed lower order stumps with his in-swinging yorker",
          "Right-arm fast bowler who was Wasim's perfect partner"
        ]
      }
    ]
  },
  {
    "name": "YOUNI",
    "meta": {
      "shortened": true,
      "fullName": "Younis Khan"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Younis"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Pakistan's highest ever Test run scorer who fought through everything"
      },
      {
        "trivia": [
          "Had many public fallouts with Pakistan cricket board and players",
          "Pakistan's highest Test run scorer with over 10000 runs",
          "Won a T20 World Cup as captain which Pakistan had never done before",
          "Was dropped multiple times but always fought back into the team",
          "Very gritty batter who performed best when pressure was highest",
          "Right-hand batter and Pakistan's greatest modern Test player"
        ]
      }
    ]
  },
  {
    "name": "KHAN",
    "meta": {
      "shortened": false,
      "fullName": "Younis Khan"
    },
    "hints": [
      {
        "age": 47
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Younis"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Pakistan's highest ever Test run scorer who fought through everything"
      },
      {
        "trivia": [
          "Had many public fallouts with Pakistan cricket board and players",
          "Pakistan's highest Test run scorer with over 10000 runs",
          "Won a T20 World Cup as captain which Pakistan had never done before",
          "Was dropped multiple times but always fought back into the team",
          "Very gritty batter who performed best when pressure was highest",
          "Right-hand batter and Pakistan's greatest modern Test player"
        ]
      }
    ]
  },
  {
    "name": "FAKHA",
    "meta": {
      "shortened": true,
      "fullName": "Fakhar Zaman"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Fakhar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was a navy officer before becoming a professional cricketer"
      },
      {
        "trivia": [
          "Served in Pakistan Navy before becoming a cricketer",
          "Scored 193 which is the highest ODI score by a Pakistan batter",
          "Won the 2017 Champions Trophy final against India as key player",
          "Very attacking left-hand opener who hits from ball one",
          "His score of 193 in one ODI match is Pakistan's highest ever",
          "Left-hand opener who is most dangerous in 50 over cricket"
        ]
      }
    ]
  },
  {
    "name": "ZAMAN",
    "meta": {
      "shortened": false,
      "fullName": "Fakhar Zaman"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Fakhar"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was a navy officer before becoming a professional cricketer"
      },
      {
        "trivia": [
          "Served in Pakistan Navy before becoming a cricketer",
          "Scored 193 which is the highest ODI score by a Pakistan batter",
          "Won the 2017 Champions Trophy final against India as key player",
          "Very attacking left-hand opener who hits from ball one",
          "His score of 193 in one ODI match is Pakistan's highest ever",
          "Left-hand opener who is most dangerous in 50 over cricket"
        ]
      }
    ]
  },
  {
    "name": "SARFA",
    "meta": {
      "shortened": true,
      "fullName": "Sarfaraz Ahmed"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Sarfu"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was caught yawning on the field during a match and it went completely viral"
      },
      {
        "trivia": [
          "Caught yawning while fielding in a Test match which went viral everywhere",
          "Led Pakistan to Champions Trophy title as captain in 2017",
          "Was dropped as captain after a very poor World Cup campaign",
          "Very chubby and friendly looking person who surprised critics",
          "Kept wicket and batted usefully for Pakistan for many years",
          "Right-hand keeper batter who won Pakistan their biggest white ball trophy"
        ]
      }
    ]
  },
  {
    "name": "AHMED",
    "meta": {
      "shortened": false,
      "fullName": "Sarfaraz Ahmed"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "jersey": 16
      },
      {
        "nickname": "Sarfu"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was caught yawning on the field during a match and it went completely viral"
      },
      {
        "trivia": [
          "Caught yawning while fielding in a Test match which went viral everywhere",
          "Led Pakistan to Champions Trophy title as captain in 2017",
          "Was dropped as captain after a very poor World Cup campaign",
          "Very chubby and friendly looking person who surprised critics",
          "Kept wicket and batted usefully for Pakistan for many years",
          "Right-hand keeper batter who won Pakistan their biggest white ball trophy"
        ]
      }
    ]
  },
  {
    "name": "RASHI",
    "meta": {
      "shortened": true,
      "fullName": "Rashid Khan"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Gujarat Titans"
        ]
      },
      {
        "jersey": 19
      },
      {
        "nickname": "Rashid"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Most economical T20 bowler in the world who plays franchise cricket everywhere"
      },
      {
        "trivia": [
          "Cannot read whether ball will turn left or right even on TV slow mo",
          "Plays franchise T20 cricket in every country in the world",
          "Most economical T20 bowler in history by economy rate",
          "Takes Afghanistan cricket on his shoulders completely alone",
          "IPL teams fight over him every auction year without fail",
          "Leg spinner whose googly nobody can pick even after years"
        ]
      }
    ]
  },
  {
    "name": "KHAN",
    "meta": {
      "shortened": false,
      "fullName": "Rashid Khan"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Gujarat Titans"
        ]
      },
      {
        "jersey": 19
      },
      {
        "nickname": "Rashid"
      },
      {
        "era": "current"
      },
      {
        "popularity": "icon"
      },
      {
        "openingHint": "Most economical T20 bowler in the world who plays franchise cricket everywhere"
      },
      {
        "trivia": [
          "Cannot read whether ball will turn left or right even on TV slow mo",
          "Plays franchise T20 cricket in every country in the world",
          "Most economical T20 bowler in history by economy rate",
          "Takes Afghanistan cricket on his shoulders completely alone",
          "IPL teams fight over him every auction year without fail",
          "Leg spinner whose googly nobody can pick even after years"
        ]
      }
    ]
  },
  {
    "name": "MUJEE",
    "meta": {
      "shortened": true,
      "fullName": "Mujeeb Ur Rahman"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Afghanistan",
          "Punjab Kings",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Mujeeb"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was the youngest player ever to play ODI cricket for any Associate cricket nation"
      },
      {
        "trivia": [
          "Youngest ever ODI player for an Associate cricket nation",
          "Played IPL at just 17 years old which shocked everyone",
          "Variations from off break to googly are impossible to pick",
          "Very quiet and shy off the field but lethal on it",
          "Part of Afghanistan's golden generation of spinners",
          "Mystery spinner who troubles every top batter in T20 cricket"
        ]
      }
    ]
  },
  {
    "name": "UR RA",
    "meta": {
      "shortened": true,
      "fullName": "Mujeeb Ur Rahman"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Punjab Kings"
      },
      {
        "role": "Right-Hand Bowler"
      },
      {
        "teams": [
          "Afghanistan",
          "Punjab Kings",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "jersey": 7
      },
      {
        "nickname": "Mujeeb"
      },
      {
        "era": "current"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Was the youngest player ever to play ODI cricket for any Associate cricket nation"
      },
      {
        "trivia": [
          "Youngest ever ODI player for an Associate cricket nation",
          "Played IPL at just 17 years old which shocked everyone",
          "Variations from off break to googly are impossible to pick",
          "Very quiet and shy off the field but lethal on it",
          "Part of Afghanistan's golden generation of spinners",
          "Mystery spinner who troubles every top batter in T20 cricket"
        ]
      }
    ]
  },
  {
    "name": "MOHAM",
    "meta": {
      "shortened": true,
      "fullName": "Mohammed Nabi"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Nabi"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Pioneer who helped Afghanistan go from unknown to feared in world cricket"
      },
      {
        "trivia": [
          "Was playing cricket when Afghanistan had almost no facilities",
          "Made Afghanistan a team that bigger nations fear in World Cups",
          "Most experienced Afghanistan player with most matches played",
          "Off spin and lower order hitting makes him a genuine all-rounder",
          "Plays in global franchise T20 leagues all around the world",
          "Afghanistan's most experienced leader and cricketing pioneer"
        ]
      }
    ]
  },
  {
    "name": "NABI",
    "meta": {
      "shortened": false,
      "fullName": "Mohammed Nabi"
    },
    "hints": [
      {
        "age": 39
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders"
        ]
      },
      {
        "jersey": 10
      },
      {
        "nickname": "Nabi"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Pioneer who helped Afghanistan go from unknown to feared in world cricket"
      },
      {
        "trivia": [
          "Was playing cricket when Afghanistan had almost no facilities",
          "Made Afghanistan a team that bigger nations fear in World Cups",
          "Most experienced Afghanistan player with most matches played",
          "Off spin and lower order hitting makes him a genuine all-rounder",
          "Plays in global franchise T20 leagues all around the world",
          "Afghanistan's most experienced leader and cricketing pioneer"
        ]
      }
    ]
  },
  {
    "name": "ANDY",
    "meta": {
      "shortened": false,
      "fullName": "Andy Flower"
    },
    "hints": [
      {
        "age": 56
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Andy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Wore a black armband to protest his government during a World Cup match"
      },
      {
        "trivia": [
          "Protested against his own government by wearing black armband at World Cup",
          "Was one of the best keeper batters in the world despite Zimbabwe being weak",
          "Later became England director and won two Ashes series",
          "Test average of 51 which is exceptional for any era",
          "Brave protest made him famous beyond just cricket",
          "Greatest Zimbabwe cricketer in their history"
        ]
      }
    ]
  },
  {
    "name": "FLOWE",
    "meta": {
      "shortened": true,
      "fullName": "Andy Flower"
    },
    "hints": [
      {
        "age": 56
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Left-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Andy"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "star"
      },
      {
        "openingHint": "Wore a black armband to protest his government during a World Cup match"
      },
      {
        "trivia": [
          "Protested against his own government by wearing black armband at World Cup",
          "Was one of the best keeper batters in the world despite Zimbabwe being weak",
          "Later became England director and won two Ashes series",
          "Test average of 51 which is exceptional for any era",
          "Brave protest made him famous beyond just cricket",
          "Greatest Zimbabwe cricketer in their history"
        ]
      }
    ]
  },
  {
    "name": "BREND",
    "meta": {
      "shortened": true,
      "fullName": "Brendan Taylor"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "BT"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Admitted to using cocaine and being approached for match fixing after retiring"
      },
      {
        "trivia": [
          "Admitted to cocaine use and match fixing approach in retirement",
          "Most valuable Zimbabwe player in their hardest years",
          "Scored over 9000 international runs for Zimbabwe alone",
          "His shocking confession rocked Zimbabwe cricket completely",
          "Best keeper batter Zimbabwe produced after Andy Flower",
          "Right-hand batter who kept Zimbabwe relevant for years"
        ]
      }
    ]
  },
  {
    "name": "TAYLO",
    "meta": {
      "shortened": true,
      "fullName": "Brendan Taylor"
    },
    "hints": [
      {
        "age": 38
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman, Wicket-Keeper"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "jersey": 17
      },
      {
        "nickname": "BT"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Admitted to using cocaine and being approached for match fixing after retiring"
      },
      {
        "trivia": [
          "Admitted to cocaine use and match fixing approach in retirement",
          "Most valuable Zimbabwe player in their hardest years",
          "Scored over 9000 international runs for Zimbabwe alone",
          "His shocking confession rocked Zimbabwe cricket completely",
          "Best keeper batter Zimbabwe produced after Andy Flower",
          "Right-hand batter who kept Zimbabwe relevant for years"
        ]
      }
    ]
  },
  {
    "name": "KEVIN",
    "meta": {
      "shortened": false,
      "fullName": "Kevin O'Brien"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "Ireland"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Ireland"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Kev"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Scored the fastest ever World Cup century to beat England in 2011"
      },
      {
        "trivia": [
          "Shocked the entire cricket world by beating England in World Cup",
          "Scored fastest World Cup century ever in just 50 balls",
          "Celebrated like nobody had ever celebrated a cricket win before",
          "Became a national hero in Ireland overnight after that innings",
          "Regular person who became a cricketing legend in one afternoon",
          "Right-hand all-rounder who gave Ireland their greatest cricket moment"
        ]
      }
    ]
  },
  {
    "name": "O'BRI",
    "meta": {
      "shortened": true,
      "fullName": "Kevin O'Brien"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "Ireland"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand All-Rounder"
      },
      {
        "teams": [
          "Ireland"
        ]
      },
      {
        "jersey": 13
      },
      {
        "nickname": "Kev"
      },
      {
        "era": "legend"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Scored the fastest ever World Cup century to beat England in 2011"
      },
      {
        "trivia": [
          "Shocked the entire cricket world by beating England in World Cup",
          "Scored fastest World Cup century ever in just 50 balls",
          "Celebrated like nobody had ever celebrated a cricket win before",
          "Became a national hero in Ireland overnight after that innings",
          "Regular person who became a cricketing legend in one afternoon",
          "Right-hand all-rounder who gave Ireland their greatest cricket moment"
        ]
      }
    ]
  },
  {
    "name": "PAUL",
    "meta": {
      "shortened": false,
      "fullName": "Paul Stirling"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Ireland"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Ireland",
          "Middlesex"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Stirlo"
      },
      {
        "era": "current"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Ireland's best ever batter who has played for them since they were not even a Full Member"
      },
      {
        "trivia": [
          "Was playing for Ireland before they even had Full Member status",
          "Ireland's highest run scorer by a very big margin",
          "Terrorised big teams in World Cup upsets multiple times",
          "Very consistent despite Ireland having poor facilities for years",
          "Most important Ireland batter across fifteen years of cricket",
          "Right-hand opener who is the face of Irish cricket globally"
        ]
      }
    ]
  },
  {
    "name": "STIRL",
    "meta": {
      "shortened": true,
      "fullName": "Paul Stirling"
    },
    "hints": [
      {
        "age": 34
      },
      {
        "country": "Ireland"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Right-Hand Batsman"
      },
      {
        "teams": [
          "Ireland",
          "Middlesex"
        ]
      },
      {
        "jersey": 1
      },
      {
        "nickname": "Stirlo"
      },
      {
        "era": "current"
      },
      {
        "popularity": "cult"
      },
      {
        "openingHint": "Ireland's best ever batter who has played for them since they were not even a Full Member"
      },
      {
        "trivia": [
          "Was playing for Ireland before they even had Full Member status",
          "Ireland's highest run scorer by a very big margin",
          "Terrorised big teams in World Cup upsets multiple times",
          "Very consistent despite Ireland having poor facilities for years",
          "Most important Ireland batter across fifteen years of cricket",
          "Right-hand opener who is the face of Irish cricket globally"
        ]
      }
    ]
  }
];
