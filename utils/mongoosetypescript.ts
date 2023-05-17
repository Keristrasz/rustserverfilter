export interface LocationRulesType {
  latitude?: number;
  longitude?: number;
  country?: string;
}

export interface RulesType {
  description?: string;
  fps_avg?: number;
  seed?: number;
  size?: number;
  url?: string;
  uptime?: number;
  location?: LocationRulesType;
}

export interface ServerPrimaryDataType {
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
  rules?: RulesType;
  players_history?: number[][];
}
