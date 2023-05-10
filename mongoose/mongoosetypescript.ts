export interface LocationRules {
  latitude?: number;
  longitude?: number;
  country?: string;
}

export interface Rules {
  description?: string;
  fps_avg?: number;
  seed?: number;
  size?: number;
  url?: string;
  uptime?: number;
  location?: LocationRules;
}

export interface ServerPrimaryData {
  _id: string;
  addr: string;
  name: string;
  players: number;
  max_players: number;
  modded: boolean;
  vanilla: boolean;
  wipe_rotation: string;
  born: number;
  born_next: number;
  max_group_size: number;
  rate: number;
  gametype?: string[];
  difficulty: string;
  rank?: number;
  rules?: Rules;
  players_history?: number[][];
}
