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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who broke multiple ICC batting records across a decade of dominance"
      },
      {
        "trivia": [
          "King Kohli - 50+ ODI centuries, most by any batsman",
          "Chased down 275+ targets single-handedly multiple times",
          "ICC Cricket World Cup 2011 winner with India",
          "Fastest to 8000, 9000, 10000 ODI runs",
          "2023 WC - scored most runs including century in final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who broke multiple ICC batting records across a decade of dominance"
      },
      {
        "trivia": [
          "King - 50+ ODI centuries, most by any batsman",
          "Chased down 275+ targets single-handedly multiple times",
          "ICC Cricket World Cup 2011 winner with India",
          "Fastest to 8000, 9000, 10000 ODI runs",
          "2023 WC - scored most runs including century in final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Deccan Chargers"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A left-hand opener who captained his IPL franchise to more titles than anyone else in history"
      },
      {
        "trivia": [
          "Only batsman with three ODI double centuries",
          "264 vs Sri Lanka 2014 - highest individual ODI score ever",
          "Led India to T20 World Cup 2024 victory as captain",
          "5-time IPL winning captain with Mumbai Indians",
          "Called Hitman for his explosive and clean hitting style"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Deccan Chargers"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A left-hand opener who captained his IPL franchise to more titles than anyone else in history"
      },
      {
        "trivia": [
          "Only batsman with three ODI double centuries",
          "264 vs Sri Lanka 2014 - highest individual ODI score ever",
          "Led India to T20 World Cup 2024 victory as captain",
          "5-time IPL winning captain with Mumbai Indians",
          "Called Hitman for his explosive and clean hitting style"
        ]
      }
    ]
  },
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper who led his country to glory in every format of the game"
      },
      {
        "trivia": [
          "Captain Cool - never loses composure under pressure",
          "Only captain to win all three ICC trophies - WC, T20 WC, Champions Trophy",
          "Finished 2011 WC Final with a six over long-on off Nuwan Kulasekara",
          "Invented the helicopter shot that has no name in textbooks",
          "Lightning-fast stumpings that left batsmen shell-shocked"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper who led his country to glory in every format of the game"
      },
      {
        "trivia": [
          "Captain Cool - never loses composure under pressure",
          "Only captain to win all three ICC trophies - WC, T20 WC, Champions Trophy",
          "Finished 2011 WC Final with a six over long-on off Nuwan Kulasekara",
          "Invented the helicopter shot that has no name in textbooks",
          "Lightning-fast stumpings that left batsmen shell-shocked"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who debuted as a teenager and played international cricket for 24 years"
      },
      {
        "trivia": [
          "God of Cricket - 100 international centuries, a record never likely broken",
          "First cricketer to score 200 in an ODI innings vs South Africa 2010",
          "Played 200 Test matches - a record that stands alone",
          "2011 World Cup victory was his dream fulfilled in final year",
          "Called Little Master for his small frame and enormous skill"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who debuted as a teenager and played international cricket for 24 years"
      },
      {
        "trivia": [
          "God of Cricket - 100 international centuries, a record never likely broken",
          "First cricketer to score 200 in an ODI innings vs South Africa 2010",
          "Played 200 Test matches - a record that stands alone",
          "2011 World Cup victory was his dream fulfilled in final year",
          "Called Little Master for his small frame and enormous skill"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter famous for his patience who later coached India to a World Cup"
      },
      {
        "trivia": [
          "The Wall - almost impossible to dismiss in Test cricket",
          "Stood at crease for most balls faced in Test history",
          "Mentored India's World Cup 2024 winning team as head coach",
          "13288 Test runs - second highest for India after Tendulkar",
          "Known for impeccable technique and extraordinary mental strength"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter famous for his patience who later coached India to a World Cup"
      },
      {
        "trivia": [
          "The Wall - almost impossible to dismiss in Test cricket",
          "Stood at crease for most balls faced in Test history",
          "Mentored India's World Cup 2024 winning team as head coach",
          "13288 Test runs - second highest for India after Tendulkar",
          "Known for impeccable technique and extraordinary mental strength"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A left-hand batter who famously waved his shirt from a famous cricket ground's balcony"
      },
      {
        "trivia": [
          "Dada - transformed India into fearless fighters overseas",
          "Waved shirt at Lord's balcony after NatWest Series Final win 2002",
          "Mentored Dhoni, Yuvraj, Zaheer into world-class players",
          "Left-hand batting master with cover drives regarded as art",
          "Led India to 2003 World Cup Final against Australia"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A left-hand batter who famously waved his shirt from a famous cricket ground's balcony"
      },
      {
        "trivia": [
          "Dada - transformed India into fearless fighters overseas",
          "Waved shirt at Lord's balcony after NatWest Series Final win 2002",
          "Mentored Dhoni, Yuvraj, Zaheer into world-class players",
          "Left-hand batting master with cover drives regarded as art",
          "Led India to 2003 World Cup Final against Australia"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner who once bowled an entire Test innings with his jaw broken and bandaged"
      },
      {
        "trivia": [
          "Only second bowler ever to take all 10 wickets in a Test innings",
          "619 Test wickets - India's highest wicket-taker in Tests",
          "Bowled with a broken jaw bandaged up in Antigua Test 2002",
          "Nicknamed Jumbo for his relentless and accurate bowling",
          "Leg-spinner who was more accurate than most finger spinners"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner who once bowled an entire Test innings with his jaw broken and bandaged"
      },
      {
        "trivia": [
          "Only second bowler ever to take all 10 wickets in a Test innings",
          "619 Test wickets - India's highest wicket-taker in Tests",
          "Bowled with a broken jaw bandaged up in Antigua Test 2002",
          "Nicknamed Jumbo for his relentless and accurate bowling",
          "Leg-spinner who was more accurate than most finger spinners"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Pune Warriors",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils",
          "Sunrisers Hyderabad",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who defeated cancer and returned to win a World Cup"
      },
      {
        "trivia": [
          "Hit 6 sixes in an over off Stuart Broad in 2007 T20 World Cup",
          "Man of the Tournament in 2011 World Cup - 15 wickets and 362 runs",
          "Battled cancer and made a stunning comeback to cricket",
          "One of the finest fielders India ever produced in cover region",
          "His 58 vs Australia in 2011 WC semi-final was match-defining"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Pune Warriors",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils",
          "Sunrisers Hyderabad",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who defeated cancer and returned to win a World Cup"
      },
      {
        "trivia": [
          "Hit 6 sixes in an over off Stuart Broad in 2007 T20 World Cup",
          "Man of the Tournament in 2011 World Cup - 15 wickets and 362 runs",
          "Battled cancer and made a stunning comeback to cricket",
          "One of the finest fielders India ever produced in cover region",
          "His 58 vs Australia in 2011 WC semi-final was match-defining"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Chennai Super Kings",
          "Kolkata Knight Riders",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spinner who took the first hat-trick by an Indian in Test cricket"
      },
      {
        "trivia": [
          "Turbanator - spun India to victory in 2001 series vs Australia",
          "Took hat-trick vs Australia in Kolkata Test 2001 - first by Indian",
          "Key part of India's 2007 T20 WC and 2011 WC victories",
          "Slapped Sreesanth during IPL 2008 - one of cricket's big controversies",
          "417 Test wickets for India as their best off-spinner"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Chennai Super Kings",
          "Kolkata Knight Riders",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spinner who took the first hat-trick by an Indian in Test cricket"
      },
      {
        "trivia": [
          "Turbanator - spun India to victory in 2001 series vs Australia",
          "Took hat-trick vs Australia in Kolkata Test 2001 - first by Indian",
          "Key part of India's 2007 T20 WC and 2011 WC victories",
          "Slapped Sreesanth during IPL 2008 - one of cricket's big controversies",
          "417 Test wickets for India as their best off-spinner"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer who once placed jelly beans on the pitch during an England tour as mind games"
      },
      {
        "trivia": [
          "India's most dangerous swing bowler in the 2000s",
          "Played key role in 2011 World Cup win with crucial wickets",
          "Left jelly beans on the pitch in England - mind games legend",
          "311 Test wickets for India as their best pace bowler",
          "Reverse swing at 140kmh made him unplayable in conditions"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer who once placed jelly beans on the pitch during an England tour as mind games"
      },
      {
        "trivia": [
          "India's most dangerous swing bowler in the 2000s",
          "Played key role in 2011 World Cup win with crucial wickets",
          "Left jelly beans on the pitch in England - mind games legend",
          "311 Test wickets for India as their best pace bowler",
          "Reverse swing at 140kmh made him unplayable in conditions"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A fast bowler with a completely unorthodox action who defended the final over in a World Cup final"
      },
      {
        "trivia": [
          "Unorthodox round-arm action makes him nearly unplayable",
          "Best death bowler in world cricket over last 5 years",
          "Took hat-trick vs West Indies in 2019 Test series",
          "ICC Test Cricketer of the Year 2023",
          "Yorker at 150kmh in final overs cannot be replicated"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A fast bowler with a completely unorthodox action who defended the final over in a World Cup final"
      },
      {
        "trivia": [
          "Unorthodox round-arm action makes him nearly unplayable",
          "Best death bowler in world cricket over last 5 years",
          "Took hat-trick vs West Indies in 2019 Test series",
          "ICC Test Cricketer of the Year 2023",
          "Yorker at 150kmh in final overs cannot be replicated"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rajasthan Royals",
          "Kochi Tuskers Kerala",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-arm spinning all-rounder known for his sword celebration after scoring centuries"
      },
      {
        "trivia": [
          "Sir Jadeja - voted best all-rounder in world cricket by many",
          "One of the finest fielders ever seen in cricket history",
          "Left-arm spin that turns and bounces viciously on good pitches",
          "Crucial lower-order runs in multiple big Test and WC games",
          "Sword celebration after centuries became a cultural moment"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rajasthan Royals",
          "Kochi Tuskers Kerala",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-arm spinning all-rounder known for his sword celebration after scoring centuries"
      },
      {
        "trivia": [
          "Sir Jadeja - voted best all-rounder in world cricket by many",
          "One of the finest fielders ever seen in cricket history",
          "Left-arm spin that turns and bounces viciously on good pitches",
          "Crucial lower-order runs in multiple big Test and WC games",
          "Sword celebration after centuries became a cultural moment"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Lucknow Super Giants",
          "Sunrisers Hyderabad",
          "Royal Challengers Bengaluru",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who scored centuries in all three formats of international cricket"
      },
      {
        "trivia": [
          "Scored centuries in all three formats of international cricket",
          "Wicket-keeper batter who adapted his game brilliantly for team",
          "Made stunning comebacks after injury and personal controversies",
          "Most consistent IPL run-scorer across multiple franchises",
          "Elegant technique with shots all around the wicket"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Lucknow Super Giants",
          "Sunrisers Hyderabad",
          "Royal Challengers Bengaluru",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who scored centuries in all three formats of international cricket"
      },
      {
        "trivia": [
          "Scored centuries in all three formats of international cricket",
          "Wicket-keeper batter who adapted his game brilliantly for team",
          "Made stunning comebacks after injury and personal controversies",
          "Most consistent IPL run-scorer across multiple franchises",
          "Elegant technique with shots all around the wicket"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener nicknamed Gabbar who performed his best cricket at major ICC tournaments"
      },
      {
        "trivia": [
          "Gabbar - loved performing at ICC tournaments consistently",
          "Most runs by an Indian in ICC Champions Trophy history",
          "Two consecutive Man of the Tournament awards in ICC events",
          "Left-hand opener with aggressive yet elegant batting style",
          "Led India in multiple bilateral ODI series as captain"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener nicknamed Gabbar who performed his best cricket at major ICC tournaments"
      },
      {
        "trivia": [
          "Gabbar - loved performing at ICC tournaments consistently",
          "Most runs by an Indian in ICC Champions Trophy history",
          "Two consecutive Man of the Tournament awards in ICC events",
          "Left-hand opener with aggressive yet elegant batting style",
          "Led India in multiple bilateral ODI series as captain"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A fast-bowling all-rounder who came back from a major back surgery to win a T20 World Cup"
      },
      {
        "trivia": [
          "Bowled the final over in 2024 T20 WC final to seal victory",
          "Comeback from back surgery was inspirational for fans",
          "Power-hitting all-rounder who can change games in 5 balls",
          "IPL captain for both Gujarat Titans and Mumbai Indians",
          "Match-winner with both bat and ball in T20 WC 2022 semi-final"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A fast-bowling all-rounder who came back from a major back surgery to win a T20 World Cup"
      },
      {
        "trivia": [
          "Bowled the final over in 2024 T20 WC final to seal victory",
          "Comeback from back surgery was inspirational for fans",
          "Power-hitting all-rounder who can change games in 5 balls",
          "IPL captain for both Gujarat Titans and Mumbai Indians",
          "Match-winner with both bat and ball in T20 WC 2022 semi-final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who held the ICC T20I number one ranking for two consecutive years"
      },
      {
        "trivia": [
          "SKY - ICC Men's T20I Cricketer of the Year 2022 and 2023",
          "360-degree batsman who hits to all parts of the ground",
          "Back-flick six over fine leg became a viral cricket sensation",
          "Crucial catch on boundary in 2024 T20 WC final vs South Africa",
          "Scored fastest T20I century for India in 45 balls"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who held the ICC T20I number one ranking for two consecutive years"
      },
      {
        "trivia": [
          "SKY - ICC Men's T20I Cricketer of the Year 2022 and 2023",
          "360-degree batsman who hits to all parts of the ground",
          "Back-flick six over fine leg became a viral cricket sensation",
          "Crucial catch on boundary in 2024 T20 WC final vs South Africa",
          "Scored fastest T20I century for India in 45 balls"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored a famous Test fifty at a ground India had never won at before"
      },
      {
        "trivia": [
          "Survived horrific car accident and returned to top-level cricket",
          "Hit match-winning 89 vs Australia in Brisbane Gabba 2021",
          "Most sixes by an Indian wicket-keeper in Test cricket",
          "Plays completely by instinct - reverses sweeps fast bowlers",
          "Called Baby Dhoni early in career for his fearless big-match style"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored a famous Test fifty at a ground India had never won at before"
      },
      {
        "trivia": [
          "Survived horrific car accident and returned to top-level cricket",
          "Hit match-winning 89 vs Australia in Brisbane Gabba 2021",
          "Most sixes by an Indian wicket-keeper in Test cricket",
          "Plays completely by instinct - reverses sweeps fast bowlers",
          "Called Baby Dhoni early in career for his fearless big-match style"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Kings XI Punjab",
          "Rising Pune Supergiant",
          "Rajasthan Royals",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spinning all-rounder who retired suddenly mid-tour after reaching 700 international wickets"
      },
      {
        "trivia": [
          "700+ international wickets - India's finest modern spinner",
          "Multiple ICC Cricketer of the Year awards in Test cricket",
          "Mankad dismissals that sparked worldwide cricket debate",
          "First spinner to score a Test hundred and take a five-fer in same match",
          "Retired suddenly during Australia tour 2024 on his own terms"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Kings XI Punjab",
          "Rising Pune Supergiant",
          "Rajasthan Royals",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spinning all-rounder who retired suddenly mid-tour after reaching 700 international wickets"
      },
      {
        "trivia": [
          "700+ international wickets - India's finest modern spinner",
          "Multiple ICC Cricketer of the Year awards in Test cricket",
          "Mankad dismissals that sparked worldwide cricket debate",
          "First spinner to score a Test hundred and take a five-fer in same match",
          "Retired suddenly during Australia tour 2024 on his own terms"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Delhi Capitals",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm pacer who became the highest wicket-taker in a single ODI World Cup tournament"
      },
      {
        "trivia": [
          "Took hat-trick vs Afghanistan in 2019 World Cup",
          "Most wickets in ICC ODI World Cup 2023 - 24 wickets in tournament",
          "7 wickets in a single WC 2023 match vs New Zealand",
          "Deadly seam movement both ways makes him unplayable",
          "Comeback from personal turmoil made 2023 WC run deeply emotional"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Delhi Capitals",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm pacer who became the highest wicket-taker in a single ODI World Cup tournament"
      },
      {
        "trivia": [
          "Took hat-trick vs Afghanistan in 2019 World Cup",
          "Most wickets in ICC ODI World Cup 2023 - 24 wickets in tournament",
          "7 wickets in a single WC 2023 match vs New Zealand",
          "Deadly seam movement both ways makes him unplayable",
          "Comeback from personal turmoil made 2023 WC run deeply emotional"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A young left-hand opener who rose from selling street food in Mumbai to opening for India"
      },
      {
        "trivia": [
          "Rose from selling pani puri on Mumbai streets to Test opener",
          "Scored 712 runs in England Test series 2024 - a record",
          "Youngest Indian to score a T20I century",
          "Explosive left-handed opener with extraordinary natural talent",
          "His rags-to-riches story is one of cricket's greatest"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A young left-hand opener who rose from selling street food in Mumbai to opening for India"
      },
      {
        "trivia": [
          "Rose from selling pani puri on Mumbai streets to Test opener",
          "Scored 712 runs in England Test series 2024 - a record",
          "Youngest Indian to score a T20I century",
          "Explosive left-handed opener with extraordinary natural talent",
          "His rags-to-riches story is one of cricket's greatest"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener whose unbeaten knock in a World Cup final was overshadowed by a last-ball six"
      },
      {
        "trivia": [
          "Scored 97 in 2011 WC Final - the innings that set up India's victory",
          "Won 2007 T20 WC and 2011 ODI WC as key opener for India",
          "Led KKR to two IPL titles as captain in 2012 and 2014",
          "Now India's head coach - led team to T20 WC 2024 title as mentor",
          "Fierce and aggressive competitor who never backed down"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener whose unbeaten knock in a World Cup final was overshadowed by a last-ball six"
      },
      {
        "trivia": [
          "Scored 97 in 2011 WC Final - the innings that set up India's victory",
          "Won 2007 T20 WC and 2011 ODI WC as key opener for India",
          "Led KKR to two IPL titles as captain in 2012 and 2014",
          "Now India's head coach - led team to T20 WC 2024 title as mentor",
          "Fierce and aggressive competitor who never backed down"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who retired on the same day as his captain in an emotional farewell"
      },
      {
        "trivia": [
          "Mr IPL - most consistent performer in IPL history for years",
          "First Indian to score centuries in all three international formats",
          "Man of the Match in 2011 WC quarter-final vs Australia",
          "Retired on same day as MS Dhoni in emotional joint farewell",
          "CSK's most beloved player and Dhoni's trusted lieutenant"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who retired on the same day as his captain in an emotional farewell"
      },
      {
        "trivia": [
          "Mr IPL - most consistent performer in IPL history for years",
          "First Indian to score centuries in all three international formats",
          "Man of the Match in 2011 WC quarter-final vs Australia",
          "Retired on same day as MS Dhoni in emotional joint farewell",
          "CSK's most beloved player and Dhoni's trusted lieutenant"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Rising Pune Supergiant",
          "Delhi Capitals",
          "Kolkata Knight Riders",
          "Mumbai Indians",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who captained India to victory at a ground they had never won at before"
      },
      {
        "trivia": [
          "Led India to historic Adelaide Test win vs Australia 2020",
          "Captained India to first-ever win at Gabba Brisbane 2021",
          "Scored 112 in Adelaide as stand-in captain - a legendary knock",
          "Calm and composed leader who commanded deep team respect",
          "Elegant technique particularly effective in overseas conditions"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Rising Pune Supergiant",
          "Delhi Capitals",
          "Kolkata Knight Riders",
          "Mumbai Indians",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who captained India to victory at a ground they had never won at before"
      },
      {
        "trivia": [
          "Led India to historic Adelaide Test win vs Australia 2020",
          "Captained India to first-ever win at Gabba Brisbane 2021",
          "Scored 112 in Adelaide as stand-in captain - a legendary knock",
          "Calm and composed leader who commanded deep team respect",
          "Elegant technique particularly effective in overseas conditions"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who faced nearly 1000 balls in a single Test series to blunt Australia's attack"
      },
      {
        "trivia": [
          "Faced 928 balls in 2020-21 Australia series to blunt their attack",
          "India's Test Wall after Rahul Dravid - patient accumulator",
          "Scored big in Sussex county cricket to revive Test career",
          "Took body blows from Cummins and Starc without flinching",
          "Most patient batsman India produced since Dravid retired"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who faced nearly 1000 balls in a single Test series to blunt Australia's attack"
      },
      {
        "trivia": [
          "Faced 928 balls in 2020-21 Australia series to blunt their attack",
          "India's Test Wall after Rahul Dravid - patient accumulator",
          "Scored big in Sussex county cricket to revive Test career",
          "Took body blows from Cummins and Starc without flinching",
          "Most patient batsman India produced since Dravid retired"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders",
          "Mumbai Indians",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who hit a six off the last ball to win a tournament final at age 33"
      },
      {
        "trivia": [
          "Hit six off last ball to win Nidahas Trophy 2018 final dramatically",
          "Reinvented his career as a T20 finisher in his late 30s",
          "Selected for 2022 T20 WC purely on IPL finishing ability",
          "Now one of cricket's most respected TV analysts and commentators",
          "Outlasted multiple India wicket-keepers across 17-year career"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders",
          "Mumbai Indians",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who hit a six off the last ball to win a tournament final at age 33"
      },
      {
        "trivia": [
          "Hit six off last ball to win Nidahas Trophy 2018 final dramatically",
          "Reinvented his career as a T20 finisher in his late 30s",
          "Selected for 2022 T20 WC purely on IPL finishing ability",
          "Now one of cricket's most respected TV analysts and commentators",
          "Outlasted multiple India wicket-keepers across 17-year career"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who waited years for his India chance and scored a century on T20I debut"
      },
      {
        "trivia": [
          "Scored century on T20I debut for India vs South Africa",
          "Led Rajasthan Royals to 2022 IPL Final as captain",
          "Elegant right-hand batter who plays beautiful classical strokes",
          "Waited years for consistent India chances before cementing spot",
          "One of IPL's most technically gifted batters to watch"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A wicket-keeper batter who waited years for his India chance and scored a century on T20I debut"
      },
      {
        "trivia": [
          "Scored century on T20I debut for India vs South Africa",
          "Led Rajasthan Royals to 2022 IPL Final as captain",
          "Elegant right-hand batter who plays beautiful classical strokes",
          "Waited years for consistent India chances before cementing spot",
          "One of IPL's most technically gifted batters to watch"
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
        "role": "Bowler"
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
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner who holds the record for most T20I wickets by an Indian wrist-spin bowler"
      },
      {
        "trivia": [
          "Most T20I wickets by an Indian leg-spinner ever",
          "Best leg-spinner in world T20 cricket for two years running",
          "Googly and flipper combination dismissed top batters regularly",
          "Man of the Series in multiple bilateral T20I series for India",
          "Known for hilarious social media reels with wife Dhanashree"
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
        "role": "Bowler"
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
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner who holds the record for most T20I wickets by an Indian wrist-spin bowler"
      },
      {
        "trivia": [
          "Most T20I wickets by an Indian leg-spinner ever",
          "Best leg-spinner in world T20 cricket for two years running",
          "Googly and flipper combination dismissed top batters regularly",
          "Man of the Series in multiple bilateral T20I series for India",
          "Known for hilarious social media reels with wife Dhanashree"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm pacer who stayed on tour after his father passed away and took a five-wicket haul on debut"
      },
      {
        "trivia": [
          "Father died during Australia tour 2020 but stayed for team",
          "Took 5-fer on Test debut after personal tragedy - emotional story",
          "Most wickets in 2023 ODI World Cup from pace bowling side",
          "Aggressive pacer who loves the battle with top-order batters",
          "Grew from net bowler to India's leading pacer in 3 years"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm pacer who stayed on tour after his father passed away and took a five-wicket haul on debut"
      },
      {
        "trivia": [
          "Father died during Australia tour 2020 but stayed for team",
          "Took 5-fer on Test debut after personal tragedy - emotional story",
          "Most wickets in 2023 ODI World Cup from pace bowling side",
          "Aggressive pacer who loves the battle with top-order batters",
          "Grew from net bowler to India's leading pacer in 3 years"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-arm spinning all-rounder who took 27 wickets in just 3 Test matches at home"
      },
      {
        "trivia": [
          "Took 27 wickets in just 3 Tests vs England in 2021 home series",
          "Left-arm spin on Indian pitches is nearly impossible to handle",
          "Crucial lower-order hitting wins games for India regularly",
          "Consistent performer who delivers in both batting and bowling",
          "Underrated all-rounder who never gets the credit he deserves"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Capitals",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-arm spinning all-rounder who took 27 wickets in just 3 Test matches at home"
      },
      {
        "trivia": [
          "Took 27 wickets in just 3 Tests vs England in 2021 home series",
          "Left-arm spin on Indian pitches is nearly impossible to handle",
          "Crucial lower-order hitting wins games for India regularly",
          "Consistent performer who delivers in both batting and bowling",
          "Underrated all-rounder who never gets the credit he deserves"
        ]
      }
    ]
  },
  {
    "name": "SHREY",
    "meta": {
      "shortened": true,
      "fullName": "Shreyas Iyer"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who scored a century on Test debut and later captained his IPL team to a title"
      },
      {
        "trivia": [
          "Led KKR to IPL 2024 title as captain",
          "Scored century on Test debut vs New Zealand in 2021",
          "Powerful off-side player who drives through covers beautifully",
          "Dropped from India squad multiple times but always returned",
          "Struggled vs short ball but worked hard to overcome the weakness"
        ]
      }
    ]
  },
  {
    "name": "IYER",
    "meta": {
      "shortened": false,
      "fullName": "Shreyas Iyer"
    },
    "hints": [
      {
        "age": 30
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Kolkata Knight Riders"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who scored a century on Test debut and later captained his IPL team to a title"
      },
      {
        "trivia": [
          "Led KKR to IPL 2024 title as captain",
          "Scored century on Test debut vs New Zealand in 2021",
          "Powerful off-side player who drives through covers beautifully",
          "Dropped from India squad multiple times but always returned",
          "Struggled vs short ball but worked hard to overcome the weakness"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored the second fastest ODI double century in cricket history"
      },
      {
        "trivia": [
          "Scored 210 vs Bangladesh in ODI - second fastest double century",
          "Explosive left-hand opener who hits massive sixes regularly",
          "Took a break from cricket for mental health in 2024 - brave decision",
          "IPL finisher who can also open the batting explosively",
          "Powerful hitting earned him India spot at very young age"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored the second fastest ODI double century in cricket history"
      },
      {
        "trivia": [
          "Scored 210 vs Bangladesh in ODI - second fastest double century",
          "Explosive left-hand opener who hits massive sixes regularly",
          "Took a break from cricket for mental health in 2024 - brave decision",
          "IPL finisher who can also open the batting explosively",
          "Powerful hitting earned him India spot at very young age"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand batter from a humble background who hit five sixes off the last five balls of an IPL match"
      },
      {
        "trivia": [
          "Hit 5 consecutive sixes off last 5 balls to win vs Gujarat Titans",
          "One of cricket's most extraordinary IPL finishes ever seen",
          "Poverty to stardom story resonated deeply across all of India",
          "Reliable T20 finisher who forces bowlers to bowl perfect deliveries",
          "Emotional India T20I debut after years of waiting and patience"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand batter from a humble background who hit five sixes off the last five balls of an IPL match"
      },
      {
        "trivia": [
          "Hit 5 consecutive sixes off last 5 balls to win vs Gujarat Titans",
          "One of cricket's most extraordinary IPL finishes ever seen",
          "Poverty to stardom story resonated deeply across all of India",
          "Reliable T20 finisher who forces bowlers to bowl perfect deliveries",
          "Emotional India T20I debut after years of waiting and patience"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A young left-hand batter who became the youngest player to score two consecutive T20I centuries"
      },
      {
        "trivia": [
          "Scored two consecutive T20I centuries vs West Indies 2024",
          "Youngest player to score two consecutive T20I hundreds",
          "Mumbai Indians most exciting young talent in recent IPL seasons",
          "Left-hand batter with extraordinary composure for his age",
          "Seen as future of Indian middle-order for the next decade"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A young left-hand batter who became the youngest player to score two consecutive T20I centuries"
      },
      {
        "trivia": [
          "Scored two consecutive T20I centuries vs West Indies 2024",
          "Youngest player to score two consecutive T20I hundreds",
          "Mumbai Indians most exciting young talent in recent IPL seasons",
          "Left-hand batter with extraordinary composure for his age",
          "Seen as future of Indian middle-order for the next decade"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A power-hitting all-rounder who captained a debutant IPL franchise to the title in their very first season"
      },
      {
        "trivia": [
          "2024 T20 WC final over - defended 16 runs to win the World Cup",
          "Comeback from back surgery inspired a generation of young players",
          "Power-hitting that can change T20 matches in single over",
          "Captained Gujarat Titans to IPL 2022 title in debut season",
          "Signed record-breaking contract back to Mumbai Indians 2024"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Mumbai Indians",
          "Gujarat Titans"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A power-hitting all-rounder who captained a debutant IPL franchise to the title in their very first season"
      },
      {
        "trivia": [
          "2024 T20 WC final over - defended 16 runs to win the World Cup",
          "Comeback from back surgery inspired a generation of young players",
          "Power-hitting that can change T20 matches in single over",
          "Captained Gujarat Titans to IPL 2022 title in debut season",
          "Signed record-breaking contract back to Mumbai Indians 2024"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium-Fast"
      },
      {
        "openingHint": "A right-arm swing bowler who took a hat-trick in T20I cricket and swings the ball both ways in the powerplay"
      },
      {
        "trivia": [
          "Best powerplay swing bowler in T20 cricket with both ways movement",
          "Took hat-trick vs Bangladesh in T20I cricket",
          "Scored crucial lower-order runs in several close matches for India",
          "Swings the new ball both ways to trouble openers consistently",
          "Comeback from serious injury made IPL 2022 return emotional"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium-Fast"
      },
      {
        "openingHint": "A right-arm swing bowler who took a hat-trick in T20I cricket and swings the ball both ways in the powerplay"
      },
      {
        "trivia": [
          "Best powerplay swing bowler in T20 cricket with both ways movement",
          "Took hat-trick vs Bangladesh in T20I cricket",
          "Scored crucial lower-order runs in several close matches for India",
          "Swings the new ball both ways to trouble openers consistently",
          "Comeback from serious injury made IPL 2022 return emotional"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Wrist-Spin"
      },
      {
        "openingHint": "A left-arm wrist-spinner who took a hat-trick in ODI cricket and is virtually impossible to pick from hand"
      },
      {
        "trivia": [
          "Chinaman bowler who is virtually impossible to read from hand",
          "Took hat-trick vs Australia in ODI cricket 2017",
          "Best left-arm wrist-spinner in world cricket currently",
          "Revived career with Delhi Capitals after being dropped for years",
          "Deadly in ODIs where batters cannot use sweep as easily"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Kolkata Knight Riders",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Wrist-Spin"
      },
      {
        "openingHint": "A left-arm wrist-spinner who took a hat-trick in ODI cricket and is virtually impossible to pick from hand"
      },
      {
        "trivia": [
          "Chinaman bowler who is virtually impossible to read from hand",
          "Took hat-trick vs Australia in ODI cricket 2017",
          "Best left-arm wrist-spinner in world cricket currently",
          "Revived career with Delhi Capitals after being dropped for years",
          "Deadly in ODIs where batters cannot use sweep as easily"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand opener who scored two triple centuries in Tests with a see-ball-hit-ball philosophy"
      },
      {
        "trivia": [
          "See ball hit ball philosophy - one of cricket's most entertaining batters",
          "Scored 319 vs South Africa in Tests - India's highest ever Test score",
          "Scored 293 vs Sri Lanka - two triple centuries in Tests, only Indian ever",
          "First Indian to score 300+ in Tests, did it twice which is extraordinary",
          "Named Nawab of Najafgarh - legendary with bat and personality"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand opener who scored two triple centuries in Tests with a see-ball-hit-ball philosophy"
      },
      {
        "trivia": [
          "See ball hit ball philosophy - one of cricket's most entertaining batters",
          "Scored 319 vs South Africa in Tests - India's highest ever Test score",
          "Scored 293 vs Sri Lanka - two triple centuries in Tests, only Indian ever",
          "First Indian to score 300+ in Tests, did it twice which is extraordinary",
          "Named Nawab of Najafgarh - legendary with bat and personality"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Deccan Chargers"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter whose 281 against Australia in a Test match is considered one of the greatest innings ever"
      },
      {
        "trivia": [
          "281 vs Australia in Kolkata 2001 - one of cricket's greatest ever innings",
          "Very Very Special - his nickname perfectly described his batting style",
          "Won the 2001 Kolkata Test from an almost impossible position",
          "Best player of fast bowling in Indian batting history arguably",
          "His partnership with Dravid in 2001 Kolkata is cricket legend"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Deccan Chargers"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter whose 281 against Australia in a Test match is considered one of the greatest innings ever"
      },
      {
        "trivia": [
          "281 vs Australia in Kolkata 2001 - one of cricket's greatest ever innings",
          "Very Very Special - his nickname perfectly described his batting style",
          "Won the 2001 Kolkata Test from an almost impossible position",
          "Best player of fast bowling in Indian batting history arguably",
          "His partnership with Dravid in 2001 Kolkata is cricket legend"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A fast-bowling all-rounder who led India to their first ever World Cup title in 1983"
      },
      {
        "trivia": [
          "India's greatest all-rounder - led India to 1983 World Cup victory",
          "Scored 175 not out vs Zimbabwe in 1983 WC to save India's campaign",
          "434 Test wickets as India's best pace bowler for a generation",
          "First Indian to take 200, 300 and 400 Test wickets in history",
          "His famous catch of Richard Hadlee at Lord's in 1983 WC Final"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A fast-bowling all-rounder who led India to their first ever World Cup title in 1983"
      },
      {
        "trivia": [
          "India's greatest all-rounder - led India to 1983 World Cup victory",
          "Scored 175 not out vs Zimbabwe in 1983 WC to save India's campaign",
          "434 Test wickets as India's best pace bowler for a generation",
          "First Indian to take 200, 300 and 400 Test wickets in history",
          "His famous catch of Richard Hadlee at Lord's in 1983 WC Final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who was the first batter in history to reach 10000 Test runs"
      },
      {
        "trivia": [
          "First batsman to score 10000 Test runs - a barrier once thought impossible",
          "Wore a helmet made of sponge to face Lillee and Thomson in 1977",
          "34 Test centuries - world record at time of his retirement",
          "Little Master of India - Sachin's predecessor and idol",
          "Played through the era of terrifying West Indies fast bowling"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who was the first batter in history to reach 10000 Test runs"
      },
      {
        "trivia": [
          "First batsman to score 10000 Test runs - a barrier once thought impossible",
          "Wore a helmet made of sponge to face Lillee and Thomson in 1977",
          "34 Test centuries - world record at time of his retirement",
          "Little Master of India - Sachin's predecessor and idol",
          "Played through the era of terrifying West Indies fast bowling"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab",
          "Sunrisers Hyderabad",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm all-rounder who took a hat-trick in the very first over of a Test match"
      },
      {
        "trivia": [
          "Took hat-trick in first over of a Test match vs Pakistan in 2006",
          "First bowler to take a hat-trick in Test cricket first over",
          "Won 2007 T20 WC and was key player in India's bowling attack",
          "Swung the ball devastatingly at medium pace - tough to play",
          "Along with brother Yusuf was one of cricket's great sibling duos"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "India",
          "Delhi Daredevils",
          "Kings XI Punjab",
          "Sunrisers Hyderabad",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm all-rounder who took a hat-trick in the very first over of a Test match"
      },
      {
        "trivia": [
          "Took hat-trick in first over of a Test match vs Pakistan in 2006",
          "First bowler to take a hat-trick in Test cricket first over",
          "Won 2007 T20 WC and was key player in India's bowling attack",
          "Swung the ball devastatingly at medium pace - tough to play",
          "Along with brother Yusuf was one of cricket's great sibling duos"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals",
          "Pune Warriors",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-hand batter with an unusual fidgety technique who averaged over 60 in Test cricket"
      },
      {
        "trivia": [
          "Test batting average of 60+ - second greatest of modern era",
          "Survived ball-tampering scandal and came back stronger than ever",
          "Dominated England in 2019 Ashes despite concussion injury",
          "Unique unorthodox fidgety technique baffles every bowler worldwide",
          "Three ICC World Test Championship medals across career"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals",
          "Pune Warriors",
          "Rising Pune Supergiant"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-hand batter with an unusual fidgety technique who averaged over 60 in Test cricket"
      },
      {
        "trivia": [
          "Test batting average of 60+ - second greatest of modern era",
          "Survived ball-tampering scandal and came back stronger than ever",
          "Dominated England in 2019 Ashes despite concussion injury",
          "Unique unorthodox fidgety technique baffles every bowler worldwide",
          "Three ICC World Test Championship medals across career"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A left-hand opener who was banned from leadership after a ball-tampering scandal but made a full comeback"
      },
      {
        "trivia": [
          "Destructive left-handed opener who feared no bowler on earth",
          "Led Australia batting in 2015 and 2023 World Cup winning campaigns",
          "Redemption story after ball-tampering ban and leadership ban",
          "Over 5000 Test runs with 26 centuries in 112 Tests",
          "Emotional farewell Test in Sydney in January 2024"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A left-hand opener who was banned from leadership after a ball-tampering scandal but made a full comeback"
      },
      {
        "trivia": [
          "Destructive left-handed opener who feared no bowler on earth",
          "Led Australia batting in 2015 and 2023 World Cup winning campaigns",
          "Redemption story after ball-tampering ban and leadership ban",
          "Over 5000 Test runs with 26 centuries in 112 Tests",
          "Emotional farewell Test in Sydney in January 2024"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who is also his country's Test captain and bought for a record IPL price"
      },
      {
        "trivia": [
          "World number one Test bowler and Australia captain simultaneously",
          "Led Australia to 2023 ODI World Cup victory defeating India in final",
          "Consistent 150kmh pace with ability to swing the ball both ways",
          "Won ICC World Test Championship 2021 and 2023 as key bowler",
          "Most expensive overseas buy in IPL history at one point"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who is also his country's Test captain and bought for a record IPL price"
      },
      {
        "trivia": [
          "World number one Test bowler and Australia captain simultaneously",
          "Led Australia to 2023 ODI World Cup victory defeating India in final",
          "Consistent 150kmh pace with ability to swing the ball both ways",
          "Won ICC World Test Championship 2021 and 2023 as key bowler",
          "Most expensive overseas buy in IPL history at one point"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who captained Australia to three consecutive World Cups and won them all"
      },
      {
        "trivia": [
          "Led Australia to back-to-back World Cups in 2003 and 2007",
          "13378 Test runs and 28 centuries across brilliant career",
          "Pull shots off express pace bowlers played with breathtaking ease",
          "Won 3 consecutive World Cups - 99, 03, 07 as player",
          "Most successful Australian captain of all time statistically"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who captained Australia to three consecutive World Cups and won them all"
      },
      {
        "trivia": [
          "Led Australia to back-to-back World Cups in 2003 and 2007",
          "13378 Test runs and 28 centuries across brilliant career",
          "Pull shots off express pace bowlers played with breathtaking ease",
          "Won 3 consecutive World Cups - 99, 03, 07 as player",
          "Most successful Australian captain of all time statistically"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner whose first Ashes delivery dismissed a batsman who had no idea what happened to the ball"
      },
      {
        "trivia": [
          "Ball of the century to dismiss Mike Gatting at Old Trafford 1993",
          "708 Test wickets - greatest leg-spinner of all time by far",
          "Led Rajasthan Royals to IPL 2008 title as player-captain",
          "Named in Wisden's five cricketers of the 20th century",
          "Passed away suddenly in March 2022 - cricket mourned globally"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A leg-spinner whose first Ashes delivery dismissed a batsman who had no idea what happened to the ball"
      },
      {
        "trivia": [
          "Ball of the century to dismiss Mike Gatting at Old Trafford 1993",
          "708 Test wickets - greatest leg-spinner of all time by far",
          "Led Rajasthan Royals to IPL 2008 title as player-captain",
          "Named in Wisden's five cricketers of the 20th century",
          "Passed away suddenly in March 2022 - cricket mourned globally"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Australia",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand wicket-keeper batter who would walk off even when the umpire hadn't raised his finger"
      },
      {
        "trivia": [
          "Walked even without umpire raising finger when he edged it",
          "Fastest ever WC Final century - 57 balls vs Sri Lanka 2007",
          "Revolutionised wicket-keeper batting across all formats",
          "4000+ Test runs while keeping wicket at world-class level",
          "Destroyed bowlers with brutal and clean left-handed hitting"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Australia",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand wicket-keeper batter who would walk off even when the umpire hadn't raised his finger"
      },
      {
        "trivia": [
          "Walked even without umpire raising finger when he edged it",
          "Fastest ever WC Final century - 57 balls vs Sri Lanka 2007",
          "Revolutionised wicket-keeper batting across all formats",
          "4000+ Test runs while keeping wicket at world-class level",
          "Destroyed bowlers with brutal and clean left-handed hitting"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm fast-medium bowler who would predict exactly how many wickets he would take before each series"
      },
      {
        "trivia": [
          "Predicted exactly how many wickets he would take in each series",
          "563 Test wickets at under 22 - best average for a fast bowler",
          "Consistent line and length on off-stump made him ungetable",
          "Won 3 World Cups with Australia including 99, 03, 07",
          "Dismissed Sachin Tendulkar 8 times in Test cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm fast-medium bowler who would predict exactly how many wickets he would take before each series"
      },
      {
        "trivia": [
          "Predicted exactly how many wickets he would take in each series",
          "563 Test wickets at under 22 - best average for a fast bowler",
          "Consistent line and length on off-stump made him ungetable",
          "Won 3 World Cups with Australia including 99, 03, 07",
          "Dismissed Sachin Tendulkar 8 times in Test cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler who was the best bowler in two different ODI World Cup winning campaigns"
      },
      {
        "trivia": [
          "Fastest bowler in 2015 World Cup with consistent 150+ kmh pace",
          "Best bowler in both 2015 and 2023 ODI World Cups - both won",
          "In-swinging yorkers are virtually unplayable in death overs",
          "10 wickets in a Test match multiple times in his career",
          "Record-breaking IPL 2024 auction price for an overseas player"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler who was the best bowler in two different ODI World Cup winning campaigns"
      },
      {
        "trivia": [
          "Fastest bowler in 2015 World Cup with consistent 150+ kmh pace",
          "Best bowler in both 2015 and 2023 ODI World Cups - both won",
          "In-swinging yorkers are virtually unplayable in death overs",
          "10 wickets in a Test match multiple times in his career",
          "Record-breaking IPL 2024 auction price for an overseas player"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler with a famous moustache who took 37 wickets in a single Ashes series"
      },
      {
        "trivia": [
          "Destroyed England in 2013-14 Ashes taking 37 wickets in 5 Tests",
          "Left-arm fast bowler with terrifying hostile pace and aggression",
          "ICC Cricketer of the Year in 2009 and again in 2014",
          "Long hostile spells psychologically wore down all batsmen",
          "His iconic moustache became as famous as his fierce bowling"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler with a famous moustache who took 37 wickets in a single Ashes series"
      },
      {
        "trivia": [
          "Destroyed England in 2013-14 Ashes taking 37 wickets in 5 Tests",
          "Left-arm fast bowler with terrifying hostile pace and aggression",
          "ICC Cricketer of the Year in 2009 and again in 2014",
          "Long hostile spells psychologically wore down all batsmen",
          "His iconic moustache became as famous as his fierce bowling"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who broke the world Test record with a score of 380 against Zimbabwe"
      },
      {
        "trivia": [
          "Scored 380 vs Zimbabwe in 2003 - then world record Test score",
          "Dominated with massive backlift and front-foot power hitting",
          "Key part of Australia's 2003 and 2007 World Cup victories",
          "Could single-handedly destroy any bowling attack on good days",
          "Passionate about faith, family, fishing and cooking"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who broke the world Test record with a score of 380 against Zimbabwe"
      },
      {
        "trivia": [
          "Scored 380 vs Zimbabwe in 2003 - then world record Test score",
          "Dominated with massive backlift and front-foot power hitting",
          "Key part of Australia's 2003 and 2007 World Cup victories",
          "Could single-handedly destroy any bowling attack on good days",
          "Passionate about faith, family, fishing and cooking"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand opener who was Man of the Match in both the WTC Final and the ODI World Cup Final in the same year"
      },
      {
        "trivia": [
          "Man of the Match in 2023 ODI World Cup Final vs India in Ahmedabad",
          "WTC Final hero - smashed 163 against India at The Oval 2023",
          "Left-handed opener who absolutely loves the biggest occasions",
          "Double century in Test matches showed his technical growth",
          "Australia's most dangerous and exciting batter currently"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Australia",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand opener who was Man of the Match in both the WTC Final and the ODI World Cup Final in the same year"
      },
      {
        "trivia": [
          "Man of the Match in 2023 ODI World Cup Final vs India in Ahmedabad",
          "WTC Final hero - smashed 163 against India at The Oval 2023",
          "Left-handed opener who absolutely loves the biggest occasions",
          "Double century in Test matches showed his technical growth",
          "Australia's most dangerous and exciting batter currently"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Mumbai Indians",
          "Perth Scorchers"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A tall all-rounder who was sold for a record price to a Mumbai IPL franchise as an explosive opener"
      },
      {
        "trivia": [
          "Sold for record Rs 17.5 crore to Mumbai Indians in IPL 2023 auction",
          "Explosive T20 opener who hits the ball enormous distances",
          "Fast bowling all-rounder who adds crucial balance to any team",
          "Test hundreds showed his technique is world-class at top level",
          "Tall and powerful frame generates effortless pace and power"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Australia",
          "Mumbai Indians",
          "Perth Scorchers"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A tall all-rounder who was sold for a record price to a Mumbai IPL franchise as an explosive opener"
      },
      {
        "trivia": [
          "Sold for record Rs 17.5 crore to Mumbai Indians in IPL 2023 auction",
          "Explosive T20 opener who hits the ball enormous distances",
          "Fast bowling all-rounder who adds crucial balance to any team",
          "Test hundreds showed his technique is world-class at top level",
          "Tall and powerful frame generates effortless pace and power"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm fast-medium bowler regarded as the most accurate pacer in Australia alongside his captain"
      },
      {
        "trivia": [
          "Most accurate fast bowler in Australia alongside Cummins",
          "Won ODI World Cup 2023 and WTC Finals as key bowling component",
          "Hits the seam consistently to generate movement both ways",
          "Outstanding in English conditions during Ashes series",
          "His partnership with Starc and Cummins is the best trio in world cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Australia",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm fast-medium bowler regarded as the most accurate pacer in Australia alongside his captain"
      },
      {
        "trivia": [
          "Most accurate fast bowler in Australia alongside Cummins",
          "Won ODI World Cup 2023 and WTC Finals as key bowling component",
          "Hits the seam consistently to generate movement both ways",
          "Outstanding in English conditions during Ashes series",
          "His partnership with Starc and Cummins is the best trio in world cricket"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who is England's highest-ever Test run-scorer and one of the Fab Four"
      },
      {
        "trivia": [
          "England's greatest ever Test batter with 12000+ Test runs",
          "Four Test double centuries including one vs India",
          "Key player in England's historic 2019 ODI World Cup win",
          "Consistent world-class performer in all conditions globally",
          "One of the Fab Four alongside Williamson, Smith and Kohli"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who is England's highest-ever Test run-scorer and one of the Fab Four"
      },
      {
        "trivia": [
          "England's greatest ever Test batter with 12000+ Test runs",
          "Four Test double centuries including one vs India",
          "Key player in England's historic 2019 ODI World Cup win",
          "Consistent world-class performer in all conditions globally",
          "One of the Fab Four alongside Williamson, Smith and Kohli"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings",
          "Rising Pune Supergiant",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-hand all-rounder who hit an unbeaten match-winning innings when England needed 73 runs with 2 wickets left"
      },
      {
        "trivia": [
          "Won 2019 World Cup in Super Over after incredible 84 not out",
          "Unbeaten 135 to win Headingley Test vs Australia from 75-9",
          "Transformed England Test cricket with aggressive Bazball philosophy",
          "Best all-rounder in world cricket over last 3 years easily",
          "Retired from ODIs to focus on Test and franchise cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings",
          "Rising Pune Supergiant",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-hand all-rounder who hit an unbeaten match-winning innings when England needed 73 runs with 2 wickets left"
      },
      {
        "trivia": [
          "Won 2019 World Cup in Super Over after incredible 84 not out",
          "Unbeaten 135 to win Headingley Test vs Australia from 75-9",
          "Transformed England Test cricket with aggressive Bazball philosophy",
          "Best all-rounder in world cricket over last 3 years easily",
          "Retired from ODIs to focus on Test and franchise cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm swing bowler who became the first and only fast bowler in history to take 700 Test wickets"
      },
      {
        "trivia": [
          "700+ Test wickets - highest ever wicket count for a pace bowler",
          "Swing bowling in English conditions is virtually unplayable",
          "First and only fast bowler in history to take 700 Test wickets",
          "Still performing at elite international level in early 40s",
          "Best ever new-ball partnership with Stuart Broad in cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm swing bowler who became the first and only fast bowler in history to take 700 Test wickets"
      },
      {
        "trivia": [
          "700+ Test wickets - highest ever wicket count for a pace bowler",
          "Swing bowling in English conditions is virtually unplayable",
          "First and only fast bowler in history to take 700 Test wickets",
          "Still performing at elite international level in early 40s",
          "Best ever new-ball partnership with Stuart Broad in cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm bowler who was hit for six sixes in an over early in career and came back to take 600 Test wickets"
      },
      {
        "trivia": [
          "Hit for 6 sixes in an over by Yuvraj Singh in 2007 T20 WC",
          "Came back from that low to take 600+ Test wickets for England",
          "Dismissed Virat Kohli outside off-stump in iconic repeated pattern",
          "Retired on a high winning Ashes Test at The Oval in 2023",
          "His long rivalry with Australia defined an era of Ashes cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm bowler who was hit for six sixes in an over early in career and came back to take 600 Test wickets"
      },
      {
        "trivia": [
          "Hit for 6 sixes in an over by Yuvraj Singh in 2007 T20 WC",
          "Came back from that low to take 600+ Test wickets for England",
          "Dismissed Virat Kohli outside off-stump in iconic repeated pattern",
          "Retired on a high winning Ashes Test at The Oval in 2023",
          "His long rivalry with Australia defined an era of Ashes cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm all-rounder who consoled the opposing bowler after England won a famous Test by just 2 runs"
      },
      {
        "trivia": [
          "Freddie - hero of England's legendary 2005 Ashes win",
          "Consoled Brett Lee after England won 2005 Edgbaston by 2 runs",
          "Best all-rounder England produced in the modern era easily",
          "Became cricket coach after near-fatal Top Gear car crash",
          "Beloved for heart, courage and never-say-die attitude on field"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "England",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm all-rounder who consoled the opposing bowler after England won a famous Test by just 2 runs"
      },
      {
        "trivia": [
          "Freddie - hero of England's legendary 2005 Ashes win",
          "Consoled Brett Lee after England won 2005 Edgbaston by 2 runs",
          "Best all-rounder England produced in the modern era easily",
          "Became cricket coach after near-fatal Top Gear car crash",
          "Beloved for heart, courage and never-say-die attitude on field"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter born in South Africa who played for England and invented the controversial switch hit"
      },
      {
        "trivia": [
          "Switch hit against Murali was one of cricket's most audacious shots",
          "Scored 158 at The Oval to win 2005 Ashes for England",
          "Controversially sacked by England in 2014 after dressing room leaks",
          "South Africa-born who qualified through England residency",
          "Most entertainingly controversial English cricketer in history"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England",
          "Delhi Daredevils",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter born in South Africa who played for England and invented the controversial switch hit"
      },
      {
        "trivia": [
          "Switch hit against Murali was one of cricket's most audacious shots",
          "Scored 158 at The Oval to win 2005 Ashes for England",
          "Controversially sacked by England in 2014 after dressing room leaks",
          "South Africa-born who qualified through England residency",
          "Most entertainingly controversial English cricketer in history"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England",
          "Rajasthan Royals",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm express pacer who bowled the Super Over that won England the 2019 World Cup Final"
      },
      {
        "trivia": [
          "Bowled the Super Over that won England the 2019 World Cup Final",
          "157kmh bouncer that hit Steve Smith on the helmet in 2019 Ashes",
          "Multiple injury comebacks made his career story compelling",
          "One of cricket's most naturally gifted and express pace bowlers",
          "IPL sensation who changes games with sheer raw frightening pace"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "England",
          "Rajasthan Royals",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm express pacer who bowled the Super Over that won England the 2019 World Cup Final"
      },
      {
        "trivia": [
          "Bowled the Super Over that won England the 2019 World Cup Final",
          "157kmh bouncer that hit Steve Smith on the helmet in 2019 Ashes",
          "Multiple injury comebacks made his career story compelling",
          "One of cricket's most naturally gifted and express pace bowlers",
          "IPL sensation who changes games with sheer raw frightening pace"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "England",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand wicket-keeper batter whose Ashes dismissal while walking between overs sparked worldwide controversy"
      },
      {
        "trivia": [
          "Smashed 150+ off 100 balls multiple times in Test cricket",
          "Bizarre Ashes 2023 dismissal walking out of crease sparked huge row",
          "Transformed from keeper to pure batting match-winner at Test level",
          "Player of the series in multiple international campaigns for England",
          "Father David Bairstow also played Test cricket for England"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "England",
          "Sunrisers Hyderabad",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand wicket-keeper batter whose Ashes dismissal while walking between overs sparked worldwide controversy"
      },
      {
        "trivia": [
          "Smashed 150+ off 100 balls multiple times in Test cricket",
          "Bizarre Ashes 2023 dismissal walking out of crease sparked huge row",
          "Transformed from keeper to pure batting match-winner at Test level",
          "Player of the series in multiple international campaigns for England",
          "Father David Bairstow also played Test cricket for England"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who scored over 300 in a single Test innings at just 24 years of age"
      },
      {
        "trivia": [
          "Scored 300+ in a Test innings at age 25 vs Pakistan in 2022",
          "Fastest England batter to 2000 Test runs in history",
          "Plays the short ball better than any England batter in years",
          "Part of England's fearless Bazball Test cricket revolution",
          "Regarded as future England Test captain by many pundits"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "England"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who scored over 300 in a single Test innings at just 24 years of age"
      },
      {
        "trivia": [
          "Scored 300+ in a Test innings at age 25 vs Pakistan in 2022",
          "Fastest England batter to 2000 Test runs in history",
          "Plays the short ball better than any England batter in years",
          "Part of England's fearless Bazball Test cricket revolution",
          "Regarded as future England Test captain by many pundits"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies",
          "Royal Challengers Bengaluru",
          "Pune Warriors",
          "Kings XI Punjab",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand opener who calls himself Universe Boss and holds the record for most T20 sixes ever"
      },
      {
        "trivia": [
          "Universe Boss - most sixes in T20 cricket history worldwide",
          "Only man to score a Test triple century and T20I century",
          "175 not out off 66 balls for RCB vs PWI - highest IPL score ever",
          "Opened batting in 2012 T20 WC and destroyed every bowling attack",
          "Biggest showman in cricket history - loved every spotlight moment"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies",
          "Royal Challengers Bengaluru",
          "Pune Warriors",
          "Kings XI Punjab",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A left-hand opener who calls himself Universe Boss and holds the record for most T20 sixes ever"
      },
      {
        "trivia": [
          "Universe Boss - most sixes in T20 cricket history worldwide",
          "Only man to score a Test triple century and T20I century",
          "175 not out off 66 balls for RCB vs PWI - highest IPL score ever",
          "Opened batting in 2012 T20 WC and destroyed every bowling attack",
          "Biggest showman in cricket history - loved every spotlight moment"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand batter who holds the highest individual score in Test cricket history with 400 not out"
      },
      {
        "trivia": [
          "Holds world record - 400 not out vs England in Antigua 2004",
          "First to reclaim world record after Hayden took it briefly",
          "501 not out in first-class cricket for Warwickshire - another record",
          "Brilliant left-hander who took on the world alone to save WI cricket",
          "Prince of Trinidad - carried West Indies cricket on his shoulders"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand batter who holds the highest individual score in Test cricket history with 400 not out"
      },
      {
        "trivia": [
          "Holds world record - 400 not out vs England in Antigua 2004",
          "First to reclaim world record after Hayden took it briefly",
          "501 not out in first-class cricket for Warwickshire - another record",
          "Brilliant left-hander who took on the world alone to save WI cricket",
          "Prince of Trinidad - carried West Indies cricket on his shoulders"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who scored the fastest ODI century in history in just 56 deliveries"
      },
      {
        "trivia": [
          "Scored ODI hundred in fewest balls ever - 56 deliveries vs England 1986",
          "Led West Indies to 1975 and 1979 World Cup wins as key batsman",
          "Feared no bowler on earth - chewed gum and hit sixes casually",
          "Named greatest West Indian cricketer of the 20th century",
          "Intimidating presence at the crease that psyched out all bowlers"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "West Indies"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who scored the fastest ODI century in history in just 56 deliveries"
      },
      {
        "trivia": [
          "Scored ODI hundred in fewest balls ever - 56 deliveries vs England 1986",
          "Led West Indies to 1975 and 1979 World Cup wins as key batsman",
          "Feared no bowler on earth - chewed gum and hit sixes casually",
          "Named greatest West Indian cricketer of the 20th century",
          "Intimidating presence at the crease that psyched out all bowlers"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Mumbai Indians",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand power-hitting all-rounder who hit six sixes in a single over in T20I cricket"
      },
      {
        "trivia": [
          "Hit 6 sixes in an over in T20I cricket vs Sri Lanka 2021",
          "Key player in multiple Mumbai Indians IPL title wins",
          "One of the best fielders and finishers in all of T20 cricket",
          "West Indies T20 captain who led them through their best era",
          "Power-hitting made him a T20 franchise favourite around the globe"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Mumbai Indians",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand power-hitting all-rounder who hit six sixes in a single over in T20I cricket"
      },
      {
        "trivia": [
          "Hit 6 sixes in an over in T20I cricket vs Sri Lanka 2021",
          "Key player in multiple Mumbai Indians IPL title wins",
          "One of the best fielders and finishers in all of T20 cricket",
          "West Indies T20 captain who led them through their best era",
          "Power-hitting made him a T20 franchise favourite around the globe"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Chennai Super Kings",
          "Mumbai Indians",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder whose Champion song celebrations after the 2016 World Cup went globally viral"
      },
      {
        "trivia": [
          "Champion song celebrations after WI 2016 WC win went globally viral",
          "Death bowling made him one of the best T20 bowlers of his era",
          "2016 T20 WC hero with crucial boundary in famous final over",
          "IPL legend with CSK across multiple seasons - crowd favourite",
          "Entertainer on and off the field - cricket's biggest showman"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Chennai Super Kings",
          "Mumbai Indians",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder whose Champion song celebrations after the 2016 World Cup went globally viral"
      },
      {
        "trivia": [
          "Champion song celebrations after WI 2016 WC win went globally viral",
          "Death bowling made him one of the best T20 bowlers of his era",
          "2016 T20 WC hero with crucial boundary in famous final over",
          "IPL legend with CSK across multiple seasons - crowd favourite",
          "Entertainer on and off the field - cricket's biggest showman"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders",
          "Trinidad and Tobago"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A mystery off-spinner who remodelled his action twice after being called for chucking and came back stronger"
      },
      {
        "trivia": [
          "Called for illegal action twice and cleared both times after remodelling",
          "Mystery off-spin that even Sachin Tendulkar admitted he could not pick",
          "KKR's most iconic player in franchise history alongside Russell",
          "Opened batting in IPL 2024 scoring 500+ runs as explosive opener",
          "Defied age to have arguably his best IPL season ever in 2024"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders",
          "Trinidad and Tobago"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A mystery off-spinner who remodelled his action twice after being called for chucking and came back stronger"
      },
      {
        "trivia": [
          "Called for illegal action twice and cleared both times after remodelling",
          "Mystery off-spin that even Sachin Tendulkar admitted he could not pick",
          "KKR's most iconic player in franchise history alongside Russell",
          "Opened batting in IPL 2024 scoring 500+ runs as explosive opener",
          "Defied age to have arguably his best IPL season ever in 2024"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders",
          "Jamaica Tallawahs"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand power hitter who has broken the record for most sixes in a single IPL season multiple times"
      },
      {
        "trivia": [
          "Dre Russ - hit most sixes in a single IPL season multiple times",
          "Power-hitting from any position in batting order changes games entirely",
          "Fast-medium bowling adds crucial all-round value in T20 cricket",
          "88 off 36 balls including 13 sixes in a single IPL innings",
          "Served doping suspension but returned to become IPL's biggest star"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Kolkata Knight Riders",
          "Jamaica Tallawahs"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand power hitter who has broken the record for most sixes in a single IPL season multiple times"
      },
      {
        "trivia": [
          "Dre Russ - hit most sixes in a single IPL season multiple times",
          "Power-hitting from any position in batting order changes games entirely",
          "Fast-medium bowling adds crucial all-round value in T20 cricket",
          "88 off 36 balls including 13 sixes in a single IPL innings",
          "Served doping suspension but returned to become IPL's biggest star"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who became the youngest West Indian to score a T20I century"
      },
      {
        "trivia": [
          "Explosive left-handed keeper-batter who can clear any boundary",
          "IPL superstar who single-handedly changes games in 5 overs",
          "West Indies white-ball captain with aggressive attacking leadership",
          "Known for reverse sweeps and scoops that clear fine-leg boundary",
          "Youngest West Indian to hit a T20I century for his country"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who became the youngest West Indian to score a T20I century"
      },
      {
        "trivia": [
          "Explosive left-handed keeper-batter who can clear any boundary",
          "IPL superstar who single-handedly changes games in 5 overs",
          "West Indies white-ball captain with aggressive attacking leadership",
          "Known for reverse sweeps and scoops that clear fine-leg boundary",
          "Youngest West Indian to hit a T20I century for his country"
        ]
      }
    ]
  },
  {
    "name": "JASON",
    "meta": {
      "shortened": false,
      "fullName": "Jason Holder"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders",
          "Rajasthan Royals",
          "Lucknow Super Giants"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A tall right-arm all-rounder who was West Indies' most respected Test captain in the modern era"
      },
      {
        "trivia": [
          "Best Test captain West Indies produced in the modern era",
          "Tall frame generates steep bounce that troubles top-order batters",
          "Took 6-59 in an innings against England in a Test match",
          "Big-match temperament vs top teams shown consistently in career",
          "Became a sought-after T20 franchise star around the world"
        ]
      }
    ]
  },
  {
    "name": "HOLDE",
    "meta": {
      "shortened": true,
      "fullName": "Jason Holder"
    },
    "hints": [
      {
        "age": 33
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders",
          "Rajasthan Royals",
          "Lucknow Super Giants"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A tall right-arm all-rounder who was West Indies' most respected Test captain in the modern era"
      },
      {
        "trivia": [
          "Best Test captain West Indies produced in the modern era",
          "Tall frame generates steep bounce that troubles top-order batters",
          "Took 6-59 in an innings against England in a Test match",
          "Big-match temperament vs top teams shown consistently in career",
          "Became a sought-after T20 franchise star around the world"
        ]
      }
    ]
  },
  {
    "name": "DAREN",
    "meta": {
      "shortened": false,
      "fullName": "Daren Sammy"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Sunrisers Hyderabad",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who is the only captain to win the T20 World Cup twice"
      },
      {
        "trivia": [
          "Led West Indies to two T20 World Cup titles in 2012 and 2016",
          "Only captain to win T20 WC twice - unique achievement in cricket",
          "Hit massive sixes in 2016 WC Final vs England batting at number 6",
          "Passionate leader who united the most talented WI squad in years",
          "Made St Lucia a proud cricketing nation through his performances"
        ]
      }
    ]
  },
  {
    "name": "SAMMY",
    "meta": {
      "shortened": false,
      "fullName": "Daren Sammy"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "West Indies"
      },
      {
        "iplTeam": "Sunrisers Hyderabad"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "West Indies",
          "Sunrisers Hyderabad",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who is the only captain to win the T20 World Cup twice"
      },
      {
        "trivia": [
          "Led West Indies to two T20 World Cup titles in 2012 and 2016",
          "Only captain to win T20 WC twice - unique achievement in cricket",
          "Hit massive sixes in 2016 WC Final vs England batting at number 6",
          "Passionate leader who united the most talented WI squad in years",
          "Made St Lucia a proud cricketing nation through his performances"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored the fastest ODI century in history in just 31 balls"
      },
      {
        "trivia": [
          "Mr 360 - could hit sixes to any part of the ground at will",
          "Scored fastest ODI century ever - 31 balls vs West Indies 2015",
          "Retired at peak shocking the entire cricket world in 2018",
          "Greatest wicket-keeper batter after Gilchrist in ODI cricket",
          "RCB's greatest player alongside Virat Kohli over many seasons"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored the fastest ODI century in history in just 31 balls"
      },
      {
        "trivia": [
          "Mr 360 - could hit sixes to any part of the ground at will",
          "Scored fastest ODI century ever - 31 balls vs West Indies 2015",
          "Retired at peak shocking the entire cricket world in 2018",
          "Greatest wicket-keeper batter after Gilchrist in ODI cricket",
          "RCB's greatest player alongside Virat Kohli over many seasons"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who scored over 10000 runs AND took over 250 wickets in both Tests and ODIs"
      },
      {
        "trivia": [
          "Greatest all-rounder ever - 13000+ Test runs and 292 wickets",
          "Only player with 10000+ runs and 250+ wickets in Tests and ODIs",
          "Technically flawless - could play on any surface in the world",
          "Underrated because South Africa won no major ICC ICC tournament",
          "Regarded as one of the top 3 cricketers ever by many experts"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who scored over 10000 runs AND took over 250 wickets in both Tests and ODIs"
      },
      {
        "trivia": [
          "Greatest all-rounder ever - 13000+ Test runs and 292 wickets",
          "Only player with 10000+ runs and 250+ wickets in Tests and ODIs",
          "Technically flawless - could play on any surface in the world",
          "Underrated because South Africa won no major ICC ICC tournament",
          "Regarded as one of the top 3 cricketers ever by many experts"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who holds the best bowling average of any fast bowler in Test history"
      },
      {
        "trivia": [
          "Greatest fast bowler of his generation by virtually all measures",
          "439 Test wickets at 22.95 - best average ever for a fast bowler",
          "Swing and pace combined at 150kmh made him unplayable worldwide",
          "Injury-hit later career still ended with absolute legendary status",
          "Terrifying in-swinging yorker that destroyed top batsmen globally"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who holds the best bowling average of any fast bowler in Test history"
      },
      {
        "trivia": [
          "Greatest fast bowler of his generation by virtually all measures",
          "439 Test wickets at 22.95 - best average ever for a fast bowler",
          "Swing and pace combined at 150kmh made him unplayable worldwide",
          "Injury-hit later career still ended with absolute legendary status",
          "Terrifying in-swinging yorker that destroyed top batsmen globally"
        ]
      }
    ]
  },
  {
    "name": "HASHI",
    "meta": {
      "shortened": true,
      "fullName": "Hashim Amla"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who broke the record for reaching every major ODI run milestone in fewest innings"
      },
      {
        "trivia": [
          "Fastest to 2000, 3000, 5000, 6000, 7000 ODI runs - all records",
          "Graceful right-hand bat with the most immaculate technical style",
          "First South African to score a Test triple century vs England",
          "Refused to feature on alcohol-branded shirt for religious reasons",
          "Converted every big start into a defining and match-winning innings"
        ]
      }
    ]
  },
  {
    "name": "AMLA",
    "meta": {
      "shortened": false,
      "fullName": "Hashim Amla"
    },
    "hints": [
      {
        "age": 41
      },
      {
        "country": "South Africa"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Kings XI Punjab",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who broke the record for reaching every major ODI run milestone in fewest innings"
      },
      {
        "trivia": [
          "Fastest to 2000, 3000, 5000, 6000, 7000 ODI runs - all records",
          "Graceful right-hand bat with the most immaculate technical style",
          "First South African to score a Test triple century vs England",
          "Refused to feature on alcohol-branded shirt for religious reasons",
          "Converted every big start into a defining and match-winning innings"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Delhi Capitals",
          "Punjab Kings",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who became the youngest to reach 200 Test wickets in cricket history"
      },
      {
        "trivia": [
          "Youngest fast bowler to reach 200 Test wickets in history",
          "Dominated multiple IPL seasons as Delhi Capitals best bowler",
          "Natural ability to swing ball both ways at 150kmh pace",
          "Key to South Africa's historic 2024 T20 WC Final run",
          "South Africa's pace attack leader for at least a decade to come"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "South Africa",
          "Delhi Capitals",
          "Punjab Kings",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who became the youngest to reach 200 Test wickets in cricket history"
      },
      {
        "trivia": [
          "Youngest fast bowler to reach 200 Test wickets in history",
          "Dominated multiple IPL seasons as Delhi Capitals best bowler",
          "Natural ability to swing ball both ways at 150kmh pace",
          "Key to South Africa's historic 2024 T20 WC Final run",
          "South Africa's pace attack leader for at least a decade to come"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who refused to take a knee in a World Cup but later apologised and changed his stance"
      },
      {
        "trivia": [
          "Refused to take a knee in 2021 T20 WC causing major controversy",
          "Later took the knee and apologised showing personal growth",
          "3 ODI centuries in consecutive matches twice in his career",
          "Best wicket-keeper batter South Africa has produced since Boucher",
          "2023 WC century in semi-final against Afghanistan was stunning"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who refused to take a knee in a World Cup but later apologised and changed his stance"
      },
      {
        "trivia": [
          "Refused to take a knee in 2021 T20 WC causing major controversy",
          "Later took the knee and apologised showing personal growth",
          "3 ODI centuries in consecutive matches twice in his career",
          "Best wicket-keeper batter South Africa has produced since Boucher",
          "2023 WC century in semi-final against Afghanistan was stunning"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who was caught on CCTV applying saliva to the ball and fined for ball-tampering"
      },
      {
        "trivia": [
          "RCB captain who led them to their most consistent recent IPL seasons",
          "South Africa's most experienced white-ball captain in modern era",
          "Caught licking ball on CCTV and fined - comical but costly controversy",
          "Brilliant fielder who took spectacular slip and outfield catches",
          "Retired from international cricket to focus on franchise T20 career"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Royal Challengers Bengaluru",
          "Chennai Super Kings",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who was caught on CCTV applying saliva to the ball and fined for ball-tampering"
      },
      {
        "trivia": [
          "RCB captain who led them to their most consistent recent IPL seasons",
          "South Africa's most experienced white-ball captain in modern era",
          "Caught licking ball on CCTV and fined - comical but costly controversy",
          "Brilliant fielder who took spectacular slip and outfield catches",
          "Retired from international cricket to focus on franchise T20 career"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Gujarat Titans",
          "Kings XI Punjab",
          "Delhi Daredevils",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand finisher nicknamed Killer who hit four sixes off the last four balls to win a T20I match"
      },
      {
        "trivia": [
          "Killer Miller - smashed fastest T20I fifty vs Bangladesh in 2017",
          "Won 2022 IPL title with Gujarat Titans alongside Hardik Pandya",
          "One of T20 cricket's most reliable and dangerous finishers ever",
          "Hit 4 sixes off last 4 balls vs Ireland to win a T20I match",
          "South Africa's key match-winning batsman in 2024 T20 WC Final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa",
          "Gujarat Titans",
          "Kings XI Punjab",
          "Delhi Daredevils",
          "Rajasthan Royals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand finisher nicknamed Killer who hit four sixes off the last four balls to win a T20I match"
      },
      {
        "trivia": [
          "Killer Miller - smashed fastest T20I fifty vs Bangladesh in 2017",
          "Won 2022 IPL title with Gujarat Titans alongside Hardik Pandya",
          "One of T20 cricket's most reliable and dangerous finishers ever",
          "Hit 4 sixes off last 4 balls vs Ireland to win a T20I match",
          "South Africa's key match-winning batsman in 2024 T20 WC Final"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who became the first Black African captain of the South Africa cricket team"
      },
      {
        "trivia": [
          "First Black African captain of South Africa cricket - historic moment",
          "Led South Africa to 2024 T20 WC Final - their best modern result",
          "Defied height disadvantage to succeed at highest level consistently",
          "Fought against racism in cricket structures throughout his career",
          "Quiet but determined leader who earned total squad respect"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "South Africa"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who became the first Black African captain of the South Africa cricket team"
      },
      {
        "trivia": [
          "First Black African captain of South Africa cricket - historic moment",
          "Led South Africa to 2024 T20 WC Final - their best modern result",
          "Defied height disadvantage to succeed at highest level consistently",
          "Fought against racism in cricket structures throughout his career",
          "Quiet but determined leader who earned total squad respect"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Gujarat Titans",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who led New Zealand to their first ever World Test Championship title"
      },
      {
        "trivia": [
          "One of the Fab Four of modern Test batting globally",
          "Led NZ to their first World Test Championship title in 2021",
          "Graceful technique that works effectively on every surface",
          "Lost 2019 WC Final on boundary count - most heartbreaking moment",
          "Quiet humble leader who commands deep respect in every dressing room"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Gujarat Titans",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who led New Zealand to their first ever World Test Championship title"
      },
      {
        "trivia": [
          "One of the Fab Four of modern Test batting globally",
          "Led NZ to their first World Test Championship title in 2021",
          "Graceful technique that works effectively on every surface",
          "Lost 2019 WC Final on boundary count - most heartbreaking moment",
          "Quiet humble leader who commands deep respect in every dressing room"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored the fastest Test century ever and later became England's head coach"
      },
      {
        "trivia": [
          "Scored fastest Test century ever - 54 balls vs Australia 2016",
          "Revolutionised NZ cricket as the most aggressive attacking captain",
          "Now transformed England Test cricket as their head coach Baz",
          "Bazball - England's attacking Test philosophy named after his nickname",
          "His farewell Test innings was watched and celebrated by millions"
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
        "role": "Wicket-Keeper Batsman"
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
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored the fastest Test century ever and later became England's head coach"
      },
      {
        "trivia": [
          "Scored fastest Test century ever - 54 balls vs Australia 2016",
          "Revolutionised NZ cricket as the most aggressive attacking captain",
          "Now transformed England Test cricket as their head coach Baz",
          "Bazball - England's attacking Test philosophy named after his nickname",
          "His farewell Test innings was watched and celebrated by millions"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "New Zealand",
          "Mumbai Indians",
          "Rajasthan Royals",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm swing bowler who stepped on the boundary rope while taking a catch in the 2019 World Cup Final"
      },
      {
        "trivia": [
          "Left-arm swing is virtually unplayable under overcast conditions",
          "Took hat-trick in Test cricket vs Australia in a crucial match",
          "Crucial wickets in NZ's WTC 2021 Final victory over India",
          "Stepped on boundary rope while taking catch in 2019 WC Final",
          "Released from NZ contract to play franchise cricket worldwide"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "New Zealand",
          "Mumbai Indians",
          "Rajasthan Royals",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm swing bowler who stepped on the boundary rope while taking a catch in the 2019 World Cup Final"
      },
      {
        "trivia": [
          "Left-arm swing is virtually unplayable under overcast conditions",
          "Took hat-trick in Test cricket vs Australia in a crucial match",
          "Crucial wickets in NZ's WTC 2021 Final victory over India",
          "Stepped on boundary rope while taking catch in 2019 WC Final",
          "Released from NZ contract to play franchise cricket worldwide"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener born in South Africa who scored a double century on his very first Test debut at Lord's"
      },
      {
        "trivia": [
          "Scored 200 on Test debut at Lord's - remarkable and rare achievement",
          "Steady left-hand opener who builds innings with patience and skill",
          "Key to NZ batting stability across all three formats consistently",
          "CSK's consistent run-scorer in IPL across multiple seasons",
          "South Africa-born who qualified and chose to represent New Zealand"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener born in South Africa who scored a double century on his very first Test debut at Lord's"
      },
      {
        "trivia": [
          "Scored 200 on Test debut at Lord's - remarkable and rare achievement",
          "Steady left-hand opener who builds innings with patience and skill",
          "Key to NZ batting stability across all three formats consistently",
          "CSK's consistent run-scorer in IPL across multiple seasons",
          "South Africa-born who qualified and chose to represent New Zealand"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Sunrisers Hyderabad",
          "Kings XI Punjab",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A right-hand opener who scored the highest ever individual innings in World Cup history with 237 not out"
      },
      {
        "trivia": [
          "237 not out vs West Indies in WC 2015 - highest ever score in WC",
          "Run out in 2019 WC Final Super Over ended NZ's heartbreaking dream",
          "Explosive right-hand opener who could destroy attacks in T20 cricket",
          "One of T20 cricket's most devastating batters for a full decade",
          "That run out remains one of cricket's most heartbreaking moments"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Sunrisers Hyderabad",
          "Kings XI Punjab",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A right-hand opener who scored the highest ever individual innings in World Cup history with 237 not out"
      },
      {
        "trivia": [
          "237 not out vs West Indies in WC 2015 - highest ever score in WC",
          "Run out in 2019 WC Final Super Over ended NZ's heartbreaking dream",
          "Explosive right-hand opener who could destroy attacks in T20 cricket",
          "One of T20 cricket's most devastating batters for a full decade",
          "That run out remains one of cricket's most heartbreaking moments"
        ]
      }
    ]
  },
  {
    "name": "ROSS",
    "meta": {
      "shortened": false,
      "fullName": "Ross Taylor"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A right-hand batter who is New Zealand's highest run-scorer in both Tests and ODIs simultaneously"
      },
      {
        "trivia": [
          "NZ's highest run-scorer in both Tests and ODIs simultaneously",
          "Scored 290 in a Test vs Zimbabwe as a 22-year-old - extraordinary",
          "Key NZ middle-order batter for 15 remarkable years of service",
          "Emotional tearful farewell from cricket with teammates in tears too",
          "Powerful hitting in ODIs combined with elegant Test match style"
        ]
      }
    ]
  },
  {
    "name": "TAYLO",
    "meta": {
      "shortened": true,
      "fullName": "Ross Taylor"
    },
    "hints": [
      {
        "age": 40
      },
      {
        "country": "New Zealand"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "New Zealand",
          "Rajasthan Royals",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Break"
      },
      {
        "openingHint": "A right-hand batter who is New Zealand's highest run-scorer in both Tests and ODIs simultaneously"
      },
      {
        "trivia": [
          "NZ's highest run-scorer in both Tests and ODIs simultaneously",
          "Scored 290 in a Test vs Zimbabwe as a 22-year-old - extraordinary",
          "Key NZ middle-order batter for 15 remarkable years of service",
          "Emotional tearful farewell from cricket with teammates in tears too",
          "Powerful hitting in ODIs combined with elegant Test match style"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored four consecutive centuries in a single World Cup tournament"
      },
      {
        "trivia": [
          "Scored 4 consecutive centuries in WC 2015 - never done before",
          "Most ODI centuries after Sachin Tendulkar - 25 hundreds",
          "12400+ Test runs - greatest ever Sri Lankan batsman by far",
          "Elegant left-hand technique worked on every surface worldwide",
          "First non-British MCC President in the 200-year history of the club"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Deccan Chargers",
          "Kings XI Punjab"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who scored four consecutive centuries in a single World Cup tournament"
      },
      {
        "trivia": [
          "Scored 4 consecutive centuries in WC 2015 - never done before",
          "Most ODI centuries after Sachin Tendulkar - 25 hundreds",
          "12400+ Test runs - greatest ever Sri Lankan batsman by far",
          "Elegant left-hand technique worked on every surface worldwide",
          "First non-British MCC President in the 200-year history of the club"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Mumbai Indians",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who holds Sri Lanka's highest individual Test score and led them to a T20 World Cup"
      },
      {
        "trivia": [
          "374 in a Test match alongside Sangakkara - Sri Lanka record partnership",
          "Led Sri Lanka to 2014 T20 World Cup final victory as captain",
          "Silky smooth technique worked effectively across all three formats",
          "Greatest Sri Lanka captain and one of their best ever batters",
          "Now a world-respected coach working with multiple T20 franchises"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Mumbai Indians",
          "Delhi Daredevils"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand batter who holds Sri Lanka's highest individual Test score and led them to a T20 World Cup"
      },
      {
        "trivia": [
          "374 in a Test match alongside Sangakkara - Sri Lanka record partnership",
          "Led Sri Lanka to 2014 T20 World Cup final victory as captain",
          "Silky smooth technique worked effectively across all three formats",
          "Greatest Sri Lanka captain and one of their best ever batters",
          "Now a world-respected coach working with multiple T20 franchises"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spin bowler who holds the all-time Test wicket record of 800 wickets which may never be broken"
      },
      {
        "trivia": [
          "800 Test wickets - all-time world record never likely to be broken",
          "Doosra and off-break equally unreadable to world's best batsmen",
          "Highly controversial bowling action cleared by ICC biomechanics tests",
          "66 five-wicket hauls in Tests - another all-time world record",
          "Won 1996 ODI WC and played key role in 2007 and 2011 WC campaigns"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Kochi Tuskers Kerala",
          "Royal Challengers Bengaluru"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "An off-spin bowler who holds the all-time Test wicket record of 800 wickets which may never be broken"
      },
      {
        "trivia": [
          "800 Test wickets - all-time world record never likely to be broken",
          "Doosra and off-break equally unreadable to world's best batsmen",
          "Highly controversial bowling action cleared by ICC biomechanics tests",
          "66 five-wicket hauls in Tests - another all-time world record",
          "Won 1996 ODI WC and played key role in 2007 and 2011 WC campaigns"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm bowler with a completely unique slingy round-arm action who took four wickets in four balls twice in World Cups"
      },
      {
        "trivia": [
          "Slinga Malinga - round-arm slingy action was completely unique",
          "4 wickets in 4 balls in World Cup cricket - happened twice in career",
          "Best death bowler in T20 cricket history - virtually unplayable",
          "Won 2014 T20 WC and was crucial in 2009 T20 WC victory too",
          "His yorker was as deadly as any delivery ever bowled in cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Sri Lanka",
          "Mumbai Indians"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm bowler with a completely unique slingy round-arm action who took four wickets in four balls twice in World Cups"
      },
      {
        "trivia": [
          "Slinga Malinga - round-arm slingy action was completely unique",
          "4 wickets in 4 balls in World Cup cricket - happened twice in career",
          "Best death bowler in T20 cricket history - virtually unplayable",
          "Won 2014 T20 WC and was crucial in 2009 T20 WC victory too",
          "His yorker was as deadly as any delivery ever bowled in cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-arm leg-spinner who was the highest wicket-taker in the 2022 T20 World Cup tournament"
      },
      {
        "trivia": [
          "Googly that dismisses top-order batsmen regularly in T20 cricket",
          "Took hat-trick in T20 International cricket against South Africa",
          "Most wickets in T20 World Cup 2022 tournament as the best bowler",
          "Best wrist-spinner in T20 cricket across all formats currently",
          "Batting ability adds crucial valuable lower-order runs for team"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Royal Challengers Bengaluru",
          "Sunrisers Hyderabad"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-arm leg-spinner who was the highest wicket-taker in the 2022 T20 World Cup tournament"
      },
      {
        "trivia": [
          "Googly that dismisses top-order batsmen regularly in T20 cricket",
          "Took hat-trick in T20 International cricket against South Africa",
          "Most wickets in T20 World Cup 2022 tournament as the best bowler",
          "Best wrist-spinner in T20 cricket across all formats currently",
          "Batting ability adds crucial valuable lower-order runs for team"
        ]
      }
    ]
  },
  {
    "name": "ANGEL",
    "meta": {
      "shortened": true,
      "fullName": "Angelo Mathews"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who became the first player in cricket history to be dismissed timed out"
      },
      {
        "trivia": [
          "Timed out dismissal in 2023 WC vs Bangladesh - first ever in cricket",
          "Best Sri Lankan all-rounder across Tests, ODIs and T20Is",
          "Multiple Test centuries in difficult conditions around the world",
          "Captain who kept Sri Lanka competitive during their hardest period",
          "Fighting performances when team was in trouble define his career"
        ]
      }
    ]
  },
  {
    "name": "MATHE",
    "meta": {
      "shortened": true,
      "fullName": "Angelo Mathews"
    },
    "hints": [
      {
        "age": 37
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who became the first player in cricket history to be dismissed timed out"
      },
      {
        "trivia": [
          "Timed out dismissal in 2023 WC vs Bangladesh - first ever in cricket",
          "Best Sri Lankan all-rounder across Tests, ODIs and T20Is",
          "Multiple Test centuries in difficult conditions around the world",
          "Captain who kept Sri Lanka competitive during their hardest period",
          "Fighting performances when team was in trouble define his career"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Delhi Daredevils",
          "Dhaka Gladiators"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder who invented a brand new cricket shot - the ramp over the wicketkeeper"
      },
      {
        "trivia": [
          "Invented the Dilscoop - ramp shot over the wicketkeeper for six",
          "Dilscoop became one of cricket's most imitated and famous shots",
          "9000+ ODI runs and 100+ wickets - elite Sri Lankan all-rounder",
          "Led Sri Lanka to multiple finals and key victories in ICC events",
          "One of the most innovative batters cricket has ever produced"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Sri Lanka",
          "Delhi Daredevils",
          "Dhaka Gladiators"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder who invented a brand new cricket shot - the ramp over the wicketkeeper"
      },
      {
        "trivia": [
          "Invented the Dilscoop - ramp shot over the wicketkeeper for six",
          "Dilscoop became one of cricket's most imitated and famous shots",
          "9000+ ODI runs and 100+ wickets - elite Sri Lankan all-rounder",
          "Led Sri Lanka to multiple finals and key victories in ICC events",
          "One of the most innovative batters cricket has ever produced"
        ]
      }
    ]
  },
  {
    "name": "KUSAL",
    "meta": {
      "shortened": false,
      "fullName": "Kusal Mendis"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Barbados Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who is Sri Lanka's most destructive modern T20 opener"
      },
      {
        "trivia": [
          "Sri Lanka's most destructive modern T20 batter at the top of order",
          "2024 Asia Cup winning hero with his aggressive opening partnerships",
          "Explosive right-hand bat who can take on pace and spin equally",
          "Key to Sri Lanka's batting resurgence in the post-Sangakkara era",
          "IPL-caliber performance earned him global franchise attention"
        ]
      }
    ]
  },
  {
    "name": "MENDI",
    "meta": {
      "shortened": true,
      "fullName": "Kusal Mendis"
    },
    "hints": [
      {
        "age": 29
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Sri Lanka",
          "Barbados Royals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who is Sri Lanka's most destructive modern T20 opener"
      },
      {
        "trivia": [
          "Sri Lanka's most destructive modern T20 batter at the top of order",
          "2024 Asia Cup winning hero with his aggressive opening partnerships",
          "Explosive right-hand bat who can take on pace and spin equally",
          "Key to Sri Lanka's batting resurgence in the post-Sangakkara era",
          "IPL-caliber performance earned him global franchise attention"
        ]
      }
    ]
  },
  {
    "name": "PATHU",
    "meta": {
      "shortened": true,
      "fullName": "Pathum Nissanka"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Sri Lanka"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who scored the highest individual score ever in T20I cricket with 137 not out"
      },
      {
        "trivia": [
          "Scored 137 not out in T20Is - the highest individual T20I score ever",
          "Elegant right-hand opener who plays classical and attacking cricket",
          "Key part of Sri Lanka's rebuilding phase after legends retired",
          "Consistent run-scorer at the top of order in all conditions",
          "Seen as the future of Sri Lanka batting for the next decade"
        ]
      }
    ]
  },
  {
    "name": "NISSA",
    "meta": {
      "shortened": true,
      "fullName": "Pathum Nissanka"
    },
    "hints": [
      {
        "age": 26
      },
      {
        "country": "Sri Lanka"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Sri Lanka"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who scored the highest individual score ever in T20I cricket with 137 not out"
      },
      {
        "trivia": [
          "Scored 137 not out in T20Is - the highest individual T20I score ever",
          "Elegant right-hand opener who plays classical and attacking cricket",
          "Key part of Sri Lanka's rebuilding phase after legends retired",
          "Consistent run-scorer at the top of order in all conditions",
          "Seen as the future of Sri Lanka batting for the next decade"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Bangladesh",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad",
          "Dhaka Dynamites"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who held the number one ICC ranking in all three formats at the same time"
      },
      {
        "trivia": [
          "Held world number one ranking in all three formats simultaneously",
          "Bangladesh's greatest ever cricketer by an enormous margin",
          "200+ wickets and 4000+ runs in ODIs - elite genuine all-rounder",
          "Controversial political career running alongside cricket stardom",
          "Took hat-trick in Test cricket vs Zimbabwe"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Bangladesh",
          "Kolkata Knight Riders",
          "Sunrisers Hyderabad",
          "Dhaka Dynamites"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Spin"
      },
      {
        "openingHint": "A left-hand all-rounder who held the number one ICC ranking in all three formats at the same time"
      },
      {
        "trivia": [
          "Held world number one ranking in all three formats simultaneously",
          "Bangladesh's greatest ever cricketer by an enormous margin",
          "200+ wickets and 4000+ runs in ODIs - elite genuine all-rounder",
          "Controversial political career running alongside cricket stardom",
          "Took hat-trick in Test cricket vs Zimbabwe"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who batted with a broken wrist in a Champions Trophy match for his country"
      },
      {
        "trivia": [
          "Bangladesh's highest Test and ODI run-scorer in history",
          "Batted with a broken wrist in 2017 Champions Trophy - heroic",
          "Explosive left-hand opener who attacked aggressively from ball one",
          "Consistent run-scorer over 15 years of international service",
          "Retired and returned multiple times before final farewell"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who batted with a broken wrist in a Champions Trophy match for his country"
      },
      {
        "trivia": [
          "Bangladesh's highest Test and ODI run-scorer in history",
          "Batted with a broken wrist in 2017 Champions Trophy - heroic",
          "Explosive left-hand opener who attacked aggressively from ball one",
          "Consistent run-scorer over 15 years of international service",
          "Retired and returned multiple times before final farewell"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who was the first Bangladesh player to score a Test double century"
      },
      {
        "trivia": [
          "Bangladesh's most experienced cricketer with most Test appearances",
          "First Bangladesh player to score a Test double century",
          "Best wicket-keeper Bangladesh has produced in their history",
          "Emotional player who wore his heart on his sleeve always",
          "Scored 200 vs Zimbabwe in 2018 - Bangladesh's greatest Test knock"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Bangladesh"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who was the first Bangladesh player to score a Test double century"
      },
      {
        "trivia": [
          "Bangladesh's most experienced cricketer with most Test appearances",
          "First Bangladesh player to score a Test double century",
          "Best wicket-keeper Bangladesh has produced in their history",
          "Emotional player who wore his heart on his sleeve always",
          "Scored 200 vs Zimbabwe in 2018 - Bangladesh's greatest Test knock"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Bangladesh",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Rajasthan Royals",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer nicknamed The Fizz who took 6 wickets on his very first ODI debut against India"
      },
      {
        "trivia": [
          "The Fizz - cutters and off-cutters confuse even world's best batters",
          "Took 6 wickets on ODI debut vs India in 2015 - sensational",
          "Best left-arm pace bowler to emerge from Bangladesh cricket",
          "IPL star who troubled top-order batters consistently in India",
          "ICC Emerging Cricketer of the Year 2015 after stunning debut year"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Bangladesh",
          "Sunrisers Hyderabad",
          "Mumbai Indians",
          "Rajasthan Royals",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer nicknamed The Fizz who took 6 wickets on his very first ODI debut against India"
      },
      {
        "trivia": [
          "The Fizz - cutters and off-cutters confuse even world's best batters",
          "Took 6 wickets on ODI debut vs India in 2015 - sensational",
          "Best left-arm pace bowler to emerge from Bangladesh cricket",
          "IPL star who troubled top-order batters consistently in India",
          "ICC Emerging Cricketer of the Year 2015 after stunning debut year"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings",
          "Somerset"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who held all three ICC white-ball number one rankings at the same time"
      },
      {
        "trivia": [
          "Held all three white-ball number one rankings simultaneously",
          "Elegant cover drive regarded as the most beautiful in modern cricket",
          "Led Pakistan to 2022 T20 WC final as captain",
          "Scored centuries in all formats at a rapid and consistent rate",
          "Compared to Virat Kohli for consistency and technical perfection"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings",
          "Somerset"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who held all three ICC white-ball number one rankings at the same time"
      },
      {
        "trivia": [
          "Held all three white-ball number one rankings simultaneously",
          "Elegant cover drive regarded as the most beautiful in modern cricket",
          "Led Pakistan to 2022 T20 WC final as captain",
          "Scored centuries in all formats at a rapid and consistent rate",
          "Compared to Virat Kohli for consistency and technical perfection"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Multan Sultans",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored over 1900 T20I runs in a single calendar year - a world record"
      },
      {
        "trivia": [
          "Most T20I runs in a calendar year - over 1900 runs in 2021",
          "Prays namaz on the field between overs in international matches",
          "Survived hospital stay and played T20 WC within just days",
          "Best T20 wicket-keeper batter in world cricket currently",
          "Reliable anchor who builds massive match-winning partnerships"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Multan Sultans",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who scored over 1900 T20I runs in a single calendar year - a world record"
      },
      {
        "trivia": [
          "Most T20I runs in a calendar year - over 1900 runs in 2021",
          "Prays namaz on the field between overs in international matches",
          "Survived hospital stay and played T20 WC within just days",
          "Best T20 wicket-keeper batter in world cricket currently",
          "Reliable anchor who builds massive match-winning partnerships"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars",
          "Hampshire"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler who dismissed two Indian openers cheaply in the 2021 T20 World Cup group match"
      },
      {
        "trivia": [
          "Dismissed Rohit Sharma and KL Rahul cheaply in 2021 T20 WC",
          "Left-arm pace at 150kmh with late swing that moves dangerously",
          "Youngest fast bowler to 100 T20I wickets for Pakistan",
          "ICC Emerging Cricketer of the Year 2021",
          "Son-in-law of Shahid Afridi after marrying his daughter"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars",
          "Hampshire"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler who dismissed two Indian openers cheaply in the 2021 T20 World Cup group match"
      },
      {
        "trivia": [
          "Dismissed Rohit Sharma and KL Rahul cheaply in 2021 T20 WC",
          "Left-arm pace at 150kmh with late swing that moves dangerously",
          "Youngest fast bowler to 100 T20I wickets for Pakistan",
          "ICC Emerging Cricketer of the Year 2021",
          "Son-in-law of Shahid Afridi after marrying his daughter"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Deccan Chargers",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder who hit the world's fastest ODI century in just 37 balls on his debut innings"
      },
      {
        "trivia": [
          "Lala - hit world's fastest ODI hundred in 37 balls in 1996 debut",
          "Massive leg-spin who took key wickets at crucial moments in matches",
          "His age was a mystery - officially listed differently multiple times",
          "Won 2009 T20 World Cup with Pakistan as key all-round performer",
          "Most loved and celebrated cricketer in Pakistan cricket history"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Deccan Chargers",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder who hit the world's fastest ODI century in just 37 balls on his debut innings"
      },
      {
        "trivia": [
          "Lala - hit world's fastest ODI hundred in 37 balls in 1996 debut",
          "Massive leg-spin who took key wickets at crucial moments in matches",
          "His age was a mystery - officially listed differently multiple times",
          "Won 2009 T20 World Cup with Pakistan as key all-round performer",
          "Most loved and celebrated cricketer in Pakistan cricket history"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who was officially clocked at 161.3kmh - the fastest delivery ever recorded in cricket"
      },
      {
        "trivia": [
          "Rawalpindi Express - officially clocked 161.3kmh fastest ball ever",
          "Terrified the world's best batsmen with hostility and sheer pace",
          "Won 1992 World Cup as key Pakistan bowler alongside Waqar and Wasim",
          "Controversial fiery life off the pitch matched his drama on it",
          "Dismissed Sachin Tendulkar multiple times in World Cup cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler who was officially clocked at 161.3kmh - the fastest delivery ever recorded in cricket"
      },
      {
        "trivia": [
          "Rawalpindi Express - officially clocked 161.3kmh fastest ball ever",
          "Terrified the world's best batsmen with hostility and sheer pace",
          "Won 1992 World Cup as key Pakistan bowler alongside Waqar and Wasim",
          "Controversial fiery life off the pitch matched his drama on it",
          "Dismissed Sachin Tendulkar multiple times in World Cup cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler called the Sultan of Swing who took 916 international wickets combined"
      },
      {
        "trivia": [
          "Sultan of Swing - greatest left-arm fast bowler in history by many",
          "916 international wickets combined - a remarkable record",
          "Reverse swing at 150kmh was completely unplayable in the 1990s",
          "Won 1992 World Cup and played in 1999 Final as Pakistan's leader",
          "Man of the Match in 1992 World Cup Final vs England"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast"
      },
      {
        "openingHint": "A left-arm fast bowler called the Sultan of Swing who took 916 international wickets combined"
      },
      {
        "trivia": [
          "Sultan of Swing - greatest left-arm fast bowler in history by many",
          "916 international wickets combined - a remarkable record",
          "Reverse swing at 150kmh was completely unplayable in the 1990s",
          "Won 1992 World Cup and played in 1999 Final as Pakistan's leader",
          "Man of the Match in 1992 World Cup Final vs England"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler famous for his devastating in-swinging yorker who formed cricket's greatest bowling partnership"
      },
      {
        "trivia": [
          "Devastating in-swinging yorker demolished lower-order stumps",
          "Best bowling partnership with Wasim Akram in all of cricket history",
          "Won 1992 World Cup with Pakistan as young fast bowling sensation",
          "Reverse swing pioneer alongside Wasim Akram who changed cricket",
          "Rapid pace combined with pinpoint accuracy at 145kmh consistently"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast"
      },
      {
        "openingHint": "A right-arm fast bowler famous for his devastating in-swinging yorker who formed cricket's greatest bowling partnership"
      },
      {
        "trivia": [
          "Devastating in-swinging yorker demolished lower-order stumps",
          "Best bowling partnership with Wasim Akram in all of cricket history",
          "Won 1992 World Cup with Pakistan as young fast bowling sensation",
          "Reverse swing pioneer alongside Wasim Akram who changed cricket",
          "Rapid pace combined with pinpoint accuracy at 145kmh consistently"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who is Pakistan's highest ever Test run-scorer with over 10000 runs"
      },
      {
        "trivia": [
          "Pakistan's highest Test run-scorer with 10099 Test runs",
          "Led Pakistan to 2009 T20 World Cup victory as captain",
          "34 Test centuries across all conditions and countries globally",
          "Gritty crisis performances made him Pakistan's backbone in Tests",
          "Mentored young Pakistan batters as batting coach after retirement"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand batter who is Pakistan's highest ever Test run-scorer with over 10000 runs"
      },
      {
        "trivia": [
          "Pakistan's highest Test run-scorer with 10099 Test runs",
          "Led Pakistan to 2009 T20 World Cup victory as captain",
          "34 Test centuries across all conditions and countries globally",
          "Gritty crisis performances made him Pakistan's backbone in Tests",
          "Mentored young Pakistan batters as batting coach after retirement"
        ]
      }
    ]
  },
  {
    "name": "INZAM",
    "meta": {
      "shortened": true,
      "fullName": "Inzamam Ul-Haq"
    },
    "hints": [
      {
        "age": 55
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who once chased a fan into the stands with his bat after the fan abused him"
      },
      {
        "trivia": [
          "8829 Test runs across a long and brilliant Pakistan career",
          "Hit winning runs in 1992 World Cup semi-final vs New Zealand",
          "Fan invaded pitch to abuse him and Inzy chased him with the bat",
          "Became Pakistan chief selector with huge influence on team selection",
          "Called the most graceful big man to bat in cricket history"
        ]
      }
    ]
  },
  {
    "name": "UL-HA",
    "meta": {
      "shortened": true,
      "fullName": "Inzamam Ul-Haq"
    },
    "hints": [
      {
        "age": 55
      },
      {
        "country": "Pakistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand batter who once chased a fan into the stands with his bat after the fan abused him"
      },
      {
        "trivia": [
          "8829 Test runs across a long and brilliant Pakistan career",
          "Hit winning runs in 1992 World Cup semi-final vs New Zealand",
          "Fan invaded pitch to abuse him and Inzy chased him with the bat",
          "Became Pakistan chief selector with huge influence on team selection",
          "Called the most graceful big man to bat in cricket history"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who was a former Pakistan Navy officer and scored Pakistan's highest ever ODI score"
      },
      {
        "trivia": [
          "Scored 193 vs Zimbabwe in ODIs - Pakistan's highest individual score",
          "Left-hand explosive opener who attacks aggressively from first ball",
          "Key player in Pakistan's 2017 Champions Trophy triumph vs India",
          "Former Pakistan Navy officer turned professional cricketer",
          "Won Champions Trophy Final with a brilliant match-winning century"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who was a former Pakistan Navy officer and scored Pakistan's highest ever ODI score"
      },
      {
        "trivia": [
          "Scored 193 vs Zimbabwe in ODIs - Pakistan's highest individual score",
          "Left-hand explosive opener who attacks aggressively from first ball",
          "Key player in Pakistan's 2017 Champions Trophy triumph vs India",
          "Former Pakistan Navy officer turned professional cricketer",
          "Won Champions Trophy Final with a brilliant match-winning century"
        ]
      }
    ]
  },
  {
    "name": "MOHAM",
    "meta": {
      "shortened": true,
      "fullName": "Mohammad Hafeez"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars",
          "Karachi Kings",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder nicknamed The Professor who was called for an illegal bowling action multiple times"
      },
      {
        "trivia": [
          "Professor - called for suspect bowling action multiple times in career",
          "Consistent white-ball performer for Pakistan over a long period",
          "Key part of Pakistan's 2009 T20 WC and 2017 Champions Trophy wins",
          "Reliable opening batsman who set the platform for Pakistan's innings",
          "Versatile player who contributed in all three departments of cricket"
        ]
      }
    ]
  },
  {
    "name": "HAFEE",
    "meta": {
      "shortened": true,
      "fullName": "Mohammad Hafeez"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Pakistan",
          "Lahore Qalandars",
          "Karachi Kings",
          "Peshawar Zalmi"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand all-rounder nicknamed The Professor who was called for an illegal bowling action multiple times"
      },
      {
        "trivia": [
          "Professor - called for suspect bowling action multiple times in career",
          "Consistent white-ball performer for Pakistan over a long period",
          "Key part of Pakistan's 2009 T20 WC and 2017 Champions Trophy wins",
          "Reliable opening batsman who set the platform for Pakistan's innings",
          "Versatile player who contributed in all three departments of cricket"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who led Pakistan to the 2017 Champions Trophy title and was caught yawning on the field"
      },
      {
        "trivia": [
          "Led Pakistan to 2017 Champions Trophy title victory vs India",
          "Pakistan's most successful white-ball captain in modern era",
          "Caught yawning on the field in a Test match - viral and controversial",
          "Reliable wicket-keeping and important middle-order contributions",
          "Stripped of captaincy after poor 2019 World Cup campaign results"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Pakistan",
          "Karachi Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who led Pakistan to the 2017 Champions Trophy title and was caught yawning on the field"
      },
      {
        "trivia": [
          "Led Pakistan to 2017 Champions Trophy title victory vs India",
          "Pakistan's most successful white-ball captain in modern era",
          "Caught yawning on the field in a Test match - viral and controversial",
          "Reliable wicket-keeping and important middle-order contributions",
          "Stripped of captaincy after poor 2019 World Cup campaign results"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Gujarat Titans",
          "Adelaide Strikers",
          "Trent Rockets"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-arm leg-spinner who is the most economical T20I bowler in cricket history and a global IPL star"
      },
      {
        "trivia": [
          "Most economical T20I bowler in cricket history by economy rate",
          "Leg-spin googly that has dismissed every world-class batsman",
          "IPL superstar who commands highest bids across all franchise auctions",
          "Took Afghanistan to new heights as their greatest ever player",
          "2024 T20 WC semi-final run - his finest moment in Afghanistan shirt"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Gujarat Titans",
          "Adelaide Strikers",
          "Trent Rockets"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Leg-Spin"
      },
      {
        "openingHint": "A right-arm leg-spinner who is the most economical T20I bowler in cricket history and a global IPL star"
      },
      {
        "trivia": [
          "Most economical T20I bowler in cricket history by economy rate",
          "Leg-spin googly that has dismissed every world-class batsman",
          "IPL superstar who commands highest bids across all franchise auctions",
          "Took Afghanistan to new heights as their greatest ever player",
          "2024 T20 WC semi-final run - his finest moment in Afghanistan shirt"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand off-spinning all-rounder who was the pioneer of Afghanistan cricket on the world stage"
      },
      {
        "trivia": [
          "Led Afghanistan through their entire emergence in world cricket",
          "Effective off-spin all-rounder in T20 franchise cricket worldwide",
          "Afghanistan's most experienced international cricketer in history",
          "Pioneer who made Afghanistan a team to fear in World Cups",
          "Role model for every young Afghan who wants to play cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan",
          "Sunrisers Hyderabad",
          "Kolkata Knight Riders",
          "Gujarat Lions"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand off-spinning all-rounder who was the pioneer of Afghanistan cricket on the world stage"
      },
      {
        "trivia": [
          "Led Afghanistan through their entire emergence in world cricket",
          "Effective off-spin all-rounder in T20 franchise cricket worldwide",
          "Afghanistan's most experienced international cricketer in history",
          "Pioneer who made Afghanistan a team to fear in World Cups",
          "Role model for every young Afghan who wants to play cricket"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Afghanistan",
          "Punjab Kings",
          "Sunrisers Hyderabad",
          "Hobart Hurricanes"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A mystery off-spin bowler who became the youngest player to play ODI cricket for any Associate nation"
      },
      {
        "trivia": [
          "Mystery spinner who took IPL by storm aged 17 - youngest IPL debut",
          "Youngest player to play ODI cricket for any Associate nation",
          "Variations from off-break to googly are impossible to pick consistently",
          "Brilliant T20 performances made him a global franchise favourite",
          "Crucial in Afghanistan's historic 2024 T20 WC semi-final campaign"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "Afghanistan",
          "Punjab Kings",
          "Sunrisers Hyderabad",
          "Hobart Hurricanes"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A mystery off-spin bowler who became the youngest player to play ODI cricket for any Associate nation"
      },
      {
        "trivia": [
          "Mystery spinner who took IPL by storm aged 17 - youngest IPL debut",
          "Youngest player to play ODI cricket for any Associate nation",
          "Variations from off-break to googly are impossible to pick consistently",
          "Brilliant T20 performances made him a global franchise favourite",
          "Crucial in Afghanistan's historic 2024 T20 WC semi-final campaign"
        ]
      }
    ]
  },
  {
    "name": "IBRAH",
    "meta": {
      "shortened": true,
      "fullName": "Ibrahim Zadran"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Afghanistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who is Afghanistan's most elegant technically gifted batter and was part of their 2024 T20 WC semi-final run"
      },
      {
        "trivia": [
          "Afghanistan's most elegant and technically gifted top-order batter",
          "Scored 162 not out vs Ireland in a brilliant defining ODI innings",
          "Part of Afghanistan's historic 2024 T20 World Cup semi-final run",
          "Right-hand bat with excellent technique for his very young age",
          "Seen as the future face of Afghanistan batting for next decade"
        ]
      }
    ]
  },
  {
    "name": "ZADRA",
    "meta": {
      "shortened": true,
      "fullName": "Ibrahim Zadran"
    },
    "hints": [
      {
        "age": 23
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "Afghanistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who is Afghanistan's most elegant technically gifted batter and was part of their 2024 T20 WC semi-final run"
      },
      {
        "trivia": [
          "Afghanistan's most elegant and technically gifted top-order batter",
          "Scored 162 not out vs Ireland in a brilliant defining ODI innings",
          "Part of Afghanistan's historic 2024 T20 World Cup semi-final run",
          "Right-hand bat with excellent technique for his very young age",
          "Seen as the future face of Afghanistan batting for next decade"
        ]
      }
    ]
  },
  {
    "name": "AZMAT",
    "meta": {
      "shortened": true,
      "fullName": "Azmatullah Omarzai"
    },
    "hints": [
      {
        "age": 24
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand fast-bowling all-rounder seen as Afghanistan's next generation match-winner in all conditions"
      },
      {
        "trivia": [
          "Afghanistan's most exciting young all-rounder currently",
          "Hit crucial runs in Afghanistan's 2024 T20 WC group stage games",
          "Pace bowling that generates movement troubles top-order batters",
          "Part of the golden generation that took Afghanistan to semi-final",
          "Seen as Shakib Al Hasan equivalent for Afghanistan in future"
        ]
      }
    ]
  },
  {
    "name": "OMARZ",
    "meta": {
      "shortened": true,
      "fullName": "Azmatullah Omarzai"
    },
    "hints": [
      {
        "age": 24
      },
      {
        "country": "Afghanistan"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Afghanistan"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-hand fast-bowling all-rounder seen as Afghanistan's next generation match-winner in all conditions"
      },
      {
        "trivia": [
          "Afghanistan's most exciting young all-rounder currently",
          "Hit crucial runs in Afghanistan's 2024 T20 WC group stage games",
          "Pace bowling that generates movement troubles top-order batters",
          "Part of the golden generation that took Afghanistan to semi-final",
          "Seen as Shakib Al Hasan equivalent for Afghanistan in future"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who wore a black armband to protest his country's political regime during a World Cup"
      },
      {
        "trivia": [
          "Wore black armband to protest Zimbabwe's regime in 2003 World Cup",
          "One of the best wicket-keeper batters of his generation worldwide",
          "Test average of 51 - exceptional for any era of cricket",
          "Became England's most successful team director - two Ashes wins",
          "Brave stand against Mugabe's government made him a global hero"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand keeper-batter who wore a black armband to protest his country's political regime during a World Cup"
      },
      {
        "trivia": [
          "Wore black armband to protest Zimbabwe's regime in 2003 World Cup",
          "One of the best wicket-keeper batters of his generation worldwide",
          "Test average of 51 - exceptional for any era of cricket",
          "Became England's most successful team director - two Ashes wins",
          "Brave stand against Mugabe's government made him a global hero"
        ]
      }
    ]
  },
  {
    "name": "HEATH",
    "meta": {
      "shortened": false,
      "fullName": "Heath Streak"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm all-rounder who was Zimbabwe's greatest fast bowler but later received a cricket ban for corruption"
      },
      {
        "trivia": [
          "Zimbabwe's greatest ever fast bowler with 216 Test wickets",
          "Led Zimbabwe to their best results in 1990s as captain",
          "Banned from cricket for corruption and spot-fixing in later years",
          "Aggressive right-arm seamer who troubled every top team in world",
          "Passed away in 2023 - Zimbabwe cricket mourned a complex hero"
        ]
      }
    ]
  },
  {
    "name": "STREA",
    "meta": {
      "shortened": true,
      "fullName": "Heath Streak"
    },
    "hints": [
      {
        "age": 51
      },
      {
        "country": "Zimbabwe"
      },
      {
        "iplTeam": "N/A"
      },
      {
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Fast-Medium"
      },
      {
        "openingHint": "A right-arm all-rounder who was Zimbabwe's greatest fast bowler but later received a cricket ban for corruption"
      },
      {
        "trivia": [
          "Zimbabwe's greatest ever fast bowler with 216 Test wickets",
          "Led Zimbabwe to their best results in 1990s as captain",
          "Banned from cricket for corruption and spot-fixing in later years",
          "Aggressive right-arm seamer who troubled every top team in world",
          "Passed away in 2023 - Zimbabwe cricket mourned a complex hero"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who was Zimbabwe's most valuable player and later admitted to substance use and spot-fixing approach"
      },
      {
        "trivia": [
          "Zimbabwe's most valuable player across his entire generation",
          "Admitted to taking cocaine and being approached for spot-fixing",
          "Scored 9000+ international runs for Zimbabwe across all formats",
          "Wicket-keeper who was also Zimbabwe's most reliable batsman",
          "His controversial retirement and confessions shocked Zimbabwe cricket"
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
        "role": "Wicket-Keeper Batsman"
      },
      {
        "teams": [
          "Zimbabwe"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand keeper-batter who was Zimbabwe's most valuable player and later admitted to substance use and spot-fixing approach"
      },
      {
        "trivia": [
          "Zimbabwe's most valuable player across his entire generation",
          "Admitted to taking cocaine and being approached for spot-fixing",
          "Scored 9000+ international runs for Zimbabwe across all formats",
          "Wicket-keeper who was also Zimbabwe's most reliable batsman",
          "His controversial retirement and confessions shocked Zimbabwe cricket"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Ireland"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who scored the fastest World Cup century ever to help Ireland beat England in 2011"
      },
      {
        "trivia": [
          "Fastest World Cup century ever - 50 balls vs England in 2011",
          "Single-handedly beat England in 2011 World Cup - a famous upset",
          "Inspired Ireland's push to become a Full ICC Member nation",
          "Powerful lower-order hitter who completely changed Irish cricket",
          "His name became immortal in Ireland after that 2011 WC innings"
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
        "role": "All-Rounder"
      },
      {
        "teams": [
          "Ireland"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Medium"
      },
      {
        "openingHint": "A right-hand all-rounder who scored the fastest World Cup century ever to help Ireland beat England in 2011"
      },
      {
        "trivia": [
          "Fastest World Cup century ever - 50 balls vs England in 2011",
          "Single-handedly beat England in 2011 World Cup - a famous upset",
          "Inspired Ireland's push to become a Full ICC Member nation",
          "Powerful lower-order hitter who completely changed Irish cricket",
          "His name became immortal in Ireland after that 2011 WC innings"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Ireland",
          "Middlesex"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand opener who is Ireland's highest international run-scorer and the cornerstone of their Full Member status"
      },
      {
        "trivia": [
          "Ireland's highest international run-scorer across all formats",
          "Explosive opener who terrorised Associate and Full Member attacks",
          "Took Ireland to famous upsets vs Afghanistan, Pakistan and England",
          "The cornerstone of Ireland earning Full ICC Member status",
          "Most consistent performer in Irish cricket history without question"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "Ireland",
          "Middlesex"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "Right-Arm Off-Spin"
      },
      {
        "openingHint": "A right-hand opener who is Ireland's highest international run-scorer and the cornerstone of their Full Member status"
      },
      {
        "trivia": [
          "Ireland's highest international run-scorer across all formats",
          "Explosive opener who terrorised Associate and Full Member attacks",
          "Took Ireland to famous upsets vs Afghanistan, Pakistan and England",
          "The cornerstone of Ireland earning Full ICC Member status",
          "Most consistent performer in Irish cricket history without question"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who won the ICC Men's ODI Cricketer of the Year award in 2023"
      },
      {
        "trivia": [
          "Scored double century in ODI cricket against New Zealand",
          "Most elegant young Indian batsman since a young Virat Kohli",
          "ICC Men's ODI Cricketer of the Year 2023 award winner",
          "Gujarat Titans captain who carries significant IPL responsibility",
          "Seen as India's batting future across all formats for years to come"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Gujarat Titans",
          "Kolkata Knight Riders"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who won the ICC Men's ODI Cricketer of the Year award in 2023"
      },
      {
        "trivia": [
          "Scored double century in ODI cricket against New Zealand",
          "Most elegant young Indian batsman since a young Virat Kohli",
          "ICC Men's ODI Cricketer of the Year 2023 award winner",
          "Gujarat Titans captain who carries significant IPL responsibility",
          "Seen as India's batting future across all formats for years to come"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who won the IPL Orange Cap in 2021 and later became CSK's long-term captain"
      },
      {
        "trivia": [
          "IPL Orange Cap winner 2021 as highest run-scorer in tournament",
          "CSK's long-term captain replacing MS Dhoni in IPL franchise",
          "Hit 7 sixes in an over during Vijay Hazare Trophy - record",
          "Elegant right-hand opener with high technique and composure",
          "COVID delayed his IPL debut but then dominated immediately"
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
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Chennai Super Kings"
        ]
      },
      {
        "batting": "Right-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A right-hand opener who won the IPL Orange Cap in 2021 and later became CSK's long-term captain"
      },
      {
        "trivia": [
          "IPL Orange Cap winner 2021 as highest run-scorer in tournament",
          "CSK's long-term captain replacing MS Dhoni in IPL franchise",
          "Hit 7 sixes in an over during Vijay Hazare Trophy - record",
          "Elegant right-hand opener with high technique and composure",
          "COVID delayed his IPL debut but then dominated immediately"
        ]
      }
    ]
  },
  {
    "name": "DEVDU",
    "meta": {
      "shortened": true,
      "fullName": "Devdutt Padikkal"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Royal Challengers Bengaluru",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who scored a century on Test debut for India and is one of cricket's most elegant young batters"
      },
      {
        "trivia": [
          "IPL's most elegant young left-hand opener in recent seasons",
          "Scored century on Test debut for India vs England",
          "Technically brilliant left-hander who reads spin extremely well",
          "RCB and RR both relied on him as a key batting component",
          "One of Indian cricket's most promising talents under 25"
        ]
      }
    ]
  },
  {
    "name": "PADIK",
    "meta": {
      "shortened": true,
      "fullName": "Devdutt Padikkal"
    },
    "hints": [
      {
        "age": 25
      },
      {
        "country": "India"
      },
      {
        "iplTeam": "Rajasthan Royals"
      },
      {
        "role": "Batsman"
      },
      {
        "teams": [
          "India",
          "Rajasthan Royals",
          "Royal Challengers Bengaluru",
          "Delhi Capitals"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "N/A"
      },
      {
        "openingHint": "A left-hand opener who scored a century on Test debut for India and is one of cricket's most elegant young batters"
      },
      {
        "trivia": [
          "IPL's most elegant young left-hand opener in recent seasons",
          "Scored century on Test debut for India vs England",
          "Technically brilliant left-hander who reads spin extremely well",
          "RCB and RR both relied on him as a key batting component",
          "One of Indian cricket's most promising talents under 25"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer who holds the record for most T20I wickets by an Indian left-arm pace bowler"
      },
      {
        "trivia": [
          "Best powerplay and death bowler for India in T20I cricket currently",
          "Most T20I wickets for India as a left-arm pace bowler",
          "Crucial in 2024 T20 WC campaign defending totals under pressure",
          "Swing in powerplay overs makes him dangerous vs right-hand batters",
          "Dropped a catch in Asia Cup 2022 but showed tremendous bounce-back"
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
        "role": "Bowler"
      },
      {
        "teams": [
          "India",
          "Punjab Kings"
        ]
      },
      {
        "batting": "Left-Hand"
      },
      {
        "bowling": "Left-Arm Fast-Medium"
      },
      {
        "openingHint": "A left-arm pacer who holds the record for most T20I wickets by an Indian left-arm pace bowler"
      },
      {
        "trivia": [
          "Best powerplay and death bowler for India in T20I cricket currently",
          "Most T20I wickets for India as a left-arm pace bowler",
          "Crucial in 2024 T20 WC campaign defending totals under pressure",
          "Swing in powerplay overs makes him dangerous vs right-hand batters",
          "Dropped a catch in Asia Cup 2022 but showed tremendous bounce-back"
        ]
      }
    ]
  }
];
