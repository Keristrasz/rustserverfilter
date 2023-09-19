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
  players_history?: [number, number][];
  gameport?: string;
}

export interface userLocationType {
  longitude: number;
  latitude: number;
}

export interface SorterType {
  [key: string]: 1 | -1;
}

export interface FilterType {
  $and: {
    born_next?: { $lte?: number; $gte?: number };
    born?: { $lte?: number; $gte?: number };
    rank?: { $gte: number };
    "rules.size"?: { $gte?: number; $lte?: number };
    wipe_rotation?: { $in: string[] };
    players?: { $gte?: number; $lte?: number };
    name?: { $regex: string; $options: string };
    max_group_size?: { $in: number[] };
    rate?: { $in: number[] };
    "rules.location.country"?: { $in?: string[]; $nin?: string[] };
    "rules.location"?: {
      $geoWithin?: {
        $centerSphere: [number[], number];
      };
    };
    vanilla?: boolean;
    modded?: boolean;
    difficulty?: { $in: string[] };
  }[];
}

export type UseFilterHookType = (
  minRank: number | string,
  wipeRotation: string[],
  minPlayers: number | string,
  maxPlayers: number | string,
  minSize: number | string,
  maxSize: number | string,
  searchName: string | null,
  maxGroupSize: number[],
  rate: number[],
  includedCountries: string[],
  excludedCountries: string[],
  maxDistance: string | number,
  userLocation: { latitude: number; longitude: number } | null,
  isVanilla: boolean | null,
  isModded: boolean | null,
  hardcoreSoftcore: string[]
) => void;

export type QueryResponseType = {
  totalCount: [{ totalCount: number }];
  result: ServerPrimaryDataType[];
};

export interface LocationData {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  region: string;
}
