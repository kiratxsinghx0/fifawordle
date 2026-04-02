const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fifabackend-production-2dd4.up.railway.app";

export type PuzzleData = {
  day: number;
  encoded: string;
  hash: string;
  previousHash: string | null;
};

export async function fetchPlayers(): Promise<Response> {
  return fetch(`${API_BASE}/api/players`);
}

export async function fetchPuzzleToday(): Promise<PuzzleData> {
  const res = await fetch(`${API_BASE}/api/puzzle/today`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  const json = await res.json();
  if (!json.success || !json.data) throw new Error("Unexpected response shape");
  return json.data as PuzzleData;
}

export async function triggerAutoSetPuzzle(): Promise<void> {
  await fetch(`${API_BASE}/api/puzzle/auto-set`, { method: "POST" });
}

export async function fetchPuzzleByDay(day: number): Promise<PuzzleData> {
  const res = await fetch(`${API_BASE}/api/puzzle/day/${day}`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  const json = await res.json();
  if (!json.success || !json.data) throw new Error("Unexpected response shape");
  return json.data as PuzzleData;
}
